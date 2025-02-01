import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TemplateGlobal from "../Template/TemplateGlobal";
import TemplateGlobalMobile from "../Template/TemplateGlobalMobile";
import styles from "./CalendarPage.module.css";
import stylesMobile from "./CalendarPageMobile.module.css";
import { getAllEvents } from "../../services/api";
import FilterBar from "../../components/FilterBar/FilterBar";
import InterventionForm from "../../components/InterventionForm/InterventionForm";
import UpdateInterventionForm from "../../components/UpdateInterventionForm/UpdateInterventionForm";
import CreateEventForm from "../../components/CreateEventForm/CreateEventForm";
import Calendar from "../../components/Calendar/Calendar";

// Composant wrapper pour utiliser les hooks
function CalendarPageWrapper() {
    const navigate = useNavigate();
    const location = useLocation();
    return <CalendarPage navigate={navigate} location={location} />;
}

class CalendarPage extends Component {
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
            selectedStatus: "",
            isTypeModalOpen: false,
            selectedType: "",
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
        this.toggleTypeModal = this.toggleTypeModal.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
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
            fontSize: "0.9em",
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

    toggleTypeModal() {
        this.setState((prevState) => ({
            isTypeModalOpen: !prevState.isTypeModalOpen,
        }));
    }

    handleTypeChange(event) {
        const selectedType = event.target.value;
        this.setState({ selectedType });
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
            isTypeModalOpen,
            selectedType,
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

            const matchesType =
                selectedType === "" || event.type.toString() === selectedType;
            // renvois à la fois les événements qui correspondent à la recherche au statut et au type
            return matchesSearchItem && matchesStatus && matchesType;
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

        //Variable pour savoir si c'est mobile ou desktop
        const isMobile = window.navigator.userAgentData;

        return (
            <>
                {isMobile.mobile ? (
                    <>
                        <TemplateGlobalMobile />
                        <div className={stylesMobile.filterBar}>
                            <FilterBar />
                        </div>
                        <div className={stylesMobile.container}>
                            {currentEvents.map((event) => (
                                <div
                                    className={stylesMobile.eventCard}
                                    onClick={() => this.toggleEventModal(event)}
                                >
                                    <div
                                        className={
                                            event.client.category ===
                                            "Professionnel"
                                                ? stylesMobile.sideColorPro
                                                : stylesMobile.sideColorPart
                                        }
                                    ></div>
                                    <div className={stylesMobile.leftSide}>
                                        <div>
                                            <div
                                                className={
                                                    stylesMobile.intStatus
                                                }
                                            >
                                                <p
                                                    className={
                                                        stylesMobile.type
                                                    }
                                                >
                                                    {event.type}
                                                </p>
                                                <p
                                                    className={
                                                        stylesMobile.status
                                                    }
                                                >
                                                    {this.getStatusIndicator(
                                                        event.status
                                                    )}
                                                </p>
                                            </div>

                                            {event.client.category ===
                                            "Professionnel" ? (
                                                <p
                                                    className={
                                                        stylesMobile.clientName
                                                    }
                                                >
                                                    {event.client.company}
                                                </p>
                                            ) : (
                                                <p
                                                    className={
                                                        stylesMobile.clientName
                                                    }
                                                >
                                                    {event.client.firstname}{" "}
                                                    {event.client.lastname}
                                                </p>
                                            )}
                                            <p
                                                className={
                                                    event.client.category ===
                                                    "Particulier"
                                                        ? stylesMobile.partTag
                                                        : stylesMobile.proTag
                                                }
                                            >
                                                {event.client.category}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={stylesMobile.rightSide}>
                                        <p className={stylesMobile.dateHour}>
                                            {event.startingDate
                                                ? new Date(
                                                      event.startingDate
                                                  ).toLocaleDateString()
                                                : ""}{" "}
                                            à{" "}
                                            {new Date(
                                                `1970-01-01T${event.startingHour}`
                                            ).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                        <div className={stylesMobile.idInter}>
                                            <p>
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
                                            <p
                                                className={
                                                    stylesMobile.initiale
                                                }
                                            >
                                                {event.employee.lastname
                                                    .charAt(0)
                                                    .toUpperCase()}
                                                {event.employee.firstname
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {isEventModalOpen && !isUpdateFormOpen && (
                            <InterventionForm
                                event={selectedEvent}
                                closeModal={() => this.toggleEventModal()}
                                openUpdateForm={this.openUpdateForm}
                            />
                        )}
                        {isUpdateFormOpen && (
                            <UpdateInterventionForm
                                event={selectedEvent}
                                closeModal={this.closeUpdateForm}
                            />
                        )}
                        {isCreateEventModalOpen && (
                            <CreateEventForm
                                closeModal={this.toggleCreateEventModal}
                            />
                        )}
                    </>
                ) : (
                    <>
                        <TemplateGlobal />
                        <div className={styles.container}>
                            <div className={styles.fixedTopSide}>
                                <h1 className={styles.pageTitle}>Calendrier</h1>
                                <div className={styles.filterBar}>
                                    <FilterBar
                                        handleSearchChange={
                                            this.handleSearchChange
                                        }
                                        toggleCreateEventModal={
                                            this.toggleCreateEventModal
                                        }
                                        toggleStatusModal={
                                            this.toggleStatusModal
                                        }
                                        isStatusModalOpen={isStatusModalOpen}
                                        handleStatusChange={
                                            this.handleStatusChange
                                        }
                                        toggleTypeModal={this.toggleTypeModal}
                                        isTypeModalOpen={isTypeModalOpen}
                                        handleTypeChange={this.handleTypeChange}
                                    />
                                </div>
                                <h3 className={styles.eventTitle}>
                                    Événements
                                </h3>
                            </div>
                            <div className={styles.listView}>
                                <div className={styles.tabs}>
                                    <button
                                        className={`${styles.viewButton} ${
                                            view === "list"
                                                ? styles.viewButtonActive
                                                : ""
                                        }`}
                                        onClick={() => this.toggleView("list")}
                                    >
                                        Liste
                                    </button>
                                    <button
                                        className={`${styles.viewButton} ${
                                            view === "calendar"
                                                ? styles.viewButtonActive
                                                : ""
                                        }`}
                                        onClick={() =>
                                            this.toggleView("calendar")
                                        }
                                    >
                                        Calendrier
                                    </button>
                                    <div className={styles.divider}></div>
                                </div>
                                {view === "calendar" ? (
                                    <Calendar events={calendarEvents} />
                                ) : (
                                    <div>
                                        <table>
                                            <thead
                                                className={styles.stickyThead}
                                            >
                                                <tr>
                                                    <th>Référence</th>
                                                    <th>Client</th>
                                                    <th>Type</th>
                                                    <th>Titre</th>
                                                    <th>Statut</th>
                                                    <th>Date</th>
                                                    <th>Employé</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentEvents.map((event) => (
                                                    <tr key={event.idEvent}>
                                                        <td>
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
                                                        </td>
                                                        <td
                                                            className={
                                                                styles.eventLink
                                                            }
                                                        >
                                                            <a href="#">
                                                                {
                                                                    event.client
                                                                        .firstname
                                                                }{" "}
                                                                {
                                                                    event.client
                                                                        .lastname
                                                                }
                                                            </a>
                                                        </td>
                                                        <td>{event.type}</td>
                                                        <td
                                                            className={
                                                                styles.eventLink
                                                            }
                                                        >
                                                            <a
                                                                href="#"
                                                                onClick={() =>
                                                                    this.toggleEventModal(
                                                                        event
                                                                    )
                                                                }
                                                            >
                                                                {event.title}
                                                            </a>
                                                        </td>
                                                        <td>
                                                            {this.getStatusIndicator(
                                                                event.status
                                                            )}
                                                        </td>
                                                        <td>
                                                            {event.startingDate
                                                                ? new Date(
                                                                      event.startingDate
                                                                  ).toLocaleDateString()
                                                                : ""}
                                                        </td>
                                                        <td
                                                            className={
                                                                styles.eventLink
                                                            }
                                                        >
                                                            <a href="#">
                                                                {
                                                                    event
                                                                        .employee
                                                                        .firstname
                                                                }{" "}
                                                                {
                                                                    event
                                                                        .employee
                                                                        .lastname
                                                                }
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className={styles.pagination}>
                                            <button
                                                onClick={(e) =>
                                                    this.handlePreviousPage(e)
                                                }
                                                disabled={currentPage === 1}
                                            >
                                                <i className="fa-solid fa-chevron-left"></i>
                                            </button>
                                            <button
                                                onClick={(e) =>
                                                    this.handleNextPage(e)
                                                }
                                                disabled={
                                                    currentPage === totalPages
                                                }
                                            >
                                                <i class="fa-solid fa-chevron-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {isEventModalOpen && !isUpdateFormOpen && (
                            <InterventionForm
                                event={selectedEvent}
                                closeModal={() => this.toggleEventModal()}
                                openUpdateForm={this.openUpdateForm}
                            />
                        )}
                        {isUpdateFormOpen && (
                            <UpdateInterventionForm
                                event={selectedEvent}
                                closeModal={this.closeUpdateForm}
                            />
                        )}
                        {isCreateEventModalOpen && (
                            <CreateEventForm
                                closeModal={this.toggleCreateEventModal}
                            />
                        )}
                    </>
                )}
            </>
        );
    }
}

export default CalendarPageWrapper;
