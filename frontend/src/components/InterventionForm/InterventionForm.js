import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./InterventionForm.module.css";
import stylesMobile from "./InterventionFormMobile.module.css";
import { deleteEvent } from "../../services/api";
import bellIcon from "../../images/notificationBell.svg";

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
            padding: ".125em .625em",
            borderRadius: ".5em",
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

        //Variable pour savoir si c'est mobile ou desktop
        const isMobile = window.navigator.userAgentData;

        return (
            <>
                {isMobile.mobile ? (
                    <>
                        <form
                            onSubmit={this.handleSubmit}
                            className={`${stylesMobile.modal} ${stylesMobile.open}`}
                        >
                            <div className={stylesMobile.headerDiv}>
                                <h1 className={stylesMobile.title}>
                                    {(() => {
                                        if (event.type === "Intervention") {
                                            return "Intervention";
                                        } else {
                                            return "Rendez-vous";
                                        }
                                    })()}
                                </h1>

                                <div className={stylesMobile.headerRight}>
                                    <div
                                        className={
                                            stylesMobile.notificationIcon
                                        }
                                    >
                                        <img
                                            src={bellIcon}
                                            className={
                                                stylesMobile.notificationBell
                                            }
                                        ></img>
                                        <span
                                            className={
                                                stylesMobile.notificationCount
                                            }
                                        >
                                            2
                                        </span>
                                    </div>
                                    <div className={stylesMobile.profileBubble}>
                                        JL
                                    </div>
                                </div>
                            </div>
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
                                    <p>{event.title}</p>
                                </div>
                                <div className={stylesMobile.detailsCard}>
                                    <h3 className={stylesMobile.title}>
                                        Détails
                                    </h3>
                                    <p className={stylesMobile.boldElement}></p>
                                    <p className={stylesMobile.dataElement}>
                                        Client : {event.client.firstname}{" "}
                                        {event.client.lastname}
                                    </p>
                                    <p className={stylesMobile.boldElement}></p>
                                    <p className={stylesMobile.dataElement}>
                                        Téléphone : {event.client.phoneNumber}
                                    </p>
                                    <p className={stylesMobile.boldElement}></p>
                                    <p className={stylesMobile.dataElement}>
                                        Adresse : {event.client.address.address}
                                        , {event.client.address.zipcode},{" "}
                                        {event.client.address.city}
                                    </p>
                                    <div
                                        className={stylesMobile.separation}
                                    ></div>

                                    <p className={stylesMobile.boldElement}>
                                        Description :
                                    </p>
                                    <p className={stylesMobile.dataElement}>
                                        {event.description}
                                    </p>
                                </div>

                                <div className={stylesMobile.planCard}>
                                    <h3 className={stylesMobile.title}>
                                        Plannification
                                    </h3>
                                    <p className={stylesMobile.boldElement}></p>
                                    <p className={stylesMobile.dataElement}>
                                        Technicien : {event.employee.firstname}{" "}
                                        {event.employee.lastname}
                                    </p>
                                    <p className={stylesMobile.boldElement}>
                                        Début{" "}
                                        {(() => {
                                            if (event.type === "Intervention") {
                                                return "de l'intervention :";
                                            } else {
                                                return "du rendez-vous :";
                                            }
                                        })()}
                                    </p>
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
                                    <p className={stylesMobile.boldElement}>
                                        Fin{" "}
                                        {(() => {
                                            if (event.type === "Intervention") {
                                                return "de l'intervention :";
                                            } else {
                                                return "du rendez-vous :";
                                            }
                                        })()}
                                    </p>
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

                                {/* <div>
                                    <div>
                                        {event.type === "Rendez-vous" && event.status === 5 && (
                                            <>
                                                <h3>Travaux à effectuer</h3>
                                                <div>{event.workToDo}</div>
                                            </>
                                        )}
                                    </div>
                                </div> */}
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
                                                            <i class="fa-solid fa-pen"></i>{" "}
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
                                                        <i class="fa-regular fa-pen-to-square"></i>{" "}
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
                                            Entreprise : {event.client.company}
                                        </div>
                                    )}
                                <div>
                                    Client : {event.client.firstname}{" "}
                                    {event.client.lastname}
                                </div>
                                <div>
                                    Téléphone : {event.client.phoneNumber}
                                </div>
                                <div>
                                    Adresse : {event.client.address.address},{" "}
                                    {event.client.address.zipcode}{" "}
                                    {event.client.address.city}
                                </div>
                                <div>Description : {event.description}</div>
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
                                    })()}{" "}
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
                                    })()}{" "}
                                    : {event.endingHour}
                                </div>
                                <div>
                                    Technicien intervenant :{" "}
                                    {event.employee.firstname}{" "}
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
                                    <button
                                        type="button"
                                        onClick={this.handleDelete}
                                    >
                                        Supprimer
                                    </button>
                                )}
                                <button type="button" onClick={closeModal}>
                                    Retour
                                </button>
                                {event.status !== 5 && (
                                    <button
                                        type="button"
                                        onClick={this.handleEdit}
                                    >
                                        Modifier
                                    </button>
                                )}
                                {(() => {
                                    if (event.type === "Intervention") {
                                        if (event.status === 5) {
                                            return (
                                                <button
                                                    type="button"
                                                    onClick={
                                                        this.handleViewReport
                                                    }
                                                >
                                                    Voir le rapport validé
                                                </button>
                                            );
                                        } else {
                                            if (
                                                event.status !== 1 &&
                                                event.startingHour !== null &&
                                                event.endingHour !== null
                                            ) {
                                                return (
                                                    <button type="submit">
                                                        Remplir le rapport
                                                    </button>
                                                );
                                            }
                                            return null;
                                        }
                                    } else if (event.type === "Rendez-vous") {
                                        if (
                                            event.status !== 5 &&
                                            event.status !== 1 &&
                                            event.startingHour !== null &&
                                            event.endingHour !== null
                                        ) {
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
                )}
            </>
        );
    }
}

export default InterventionFormWrapper;
