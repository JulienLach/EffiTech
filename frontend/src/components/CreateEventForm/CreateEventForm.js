import React, { Component } from "react";
import Select from "react-select";
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
            selectedTab: "Intervention",
            searchQuery: "",
            errors: {},
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

    handleClientChange(selectedOption) {
        const client = this.state.clients.find(
            (client) => client.idClient === selectedOption.value
        );
        this.setState({ selectedClient: client });
    }

    handleEmployeeChange(selectedOption) {
        const employee = this.state.employees.find(
            (employee) => employee.idEmployee === selectedOption.value
        );
        this.setState({ selectedEmployee: employee.idEmployee });
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
        } else if (!/^[a-zA-ZÀ-ÿ\d\s\-']+$/.test(title)) {
            errors.title = "* Caractère non valide";
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
            errors,
        } = this.state;

        const clientOptions = clients.map((client) => ({
            value: client.idClient,
            label:
                client.category === "Professionnel"
                    ? client.company
                    : `${client.firstname} ${client.lastname}`,
        }));

        const employeeOptions = employees.map((employee) => ({
            value: employee.idEmployee,
            label: `${employee.firstname} ${employee.lastname}`,
        }));

        return (
            <>
                <div className={styles.modalBackground}></div>
                <form className={`${styles.modal} ${styles.open}`}>
                    <div>
                        <h2 className={styles.modalHeader}>
                            <i className="fa-regular fa-calendar"></i> Planifier
                            un évènement
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
                        <div className={styles.separator}></div>
                        <div>
                            <label className={styles.formLabel}>
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
                            <label className={styles.formLabel}>
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
                            <label className={styles.formLabel}>
                                Heure de début :
                            </label>
                            <input
                                type="time"
                                name="startingHour"
                                value={startingHour}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <label className={styles.formLabel}>
                                Heure de fin :
                            </label>
                            <input
                                type="time"
                                name="endingHour"
                                value={endingHour}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <label className={styles.formLabel}>
                                Description :
                            </label>
                            <textarea
                                className={styles.createEventTextarea}
                                name="description"
                                value={description}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <label className={styles.formLabel}>
                                Sélectionner un client{" "}
                                <span className={styles.required}>*</span> :
                            </label>
                            <Select
                                options={clientOptions}
                                onChange={this.handleClientChange}
                                placeholder={
                                    <span>
                                        <i className="fa fa-search"></i>{" "}
                                        Rechercher
                                    </span>
                                }
                                className={styles.reactSelect}
                                classNamePrefix="react-select"
                            />
                            {errors.selectedClient && (
                                <span className={styles.error}>
                                    {errors.selectedClient}
                                </span>
                            )}
                        </div>
                        <div className={styles.inputDisplay}>
                            <label className={styles.formLabel}>
                                Adresse :
                            </label>
                            <input type="text" value={address} readOnly />
                        </div>
                        <div>
                            <label className={styles.formLabel}>
                                Sélectionner un technicien{" "}
                                <span className={styles.required}>*</span> :
                            </label>
                            <Select
                                options={employeeOptions}
                                onChange={this.handleEmployeeChange}
                                placeholder={
                                    <span>
                                        <i className="fa fa-search"></i>{" "}
                                        Rechercher
                                    </span>
                                }
                                className={styles.reactSelect}
                                classNamePrefix="react-select"
                            />
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
                                <i className="fa-solid fa-xmark"> </i>
                                Annuler
                            </button>
                            <button
                                type="button"
                                className={styles.submitButton}
                                onClick={this.handleSubmit}
                            >
                                <i className="fa-solid fa-check"> </i>{" "}
                                Enregistrer
                            </button>
                        </div>
                    </div>
                </form>
            </>
        );
    }
}

export default CreateEventFormWrapper;
