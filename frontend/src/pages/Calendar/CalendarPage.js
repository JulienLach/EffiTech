import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./CalendarPage.module.css";
import { getAllEvents } from "../../services/api";
import FilterBar from "../../components/FilterBar/FilterBar";
import InterventionForm from "../../components/InterventionForm/InterventionForm";
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
        };

        this.toggleEventModal = this.toggleEventModal.bind(this);
        this.toggleCreateEventModal = this.toggleCreateEventModal.bind(this);
        this.toggleView = this.toggleView.bind(this);
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
            const startDateTime = new Date(event.startingDate);
            startDateTime.setHours(
                ...event.startingHour.split(":").map(Number)
            );

            const endDateTime = new Date(event.startingDate);
            endDateTime.setHours(...event.endingHour.split(":").map(Number));

            return {
                title: event.title,
                start: startDateTime,
                end: endDateTime,
                allDay: false,
            };
        });
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

    render() {
        const {
            events,
            isEventModalOpen,
            selectedEvent,
            isCreateEventModalOpen,
            calendarEvents,
            view,
        } = this.state;

        return (
            <div>
                <TemplateGlobal />
                <div className={styles.container}>
                    <div className={styles.fixedTopSide}>
                        <h1 className={styles.pageTitle}>Calendrier</h1>
                        <div className={styles.filterBar}>
                            <FilterBar
                                toggleCreateEventModal={
                                    this.toggleCreateEventModal
                                }
                            />
                        </div>
                        <h3>Événements</h3>
                    </div>
                    <div className={styles.listView}>
                        <div>
                            <button
                                className={styles.viewButton}
                                onClick={() => this.toggleView("calendar")}
                            >
                                Calendrier
                            </button>
                            <button
                                className={styles.viewButton}
                                onClick={() => this.toggleView("list")}
                            >
                                Liste
                            </button>
                        </div>
                        {view === "calendar" ? (
                            <Calendar events={calendarEvents} />
                        ) : (
                            <table>
                                <thead className={styles.stickyThead}>
                                    <tr>
                                        <th>Client</th>
                                        <th>Référence</th>
                                        <th>Type</th>
                                        <th>Titre</th>
                                        <th>Statut</th>
                                        <th>Date</th>
                                        <th>Intervenant</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map((event) => (
                                        <tr key={event.idEvent}>
                                            <td>
                                                <a href="#">
                                                    {event.client.firstname}{" "}
                                                    {event.client.lastname}
                                                </a>
                                            </td>
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
                                            <td>{event.type}</td>
                                            <td>
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
                                            <td>
                                                <a href="#">
                                                    {event.employee.firstname}{" "}
                                                    {event.employee.lastname}
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
                {isEventModalOpen && (
                    <InterventionForm
                        event={selectedEvent}
                        closeModal={() => this.toggleEventModal()}
                    />
                )}
                {isCreateEventModalOpen && (
                    <CreateEventForm closeModal={this.toggleCreateEventModal} />
                )}
            </div>
        );
    }
}

export default CalendarPageWrapper;
