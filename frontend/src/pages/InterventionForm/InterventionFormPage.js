import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./InterventionFormPage.module.css";
import TemplateGlobal from "../Template/TemplateGlobal";
import { createReport } from "../../services/api";

const InterventionFormPage = () => {
  const navigate = useNavigate();

  const [breakdown, setBreakdown] = useState("");
  const [workDone, setWorkDone] = useState("");
  const [reschedule, setReschedule] = useState(false);
  let [startingDate, setStartingDate] = useState("");
  const [clientSignature, setClientSignature] = useState("");
  const [employeeSignature, setEmployeeSignature] = useState("");

  const location = useLocation();
  const { event } = location.state;

  const startingHour = new Date(`1970-01-01T${event.startingHour}Z`);
  const endingHour = new Date(`1970-01-01T${event.endingHour}Z`);
  const duration = new Date(endingHour - startingHour).toISOString().substring(11, 16);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reportData = {
      breakdown,
      workDone,
      reschedule,
      startingDate,
      clientSignature,
      employeeSignature,
      startingHour: event.startingHour,
      endingHour: event.endingHour,
      duration: duration,
      idEvent: event.idEvent,
    };
  
    createReport(reportData, (error, newReport) => {
      if (error) {
        console.error("Erreur lors de la création du rapport", error);
      } else {
        console.log("Rapport créé avec succès, ID:", newReport.idReport);
        navigate("/report", { state: { event, report: newReport } });
      }
    });
  };
  
  return (
    <>
      <TemplateGlobal />
      <form onSubmit={handleSubmit} className={styles.container}>
        <div className={styles.card}>
          <div className={styles.alignButton}>
            <h2>Intervention</h2>
            <button type="button" onClick={() => window.location.href='/calendar'}>
              <i className="fa-solid fa-arrow-right"></i>Retour
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
              <input type="text" value={`${event.client.firstname} ${event.client.lastname}`} readOnly />
            </div>
          </div>
          <div>
            <div className={styles.inputDisplay}>
              <label>Adresse *</label>
              <input type="text" value={`${event.client.address.address} ${event.client.address.zipcode} ${event.client.address.city}`} readOnly />
            </div>
          </div>
          <div>
            <div className={styles.textArea}>
              <label>Panne constatée: *</label>
              <textarea rows="5" value={breakdown} onChange={(e) => setBreakdown(e.target.value)}></textarea>
            </div>
          </div>
          <div>
            <div className={styles.textArea}>
              <label>Travaux efféctués: *</label>
              <textarea rows="5" value={workDone} onChange={(e) => setWorkDone(e.target.value)}></textarea>
            </div>
          </div>
          <div>
            <h3>Planification</h3>
            <div className={styles.checkbox}>
              <input type="checkbox" checked={reschedule} onChange={(e) => setReschedule(e.target.checked)}></input>
              <label>
                Planifier une nouvelle intervention
              </label>
            </div>
          </div>
          <div>
            <h3>Date d'intervention *</h3>
            <div className={styles.labelInput}>
              <label>Date d'intervention</label>
              <input type="date" value={startingDate = new Date(event.startingDate).toISOString().split('T')[0]} />
            </div>
          </div>
          <div>
            <h3>Heure de début</h3>
            <div className={styles.labelInput}>
              <label>Heure de début</label>
              <input type="time" value={event.startingHour} readOnly />
            </div>
          </div>
          <div>
            <h3>Heure de fin</h3>
            <div className={styles.labelInput}>
              <label>Heure de fin</label>
              <input type="time" value={event.endingHour} readOnly />
            </div>
          </div>
          <div>
            <h3>Durée de l'intervention</h3>
            <div className={styles.labelInput}>
              <label>Durée</label>
              <input type="time" value={duration} readOnly />
            </div>
          </div>
          <div>
            <div className={styles.textArea}>
              <label>Signature du technicien</label>
              <textarea rows="4" value={employeeSignature} onChange={(e) => setEmployeeSignature(e.target.value)}></textarea>
            </div>
          </div>
          <div>
            <div className={styles.textArea}>
              <label>Signature du client:</label>
              <textarea rows="4" value={clientSignature} onChange={(e) => setClientSignature(e.target.value)}></textarea>
            </div>
          </div>
          <div className={styles.modalFooter}>
            <button type="reset">Annuler</button>
            <button type="submit">Valider le rapport</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default InterventionFormPage;