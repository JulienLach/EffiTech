import React from 'react';
import { useNavigate } from "react-router-dom";
import styles from './InterventionForm.module.css';


const InterventionForm = ({ event, closeModal }) => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/technician-intervention-form-page", { state: { event } });
    };

    return (
        <form onSubmit={handleSubmit} className={`${styles.modal} ${styles.open}`}>
            <div className={styles.container}>
                <div>
                    <h2>Intervention</h2>
                </div>
                <div>
                    <div>
                        <h2>INT-{event.idEvent}</h2>
                    </div>
                    <div className={styles.separator}></div>
                    <div>Client: {event.client.firstname} {event.client.lastname}</div>
                    <div>Téléphone: {event.client.phoneNumber}</div>
                    <div>Adresse: {event.client.address.address}, {event.client.address.zipcode} {event.client.address.city}</div>
                    <div className={styles.separator}></div>
                    <h3>Planification</h3>
                    <div>Début de l'intervention: {new Date(event.startingDate).toLocaleDateString()}</div>
                    <div>Fin de l'intervention: {event.endingHour}</div> {/* Affiche l'heure de fin */}
                    <div>Technicien intervenant: {event.employee.firstname} {event.employee.lastname}</div>
                </div>
                <div className={styles.modalFooter}>
                    <button onClick={closeModal}>Retour</button>
                    <button>Modifier</button>
                    {event.status === 5 ? (
                        <button type="submit">Visualiser le rapport</button>
                    ) : (
                        <button type="submit">Remplir le rapport</button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default InterventionForm;