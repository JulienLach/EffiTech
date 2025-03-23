import React, { Component } from "react";
import { isMobile } from "react-device-detect";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./InterventionFormPage.module.css";
import stylesMobile from "./InterventionFormPageMobile.module.css";
import TemplateGlobal from "../Template/TemplateGlobal";
import TemplateGlobalMobile from "../Template/TemplateGlobalMobile";
import {
    createReport,
    createEvent,
    createNotification,
} from "../../services/api";
import Canvas from "../../components/Canvas/Canvas";

// Composant wrapper pour utiliser les hooks
function InterventionFormPageWrapper() {
    const navigate = useNavigate();
    const location = useLocation();
    if (!location.state) {
        window.location.href = "/calendar";
    }
    return <InterventionFormPage navigate={navigate} location={location} />;
}

class InterventionFormPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breakdown: "",
            workDone: "",
            reschedule: false,
            startingDate: "",
            clientSignature: "",
            employeeSignature: "",
            duration: "",
            errors: {},
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSignatureChange = this.handleSignatureChange.bind(this);
    }

    componentDidMount() {
        const { event } = this.props.location.state;
        const startingHour = new Date(`1970-01-01T${event.startingHour}Z`);
        const endingHour = new Date(`1970-01-01T${event.endingHour}Z`);
        const duration = new Date(endingHour - startingHour)
            .toISOString()
            .substring(11, 16);

        this.setState({
            startingDate: new Date(event.startingDate).toLocaleDateString(
                "en-CA"
            ),
            duration,
            endingHour: event.endingHour,
        });
    }

    calculateDuration(startingHour, endingHour) {
        const duration = new Date(endingHour - startingHour)
            .toISOString()
            .substring(11, 16);
        return duration;
    }

    handleChange(event) {
        const { name, value, type, checked } = event.target;
        this.setState(
            {
                [name]: type === "checkbox" ? checked : value,
            },
            () => {
                if (name === "endingHour" && value) {
                    const startingHour = new Date(
                        `1970-01-01T${this.props.location.state.event.startingHour}`
                    );
                    const endingHour = new Date(
                        `1970-01-01T${this.state.endingHour}`
                    );
                    const duration = this.calculateDuration(
                        startingHour,
                        endingHour
                    );
                    this.setState({ duration });
                }
                if (name === "reschedule") {
                    this.setState({ reschedule: checked });
                }
            }
        );
    }

    handleSignatureChange(name, signature) {
        this.setState({
            [name]: signature,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { event: eventDetails } = this.props.location.state;
        const {
            breakdown,
            workDone,
            reschedule,
            startingDate,
            clientSignature,
            employeeSignature,
            duration,
            endingHour,
        } = this.state;

        const errors = {};
        if (!breakdown) {
            errors.breakdown = "* Ce champ est requis";
        } else if (!/^[a-zA-ZÀ-ÿ\d\s.,!?;:'"()-]+$/.test(breakdown)) {
            errors.breakdown = "* Caractère invalide";
        }
        if (!workDone) {
            errors.workDone = "* Ce champ est requis";
        } else if (!/^[a-zA-ZÀ-ÿ\d\s.,!?;:'"()-]+$/.test(workDone)) {
            errors.workDone = "* Caractère invalide";
        }
        if (!clientSignature) {
            errors.clientSignature = "* Champ obligatoire";
        }
        if (!employeeSignature) {
            errors.employeeSignature = "* Champ obligatoire";
        }
        if (!endingHour) {
            errors.endingHour = "* Champ obligatoire";
        }

        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
            return;
        }

        if (reschedule) {
            const eventToCreate = {
                title: "Nouvelle intervention",
                description: "",
                status: 1,
                isPlanned: false,
                type: "Intervention",
                idClient: eventDetails.client.idClient,
                idAddress: eventDetails.client.address.idAddress,
                startingDate: null,
                startingHour: null,
                endingHour: null,
                idEmployee: eventDetails.employee.idEmployee,
                workToDo: workDone,
            };

            console.log("Creating event with data:", eventToCreate);

            createEvent(eventToCreate, (error, createdEvent) => {
                if (error) {
                    console.error("Erreur de création de l'événement", error);
                    console.log("Error details:", error);
                    return;
                }

                if (createdEvent) {
                    console.log("Created event details:", createdEvent);
                }
            });
        }

        const notificationData = {
            idEmployee: eventDetails.employee.idEmployee,
            action: "Validation",
            type: eventDetails.type,
            title: eventDetails.title,
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

        const reportData = {
            breakdown,
            workDone,
            reschedule,
            startingDate,
            clientSignature,
            employeeSignature,
            startingHour: eventDetails.startingHour,
            endingHour: eventDetails.endingHour,
            duration,
            idEvent: eventDetails.idEvent,
        };

        createReport(reportData, (error, newReport) => {
            if (error) {
                console.error("Erreur lors de la création du rapport", error);
            } else {
                console.log(
                    "Rapport créé avec succès, ID:",
                    newReport.idReport
                );
                this.props.navigate("/report", {
                    state: { event: eventDetails, report: newReport },
                });
            }
        });
    }

    render() {
        const { event } = this.props.location.state;
        const {
            breakdown,
            workDone,
            reschedule,
            startingDate,
            clientSignature,
            employeeSignature,
            duration,
            endingHour,
            errors,
        } = this.state;

        return (
            <>
                {isMobile ? (
                    <>
                        <TemplateGlobalMobile />
                        <form
                            onSubmit={this.handleSubmit}
                            className={stylesMobile.container}
                        >
                            <div className={stylesMobile.idAndTitle}>
                                <h2 className={stylesMobile.eventId}>
                                    {(() => {
                                        if (event.type === "Intervention") {
                                            return "INT-";
                                        } else {
                                            return "RDV-";
                                        }
                                    })()}
                                    {event.idEvent}
                                </h2>
                                <p>{event.title}</p>
                            </div>
                            <div>
                                <div className={stylesMobile.inputDisplay}>
                                    <label>Client :</label>
                                    <input
                                        type="text"
                                        value={`${event.client.firstname} ${event.client.lastname}`}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div>
                                <div className={stylesMobile.inputDisplay}>
                                    <label>Adresse :</label>
                                    <input
                                        type="text"
                                        value={`${event.client.address.address} ${event.client.address.zipcode} ${event.client.address.city}`}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div>
                                <div className={stylesMobile.textArea}>
                                    <label>
                                        Panne constatée{" "}
                                        <span className={styles.required}>
                                            *
                                        </span>{" "}
                                        :
                                    </label>
                                    <textarea
                                        rows="5"
                                        name="breakdown"
                                        value={breakdown}
                                        onChange={this.handleChange}
                                    ></textarea>
                                    {errors.workDone && (
                                        <span className={styles.error}>
                                            {errors.workDone}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <div className={stylesMobile.textArea}>
                                    <label>
                                        Travaux réalisés{" "}
                                        <span className={styles.required}>
                                            *
                                        </span>{" "}
                                        :
                                    </label>
                                    <textarea
                                        rows="5"
                                        name="workDone"
                                        value={workDone}
                                        onChange={this.handleChange}
                                    ></textarea>
                                    {errors.workDone && (
                                        <span className={styles.error}>
                                            {errors.workDone}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <div className={stylesMobile.inputDisplay}>
                                    <label>Date de l'intervention :</label>
                                    <input
                                        type="date"
                                        name="startingDate"
                                        value={startingDate}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className={stylesMobile.inputDisplay}>
                                    <label>Heure de début :</label>
                                    <input
                                        type="time"
                                        value={event.startingHour}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div>
                                <div className={stylesMobile.inputDisplay}>
                                    <label>Heure de fin :</label>
                                    <input
                                        type="time"
                                        name="endingHour"
                                        value={endingHour}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className={stylesMobile.inputDisplay}>
                                    <label>Durée de l'intervention :</label>
                                    <input
                                        type="time"
                                        value={duration}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div>
                                <div className={stylesMobile.textArea}>
                                    <label>
                                        Signature du technicien{" "}
                                        <span className={styles.required}>
                                            *
                                        </span>{" "}
                                        :
                                    </label>
                                    <Canvas
                                        signature={employeeSignature}
                                        onSignatureChange={(signature) =>
                                            this.handleSignatureChange(
                                                "employeeSignature",
                                                signature
                                            )
                                        }
                                    />
                                    {errors.employeeSignature && (
                                        <span className={styles.error}>
                                            {errors.employeeSignature}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <div className={stylesMobile.textArea}>
                                    <label>
                                        Signature du client{" "}
                                        <span className={styles.required}>
                                            *
                                        </span>{" "}
                                        :
                                    </label>
                                    <Canvas
                                        signature={clientSignature}
                                        onSignatureChange={(signature) =>
                                            this.handleSignatureChange(
                                                "clientSignature",
                                                signature
                                            )
                                        }
                                    />
                                    {errors.clientSignature && (
                                        <span className={styles.error}>
                                            {errors.clientSignature}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <div className={stylesMobile.checkbox}>
                                    <label>
                                        Créer une nouvelle intervention :
                                    </label>
                                    <label className={stylesMobile.switch}>
                                        <input
                                            type="checkbox"
                                            name="reschedule"
                                            checked={reschedule}
                                            onChange={this.handleChange}
                                        />
                                        <span
                                            className={stylesMobile.slider}
                                        ></span>
                                    </label>
                                </div>
                            </div>
                            <div className={stylesMobile.modalFooter}>
                                <button
                                    className={stylesMobile.cancelButton}
                                    type="reset"
                                    onClick={() =>
                                        (window.location.href = "/calendar#")
                                    }
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                    Annuler
                                </button>
                                <button
                                    className={stylesMobile.validateButton}
                                    type="submit"
                                >
                                    <i className="fa-solid fa-check"></i>
                                    Valider le rapport
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <>
                        <TemplateGlobal />
                        <form
                            onSubmit={this.handleSubmit}
                            className={styles.container}
                        >
                            <div className={styles.card}>
                                <div className={styles.alignButton}>
                                    <h2 className={styles.pageTitle}>
                                        Intervention
                                    </h2>
                                    <button
                                        className={styles.buttonBack}
                                        type="button"
                                        onClick={() =>
                                            (window.location.href = "/calendar")
                                        }
                                    >
                                        <i className="fa-solid fa-arrow-right"></i>
                                        Retour
                                    </button>
                                </div>
                                <div className={styles.interventionId}>
                                    <div>
                                        <h3>INT-{event.idEvent}</h3>
                                    </div>
                                </div>
                                <div className={styles.separation}></div>
                                <h3 className={styles.formTitle}>
                                    Rapport d'intervention :
                                </h3>
                                <div>
                                    <div className={styles.inputDisplay}>
                                        <label>Client :</label>
                                        <input
                                            type="text"
                                            value={`${event.client.firstname} ${event.client.lastname}`}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.inputDisplay}>
                                        <label>Adresse :</label>
                                        <input
                                            type="text"
                                            value={`${event.client.address.address} ${event.client.address.zipcode} ${event.client.address.city}`}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.textArea}>
                                        <label>
                                            Panne constatée:{" "}
                                            <span className={styles.required}>
                                                *
                                            </span>{" "}
                                            :
                                        </label>
                                        <textarea
                                            rows="5"
                                            name="breakdown"
                                            value={breakdown}
                                            onChange={this.handleChange}
                                        ></textarea>
                                        {errors.breakdown && (
                                            <span className={styles.error}>
                                                {errors.breakdown}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.textArea}>
                                        <label>
                                            Travaux réalisés:{" "}
                                            <span className={styles.required}>
                                                *
                                            </span>{" "}
                                            :
                                        </label>
                                        <textarea
                                            rows="5"
                                            name="workDone"
                                            value={workDone}
                                            onChange={this.handleChange}
                                        ></textarea>
                                        {errors.workDone && (
                                            <span className={styles.error}>
                                                {errors.workDone}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.labelInput}>
                                        <label>Date d'intervention :</label>
                                        <input
                                            type="date"
                                            name="startingDate"
                                            value={startingDate}
                                            onChange={this.handleChange}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.labelInput}>
                                        <label>Heure de début :</label>
                                        <input
                                            type="time"
                                            value={event.startingHour}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.endingHourInput}>
                                        <label>
                                            Heure de fin{" "}
                                            <span className={styles.required}>
                                                *
                                            </span>{" "}
                                            :
                                        </label>
                                        <input
                                            type="time"
                                            name="endingHour"
                                            value={endingHour}
                                            onChange={this.handleChange}
                                        />
                                        {errors.endingHour && (
                                            <span className={styles.error}>
                                                {errors.endingHour}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.labelInput}>
                                        <label>Durée :</label>
                                        <input
                                            type="time"
                                            value={duration}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.textArea}>
                                        <label>
                                            Signature du technicien{" "}
                                            <span className={styles.required}>
                                                *
                                            </span>{" "}
                                            :
                                        </label>
                                        <Canvas
                                            signature={employeeSignature}
                                            onSignatureChange={(signature) =>
                                                this.handleSignatureChange(
                                                    "employeeSignature",
                                                    signature
                                                )
                                            }
                                        />
                                        {errors.employeeSignature && (
                                            <span className={styles.error}>
                                                {errors.employeeSignature}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.textArea}>
                                        <label>
                                            Signature du client{" "}
                                            <span className={styles.required}>
                                                *
                                            </span>{" "}
                                            :
                                        </label>
                                        <Canvas
                                            signature={clientSignature}
                                            onSignatureChange={(signature) =>
                                                this.handleSignatureChange(
                                                    "clientSignature",
                                                    signature
                                                )
                                            }
                                        />
                                        {errors.clientSignature && (
                                            <span className={styles.error}>
                                                {errors.clientSignature}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.checkbox}>
                                        <label>
                                            Créer une nouvelle intervention :
                                        </label>
                                        <label className={styles.switch}>
                                            <input
                                                type="checkbox"
                                                name="reschedule"
                                                checked={reschedule}
                                                onChange={this.handleChange}
                                            />
                                            <span
                                                className={styles.slider}
                                            ></span>
                                        </label>
                                    </div>
                                </div>
                                <div className={styles.separation}></div>
                                <div className={styles.modalFooter}>
                                    <button
                                        className={
                                            styles.cancelInterventionButton
                                        }
                                        onClick={() =>
                                            (window.location.href = "/calendar")
                                        }
                                        type="reset"
                                    >
                                        <i className="fa-solid fa-xmark"></i>{" "}
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className={styles.validateButton}
                                    >
                                        <i className="fa-solid fa-check"></i>
                                        Valider le rapport
                                    </button>
                                </div>
                            </div>
                        </form>
                    </>
                )}
            </>
        );
    }
}

export default InterventionFormPageWrapper;
