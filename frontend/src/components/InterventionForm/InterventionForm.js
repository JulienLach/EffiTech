import React, { Component } from "react";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import styles from "./InterventionForm.module.css";
import stylesMobile from "./InterventionFormMobile.module.css";
import { deleteEvent, createNotification } from "../../services/api";

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
        this.handleViewReport = this.handleViewReport.bind(this);
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

        const notificationData = {
            idEmployee: event.employee.idEmployee,
            action: "Suppression",
            type: event.type,
            title: event.title,
            creationDate: new Date().toISOString().split("T")[0],
            creationHour: new Date().toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            }),
        };

        createNotification(notificationData, (error, result) => {
            if (error) {
                console.error("Error creating notification:", error);
            } else {
                console.log("Notification created successfully:", result);
            }
        });

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

    handleViewReport() {
        const { event, navigate } = this.props;
        navigate("/report", { state: { event, report: event.report } });
    }

    getStatusIndicator(status) {
        const style = {
            padding: "0.14em 0.7em",
            borderRadius: ".5em",
            color: "white",
            fontSize: "0.85em",
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
            <>
                {isMobile ? (
                    <>
                        <form
                            onSubmit={this.handleSubmit}
                            className={`${stylesMobile.modal} ${stylesMobile.open}`}
                        >
                            <div className={stylesMobile.container}>
                                <div className={stylesMobile.buttonContainer}>
                                    <button
                                        className={stylesMobile.backButton}
                                        type="button"
                                        onClick={closeModal}
                                    >
                                        <i
                                            className={`fas fa-arrow-left ${styles.navbarIcon}`}
                                        ></i>{" "}
                                        Retour
                                    </button>
                                </div>
                                <div className={stylesMobile.titleCard}>
                                    <h3 className={stylesMobile.title}>
                                        {(() => {
                                            if (event.type === "Intervention") {
                                                return "Intervention";
                                            } else {
                                                return "Rendez-vous";
                                            }
                                        })()}
                                    </h3>
                                    <div className={stylesMobile.intStatus}>
                                        <p className={stylesMobile.eventId}>
                                            {(() => {
                                                if (
                                                    event.type ===
                                                    "Intervention"
                                                ) {
                                                    return "INT-";
                                                } else {
                                                    return "RDV-";
                                                }
                                            })()}
                                            {event.idEvent}
                                        </p>
                                        <p>
                                            {this.getStatusIndicator(
                                                event.status
                                            )}
                                        </p>
                                    </div>
                                    <p className={stylesMobile.boldElement}>
                                        {event.title}
                                    </p>
                                </div>
                                <div className={stylesMobile.detailsCard}>
                                    <h3 className={stylesMobile.title}>
                                        Client
                                    </h3>
                                    <p className={stylesMobile.dataElement}>
                                        {event.client.firstname}{" "}
                                        {event.client.lastname}
                                    </p>
                                    <h3 className={stylesMobile.title}>
                                        Téléphone
                                    </h3>
                                    <p className={stylesMobile.dataElement}>
                                        {event.client.phoneNumber}
                                    </p>
                                    <h3 className={stylesMobile.title}>
                                        Adresse
                                    </h3>
                                    <p className={stylesMobile.dataElement}>
                                        {event.client.address.address},{" "}
                                        {event.client.address.zipcode},{" "}
                                        {event.client.address.city}
                                    </p>
                                    <h3 className={stylesMobile.title}>
                                        Description
                                    </h3>
                                    <p className={stylesMobile.dataElement}>
                                        {event.description}
                                    </p>
                                </div>

                                <div className={stylesMobile.planCard}>
                                    <h3 className={stylesMobile.title}>
                                        Technicien
                                    </h3>
                                    <p className={stylesMobile.dataElement}>
                                        {event.employee.firstname}{" "}
                                        {event.employee.lastname}
                                    </p>
                                    <h3 className={stylesMobile.title}>
                                        Début{" "}
                                        {(() => {
                                            if (event.type === "Intervention") {
                                                return "de l'intervention :";
                                            } else {
                                                return "du rendez-vous :";
                                            }
                                        })()}
                                    </h3>
                                    <p className={stylesMobile.dataElement}>
                                        {event.startingDate
                                            ? new Date(
                                                  event.startingDate
                                              ).toLocaleDateString()
                                            : ""}{" "}
                                        -{" "}
                                        {new Date(
                                            `1970-01-01T${event.startingHour}`
                                        ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                    <h3 className={stylesMobile.title}>
                                        Fin{" "}
                                        {(() => {
                                            if (event.type === "Intervention") {
                                                return "de l'intervention :";
                                            } else {
                                                return "du rendez-vous :";
                                            }
                                        })()}
                                    </h3>
                                    <p className={stylesMobile.dataElement}>
                                        {event.startingDate
                                            ? new Date(
                                                  event.startingDate
                                              ).toLocaleDateString()
                                            : ""}{" "}
                                        -{" "}
                                        {new Date(
                                            `1970-01-01T${event.endingHour}`
                                        ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
                                <div className={stylesMobile.modalFooter}>
                                    {(() => {
                                        if (event.type === "Intervention") {
                                            if (event.status === 5) {
                                                return (
                                                    <button
                                                        className={
                                                            stylesMobile.fillButton
                                                        }
                                                        type="button"
                                                        onClick={
                                                            this
                                                                .handleViewReport
                                                        }
                                                    >
                                                        <i class="fa-solid fa-file-circle-check"></i>{" "}
                                                        Voir le rapport validé
                                                    </button>
                                                );
                                            } else {
                                                if (
                                                    event.status !== 1 &&
                                                    event.startingHour !==
                                                        null &&
                                                    event.endingHour !== null
                                                ) {
                                                    return (
                                                        <button
                                                            className={
                                                                stylesMobile.fillButton
                                                            }
                                                            type="submit"
                                                        >
                                                            <i className="fa-solid fa-file-pen"></i>{" "}
                                                            Remplir le rapport
                                                        </button>
                                                    );
                                                }
                                                return null;
                                            }
                                        } else if (
                                            event.type === "Rendez-vous"
                                        ) {
                                            if (
                                                event.status !== 5 &&
                                                event.status !== 1 &&
                                                event.startingHour !== null &&
                                                event.endingHour !== null
                                            ) {
                                                return (
                                                    <button
                                                        className={
                                                            stylesMobile.fillButton
                                                        }
                                                        type="submit"
                                                    >
                                                        <i className="fa-solid fa-file-pen"></i>{" "}
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
                    </>
                ) : (
                    <form
                        onSubmit={this.handleSubmit}
                        className={`${styles.modal} ${styles.open}`}
                    >
                        <div className={styles.container}>
                            <div className={styles.formHeader}>
                                <div className={styles.titleCard}>
                                    <h2>
                                        {(() => {
                                            if (event.type === "Intervention") {
                                                return "Intervention";
                                            } else {
                                                return "Rendez-vous";
                                            }
                                        })()}
                                    </h2>
                                    <button
                                        className={styles.backButton}
                                        type="button"
                                        onClick={closeModal}
                                    >
                                        <i className="fa fa-arrow-left"></i>{" "}
                                        Retour
                                    </button>
                                </div>
                                <p>{this.getStatusIndicator(event.status)}</p>
                            </div>

                            <div className={styles.eventData}>
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
                                {event.client.company &&
                                    event.client.company !== "N/A" && (
                                        <div>
                                            <span className={styles.eventLabel}>
                                                Entreprise :
                                            </span>{" "}
                                            {event.client.company}
                                        </div>
                                    )}
                                <div>
                                    <span className={styles.eventLabel}>
                                        Client :
                                    </span>{" "}
                                    {event.client.firstname}{" "}
                                    {event.client.lastname}
                                </div>
                                <div>
                                    <span className={styles.eventLabel}>
                                        Téléphone :{" "}
                                    </span>{" "}
                                    {event.client.phoneNumber}
                                </div>
                                <div>
                                    <span className={styles.eventLabel}>
                                        Adresse :{" "}
                                    </span>
                                    {event.client.address.address},{" "}
                                    {event.client.address.zipcode}{" "}
                                    {event.client.address.city}
                                </div>
                                <div>
                                    {" "}
                                    <span className={styles.eventLabel}>
                                        Description :{" "}
                                    </span>
                                    {event.description}
                                </div>
                                <div className={styles.separator}></div>
                                <h3>Planification</h3>
                                <div>
                                    <span className={styles.eventLabel}>
                                        Début{" "}
                                        {(() => {
                                            if (event.type === "Intervention") {
                                                return "de l'intervention";
                                            } else {
                                                return "du rendez-vous";
                                            }
                                        })()}{" "}
                                    </span>
                                    :{" "}
                                    {event.startingDate
                                        ? new Date(
                                              event.startingDate
                                          ).toLocaleDateString()
                                        : ""}{" "}
                                    - {event.startingHour}
                                </div>
                                <div>
                                    <span className={styles.eventLabel}>
                                        Fin{" "}
                                        {(() => {
                                            if (event.type === "Intervention") {
                                                return "de l'intervention";
                                            } else {
                                                return "du rendez-vous";
                                            }
                                        })()}{" "}
                                    </span>
                                    : {event.endingHour}
                                </div>
                                <div>
                                    <span className={styles.eventLabel}>
                                        Technicien intervenant :{" "}
                                    </span>{" "}
                                    {event.employee.firstname}{" "}
                                    {event.employee.lastname}
                                </div>
                                <div className={styles.separator}></div>
                                <div className={styles.workToDo}>
                                    {(event.type === "Rendez-vous" &&
                                        event.status === 5) ||
                                    (event.type === "Intervention" &&
                                        event.status === 1) ? (
                                        <>
                                            <h3>Travaux à réaliser</h3>

                                            <div>{event.workToDo}</div>
                                        </>
                                    ) : null}
                                </div>
                            </div>
                            <div className={styles.buttonPosition}>
                                <div className={styles.modalButtonsContainer}>
                                    {event.status !== 5 && (
                                        <button
                                            className={styles.classicButtons}
                                            type="button"
                                            onClick={this.handleEdit}
                                        >
                                            <i className="fa-solid fa-pen"></i>{" "}
                                            Modifier
                                        </button>
                                    )}
                                    {(() => {
                                        if (event.type === "Intervention") {
                                            if (event.status === 5) {
                                                return (
                                                    <button
                                                        className={
                                                            styles.classicButtons
                                                        }
                                                        type="button"
                                                        onClick={
                                                            this
                                                                .handleViewReport
                                                        }
                                                    >
                                                        <i class="fa-solid fa-file-circle-check"></i>
                                                        {""}
                                                        Voir le rapport validé
                                                    </button>
                                                );
                                            } else {
                                                if (
                                                    event.status !== 1 &&
                                                    event.startingHour !==
                                                        null &&
                                                    event.endingHour !== null
                                                ) {
                                                    return (
                                                        <button
                                                            className={
                                                                styles.classicButtons
                                                            }
                                                            type="submit"
                                                        >
                                                            <i className="fa-solid fa-file-pen"></i>{" "}
                                                            Remplir le rapport
                                                        </button>
                                                    );
                                                }
                                                return null;
                                            }
                                        } else if (
                                            event.type === "Rendez-vous"
                                        ) {
                                            if (
                                                event.status !== 5 &&
                                                event.status !== 1 &&
                                                event.startingHour !== null &&
                                                event.endingHour !== null
                                            ) {
                                                return (
                                                    <button
                                                        className={
                                                            styles.classicButtons
                                                        }
                                                        type="submit"
                                                    >
                                                        <i className="fa-solid fa-file-pen"></i>{" "}
                                                        Remplir le formulaire
                                                    </button>
                                                );
                                            }
                                        }
                                        return null;
                                    })()}
                                </div>
                                <div className={styles.deleteButtonsContainer}>
                                    {event.status !== 5 && (
                                        <button
                                            className={styles.deleteButtons}
                                            type="button"
                                            onClick={this.handleDelete}
                                        >
                                            <i className="fa-solid fa-xmark"></i>{" "}
                                            Supprimer
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </>
        );
    }
}

export default InterventionFormWrapper;
