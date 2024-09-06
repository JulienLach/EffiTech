import React, { useState, useEffect } from "react";
import { Page, Text, View, Document, StyleSheet, pdf} from "@react-pdf/renderer";
import logo from "../../images/logo.svg";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
  },
  logo: {
    fontSize: 25,
    margin: 20,
  },
  infoClientCompany: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
    fontSize: 14,
  },
  infoCompany: {
    alignItems: "flex-end",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 40,
  },
  interventionIdTitle: {
    fontSize: 16,
    margin: 20,
  },
  breakdown: {
    fontSize: 14,
    margin: 20,
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 70,
    border: 0.8,
  },
  workDone: {
    fontSize: 14,
    margin: 20,
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 70,
    border: 0.8,
  },
  dateAndHour: {
    fontSize: 14,
    marginTop: 10,
    marginLeft: 20,
  },
  signature: {
    fontSize: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 50,
  },
});

const PDFGenerator = ({ report }) => {
  const [pdfBlob, setPdfBlob] = useState(null);

  useEffect(() => {
    const generatePdf = async () => {
      const doc = (
        <Document>
          <Page size="A4" style={styles.page}>
            <Text style={styles.logo}>[LOGO COMPANY]</Text>
            <View style={styles.infoClientCompany}>
              <View>
                <Text>{report.client.firstname} {report.client.lastname}</Text>
                <Text>{report.client.address.address}</Text>
                <Text>{report.client.address.zipcode} {report.client.address.city}</Text>
                <Text>{report.client.phoneNumber}</Text>
              </View>
            </View>
            <Text style={styles.title}>Rapport d'intervention</Text>
            <Text style={styles.interventionIdTitle}>
              INT-{report.idEvent} - {report.title}
            </Text>
            <Text style={styles.breakdown}>{report.breakdown}</Text>
            <Text style={styles.workDone}>{report.workDone}</Text>
            <Text style={styles.dateAndHour}>
              Intervenu le: {new Date(report.startingDate).toLocaleDateString()}
            </Text>
            <Text style={styles.dateAndHour}>
              Heure de l’intervention : de {report.startingHour} à {report.endingHour}
            </Text>
            <Text style={styles.dateAndHour}>
              Durée de l’intervention : {report.duration} heures
            </Text>
            <View style={styles.signature}>
              <Text>{report.clientSignature}</Text>
              <Text>{report.employeeSignature}</Text>
            </View>
          </Page>
        </Document>
      );

      const asPdf = pdf([]);
      asPdf.updateContainer(doc);
      const blob = await asPdf.toBlob();
      setPdfBlob(blob);
    };

    generatePdf();
  }, [report]);

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