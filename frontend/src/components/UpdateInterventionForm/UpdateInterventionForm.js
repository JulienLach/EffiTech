import React, { Component } from "react";
import styles from "./UpdateInterventionForm.module.css";
import { updateEvent } from "../../services/api.js";

class UpdateInterventionForm extends Component {
    constructor(props) {
        super(props);

        // Convertir la date pour affichage dans le champs
        const startingDate = props.event.startingDate
            ? new Date(props.event.startingDate).toLocaleDateString("en-CA")
            : null;

        this.state = {
            idEvent: props.event.idEvent,
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
            idEvent: event.idEvent,
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
            idEvent,
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
                    <h2 className={styles.modalTitle}>
                        {type === "Intervention"
                            ? "Modifier l'intervention"
                            : "Modifier le rendez-vous"}
                    </h2>
                    <div className={styles.separator}></div>
                    <div>
                        <h2>
                            {(() => {
                                if (type === "Intervention") {
                                    return "INT-";
                                } else {
                                    return "RDV-";
                                }
                            })()}
                            {idEvent}
                        </h2>
                    </div>
                    <div>
                        <div className={styles.labelInput}>
                            <label className={styles.eventLabels}>
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
                            <label className={styles.eventLabels}>
                                Description :
                                <textarea
                                    name="description"
                                    value={description}
                                    onChange={this.handleChange}
                                />
                            </label>
                        </div>
                        <div className={styles.labelInput}>
                            <label className={styles.eventLabels}>
                                Type :
                                <select
                                    name="type"
                                    value={type}
                                    onChange={this.handleChange}
                                >
                                    <option value="Intervention">
                                        Intervention
                                    </option>
                                    <option value="Rendez-vous">
                                        Rendez-vous
                                    </option>
                                </select>
                            </label>
                        </div>
                        <div className={styles.labelInput}>
                            <label className={styles.eventLabels}>
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
                            <label className={styles.eventLabels}>
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
                            <label className={styles.eventLabels}>
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
                            <label className={styles.eventLabels}>
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
                            <i className="fa-solid fa-xmark"></i>
                            Annuler
                        </button>
                        <button type="submit" className={styles.submitButton}>
                            <i className="fa-solid fa-save"></i>
                            Enregistrer
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default UpdateInterventionForm;
