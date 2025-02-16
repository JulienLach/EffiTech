import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllEvents } from "../../services/api";
import TemplateGlobalMobile from "../Template/TemplateGlobalMobile";
import styles from "./CalendarMobilePage.module.css";
import CalendarMobile from "../../components/CalendarMobile/CalendarMobile";

// Composant wrapper pour utiliser les hooks
function CalendarMobilePageWrapper() {
    const navigate = useNavigate();
    const location = useLocation();
    return <CalendarMobilePage navigate={navigate} location={location} />;
}

class CalendarMobilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            error: null,
            isEventModalOpen: false,
            selectedEvent: null,
            isCreateEventModalOpen: false,
            view: "list",
            calendarEvents: [],
            isUpdateFormOpen: false,
            currentPage: 1,
            eventsPerPage: 20,
            searchItem: "",
            isStatusModalOpen: false,
            selectedStatus: "", // Ajout de selectedStatus
        };

        this.toggleEventModal = this.toggleEventModal.bind(this);
        this.toggleCreateEventModal = this.toggleCreateEventModal.bind(this);
        this.toggleView = this.toggleView.bind(this);
        this.openUpdateForm = this.openUpdateForm.bind(this);
        this.closeUpdateForm = this.closeUpdateForm.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handlePreviousPage = this.handlePreviousPage.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.toggleStatusModal = this.toggleStatusModal.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
    }

    componentDidMount() {
        getAllEvents((error, data) => {
            if (error) {
                this.setState({ error: error.message });
            } else {
                const formattedEvents = this.formatEvents(data);
                this.setState({
                    events: data,
                    calendarEvents: formattedEvents,
                });
            }
        });
    }

    formatEvents(events) {
        return events.map((event) => {
            let startDateTime = null;
            let endDateTime = null;

            if (event.startingDate && event.startingHour) {
                startDateTime = new Date(event.startingDate);
                startDateTime.setHours(
                    ...event.startingHour.split(":").map(Number)
                );
            }

            if (event.startingDate && event.endingHour) {
                endDateTime = new Date(event.startingDate);
                endDateTime.setHours(
                    ...event.endingHour.split(":").map(Number)
                );
            }

            return {
                title: event.title,
                description: event.description,
                idEmployee: event.employee.idEmployee,
                client: event.client.firstname + " " + event.client.lastname,
                start: startDateTime,
                end: endDateTime,
                allDay: false,
            };
        });
    }

    handlePageChange(event, pageNumber) {
        event.preventDefault();
        this.setState({ currentPage: pageNumber });
    }

    handleNextPage(event) {
        event.preventDefault();
        this.setState((prevState) => ({
            currentPage: Math.min(
                prevState.currentPage + 1,
                Math.ceil(prevState.events.length / prevState.eventsPerPage)
            ),
        }));
    }

    handlePreviousPage(event) {
        event.preventDefault();
        this.setState((prevState) => ({
            currentPage: Math.max(prevState.currentPage - 1, 1),
        }));
    }

    getStatusIndicator(status) {
        const style = {
            padding: "2px 10px",
            borderRadius: "8px",
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

    toggleEventModal(event = null) {
        this.setState({
            selectedEvent: event,
            isEventModalOpen: event !== null,
            isUpdateFormOpen: false, // Fermer le formulaire de mise à jour si un autre événement est sélectionné
        });
    }

    toggleCreateEventModal() {
        this.setState((prevState) => ({
            isCreateEventModalOpen: !prevState.isCreateEventModalOpen,
        }));
    }

    toggleView(view) {
        this.setState({ view });
    }

    openUpdateForm() {
        this.setState({ isUpdateFormOpen: true });
    }

    closeUpdateForm() {
        this.setState({ isUpdateFormOpen: false });
    }

    handleSearchChange(event) {
        this.setState({ searchItem: event.target.value });
    }

    toggleStatusModal() {
        this.setState((prevState) => ({
            isStatusModalOpen: !prevState.isStatusModalOpen,
        }));
    }

    handleStatusChange(event) {
        const selectedStatus = event.target.value;
        this.setState({ selectedStatus });
    }

    render() {
        const {
            events,
            isEventModalOpen,
            selectedEvent,
            isCreateEventModalOpen,
            calendarEvents,
            view,
            isUpdateFormOpen,
            currentPage,
            eventsPerPage,
            searchItem,
            isStatusModalOpen,
            selectedStatus,
        } = this.state;

        // Filtrer les événements en fonction de la recherche et du statut
        const filteredEvents = events.filter((event) => {
            const matchesSearchItem =
                event.title.toLowerCase().includes(searchItem.toLowerCase()) ||
                event.client.firstname
                    .toLowerCase()
                    .includes(searchItem.toLowerCase()) ||
                event.client.lastname
                    .toLowerCase()
                    .includes(searchItem.toLowerCase()) ||
                event.employee.firstname
                    .toLowerCase()
                    .includes(searchItem.toLowerCase()) ||
                event.employee.lastname
                    .toLowerCase()
                    .includes(searchItem.toLowerCase());

            const matchesStatus =
                selectedStatus === "" ||
                event.status.toString() === selectedStatus;
            // renvois à la fois les événements qui correspondent à la recherche et au statut
            return matchesSearchItem && matchesStatus;
        });

        // Calculer les événements à afficher pour la page actuelle
        const indexOfLastEvent = currentPage * eventsPerPage;
        const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
        const currentEvents = filteredEvents.slice(
            indexOfFirstEvent,
            indexOfLastEvent
        );

        // Calculer le nombre total de pages
        const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

        return (
            <>
                <TemplateGlobalMobile />
                <div className={styles.container}>
                    <CalendarMobile events={calendarEvents} />
                </div>
            </>
        );
    }
}

export default CalendarMobilePageWrapper;
