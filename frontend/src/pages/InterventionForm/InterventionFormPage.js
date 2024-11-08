import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./InterventionFormPage.module.css";
import stylesMobile from "./InterventionFormPageMobile.module.css";
import TemplateGlobal from "../Template/TemplateGlobal";
import TemplateGlobalMobile from "../Template/TemplateGlobalMobile";
import { createReport } from "../../services/api";
import Canvas from "../../components/Canvas/Canvas";

// Composant wrapper pour utiliser les hooks
function InterventionFormPageWrapper() {
    const navigate = useNavigate();
    const location = useLocation();
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
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSignatureChange = this.handleSignatureChange.bind(this);
    }

    componentDidMount() {
        const { event } = this.props.location.state;
        const startingHour = new Date(`1970-01-01T${event.startingHour}Z`);
        const endingHour = new Date(`1970-01-01T${event.endingHour}Z`);
        const duration = new Date(endingHour - startingHour).toISOString().substring(11, 16);

        this.setState({
            startingDate: new Date(event.startingDate).toLocaleDateString("en-CA"),
            duration,
        });
    }

    handleChange(event) {
        const { name, value, type, checked } = event.target;
        this.setState({
            [name]: type === "checkbox" ? checked : value,
        });
    }

    handleSignatureChange(name, signature) {
        this.setState({
            [name]: signature,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { event: eventDetails } = this.props.location.state;
        const { breakdown, workDone, reschedule, startingDate, clientSignature, employeeSignature, duration } = this.state;

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
                console.log("Rapport créé avec succès, ID:", newReport.idReport);
                this.props.navigate("/report", {
                    state: { event: eventDetails, report: newReport },
                });
            }
        });
    }

    render() {
        const { event } = this.props.location.state;
        const { breakdown, workDone, reschedule, startingDate, clientSignature, employeeSignature, duration } = this.state;

        //Variable pour savoir si c'est mobile ou desktop
        const isMobile = window.navigator.userAgentData;

        return (
            <>
                {isMobile.mobile ? (
                    <>
                        <TemplateGlobalMobile />
                        <form onSubmit={this.handleSubmit} className={stylesMobile.container}>
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
                                    <label>Client</label>
                                    <input type="text" value={`${event.client.firstname} ${event.client.lastname}`} readOnly />
                                </div>
                            </div>
                            <div>
                                <div className={stylesMobile.inputDisplay}>
                                    <label>Adresse</label>
                                    <input
                                        type="text"
                                        value={`${event.client.address.address} ${event.client.address.zipcode} ${event.client.address.city}`}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div>
                                <div className={stylesMobile.textArea}>
                                    <label>Panne constatée: *</label>
                                    <textarea rows="5" name="breakdown" value={breakdown} onChange={this.handleChange}></textarea>
                                </div>
                            </div>
                            <div>
                                <div className={stylesMobile.textArea}>
                                    <label>Travaux efféctués: *</label>
                                    <textarea rows="5" name="workDone" value={workDone} onChange={this.handleChange}></textarea>
                                </div>
                            </div>
                            <div>
                                <div className={stylesMobile.inputDisplay}>
                                    <label>Date de l'intervention</label>
                                    <input type="date" name="startingDate" value={startingDate} onChange={this.handleChange} />
                                </div>
                            </div>
                            <div>
                                <div className={stylesMobile.inputDisplay}>
                                    <label>Heure de début</label>
                                    <input type="time" value={event.startingHour} readOnly />
                                </div>
                            </div>
                            <div>
                                <div className={stylesMobile.inputDisplay}>
                                    <label>Heure de fin</label>
                                    <input type="time" value={event.endingHour} readOnly />
                                </div>
                            </div>
                            <div>
                                <div className={stylesMobile.inputDisplay}>
                                    <label>Durée de l'intervention</label>
                                    <input type="time" value={duration} readOnly />
                                </div>
                            </div>
                            <div>
                                <div className={stylesMobile.textArea}>
                                    <label>Signature du technicien</label>
                                    <Canvas
                                        signature={employeeSignature}
                                        onSignatureChange={(signature) => this.handleSignatureChange("employeeSignature", signature)}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className={stylesMobile.textArea}>
                                    <label>Signature du client:</label>
                                    <Canvas
                                        signature={clientSignature}
                                        onSignatureChange={(signature) => this.handleSignatureChange("clientSignature", signature)}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className={stylesMobile.checkbox}>
                                    <input type="checkbox" name="reschedule" checked={reschedule} onChange={this.handleChange}></input>
                                    <label>Créer une nouvelle intervention</label>
                                </div>
                            </div>
                            <div className={stylesMobile.modalFooter}>
                                <button className={stylesMobile.cancelButton} type="reset" onClick={() => (window.location.href = "/calendar#")}>
                                    Annuler
                                </button>
                                <button className={stylesMobile.validateButton} type="submit">
                                    Terminer le rendez-vous
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <>
                        <TemplateGlobal />
                        <form onSubmit={this.handleSubmit} className={styles.container}>
                            <div className={styles.card}>
                                <div className={styles.alignButton}>
                                    <h2>Intervention</h2>
                                    <button type="button" onClick={() => (window.location.href = "/calendar")}>
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
                                <h3>Rapport d'intervention</h3>
                                <div>
                                    <div className={styles.inputDisplay}>
                                        <label>Client</label>
                                        <input type="text" value={`${event.client.firstname} ${event.client.lastname}`} readOnly />
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
                                        <label>Panne constatée: *</label>
                                        <textarea rows="5" name="breakdown" value={breakdown} onChange={this.handleChange}></textarea>
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.textArea}>
                                        <label>Travaux efféctués: *</label>
                                        <textarea rows="5" name="workDone" value={workDone} onChange={this.handleChange}></textarea>
                                    </div>
                                </div>
                                <div>
                                    <h3>Planification</h3>
                                    <div className={styles.checkbox}>
                                        <input type="checkbox" name="reschedule" checked={reschedule} onChange={this.handleChange}></input>
                                        <label>Planifier une nouvelle intervention</label>
                                    </div>
                                </div>
                                <div>
                                    <h3>Date d'intervention</h3>
                                    <div className={styles.labelInput}>
                                        <label>Date d'intervention</label>
                                        <input type="date" name="startingDate" value={startingDate} onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div>
                                    <h3>Heure de début</h3>
                                    <div className={styles.labelInput}>
                                        <label>Heure de début</label>
                                        <input type="time" value={event.startingHour} readOnly />
                                    </div>
                                </div>
                                <div>
                                    <h3>Heure de fin</h3>
                                    <div className={styles.labelInput}>
                                        <label>Heure de fin</label>
                                        <input type="time" value={event.endingHour} readOnly />
                                    </div>
                                </div>
                                <div>
                                    <h3>Durée de l'intervention</h3>
                                    <div className={styles.labelInput}>
                                        <label>Durée</label>
                                        <input type="time" value={duration} readOnly />
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.textArea}>
                                        <label>Signature du technicien</label>
                                        <Canvas
                                            signature={employeeSignature}
                                            onSignatureChange={(signature) => this.handleSignatureChange("employeeSignature", signature)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.textArea}>
                                        <label>Signature du client:</label>
                                        <Canvas
                                            signature={clientSignature}
                                            onSignatureChange={(signature) => this.handleSignatureChange("clientSignature", signature)}
                                        />
                                    </div>
                                </div>
                                <div className={styles.modalFooter}>
                                    <button type="reset">Annuler</button>
                                    <button type="submit">Valider le rapport</button>
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
