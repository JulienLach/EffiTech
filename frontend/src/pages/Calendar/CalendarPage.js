import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./CalendarPage.module.css";
import { getAllEvents } from "../../services/api";
import FilterBar from "../../components/FilterBar/FilterBar";
import InterventionForm from "../../components/InterventionForm/InterventionForm";
import CreateEventForm from "../../components/CreateEventForm/CreateEventForm";

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
        };

        this.toggleEventModal = this.toggleEventModal.bind(this);
        this.toggleCreateEventModal = this.toggleCreateEventModal.bind(this);
    }

    componentDidMount() {
        getAllEvents((error, data) => {
            if (error) {
                this.setState({ error: error.message });
            } else {
                this.setState({ events: data });
            }
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
            case 4:
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
            case 3:
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
            case 2:
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

    render() {
        const {
            events,
            isEventModalOpen,
            selectedEvent,
            isCreateEventModalOpen,
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
                    <div>
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
                                            {event.type === "Intervention"
                                                ? "INT-"
                                                : "RDV-"}
                                            {event.idEvent}
                                        </td>
                                        <td>{event.type}</td>
                                        <td>
                                            <a
                                                href="#"
                                                onClick={() =>
                                                    this.toggleEventModal(event)
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
                                            {new Date(
                                                event.startingDate
                                            ).toLocaleDateString()}
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
