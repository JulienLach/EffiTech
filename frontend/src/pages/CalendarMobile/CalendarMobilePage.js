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
            calendarEvents: [],
        };
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
                client: event.client.company
                    ? event.client.company
                    : event.client.firstname + " " + event.client.lastname,
                start: startDateTime,
                end: endDateTime,
                allDay: false,
            };
        });
    }

    render() {
        const { calendarEvents } = this.state;

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
