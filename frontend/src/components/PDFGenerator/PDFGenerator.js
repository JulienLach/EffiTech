import React, { useState, useEffect } from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    pdf,
    Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 10,
    },
    logo: {
        width: 100,
        height: 100,
    },
    infoClientCompany: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10,
        fontSize: 12,
    },
    infoCompany: {
        alignItems: "flex-end",
    },
    title: {
        fontSize: 15,
        textAlign: "center",
        marginTop: 20,
    },
    interventionIdTitle: {
        fontSize: 14,
        margin: 10,
    },
    breakdown: {
        fontSize: 12,
        margin: 10,
        padding: 15,
        border: 0.4,
        borderRadius: 3,
    },
    workDone: {
        fontSize: 12,
        margin: 10,
        padding: 15,
        border: 0.4,
        borderRadius: 3,
    },
    dateAndHour: {
        fontSize: 12,
        marginTop: 5,
        marginLeft: 10,
    },
    signature: {
        fontSize: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 20,
    },
    footer: {
        fontSize: 10,
        margin: 10,
        textAlign: "center",
    },
});

const PDFGenerator = ({ report, reportData, companyData }) => {
    const [pdfBlob, setPdfBlob] = useState(null);

    useEffect(() => {
        const generatePdf = async () => {
            const doc = (
                <Document
                    title={`Rapport d'intervention - INT-${report.idEvent} - ${report.title}`}
                >
                    <Page size="A4" style={styles.page}>
                        <Image
                            style={styles.logo}
                            src={`data:image/jpeg;base64,${companyData.logo}`}
                        />{" "}
                        <View style={styles.infoClientCompany}>
                            <View>
                                <Text style={styles.title}>Client:</Text>
                                <Text>
                                    Nom : {report.client.firstname}{" "}
                                    {report.client.lastname}
                                </Text>
                                <Text>
                                    Adresse : {report.client.address.address}{" "}
                                    {report.client.address.zipcode}{" "}
                                    {report.client.address.city}
                                </Text>
                                <Text>
                                    Téléphone : {report.client.phoneNumber}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.title}>Technicien:</Text>
                                <Text>Nom :</Text>
                            </View>
                        </View>
                        <Text style={styles.title}>Rapport d'intervention</Text>
                        <Text style={styles.interventionIdTitle}>
                            INT-{report.idEvent} - {report.title}
                        </Text>
                        <Text style={styles.dateAndHour}>
                            Panne constatée :
                        </Text>
                        <Text style={styles.breakdown}>{report.breakdown}</Text>
                        <Text style={styles.dateAndHour}>Réparation :</Text>
                        <Text style={styles.workDone}>{report.workDone}</Text>
                        <Text style={styles.dateAndHour}>
                            Intervenu le :{" "}
                            {new Date(report.startingDate).toLocaleDateString()}
                        </Text>
                        <Text style={styles.dateAndHour}>
                            Heure de l’intervention : de {report.startingHour} à{" "}
                            {report.endingHour}
                        </Text>
                        <Text style={styles.dateAndHour}>
                            Durée de l’intervention : {report.duration} heures
                        </Text>
                        <View style={styles.signature}>
                            <Text style={styles.dateAndHour}>
                                Signature du client :
                            </Text>
                            <Image
                                src={`data:image/png;base64,${reportData.clientSignature}`}
                            />
                            <Text style={styles.dateAndHour}>
                                Signature du technicien :
                            </Text>
                            <Image
                                src={`data:image/png;base64,${reportData.employeeSignature}`}
                            />
                        </View>
                        <Text style={styles.footer}>
                            SIRET: {companyData.siret} | TVA:{" "}
                            {companyData.vatNumber} | Capital:{" "}
                            {companyData.capital} € | Adresse:{" "}
                            {companyData.idAddress.address},{" "}
                            {companyData.idAddress.city},{" "}
                            {companyData.idAddress.zipcode} | Téléphone:{" "}
                            {companyData.phoneNumber}
                        </Text>
                    </Page>
                </Document>
            );

            const asPdf = pdf([]);
            asPdf.updateContainer(doc);
            const blob = await asPdf.toBlob();
            setPdfBlob(blob);
        };

        generatePdf();
    }, [report, reportData, companyData]);

    return (
        <div>
            {pdfBlob && (
                <iframe
                    src={URL.createObjectURL(pdfBlob)}
                    width="100%"
                    height="600px"
                    title="PDF Document"
                />
            )}
        </div>
    );
};

export default PDFGenerator;
