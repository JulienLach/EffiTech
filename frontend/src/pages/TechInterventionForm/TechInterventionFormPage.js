import React from "react";
import styles from "./TechInterventionFormPage.module.css";
import Header from "../../components/Header/Header";
import TemplateHeaderSidebar from "../Template/TemplateHeaderSidebar";

const TechInterventionFormPage = () => {
  return (
    <>
      <TemplateHeaderSidebar />
      <div className={styles.container}>
        <div className={styles.card}>
          <h2>Formulaire d'intervention technique</h2>
          <p>Numéro d'intervention</p>
          <p>Titre intervention</p>
          <p>----</p>
          <h3>Rapport d'intervention</h3>
          <div>
            <div className={styles.labelInput}>
              <label htmlFor="client">Client</label>
              <input type="text" id="client" name="client" />
            </div>
          </div>
          <div>
            <div className={styles.labelInput}>
              <label htmlFor="address">Adresse</label>
              <input type="text" id="address" name="address" />
            </div>
          </div>
          <div>
            <div className={styles.textArea}>
              <label htmlFor="constat">Panne constatée:</label>
              <textarea id="constat" name="constat"></textarea>
            </div>
          </div>
          <div>
            <div className={styles.textArea}>
              <label htmlFor="doneWork">Travaux efféctués:</label>
              <textarea id="doneWork" name="doneWork"></textarea>
            </div>
          </div>
          <div>
            <h3>Planification</h3>
            <div className={styles.checkbox}>
              <input type="checkbox" id="planify" name="planify"></input>
              <label htmlFor="planify">Planifier une nouvelle intervention</label>
            </div>
          </div>
          <div>
            <h3>Date d'intervention</h3>
            <div className={styles.labelInput}>
              <label htmlFor="date">Date d'intervention</label>
              <input type="date" id="date" name="date" />
            </div>
          </div>
          <div>
            <h3>Heure de début</h3>
            <div className={styles.labelInput}>
              <label htmlFor="startHour">Heure de début</label>
              <input type="time" id="startHour" name="startHour" />
            </div>
          </div>
          <div>
            <h3>Heure de fin</h3>
            <div className={styles.labelInput}>
              <label htmlFor="endHour">Heure de fin</label>
              <input type="time" id="endHour" name="endHour" />
            </div>
          </div>
          <div>
            <h3>Durée de l'intervention</h3>
            <div className={styles.labelInput}>
              <label htmlFor="during">Durée</label>
              <input type="time" id="during" name="during" />
            </div>
          </div>
          <div>
            <div className={styles.textArea}>
              <label htmlFor="techSign">Signature du technicien</label>
              <textarea id="techSign" name="techSign"></textarea>
            </div>
          </div>
          <div>
            <div className={styles.textArea}>
              <label htmlFor="clientSign">Signature du client:</label>
              <textarea id="clientSign" name="clientSign"></textarea>
            </div>
          </div>
          <div>
                <button type="button">Annuler</button>
                <button type="button" >Valider le rapport</button>
            </div>
        </div>
      </div>
    </>
  );
};

export default TechInterventionFormPage;
