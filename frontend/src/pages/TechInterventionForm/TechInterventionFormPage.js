import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./TechInterventionFormPage.module.css";
import TemplateHeaderSidebar from "../Template/TemplateHeaderSidebar";

const TechInterventionFormPage = () => {
  const location = useLocation();
  //réception des données de l'événement avec useLocation
  const { event } = location.state;

  // calcul de la durée de l'intervention
  const startingHour = new Date(`1970-01-01T${event.startingHour}Z`);
  const endingHour = new Date(`1970-01-01T${event.endingHour}Z`);
  const duration = new Date(endingHour - startingHour).toISOString().substring(11, 16);
  
  return (
    <>
      <TemplateHeaderSidebar />
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.alignButton}>
            <h2>Formulaire d'intervention technique</h2>
            <button type="button">
              <i class="fa-solid fa-arrow-right"></i>Retour
            </button>
          </div>
          <div className={styles.interventionId}>
            <div>
              <h3>INT-{event.idEvent}</h3>
            </div>
          </div>
          <div className={styles.separation}></div>
          <h3>Rapport d'intervention</h3>
          <div>
            <div className={styles.inputDisplay}>
              <label>Client *</label>
              <input type="text" value={`${event.client.firstname} ${event.client.lastname}`} />
            </div>
          </div>
          <div>
            <div className={styles.inputDisplay}>
              <label>Adresse *</label>
              <input type="text" value={`${event.client.address.address} ${event.client.address.zipcode} ${event.client.address.city}`}/>
            </div>
          </div>
          <div>
            <div className={styles.textArea}>
              <label>Panne constatée: *</label>
              <textarea rows="5"></textarea>
            </div>
          </div>
          <div>
            <div className={styles.textArea}>
              <label>Travaux efféctués: *</label>
              <textarea rows="5"></textarea>
            </div>
          </div>
          <div>
            <h3>Planification</h3>
            <div className={styles.checkbox}>
              <input type="checkbox"></input>
              <label>
                Planifier une nouvelle intervention
              </label>
            </div>
          </div>
          <div>
            <h3>Date d'intervention *</h3>
            <div className={styles.labelInput}>
              <label>Date d'intervention</label>
              <input type="date" value={new Date(event.startingDate).toISOString().split('T')[0]} />
            </div>
          </div>
          <div>
            <h3>Heure de début</h3>
            <div className={styles.labelInput}>
              <label>Heure de début</label>
              <input type="time" value={event.startingHour}/>
            </div>
          </div>
          <div>
            <h3>Heure de fin</h3>
            <div className={styles.labelInput}>
              <label>Heure de fin</label>
              <input type="time" value={event.endingHour}/>
            </div>
          </div>
          <div>
            <h3>Durée de l'intervention</h3>
            <div className={styles.labelInput}>
              <label>Durée</label>
              <input type="time" value={duration}/>
            </div>
          </div>
          <div>
            <div className={styles.textArea}>
              <label>Signature du technicien</label>
              <textarea rows="4"></textarea>
            </div>
          </div>
          <div>
            <div className={styles.textArea}>
              <label>Signature du client:</label>
              <textarea rows="4"></textarea>
            </div>
          </div>
          <div>
            <button type="button">Annuler</button>
            <button type="button">Valider le rapport</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TechInterventionFormPage;
