import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TemplateGlobal.module.css";
import logo from "../../images/logo.svg";
import bellIcon from "../../images/notificationBell.svg";
import CreateEventForm from "../../components/CreateEventForm/CreateEventForm";
import InterventionForm from "../../components/InterventionForm/InterventionForm";

function TemplateGlobalWrapper(props) {
    const navigate = useNavigate();
    return <TemplateGlobal {...props} navigate={navigate} />;
}

class TemplateGlobal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPath: window.location.pathname,
            showProfileMenu: false,
            initials: "",
            isCreateModalOpen: false, // État pour gérer l'affichage de la modal
            isCreateEventModalOpen: false,
            isEventModalOpen: false,
            selectedEvent: null,
            isUpdateFormOpen: false,
        };
        this.toggleProfileMenu = this.toggleProfileMenu.bind(this);
        this.logout = this.logout.bind(this);
        this.handleNotificationClick = this.handleNotificationClick.bind(this);
        this.toggleCreateModal = this.toggleCreateModal.bind(this); // Méthode pour ouvrir/fermer la modal
        this.toggleCreateEventModal = this.toggleCreateEventModal.bind(this);
        this.toggleEventModal = this.toggleEventModal.bind(this);
        this.handleCreateEventClick = this.handleCreateEventClick.bind(this); // Méthode pour gérer le clic sur "Créer un événement"
    }

    componentDidMount() {
        this.setInitials();
    }

    setInitials() {
        const firstname = localStorage.getItem("firstname");
        const lastname = localStorage.getItem("lastname");

        if (firstname && lastname) {
            const initials = `${firstname.charAt(0)}${lastname.charAt(
                0
            )}`.toUpperCase();
            this.setState({ initials });
        }
    }

    toggleProfileMenu() {
        this.setState((prevState) => ({
            showProfileMenu: !prevState.showProfileMenu,
        }));
    }

    logout() {
        // Supprimer le cookie employee
        document.cookie =
            "employee=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/login";
    }

    handleNotificationClick() {
        this.props.navigate("/notifications");
    }

    toggleCreateModal() {
        this.setState((prevState) => ({
            isCreateModalOpen: !prevState.isCreateModalOpen,
        }));
    }

    toggleCreateEventModal() {
        this.setState((prevState) => ({
            isCreateEventModalOpen: !prevState.isCreateEventModalOpen,
        }));
    }

    toggleEventModal(event = null) {
        this.setState({
            selectedEvent: event,
            isEventModalOpen: event !== null,
            isUpdateFormOpen: false, // Fermer le formulaire de mise à jour si un autre événement est sélectionné
        });
    }

    handleCreateEventClick() {
        this.toggleCreateModal(); // Fermer la modal de création
        this.toggleCreateEventModal(); // Ouvrir la modal de création d'événement
    }

    render() {
        const {
            currentPath,
            showProfileMenu,
            initials,
            isCreateModalOpen,
            isCreateEventModalOpen,
            isEventModalOpen,
            selectedEvent,
            isUpdateFormOpen,
        } = this.state;

        return (
            <>
                {/* Partie header */}
                <div className={styles.header}>
                    <div className={styles.headerDiv}>
                        <div className={styles.logo}>
                            <a href="/calendar">
                                <img src={logo} alt="Effitech Logo" />
                            </a>
                        </div>
                        <div className={styles.headerRight}>
                            <div>
                                <button
                                    className={styles.planifierButton}
                                    onClick={this.toggleCreateModal}
                                >
                                    <i className="fa-solid fa-plus"></i>Créer
                                </button>
                            </div>
                            <div
                                className={styles.notificationIcon}
                                onClick={this.handleNotificationClick}
                            >
                                <img
                                    src={bellIcon}
                                    className={styles.notificationBell}
                                    alt="Notifications"
                                ></img>
                                <span
                                    className={styles.notificationCount}
                                ></span>
                            </div>
                            <div
                                className={styles.profileBubble}
                                onClick={this.toggleProfileMenu}
                            >
                                {initials}
                            </div>
                            {showProfileMenu && (
                                <div className={styles.profileMenu}>
                                    <ul>
                                        <li>
                                            <a onClick={this.logout} href="#">
                                                Se déconnecter{" "}
                                                <i className="fa-solid fa-sign-out-alt"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="">
                                                Mon profil{" "}
                                                <i className="fa-solid fa-user"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Partie sidebar */}
                <div className={styles.sidebarAndOrange}>
                    <div className={styles.sidebar}>
                        <ul>
                            <li
                                className={
                                    currentPath === "/calendar"
                                        ? styles.active
                                        : ""
                                }
                            >
                                <a href="/calendar">
                                    <i className="fa-solid fa-calendar"></i>
                                    Calendrier
                                </a>
                            </li>
                            <li
                                className={
                                    currentPath === "/clients" ||
                                    currentPath === "/client-details/" ||
                                    currentPath === "/client-form"
                                        ? styles.active
                                        : ""
                                }
                            >
                                <a href="/clients">
                                    <i className="fa-solid fa-user"></i>Clients
                                </a>
                            </li>
                            <li
                                className={
                                    currentPath === "/employees" ||
                                    currentPath === "/employee-details/" ||
                                    currentPath === "/employee-form"
                                        ? styles.active
                                        : ""
                                }
                            >
                                <a href="/employees">
                                    <i className="fa-solid fa-user-group"></i>
                                    Employés
                                </a>
                            </li>
                            <li
                                className={
                                    currentPath === "/company" ||
                                    currentPath === "/company-details"
                                        ? styles.active
                                        : ""
                                }
                            >
                                <a href="/company">
                                    <i className="fa-solid fa-landmark"></i>
                                    Société
                                </a>
                            </li>
                            <li
                                className={
                                    currentPath === "/invoices"
                                        ? styles.active
                                        : ""
                                }
                            >
                                <a href="/invoices">
                                    <i className="fa-solid fa-file"></i>
                                    Factures
                                </a>
                            </li>
                            <li
                                className={
                                    currentPath === "/documents"
                                        ? styles.active
                                        : ""
                                }
                            >
                                <a href="/documents">
                                    <i className="fa-solid fa-folder"></i>
                                    Documents
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.sideOrange}>
                        <i className="fa-solid fa-caret-down"></i>
                    </div>
                </div>

                {/* partie container à copier pour les nouvelles pages */}
                {/* <div className={styles.container}>
                </div> */}

                {/* Modal pour créer */}
                {isCreateModalOpen && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <button
                                className={styles.createEventButton}
                                onClick={this.handleCreateEventClick}
                            >
                                Créer un événement
                            </button>

                            {/* Ajoutez ici les options pour créer un événement, un client, etc. */}
                        </div>
                    </div>
                )}

                {/* Modal pour afficher un événement */}
                {isEventModalOpen && !isUpdateFormOpen && (
                    <InterventionForm
                        event={selectedEvent}
                        closeModal={() => this.toggleEventModal()}
                        openUpdateForm={this.openUpdateForm}
                    />
                )}

                {/* Modal pour créer un événement */}
                {isCreateEventModalOpen && (
                    <CreateEventForm closeModal={this.toggleCreateEventModal} />
                )}
            </>
        );
    }
}

export default TemplateGlobalWrapper;
