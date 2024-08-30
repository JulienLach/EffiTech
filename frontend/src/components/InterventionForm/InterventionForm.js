import React from 'react';
import styles from './InterventionForm.module.css';

const InterventionForm = ({ event, closeModal }) => {
    return (
        <div className={`${styles.modal} ${styles.open}`}>
            <div>
                <h2>INT-{event.idEvent}</h2>
            </div>
            <div>
                <div>-----</div>
                <div>Client: {event.idClient.firstname} {event.idClient.lastname}</div>
                <div>Téléphone: {event.idClient.phoneNumber}</div>
                <div>Adresse: {event.idAddress.address}, {event.idAddress.zipcode} {event.idAddress.city}</div>
                <div>-----</div>
                <h3>Planification</h3>
                <div>Début de l'intervention: {new Date(event.startingDate).toLocaleDateString()}</div>
                <div>Fin de l'intervention: {event.endingHour}</div> {/* Affiche l'heure de fin */}
                <div>Technicien intervenant: {event.idEmployee.firstname} {event.idEmployee.lastname}</div>
            </div>
            <div className={styles.modalFooter}>
                <button onClick={closeModal}>Retour</button>
                <button>Modifier</button>
                <button>{event.status === 5 ? 'Visualiser le rapport' : 'Remplir le rapport'}</button>
            </div>
        </div>
    );
};

export default InterventionForm;