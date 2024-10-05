import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './InterventionForm.module.css';

// Composant wrapper pour utiliser les hooks
function InterventionFormWrapper(props) {
    const navigate = useNavigate();
    return <InterventionForm {...props} navigate={navigate} />;
}

class InterventionForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { event, navigate } = this.props;
        navigate("/intervention-form", { state: { event } });
    }

    render() {
        const { event, closeModal } = this.props;

        return (
            <form onSubmit={this.handleSubmit} className={`${styles.modal} ${styles.open}`}>
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
                        <div>Description: {event.description}</div>
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
    }
}

export default InterventionFormWrapper;