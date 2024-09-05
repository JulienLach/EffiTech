import React from "react";
import styles from "./GeneratedInterventionPage.module.css";
import TemplateHeaderSidebar from "../Template/TemplateHeaderSidebar";
import imagePDF from "../../images/rapport_intervention.png";
import PDFGenerator from "../../components/PDFGenerator/PDFGenerator";

const GeneratedInterventionPage = () => {
  return (
    <>
      <TemplateHeaderSidebar />
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.alignButton}>
            <h2>Rapport d'intervention</h2>
            <button type="button">
              <i class="fa-solid fa-arrow-right"></i>Retour
            </button>
          </div>
          <div className={styles.interventionInfo}>
            <div>
              <p>INT[id_event] - [title]</p>
            </div>
          </div>
          <div className={styles.infoTitle}>
            <h3>Client</h3>
            <p>[client]</p>
            <p>[phone]</p>
            <p>[address], [zipCode], [city]</p>
          </div>
          <div className={styles.infoTitle}>
            <h3>Technicien</h3>
            <p>[employee]</p>
            <p>
              Intervenu le: [starting_date] de [starting_hour] à [ending_hour]
            </p>
          </div>
          <div className={styles.separation}></div>
          <div className={styles.documentInfo}>
            <h2>Document associé</h2>
            <div className={styles.documentLink}>
              <i class="fa-regular fa-file-pdf"></i>
              <a href="#">INT[id_event]-[client]-[title]</a>
            </div>
          </div>
          <PDFGenerator />
        </div>
      </div>
    </>
  );
};

export default GeneratedInterventionPage;
