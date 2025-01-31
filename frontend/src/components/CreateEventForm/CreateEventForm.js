import React, { Component } from "react";
import styles from "./CreateEventForm.module.css";
import {
    getAllClients,
    getAllEmployees,
    createEvent,
    createNotification,
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
            searchQuery: "",
            errors: {},
        };

        this.handleClientChange = this.handleClientChange.bind(this);
        this.handleEmployeeChange = this.handleEmployeeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
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
            const fullAddress = `${addressDetails.address}, ${addressDetails.city}, ${addressDetails.zipcode}`;
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

        const errors = {};
        if (!title) {
            errors.title = "* Champ obligatoire";
        } else if (!/^[a-zA-ZÀ-ÿ\d\s-]+$/.test(title)) {
            errors.title =
                "* Ne doit contenir que des lettres, des chiffres, des espaces et des tirets";
        }

        if (!selectedClient) {
            errors.selectedClient = "* Champ obligatoire";
        }

        if (!selectedEmployee) {
            errors.selectedEmployee = "* Champ obligatoire";
        }

        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
            return;
        }

        // Calculer le statut dynamiquement
        let status;
        const today = new Date().toISOString().split("T")[0]; // Obtenir la date du jour au format YYYY-MM-DD

        if (!startingDate) {
            status = 1;
        } else if (startingDate < today) {
            status = 2;
        } else if (startingDate === today) {
            status = 3;
        } else if (startingDate > today) {
            status = 4;
        }

        const eventData = {
            title: title,
            description: description,
            status: status,
            isPlanned: isPlanned,
            type: selectedTab, // Utiliser l'onglet sélectionné pour le type Intervention ou Rendez-vous
            idClient: selectedClient.idClient,
            idAddress: selectedClient.address.idAddress,
            startingDate: startingDate || null,
            startingHour: startingHour || null,
            endingHour: endingHour || null,
            idEmployee: selectedEmployee,
        };

        const notificationData = {
            idEmployee: selectedEmployee,
            action: "Enregistrement",
            type: selectedTab,
            title: title,
            creationDate: new Date().toISOString().split("T")[0],
            creationHour: new Date().toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };

        createEvent(eventData, (error, newEvent) => {
            if (error) {
                console.error("Error creating event:", error);
            } else {
                console.log("Event created successfully:", newEvent);
                this.props.closeModal();
            }
            createNotification(notificationData, (error, result) => {
                if (error) {
                    console.error("Error creating notification:", error);
                } else {
                    console.log("Notification created successfully:", result);
                }
            });
            window.location.reload();
        });
    }

    handleTabChange(tab) {
        this.setState({ selectedTab: tab });
    }

    handleSearchChange(event) {
        this.setState({ searchQuery: event.target.value });
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
            searchQuery,
            errors,
        } = this.state;

        // Filtrer les clients en fonction de la recherche
        const filteredClients = clients.filter((client) =>
            `${client.firstname} ${client.lastname}`
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        );

        return (
            <>
                <div className={styles.modalBackground}></div>
                <form className={`${styles.modal} ${styles.open}`}>
                    <div>
                        <h2>
                            <i className="fa-regular fa-calendar"></i>{" "}
                            Plannifier un évènement
                        </h2>
                    </div>
                    <div className={styles.tabs}>
                        <button
                            type="button"
                            className={`${styles.tabButton} ${
                                selectedTab === "Intervention"
                                    ? styles.activeTab
                                    : ""
                            }`}
                            onClick={() => this.handleTabChange("Intervention")}
                        >
                            Intervention
                        </button>
                        <button
                            type="button"
                            className={`${styles.tabButton} ${
                                selectedTab === "Rendez-vous"
                                    ? styles.activeTab
                                    : ""
                            }`}
                            onClick={() => this.handleTabChange("Rendez-vous")}
                        >
                            Rendez-vous
                        </button>
                    </div>
                    <div className={styles.form}>
                        <div>
                            <h3 className={styles.eventFormTitle}>
                                {selectedTab === "Intervention"
                                    ? "Nouvelle intervention"
                                    : "Nouveau rendez-vous"}
                            </h3>
                        </div>
                        <div>
                            <label>
                                Titre <span className={styles.required}>*</span>{" "}
                                :
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={title}
                                onChange={this.handleChange}
                            />
                            {errors.title && (
                                <span className={styles.error}>
                                    {errors.title}
                                </span>
                            )}
                        </div>
                        <div>
                            <label>
                                Date{" "}
                                {selectedTab === "Intervention"
                                    ? "d'intervention :"
                                    : "de rendez-vous :"}
                            </label>
                            <input
                                type="date"
                                name="startingDate"
                                value={startingDate}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <label>Heure de début :</label>
                            <input
                                type="time"
                                name="startingHour"
                                value={startingHour}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <label>Heure de fin :</label>
                            <input
                                type="time"
                                name="endingHour"
                                value={endingHour}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <label>Description :</label>
                            <textarea
                                className={styles.createEventTextarea}
                                name="description"
                                value={description}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <label>
                                Sélectionner un client{" "}
                                <span className={styles.required}>*</span> :
                            </label>
                            <input
                                type="text"
                                placeholder="Rechercher un client"
                                value={searchQuery}
                                onChange={this.handleSearchChange}
                            />
                            <select onChange={this.handleClientChange}>
                                <option value="">Sélectionner un client</option>
                                {filteredClients.map((client) => (
                                    <option
                                        key={client.idClient}
                                        value={client.idClient}
                                    >
                                        {client.firstname} {client.lastname}
                                    </option>
                                ))}
                            </select>
                            {errors.selectedClient && (
                                <span className={styles.error}>
                                    {errors.selectedClient}
                                </span>
                            )}
                        </div>
                        <div>
                            <label>
                                Adresse{" "}
                                <span className={styles.required}>*</span> :
                            </label>
                            <input type="text" value={address} readOnly />
                        </div>
                        <div>
                            <label>
                                Sélectionner un technicien{" "}
                                <span className={styles.required}>*</span> :
                            </label>
                            <select
                                value={selectedEmployee}
                                onChange={this.handleEmployeeChange}
                            >
                                <option value="">
                                    Sélectionner un technicien
                                </option>
                                {employees.map((employee) => (
                                    <option
                                        key={employee.idEmployee}
                                        value={employee.idEmployee}
                                    >
                                        {employee.firstname} {employee.lastname}
                                    </option>
                                ))}
                            </select>
                            {errors.selectedEmployee && (
                                <span className={styles.error}>
                                    {errors.selectedEmployee}
                                </span>
                            )}
                        </div>
                        <div>
                            <input
                                type="hidden"
                                value={this.state.isPlanned ? "true" : "false"}
                            />
                        </div>
                        <div className={styles.modalFooter}>
                            <button
                                type="button"
                                className={styles.cancelButton}
                                onClick={this.props.closeModal}
                            >
                                Annuler
                            </button>
                            <button
                                type="button"
                                className={styles.submitButton}
                                onClick={this.handleSubmit}
                            >
                                Créer
                            </button>
                        </div>
                    </div>
                </form>
            </>
        );
    }
}

export default CreateEventFormWrapper;
