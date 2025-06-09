import React, { Component } from "react";
import { isMobile } from "react-device-detect";
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
import CalendarWrapper from "../../components/Calendar/Calendar";
import getStatusIndicator from "../../components/Utils/StatusUtils";

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

        this.toggleStatusModal = this.toggleStatusModal.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.toggleTypeModal = this.toggleTypeModal.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleResetFilter = this.handleResetFilter.bind(this);
        this.toggleCreateEventModal = this.toggleCreateEventModal.bind(this);
        this.toggleEventModal = this.toggleEventModal.bind(this);
        this.toggleView = this.toggleView.bind(this);
        this.openUpdateForm = this.openUpdateForm.bind(this);
        this.closeUpdateForm = this.closeUpdateForm.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handlePreviousPage = this.handlePreviousPage.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
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
                idClient: event.client.idClient,
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

    handleResetFilter() {
        this.setState({ selectedStatus: "", selectedType: "", searchItem: "" });
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

        const toBePlannedEvents = events.filter((event) => event.status === 1);

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

        // Générer les numéros de page
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }

        return (
            <>
                {isMobile ? (
                    <>
                        <TemplateGlobalMobile />
                        <div className={stylesMobile.filterBar}>
                            <FilterBar
                                toggleStatusModal={this.toggleStatusModal}
                                isStatusModalOpen={isStatusModalOpen}
                                handleStatusChange={this.handleStatusChange}
                                toggleTypeModal={this.toggleTypeModal}
                                isTypeModalOpen={isTypeModalOpen}
                                handleTypeChange={this.handleTypeChange}
                                handleResetFilter={this.handleResetFilter}
                                selectedStatus={selectedStatus}
                                selectedType={selectedType}
                            />
                        </div>
                        <div className={stylesMobile.container}>
                            {currentEvents.map((event) => (
                                <div
                                    key={event.idEvent}
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
                                                    {getStatusIndicator(
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
                                                {event.employee.firstname
                                                    .charAt(0)
                                                    .toUpperCase()}
                                                {event.employee.lastname
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {/* Ajout de la pagination ici */}
                            <div className={stylesMobile.pagination}>
                                <button
                                    onClick={this.handlePreviousPage}
                                    disabled={currentPage === 1}
                                    aria-label="Page précédente"
                                    title="Page précédente"
                                >
                                    <i className="fa-solid fa-chevron-left"></i>
                                </button>
                                <span>
                                    Page {currentPage} / {totalPages}
                                </span>
                                <button
                                    onClick={this.handleNextPage}
                                    disabled={currentPage === totalPages}
                                    aria-label="Page suivante"
                                    title="Page suivante"
                                >
                                    <i className="fa-solid fa-chevron-right"></i>
                                </button>
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
                ) : (
                    <>
                        <TemplateGlobal />
                        <div className={styles.container}>
                            <div className={styles.fixedTopSide}>
                                <h1 className={styles.pageTitle}>Calendrier</h1>
                                <div className={styles.filterBar}>
                                    <FilterBar
                                        searchItem={this.state.searchItem}
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
                                        handleResetFilter={
                                            this.handleResetFilter
                                        }
                                    />
                                </div>
                                <h2 className={styles.eventTitle}>
                                    Évènements
                                </h2>
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
                                    <button
                                        className={`${styles.viewButton} ${
                                            view === "toBePlanned"
                                                ? styles.viewButtonActive
                                                : ""
                                        }`}
                                        onClick={() =>
                                            this.toggleView("toBePlanned")
                                        }
                                    >
                                        <span className="buttonText">
                                            À planifier
                                        </span>{" "}
                                        <span
                                            className={
                                                toBePlannedEvents.length === 0
                                                    ? `${styles.toBePlannedEvents} ${styles.toBePlannedEventsEmpty}`
                                                    : styles.toBePlannedEvents
                                            }
                                        >
                                            {toBePlannedEvents.length}
                                        </span>
                                    </button>
                                    <div className={styles.divider}></div>
                                </div>
                                <div className={styles.divider}></div>
                                {view === "calendar" ? (
                                    <CalendarWrapper
                                        events={calendarEvents}
                                        navigate={this.props.navigate}
                                    />
                                ) : view === "list" ? (
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
                                                {currentEvents
                                                    .filter(
                                                        (event) =>
                                                            event.status != 1
                                                    )
                                                    .map((event) => (
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
                                                                    {event
                                                                        .client
                                                                        .category ===
                                                                    "Professionnel"
                                                                        ? event
                                                                              .client
                                                                              .company
                                                                        : `${event.client.firstname} ${event.client.lastname}`}{" "}
                                                                </a>
                                                            </td>
                                                            <td>
                                                                {event.type}
                                                            </td>
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
                                                                    {
                                                                        event.title
                                                                    }
                                                                </a>
                                                            </td>
                                                            <td>
                                                                {getStatusIndicator(
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
                                                    this.handlePageChange(e, 1)
                                                }
                                                disabled={currentPage === 1}
                                            >
                                                Début
                                            </button>
                                            <button
                                                onClick={(e) =>
                                                    this.handlePreviousPage(e)
                                                }
                                                disabled={currentPage === 1}
                                                title="Page précédente"
                                            >
                                                <i className="fa-solid fa-chevron-left"></i>
                                            </button>
                                            {pageNumbers
                                                .slice(
                                                    Math.max(
                                                        0,
                                                        currentPage - 2
                                                    ),
                                                    currentPage + 1
                                                )
                                                .map((number) => (
                                                    <button
                                                        key={number}
                                                        onClick={(e) =>
                                                            this.handlePageChange(
                                                                e,
                                                                number
                                                            )
                                                        }
                                                        className={
                                                            currentPage ===
                                                            number
                                                                ? styles.activePage
                                                                : ""
                                                        }
                                                    >
                                                        {number}
                                                    </button>
                                                ))}
                                            <button
                                                onClick={(e) =>
                                                    this.handleNextPage(e)
                                                }
                                                disabled={
                                                    currentPage === totalPages
                                                }
                                                title="Page suivante"
                                            >
                                                <i className="fa-solid fa-chevron-right"></i>
                                            </button>
                                            <button
                                                onClick={(e) =>
                                                    this.handlePageChange(
                                                        e,
                                                        totalPages
                                                    )
                                                }
                                                disabled={
                                                    currentPage === totalPages
                                                }
                                            >
                                                Fin
                                            </button>
                                        </div>
                                    </div>
                                ) : view === "toBePlanned" ? (
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
                                                {currentEvents
                                                    .filter(
                                                        (event) =>
                                                            event.status === 1
                                                    )
                                                    .map((event) => (
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
                                                                    {event
                                                                        .client
                                                                        .category ===
                                                                    "Professionnel"
                                                                        ? event
                                                                              .client
                                                                              .company
                                                                        : `${event.client.firstname} ${event.client.lastname}`}{" "}
                                                                </a>
                                                            </td>
                                                            <td>
                                                                {event.type}
                                                            </td>
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
                                                                    {
                                                                        event.title
                                                                    }
                                                                </a>
                                                            </td>
                                                            <td>
                                                                {getStatusIndicator(
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
                                                    this.handlePageChange(e, 1)
                                                }
                                                disabled={currentPage === 1}
                                            >
                                                Début
                                            </button>
                                            <button
                                                onClick={(e) =>
                                                    this.handlePreviousPage(e)
                                                }
                                                disabled={currentPage === 1}
                                                title="Page précédente"
                                            >
                                                <i className="fa-solid fa-chevron-left"></i>
                                            </button>
                                            {pageNumbers
                                                .slice(
                                                    Math.max(
                                                        0,
                                                        currentPage - 2
                                                    ),
                                                    currentPage + 1
                                                )
                                                .map((number) => (
                                                    <button
                                                        key={number}
                                                        onClick={(e) =>
                                                            this.handlePageChange(
                                                                e,
                                                                number
                                                            )
                                                        }
                                                        className={
                                                            currentPage ===
                                                            number
                                                                ? styles.activePage
                                                                : ""
                                                        }
                                                    >
                                                        {number}
                                                    </button>
                                                ))}
                                            <button
                                                onClick={(e) =>
                                                    this.handleNextPage(e)
                                                }
                                                disabled={
                                                    currentPage === totalPages
                                                }
                                                title="Page suivante"
                                            >
                                                <i className="fa-solid fa-chevron-right"></i>
                                            </button>
                                            <button
                                                onClick={(e) =>
                                                    this.handlePageChange(
                                                        e,
                                                        totalPages
                                                    )
                                                }
                                                disabled={
                                                    currentPage === totalPages
                                                }
                                            >
                                                Fin
                                            </button>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        {isEventModalOpen && !isUpdateFormOpen && (
                            <>
                                <InterventionForm
                                    event={selectedEvent}
                                    closeModal={() => this.toggleEventModal()}
                                    openUpdateForm={this.openUpdateForm}
                                />
                                <div className={styles.modalBackground}></div>
                            </>
                        )}
                        {isUpdateFormOpen && (
                            <>
                                <UpdateInterventionForm
                                    event={selectedEvent}
                                    closeModal={this.closeUpdateForm}
                                />
                                <div className={styles.modalBackground}></div>
                            </>
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
