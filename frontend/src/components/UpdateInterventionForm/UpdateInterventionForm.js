import React, { Component } from "react";
import styles from "./UpdateInterventionForm.module.css";
import { updateEvent } from "../../services/api.js";

class UpdateInterventionForm extends Component {
    constructor(props) {
        super(props);

        // Convertir la date pour afficahge dans le champs
        const startingDate = props.event.startingDate
            ? new Date(props.event.startingDate).toLocaleDateString("en-CA")
            : "";

        this.state = {
            title: props.event.title || "",
            description: props.event.description || "",
            status: props.event.status || 1,
            isPlanned: props.event.isPlanned || false,
            type: props.event.type,
            idClient: props.event.client.idClient || "",
            idAddress: props.event.address.idAddress || "",
            startingDate: startingDate,
            startingHour: props.event.startingHour,
            endingHour: props.event.endingHour,
            idEmployee: props.event.employee.idEmployee || "",
            workToDo: props.event.workToDo || "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { event, closeModal } = this.props;
        const {
            title,
            description,
            status,
            isPlanned,
            type,
            idClient,
            idAddress,
            startingDate,
            startingHour,
            endingHour,
            idEmployee,
            workToDo,
        } = this.state;

        const eventData = {
            idEvent: event.idEvent, // Assurez-vous que idEvent est inclus
            title,
            description,
            status,
            isPlanned,
            type,
            idClient,
            idAddress,
            startingDate,
            startingHour,
            endingHour,
            idEmployee,
            workToDo,
        };

        console.log("Données envoyées à l'API:", eventData); // Log des données envoyées

        updateEvent(eventData, (error, updatedEvent) => {
            if (error) {
                console.error(
                    "Erreur lors de la mise à jour de l'événement:",
                    error
                );
            } else {
                console.log("Événement mis à jour avec succès:", updatedEvent);
                closeModal();
            }
            window.location.reload();
        });
    }

    handleCancel() {
        const { closeModal } = this.props;
        closeModal();
    }

    render() {
        const {
            title,
            description,
            status,
            isPlanned,
            type,
            startingDate,
            startingHour,
            endingHour,
            workToDo,
        } = this.state;

        console.log("État actuel du formulaire:", this.state); // Log de l'état actuel du formulaire

        return (
            <form
                onSubmit={this.handleSubmit}
                className={`${styles.modal} ${styles.open}`}
            >
                <div className={styles.container}>
                    <h2>
                        {type === "Intervention"
                            ? "Modifier l'intervention"
                            : "Modifier le rendez-vous"}
                    </h2>
                    <div className={styles.separator}></div>
                    <div>
                        <div className={styles.labelInput}>
                            <label>
                                Titre :
                                <input
                                    type="text"
                                    name="title"
                                    value={title}
                                    onChange={this.handleChange}
                                />
                            </label>
                        </div>
                        <div className={styles.labelInput}>
                            <label>
                                Description :
                                <textarea
                                    name="description"
                                    value={description}
                                    onChange={this.handleChange}
                                />
                            </label>
                        </div>
                        <div className={styles.labelInput}>
                            <label>
                                Statut :
                                <input
                                    type="number"
                                    name="status"
                                    value={status}
                                    onChange={this.handleChange}
                                />
                            </label>
                        </div>
                        <div className={styles.labelInput}>
                            <label>
                                Planifié :
                                <input
                                    type="checkbox"
                                    name="isPlanned"
                                    checked={isPlanned}
                                    onChange={(e) =>
                                        this.setState({
                                            isPlanned: e.target.checked,
                                        })
                                    }
                                />
                            </label>
                        </div>
                        <div className={styles.labelInput}>
                            <label>
                                Type :
                                <input
                                    type="text"
                                    name="type"
                                    value={type}
                                    onChange={this.handleChange}
                                />
                            </label>
                        </div>
                        <div className={styles.labelInput}>
                            <label>
                                Date de début :
                                <input
                                    type="date"
                                    name="startingDate"
                                    value={startingDate}
                                    onChange={this.handleChange}
                                />
                            </label>
                        </div>
                        <div className={styles.labelInput}>
                            <label>
                                Heure de début :
                                <input
                                    type="time"
                                    name="startingHour"
                                    value={startingHour}
                                    onChange={this.handleChange}
                                />
                            </label>
                        </div>
                        <div className={styles.labelInput}>
                            <label>
                                Heure de fin:
                                <input
                                    type="time"
                                    name="endingHour"
                                    value={endingHour}
                                    onChange={this.handleChange}
                                />
                            </label>
                        </div>
                        <div className={styles.labelInput}>
                            <label>
                                Travaux à effectuer :
                                <textarea
                                    name="workToDo"
                                    value={workToDo}
                                    onChange={this.handleChange}
                                />
                            </label>
                        </div>
                    </div>
                    <div className={styles.separator}></div>
                    <div className={styles.modalFooter}>
                        <button
                            type="button"
                            onClick={this.handleCancel}
                            className={styles.cancelButton}
                        >
                            Annuler
                        </button>
                        <button type="submit" className={styles.submitButton}>
                            Enregistrer
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default UpdateInterventionForm;
