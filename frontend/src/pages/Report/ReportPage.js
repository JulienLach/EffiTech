import React, { Component } from "react";
import { isMobile } from "react-device-detect";
import { useLocation } from "react-router-dom";
import styles from "./ReportPage.module.css";
import stylesMobile from "./ReportPageMobile.module.css";
import TemplateGlobal from "../Template/TemplateGlobal";
import TemplateGlobalMobile from "../Template/TemplateGlobalMobile";
import PDFGenerator from "../../components/PDFGenerator/PDFGenerator";
import generatePDF from "../../components/jsPDF/jsPDF";
import { getReportById, getCompany, sendReport } from "../../services/api";

// Composant wrapper pour utiliser les hooks
function ReportPageWrapper() {
    const location = useLocation();
    if (!location.state) {
        window.location.href = "/calendar";
    }
    return <ReportPage location={location} />;
}

class ReportPage extends Component {
    constructor(props) {
        super(props);
        const { event, report } = this.props.location.state;

        this.state = {
            reportData: report,
            event: event,
            companyData: null,
            clientEmail: event.client.email,
            showAlert: false,
        };
        this.sendReport = this.sendReport.bind(this);
    }

    componentDidMount() {
        const { event } = this.state;
        const idEvent = event.idEvent;

        getReportById(idEvent, (error, data) => {
            if (error) {
                console.error(
                    "Erreur lors de la récupération du rapport",
                    error
                );
            } else {
                this.setState({ reportData: data });
                console.log("Donnée du rapport récupérée:", data);
            }
        });

        getCompany((error, data) => {
            if (error) {
                console.error(
                    "Erreur lors de la récupération des informations de l'entreprise",
                    error
                );
            } else {
                this.setState({ companyData: data });
                console.log("Données de l'entreprise récupérées:", data);
            }
        });
    }

    sendReport() {
        const { clientEmail, reportData, companyData } = this.state;

        if (!reportData || !companyData) {
            console.error("Données manquantes pour générer le PDF");
            return;
        }

        // Construire reportDetails comme dans le render
        const { event } = this.state;
        const reportDetails = {
            idEvent: event.idEvent,
            title: event.title,
            breakdown: reportData.breakdown,
            workDone: reportData.workDone,
            startingDate: event.startingDate,
            startingHour: event.startingHour,
            endingHour: event.endingHour,
            duration: reportData.duration,
            client: event.client,
            clientSignature: reportData.client_signature,
            employeeSignature: reportData.employee_signature,
            employee: event.employee,
        };

        try {
            const dataUrl = generatePDF({
                report: reportDetails,
                reportData: reportData,
                companyData: companyData,
            });
            const base64Data = dataUrl.split(",")[1];

            const attachments = [
                {
                    filename: `rapport_intervention_INT-${event.idEvent}.pdf`,
                    content: base64Data,
                    contentType: "application/pdf",
                    encoding: "base64",
                },
            ];

            const emailData = {
                to: clientEmail,
                subject: `Rapport d'intervention INT-${event.idEvent}`,
                text: `Bonjour, ci-joint le rapport d'intervention réalisé le ${new Date(
                    event.startingDate
                ).toLocaleDateString()}.`,
                attachments: attachments,
            };

            sendReport(emailData, (error, data) => {
                if (error) {
                    console.error("Erreur lors de l'envoi du rapport", error);
                } else {
                    console.log("Rapport envoyé par email", data, clientEmail);
                    this.setState({ showAlert: true });
                    setTimeout(() => {
                        this.setState({ showAlert: false });
                    }, 3500);
                }
            });
        } catch (error) {
            console.error("Erreur lors de la génération du PDF", error);
        }
    }

    render() {
        const { event, reportData, companyData, showAlert } = this.state;

        const reportDetails = reportData
            ? {
                  idEvent: event.idEvent,
                  title: event.title,
                  breakdown: reportData.breakdown,
                  workDone: reportData.workDone,
                  startingDate: event.startingDate,
                  startingHour: event.startingHour,
                  endingHour: event.endingHour,
                  duration: reportData.duration,
                  client: event.client,
                  clientSignature: reportData.client_signature,
                  employeeSignature: reportData.employee_signature,
                  employee: event.employee,
              }
            : null;

        console.log("Donnée du rapport avec évènement", reportData);
        console.log("donnée du rapport", reportDetails);

        return (
            <>
                {isMobile ? (
                    <>
                        <TemplateGlobalMobile />
                        <div className={stylesMobile.container}>
                            <div className={stylesMobile.buttonContainer}>
                                <button
                                    className={stylesMobile.backButton}
                                    type="button"
                                    onClick={() =>
                                        (window.location.href = "/calendar")
                                    }
                                >
                                    <i className="fa-solid fa-arrow-left"></i>
                                    Retour
                                </button>
                            </div>

                            <div className={stylesMobile.titleCard}>
                                <h2 className={stylesMobile.titlePage}>
                                    Rapport d'intervention
                                </h2>
                                <h3 className={stylesMobile.reportId}>
                                    INT-{event.idEvent}
                                </h3>
                            </div>

                            <div className={stylesMobile.detailsCard}>
                                <h3>Client :</h3>
                                <p>
                                    {event.client.firstname}{" "}
                                    {event.client.lastname}
                                </p>
                                <h3>Téléphone</h3>
                                <p>{event.client.phoneNumber}</p>
                                <h3>Adresse</h3>
                                <p>
                                    {event.client.address.address},{" "}
                                    {event.client.address.zipcode},{" "}
                                    {event.client.address.city}
                                </p>
                            </div>
                            <div className={stylesMobile.planCard}>
                                <h3>Technicien</h3>
                                <p>
                                    {event.employee.firstname}{" "}
                                    {event.employee.lastname}
                                </p>
                                <h3>Date et heure</h3>
                                <p>
                                    {new Date(
                                        event.startingDate
                                    ).toLocaleDateString()}{" "}
                                    de {event.startingHour} à {event.endingHour}{" "}
                                </p>
                                <h3>Description</h3>
                                <p>{event.description}</p>
                            </div>

                            <div className={stylesMobile.documentCard}>
                                <h3 className={stylesMobile.infoTitle}>
                                    Document :
                                </h3>
                                <div className={stylesMobile.documentLink}>
                                    <i className="fa-solid fa-file"></i>{" "}
                                    <a href="#">
                                        INT-{event.idEvent}-
                                        {event.client.firstname}-
                                        {event.client.lastname}-{event.title}
                                    </a>
                                </div>
                                <button
                                    className={stylesMobile.mailButton}
                                    onClick={this.sendReport}
                                >
                                    <i className="fa-solid fa-paper-plane"></i>{" "}
                                    Envoyer par email
                                </button>
                            </div>
                            <div className={stylesMobile.pdfMobile}>
                                {reportDetails && companyData && (
                                    <PDFGenerator
                                        report={reportDetails}
                                        reportData={reportData}
                                        companyData={companyData}
                                    />
                                )}
                            </div>
                            {showAlert && (
                                <div className={stylesMobile.alert}>
                                    Email envoyé{" "}
                                    <i className="fa-solid fa-check"></i>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <TemplateGlobal />
                        <div className={styles.container}>
                            <div className={styles.card}>
                                <div className={styles.alignButton}>
                                    <h2 className={styles.pageTitle}>
                                        Rapport d'intervention
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            (window.location.href = "/calendar")
                                        }
                                    >
                                        <i className="fa-solid fa-arrow-right"></i>
                                        Retour
                                    </button>
                                </div>
                                <div className={styles.interventionInfo}>
                                    <div>
                                        <h3 className={styles.reportId}>
                                            INT-{event.idEvent}
                                        </h3>
                                    </div>
                                </div>
                                <div className={styles.separation}></div>

                                <div className={styles.infoTitle}>
                                    <h3>Client :</h3>
                                    <p>
                                        <strong>Nom : </strong>
                                        {event.client.firstname}{" "}
                                        {event.client.lastname}
                                    </p>
                                    <p>
                                        <strong>Téléphone : </strong>{" "}
                                        {event.client.phoneNumber}
                                    </p>
                                    <p>
                                        <strong>Adresse :</strong>{" "}
                                        {event.client.address.address},{" "}
                                        {event.client.address.zipcode},{" "}
                                        {event.client.address.city}
                                    </p>
                                </div>
                                <div className={styles.infoTitle}>
                                    <h3>Technicien :</h3>
                                    <p>
                                        <strong>Nom : </strong>
                                        {event.employee.firstname}{" "}
                                        {event.employee.lastname}
                                    </p>
                                    <p>
                                        <strong>Intervenu le : </strong>{" "}
                                        {new Date(
                                            event.startingDate
                                        ).toLocaleDateString()}{" "}
                                        de {event.startingHour} à{" "}
                                        {event.endingHour}{" "}
                                    </p>
                                </div>
                                <div className={styles.separation}></div>
                                <div className={styles.documentInfo}>
                                    <h3 className={styles.infoTitle}>
                                        Document :
                                    </h3>
                                    <div className={styles.documentLink}>
                                        <a href="#">
                                            <i className="fa-solid fa-file-pdf"></i>{" "}
                                            INT-{event.idEvent}-
                                            {event.client.firstname}-
                                            {event.client.lastname}-
                                            {event.title}
                                        </a>

                                        <button
                                            className={styles.mailButton}
                                            onClick={this.sendReport}
                                        >
                                            <i className="fa-solid fa-paper-plane"></i>{" "}
                                            Envoyer par email
                                        </button>
                                    </div>
                                </div>
                                {reportDetails && companyData && (
                                    <PDFGenerator
                                        report={reportDetails}
                                        reportData={reportData}
                                        companyData={companyData}
                                    />
                                )}
                            </div>
                            {showAlert && (
                                <div className={styles.alert}>
                                    Email envoyé{" "}
                                    <i className="fa-solid fa-check"></i>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </>
        );
    }
}

export default ReportPageWrapper;
