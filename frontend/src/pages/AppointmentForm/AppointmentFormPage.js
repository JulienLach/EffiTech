import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./AppointmentFormPage.module.css";
import TemplateGlobal from "../Template/TemplateGlobal";
import { updateEvent } from "../../services/api";

// Composant wrapper pour utiliser les hooks
function AppointmentFormPageWrapper() {
    const navigate = useNavigate();
    const location = useLocation();
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
            duration: "",
            workToDo: "",
            client: {},
            address: {},
            employee: {},
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const { event } = this.props.location.state;
        const startingHour = new Date(`1970-01-01T${event.startingHour}`);
        const endingHour = new Date(`1970-01-01T${event.endingHour}`);
        const duration = new Date(endingHour - startingHour)
            .toLocaleDateString()
            .substring(11, 16);

        this.setState({
            startingDate: new Date(event.startingDate).toLocaleDateString(
                "en-CA"
            ),
            duration,
            client: event.client,
            address: event.address,
            employee: event.employee,
        });
    }

    handleChange(event) {
        const { name, value, type, checked } = event.target;
        this.setState({
            [name]: type === "checkbox" ? checked : value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { event: eventDetails } = this.props.location.state;
        const { startingDate, workToDo, client, address, employee } =
            this.state;

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
            endingHour: eventDetails.endingHour,
            idEmployee: employee.idEmployee,
            workToDo,
        };

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
        const { reschedule, startingDate, duration, workToDo } = this.state;

        return (
            <>
                <TemplateGlobal />
                <form onSubmit={this.handleSubmit} className={styles.container}>
                    <div className={styles.card}>
                        <div className={styles.alignButton}>
                            <h2>Rendez-vous</h2>
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
                            <div>
                                <h3>RDV-{event.idEvent}</h3>
                            </div>
                        </div>
                        <div className={styles.separation}></div>
                        <h3>Questionnaire de rendez-vous</h3>
                        <div>
                            <div className={styles.inputDisplay}>
                                <label>Client</label>
                                <input
                                    type="text"
                                    value={`${event.client.firstname} ${event.client.lastname}`}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div>
                            <div className={styles.inputDisplay}>
                                <label>Adresse</label>
                                <input
                                    type="text"
                                    value={`${event.client.address.address} ${event.client.address.zipcode} ${event.client.address.city}`}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div>
                            <div className={styles.textArea}>
                                <label>Travaux à effectuer</label>
                                <textarea
                                    rows="5"
                                    name="workToDo"
                                    value={workToDo}
                                    onChange={this.handleChange}
                                ></textarea>
                            </div>
                        </div>
                        <div>
                            <h3>Date de rendez-vous</h3>
                            <div className={styles.labelInput}>
                                <label>Date de rendez-vous</label>
                                <input
                                    type="date"
                                    name="startingDate"
                                    value={startingDate}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <h3>Heure de début</h3>
                            <div className={styles.labelInput}>
                                <label>Heure de début</label>
                                <input
                                    type="time"
                                    value={event.startingHour}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div>
                            <h3>Heure de fin</h3>
                            <div className={styles.labelInput}>
                                <label>Heure de fin</label>
                                <input
                                    type="time"
                                    value={event.endingHour}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div>
                            <h3>Durée du rendez-vous</h3>
                            <div className={styles.labelInput}>
                                <label>Durée</label>
                                <input type="time" value={duration} readOnly />
                            </div>
                        </div>
                        <div>
                            <h3>Planification</h3>
                            <div className={styles.checkbox}>
                                <label>
                                    Créer directement l'intervention à planifier
                                </label>
                                <input
                                    type="checkbox"
                                    name="reschedule"
                                    checked={reschedule}
                                    onChange={this.handleChange}
                                ></input>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button type="reset">Annuler</button>
                            <button type="submit">
                                Terminer le rendez-vous
                            </button>
                        </div>
                    </div>
                </form>
            </>
        );
    }
}

export default AppointmentFormPageWrapper;
