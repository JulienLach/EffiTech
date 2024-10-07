import React, { Component } from "react";
import styles from "./CreateEventForm.module.css";
import {
    getAllClients,
    getAllEmployees,
    createEvent,
} from "../../services/api";

// Composant wrapper pour utiliser les hooks
function CreateEventFormWrapper(props) {
    return <CreateEventForm {...props} />;
}

class CreateEventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            employees: [],
            address: "",
            selectedClient: null,
            selectedEmployee: "",
            title: "",
            startingDate: "",
            startingHour: "",
            endingHour: "",
            description: "",
            isPlanned: false,
            selectedTab: "Intervention", // Par défaut sur l'onglet Intervention
        };

        this.handleClientChange = this.handleClientChange.bind(this);
        this.handleEmployeeChange = this.handleEmployeeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    componentDidMount() {
        getAllClients((error, data) => {
            if (error) {
                console.error(
                    "Erreur lors de la récupération des clients",
                    error
                );
            } else {
                this.setState({ clients: data });
            }
        });

        getAllEmployees((error, data) => {
            if (error) {
                console.error(
                    "Erreur lors de la récupération des employés",
                    error
                );
            } else {
                this.setState({ employees: data });
            }
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevState.selectedClient !== this.state.selectedClient &&
            this.state.selectedClient
        ) {
            const addressDetails = this.state.selectedClient.address;
            const fullAddress = `${addressDetails.idAddress} ${addressDetails.address}, ${addressDetails.city}, ${addressDetails.zipcode}`;
            this.setState({ address: fullAddress });
            console.log("Adresse complète:", fullAddress);
        }

        if (
            prevState.startingDate !== this.state.startingDate ||
            prevState.startingHour !== this.state.startingHour ||
            prevState.endingHour !== this.state.endingHour
        ) {
            this.setState({
                isPlanned:
                    this.state.startingDate &&
                    this.state.startingHour &&
                    this.state.endingHour
                        ? true
                        : false,
            });
        }
    }

    handleClientChange(event) {
        const clientId = event.target.value;
        const client = this.state.clients.find(
            (client) => client.idClient.toString() === clientId
        );
        this.setState({ selectedClient: client });
    }

    handleEmployeeChange(event) {
        this.setState({ selectedEmployee: event.target.value });
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit() {
        const {
            title,
            description,
            isPlanned,
            selectedClient,
            startingDate,
            startingHour,
            endingHour,
            selectedEmployee,
            selectedTab,
        } = this.state;

        const eventData = {
            title: title,
            description: description,
            status: 2, // à changer car plus utile
            isPlanned: isPlanned,
            type: selectedTab, // Utiliser l'onglet sélectionné pour le type
            idClient: selectedClient.idClient,
            idAddress: selectedClient.address.idAddress,
            startingDate: startingDate,
            startingHour: startingHour,
            endingHour: endingHour,
            idEmployee: selectedEmployee,
        };

        createEvent(eventData, (error, newEvent) => {
            if (error) {
                console.error("Error creating event:", error);
            } else {
                console.log("Event created successfully:", newEvent);
                this.props.closeModal();
            }
            window.location.reload();
        });
    }

    handleTabChange(tab) {
        this.setState({ selectedTab: tab });
    }

    render() {
        const {
            clients,
            employees,
            address,
            title,
            startingDate,
            startingHour,
            endingHour,
            description,
            selectedEmployee,
            selectedTab,
        } = this.state;

        return (
            <form className={`${styles.modal} ${styles.open}`}>
                <div>
                    <h2>Plannifier un évènement</h2>
                </div>
                <div className={styles.tabs}>
                    <button
                        type="button"
                        className={(() => {
                            if (selectedTab === "Intervention") {
                                return styles.activeTab;
                            } else {
                                return "";
                            }
                        })()}
                        onClick={() => this.handleTabChange("Intervention")}
                    >
                        Intervention
                    </button>
                    <button
                        type="button"
                        className={(() => {
                            if (selectedTab === "Rendez-vous") {
                                return styles.activeTab;
                            } else {
                                return "";
                            }
                        })()}
                        onClick={() => this.handleTabChange("Rendez-vous")}
                    >
                        Rendez-vous
                    </button>
                </div>
                <div className={styles.form}>
                    <div>
                        <label>
                            {(() => {
                                if (selectedTab === "Intervention") {
                                    return "Nouvelle intervention";
                                } else {
                                    return "Nouveau rendez-vous";
                                }
                            })()}
                        </label>
                    </div>
                    <div>
                        <label>Titre *</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label>
                            Date{" "}
                            {(() => {
                                if (selectedTab === "Intervention") {
                                    return "d'intervention";
                                } else {
                                    return "de rendez-vous";
                                }
                            })()}
                        </label>
                        <input
                            type="date"
                            name="startingDate"
                            value={startingDate}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label>Heure de début</label>
                        <input
                            type="time"
                            name="startingHour"
                            value={startingHour}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label>Heure de fin</label>
                        <input
                            type="time"
                            name="endingHour"
                            value={endingHour}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={description}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label>Sélectionner un client *</label>
                        <select onChange={this.handleClientChange}>
                            <option value="">Sélectionner un client</option>
                            {clients.map((client) => (
                                <option
                                    key={client.idClient}
                                    value={client.idClient}
                                >
                                    {client.firstname} {client.lastname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Adresse *</label>
                        <input type="text" value={address} readOnly />
                    </div>
                    <div>
                        <label>Sélectionner un technicien *</label>
                        <select
                            value={selectedEmployee}
                            onChange={this.handleEmployeeChange}
                        >
                            <option value="">Sélectionner un technicien</option>
                            {employees.map((employee) => (
                                <option
                                    key={employee.idEmployee}
                                    value={employee.idEmployee}
                                >
                                    {employee.firstname} {employee.lastname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <input
                            type="hidden"
                            value={this.state.isPlanned ? "true" : "false"}
                        />
                    </div>
                    <div className={styles.modalFooter}>
                        <button type="button" onClick={this.props.closeModal}>
                            Annuler
                        </button>
                        <button type="button" onClick={this.handleSubmit}>
                            Créer
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default CreateEventFormWrapper;
