import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./InterventionForm.module.css";
import { deleteEvent } from "../../services/api";

// Composant wrapper pour utiliser les hooks
function InterventionFormWrapper(props) {
    const navigate = useNavigate();
    return (
        <InterventionForm
            {...props}
            navigate={navigate}
            deleteEvent={deleteEvent}
        />
    );
}

class InterventionForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { event, navigate } = this.props;
        if (event.type === "Intervention") {
            navigate("/intervention-form", { state: { event } });
        } else if (event.type === "Rendez-vous") {
            navigate("/appointment-form", { state: { event } });
        }
    }

    handleEdit() {
        const { openUpdateForm } = this.props;
        openUpdateForm();
    }

    handleDelete() {
        const { event, deleteEvent } = this.props;
        deleteEvent(event.idEvent, (error, response) => {
            if (error) {
                console.error(
                    "Erreur lors de la suppression de l'événement",
                    error
                );
                return;
            }
            console.log("Événement supprimé avec succès", response);
        });
        window.location.href = "/calendar";
    }

    getStatusIndicator(status) {
        const style = {
            padding: "2px 10px",
            borderRadius: "8px",
            color: "white",
            fontSize: "0.8em",
            fontWeight: "500",
        };

        switch (status) {
            case 1:
                return (
                    <span
                        style={{
                            ...style,
                            backgroundColor: "#EBEBEB",
                            color: "#505050",
                        }}
                    >
                        À planifier
                    </span>
                );
            case 2:
                return (
                    <span
                        style={{
                            ...style,
                            backgroundColor: "#FFDEDE",
                            color: "#923838",
                        }}
                    >
                        En retard
                    </span>
                );
            case 3:
                return (
                    <span
                        style={{
                            ...style,
                            backgroundColor: "#D3F4FF",
                            color: "#2C5BA1",
                        }}
                    >
                        Aujourd&apos;hui
                    </span>
                );
            case 4:
                return (
                    <span
                        style={{
                            ...style,
                            backgroundColor: "#FFECCF",
                            color: "#C35E00",
                        }}
                    >
                        À venir
                    </span>
                );
            case 5:
                return (
                    <span
                        style={{
                            ...style,
                            backgroundColor: "#DCFFD6",
                            color: "#48903C",
                        }}
                    >
                        Terminé
                    </span>
                );
        }
    }

    render() {
        const { event, closeModal } = this.props;

        return (
            <form
                onSubmit={this.handleSubmit}
                className={`${styles.modal} ${styles.open}`}
            >
                <div className={styles.container}>
                    <div>
                        <h2>
                            {(() => {
                                if (event.type === "Intervention") {
                                    return "Intervention";
                                } else {
                                    return "Rendez-vous";
                                }
                            })()}
                        </h2>
                        <p>{this.getStatusIndicator(event.status)}</p>
                    </div>

                    <div>
                        <div>
                            <h2>
                                {(() => {
                                    if (event.type === "Intervention") {
                                        return "INT-";
                                    } else {
                                        return "RDV-";
                                    }
                                })()}
                                {event.idEvent}
                            </h2>
                        </div>
                        <div className={styles.separator}></div>
                        <div>
                            Client: {event.client.firstname}{" "}
                            {event.client.lastname}
                        </div>
                        <div>Téléphone: {event.client.phoneNumber}</div>
                        <div>
                            Adresse: {event.client.address.address},{" "}
                            {event.client.address.zipcode}{" "}
                            {event.client.address.city}
                        </div>
                        <div>Description: {event.description}</div>
                        <div className={styles.separator}></div>
                        <h3>Planification</h3>
                        <div>
                            Début{" "}
                            {(() => {
                                if (event.type === "Intervention") {
                                    return "de l'intervention";
                                } else {
                                    return "du rendez-vous";
                                }
                            })()}
                            :{" "}
                            {event.startingDate
                                ? new Date(
                                      event.startingDate
                                  ).toLocaleDateString()
                                : ""}{" "}
                            - {event.startingHour}
                        </div>
                        <div>
                            Fin{" "}
                            {(() => {
                                if (event.type === "Intervention") {
                                    return "de l'intervention";
                                } else {
                                    return "du rendez-vous";
                                }
                            })()}
                            : {event.endingHour}
                        </div>
                        <div>
                            Technicien intervenant: {event.employee.firstname}{" "}
                            {event.employee.lastname}
                        </div>
                        <div className={styles.separator}></div>
                        <div>
                            {event.type === "Rendez-vous" &&
                                event.status === 5 && (
                                    <>
                                        <h3>Travaux à effectuer</h3>
                                        <div>{event.workToDo}</div>
                                    </>
                                )}
                        </div>
                    </div>
                    <div className={styles.modalFooter}>
                        {event.status !== 5 && (
                            <button type="button" onClick={this.handleDelete}>
                                Supprimer
                            </button>
                        )}
                        <button type="button" onClick={closeModal}>
                            Retour
                        </button>
                        {event.status !== 5 && (
                            <button type="button" onClick={this.handleEdit}>
                                Modifier
                            </button>
                        )}
                        {(() => {
                            if (event.type === "Intervention") {
                                if (event.status === 5) {
                                    return (
                                        <button
                                            type="button"
                                            onClick={this.handleViewReport}
                                        >
                                            Voir le rapport validé
                                        </button>
                                    );
                                } else if (event.isPlanned === false) {
                                    return (
                                        <button type="submit">
                                            Remplir le rapport
                                        </button>
                                    );
                                }
                            } else if (event.type === "Rendez-vous") {
                                if (event.status !== 5) {
                                    return (
                                        <button type="submit">
                                            Remplir le questionnaire
                                        </button>
                                    );
                                }
                            }
                            return null;
                        })()}
                    </div>
                </div>
            </form>
        );
    }
}

export default InterventionFormWrapper;
