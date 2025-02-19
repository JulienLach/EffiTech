import React, { Component } from "react";
import { isMobile } from "react-device-detect";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./AppointmentFormPage.module.css";
import stylesMobile from "./AppointmentFormPageMobile.module.css";
import TemplateGlobal from "../Template/TemplateGlobal";
import TemplateGlobalMobile from "../Template/TemplateGlobalMobile";
import {
    updateEvent,
    createEvent,
    createNotification,
} from "../../services/api";

// Composant wrapper pour utiliser les hooks
function AppointmentFormPageWrapper() {
    const navigate = useNavigate();
    const location = useLocation();
    if (!location.state) {
        window.location.href = "/calendar";
    }
    return <AppointmentFormPage navigate={navigate} location={location} />;
}

class AppointmentFormPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breakdown: "",
            workDone: "",
            reschedule: false,
            startingDate: "",
            clientSignature: "",
            employeeSignature: "",
            endingHour: "",
            duration: "",
            workToDo: "",
            client: {},
            address: {},
            employee: {},
            errors: {},
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const { event } = this.props.location.state;
        const startingHour = new Date(`1970-01-01T${event.startingHour}`);
        const endingHour = new Date(`1970-01-01T${event.endingHour}`);
        const duration = new Date(endingHour - startingHour)
            .toISOString()
            .substring(11, 16);

        console.log(duration);
        this.setState({
            startingDate: new Date(event.startingDate).toLocaleDateString(
                "en-CA"
            ),
            duration,
            client: event.client,
            address: event.address,
            employee: event.employee,
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

    handleSubmit(event) {
        event.preventDefault();
        const { event: eventDetails } = this.props.location.state;
        const {
            startingDate,
            workToDo,
            client,
            address,
            employee,
            endingHour,
            reschedule,
        } = this.state;

        const eventData = {
            idEvent: eventDetails.idEvent,
            title: eventDetails.title,
            description: eventDetails.description,
            status: 5,
            isPlanned: eventDetails.isPlanned,
            type: eventDetails.type,
            idClient: client.idClient,
            idAddress: address.idAddress,
            startingDate,
            startingHour: eventDetails.startingHour,
            endingHour,
            idEmployee: employee.idEmployee,
            workToDo,
        };

        const errors = {};
        if (!eventData.workToDo) {
            errors.workToDo = "* Champ obligatoire";
        } else if (!/^[a-zA-ZÀ-ÿ\d\s-'"()-]+$/.test(workToDo)) {
            errors.workToDo =
                "* Ne doit contenir que des lettres, des chiffres, des tirets et des espaces";
        }

        if (endingHour === "") {
            errors.endingHour = "* Champ obligatoire";
        }

        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
            return;
        }

        if (reschedule) {
            const eventToCreate = {
                title: "A planifier",
                description: "",
                status: 1,
                isPlanned: false,
                type: "Intervention",
                idClient: client.idClient,
                idAddress: address.idAddress,
                startingDate: null,
                startingHour: null,
                endingHour: null,
                idEmployee: employee.idEmployee,
                workToDo: eventData.workToDo,
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

        updateEvent(eventData, (error, updatedEvent) => {
            if (error) {
                console.error(error);
                return;
            }

            if (updatedEvent) {
                console.log("Rendez-vous terminé avec succès");
                window.location.href = "/calendar";
            }
        });
    }

    render() {
        const { event } = this.props.location.state;
        const {
            reschedule,
            startingDate,
            duration,
            endingHour,
            workToDo,
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
                                    <label>Travaux à effectuer :</label>
                                    <textarea
                                        rows="5"
                                        name="workToDo"
                                        value={workToDo}
                                        onChange={this.handleChange}
                                    ></textarea>
                                    {errors.workToDo && (
                                        <span className={styles.error}>
                                            {errors.workToDo}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className={stylesMobile.inputDisplay}>
                                <div className={stylesMobile.labelInput}>
                                    <label>Date de rendez-vous :</label>
                                    <input
                                        type="date"
                                        name="startingDate"
                                        value={startingDate}
                                        onChange={this.handleChange}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className={stylesMobile.inputDisplay}>
                                <div className={stylesMobile.labelInput}>
                                    <label>Heure de début :</label>
                                    <input
                                        type="time"
                                        value={event.startingHour}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className={stylesMobile.inputDisplay}>
                                <div className={stylesMobile.labelInput}>
                                    <label>Heure de fin :</label>
                                    <input
                                        type="time"
                                        name="endingHour"
                                        value={endingHour}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className={stylesMobile.inputDisplay}>
                                <div className={stylesMobile.labelInput}>
                                    <label>Durée du rendez-vous :</label>
                                    <input
                                        type="time"
                                        value={duration}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div>
                                <h4>Planification :</h4>
                                <div className={stylesMobile.checkbox}>
                                    <label>
                                        Créer l'intervention à planifier
                                    </label>
                                    <input
                                        type="checkbox"
                                        name="reschedule"
                                        checked={reschedule}
                                        onChange={this.handleChange}
                                    ></input>
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
                                    Annuler
                                </button>
                                <button
                                    className={stylesMobile.validateButton}
                                    type="submit"
                                >
                                    <i className="fa-solid fa-check"></i>
                                    Terminer le RDV
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
                                        Rendez-vous
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            (window.location.href = "/calendar")
                                        }
                                    >
                                        <i className="fa-solid fa-arrow-right"></i>
                                        Retour
                                    </button>
                                </div>
                                <div className={styles.appointmentId}>
                                    <div className={styles.appointmentRef}>
                                        <h3>RDV-{event.idEvent}</h3>
                                    </div>
                                </div>
                                <div className={styles.separation}></div>
                                <h3 className={styles.formTitle}>
                                    Questionnaire de rendez-vous :
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
                                            Travaux à effectuer{" "}
                                            <span className={styles.required}>
                                                *
                                            </span>{" "}
                                            :
                                        </label>
                                        <textarea
                                            rows="5"
                                            name="workToDo"
                                            value={workToDo}
                                            onChange={this.handleChange}
                                        ></textarea>
                                        {errors.workToDo && (
                                            <span className={styles.error}>
                                                {errors.workToDo}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.labelInput}>
                                        <label>Date de rendez-vous :</label>
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
                                <div className={styles.endingHourContainer}>
                                    <div className={styles.endingHourInput}>
                                        <label>
                                            Heure de fin{" "}
                                            <span className={styles.required}>
                                                *
                                            </span>{" "}
                                            :
                                        </label>
                                        <input
                                            className={styles.endingHourInput}
                                            type="time"
                                            name="endingHour"
                                            value={endingHour}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    {errors.endingHour && (
                                        <span className={styles.error}>
                                            {errors.endingHour}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <div className={styles.labelInput}>
                                        <label>Durée :</label>
                                        <input
                                            type="time"
                                            name="duration"
                                            value={duration}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.checkbox}>
                                        <label>
                                            Créer l'intervention à planifier :{" "}
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
                                        className={styles.cancelAppointmentForm}
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
                                        <i className="fa-solid fa-check"></i>{" "}
                                        Terminer le rendez-vous
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

export default AppointmentFormPageWrapper;
