import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import styles from "./ReportPage.module.css";
import stylesMobile from "./ReportPageMobile.module.css";
import TemplateGlobal from "../Template/TemplateGlobal";
import TemplateGlobalMobile from "../Template/TemplateGlobalMobile";
import PDFGenerator from "../../components/PDFGenerator/PDFGenerator";
import { getReportById } from "../../services/api";

// Composant wrapper pour utiliser les hooks
function ReportPageWrapper() {
    const location = useLocation();
    return <ReportPage location={location} />;
}

class ReportPage extends Component {
    constructor(props) {
        super(props);
        const { event, report } = this.props.location.state;

        this.state = {
            reportData: report,
            event: event,
        };
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
    }

    render() {
        const { event, reportData } = this.state;

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
              }
            : null;

        console.log("Donnée du rapport avec évènement", reportData);
        console.log("donnée du rapport", reportDetails);

        //Variable pour savoir si c'est mobile ou desktop
        const isMobile = window.navigator.userAgentData;

        return (
            <>
                {isMobile.mobile ? (
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
                                <h3>INT-{event.idEvent}</h3>
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
                                <h3 className={stylesMobile.documentTitle}>
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
                            </div>
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
                                        <h3>INT-{event.idEvent}</h3>
                                    </div>
                                </div>
                                <div className={styles.separation}></div>

                                <div className={styles.infoTitle}>
                                    <h3>Client :</h3>
                                    <p>
                                        Nom : {event.client.firstname}{" "}
                                        {event.client.lastname}
                                    </p>
                                    <p>
                                        Téléphone : {event.client.phoneNumber}
                                    </p>
                                    <p>
                                        Adresse : {event.client.address.address}
                                        , {event.client.address.zipcode},{" "}
                                        {event.client.address.city}
                                    </p>
                                </div>
                                <div className={styles.infoTitle}>
                                    <h3>Technicien :</h3>
                                    <p>
                                        Nom : {event.employee.firstname}{" "}
                                        {event.employee.lastname}
                                    </p>
                                    <p>
                                        Intervenu le :{" "}
                                        {new Date(
                                            event.startingDate
                                        ).toLocaleDateString()}{" "}
                                        de {event.startingHour} à{" "}
                                        {event.endingHour}{" "}
                                    </p>
                                </div>
                                <div className={styles.separation}></div>
                                <div className={styles.documentInfo}>
                                    <h2 className={styles.documentTitle}>
                                        Document :
                                    </h2>
                                    <div className={styles.documentLink}>
                                        <i className="fa-solid fa-file"></i>{" "}
                                        <a href="#">
                                            INT-{event.idEvent}-
                                            {event.client.firstname}-
                                            {event.client.lastname}-
                                            {event.title}
                                        </a>
                                    </div>
                                </div>
                                {reportDetails && (
                                    <PDFGenerator
                                        report={reportDetails}
                                        reportData={reportData}
                                    />
                                )}
                            </div>
                        </div>
                    </>
                )}
            </>
        );
    }
}

export default ReportPageWrapper;
