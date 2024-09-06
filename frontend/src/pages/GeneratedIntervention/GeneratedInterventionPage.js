import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./GeneratedInterventionPage.module.css";
import TemplateHeaderSidebar from "../Template/TemplateHeaderSidebar";
import PDFGenerator from "../../components/PDFGenerator/PDFGenerator";

const GeneratedInterventionPage = () => {
  const location = useLocation();
  const { event } = location.state;  

  // Préparer les données du rapport d'intervention
  const report = {
    idEvent: event.idEvent,
    title: event.title,
    breakdown: event.breakdown,
    workDone: event.workDone,
    startingDate: event.startingDate,
    startingHour: event.startingHour,
    endingHour: event.endingHour,
    duration: event.duration,
    client: event.client,
    clientSignature: event.clientSignature,
    employeeSignature: event.employeeSignature,
  };

  return (
    <>
      <TemplateHeaderSidebar />
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.alignButton}>
            <h2>Rapport d'intervention</h2>
            <button type="button">
              <i className="fa-solid fa-arrow-right"></i>Retour
            </button>
          </div>
          <div className={styles.interventionInfo}>
            <div>
              <p>INT{event.idEvent}</p>
            </div>
          </div>
          <div className={styles.infoTitle}>
            <h3>Client</h3>
            <p>{event.client.firstname} {event.client.lastname}</p>
            <p>{event.client.phoneNumber}</p>
            <p>{event.client.address.address}, {event.client.address.zipcode}, {event.client.address.city}</p>
          </div>
          <div className={styles.infoTitle}>
            <h3>Technicien</h3>
            <p>{event.employee.firstname} {event.employee.lastname}</p>
            <p>
              Intervenu le: {new Date(event.startingDate).toLocaleDateString()} de {event.startingHour} à {event.endingHour}
            </p>
          </div>
          <div className={styles.separation}></div>
          <div className={styles.documentInfo}>
            <h2>Document associé</h2>
            <div className={styles.documentLink}>
              <i className="fa-regular fa-file-pdf"></i>
              <a href="#">INT{event.idEvent}-{event.client.firstname}-{event.client.lastname}-{event.title}</a>
            </div>
          </div>
          <PDFGenerator report={report} />
        </div>
      </div>
    </>
  );
};

export default GeneratedInterventionPage;