import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment-timezone";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/fr";

function CalendarMobileWrapper(props) {
    const navigate = useNavigate();
    return <CalendarMobile {...props} navigate={navigate} />;
}

moment.tz.setDefault("Europe/Paris");
moment.locale("fr");
const localizer = momentLocalizer(moment);

function eventStyleGetter(event) {
    const employeeColors = {
        1: "#CC3333",
        2: "#E09122",
        3: "#506EE1",
        4: "#795EC4",
        5: "#CC9933",
        6: "#33CCCC",
        7: "#CCCC33",
        8: "#9933CC",
        9: "#33CC99",
        10: "#CC3333",
        11: "#3399CC",
        12: "#CC3333",
        13: "#33CC33",
        14: "#3333CC",
        15: "#CC3399",
    };

    const backgroundColor = employeeColors[event.idEmployee] || "#C93C2C";

    const style = {
        backgroundColor: backgroundColor,
        borderRadius: "0.4em",
        opacity: 0.95,
        color: "white",
        border: "0.1em solid lightgrey",
        paddingLeft: "0.4em",
        fontWeight: "400",
        fontSize: "0.95em",
    };
    return {
        style,
    };
}

// CustomToolbar pour le calendrier
const CustomToolbar = ({ date, onNavigate, onView }) => {
    const label = moment(date).format("dddd D MMMM"); // "Mardi 25 Mars"
    return (
        <div
            className="rbc-toolbar"
            style={{
                top: "0",
            }}
        >
            <span className="rbc-btn-group">
                <button onClick={() => onNavigate("TODAY")}>
                    <span style={{ fontSize: "1.3em" }}>Aujourd'hui</span>
                </button>
                <button onClick={() => onNavigate("PREV")}>
                    <i
                        className="fa fa-chevron-left"
                        style={{ fontSize: "1.5em" }}
                    ></i>
                </button>
                <button onClick={() => onNavigate("NEXT")}>
                    <i
                        className="fa fa-chevron-right"
                        style={{ fontSize: "1.5em" }}
                    ></i>
                </button>
            </span>
            <span
                className="rbc-toolbar-label"
                style={{
                    fontSize: "1.2em",
                    textTransform: "capitalize",
                    margin: "0.5em",
                    fontWeight: "500",
                    color: "#262626",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "0.35em",
                    padding: "0.1em 1.5em",
                }}
            >
                {label}
            </span>
            <span className="rbc-btn-group">
                <button onClick={() => onView("work_week")}>
                    <span style={{ fontSize: "1.3em", padding: "0 1em" }}>
                        Semaine
                    </span>
                </button>
                <button onClick={() => onView("day")}>
                    <span style={{ fontSize: "1.3em", padding: "0 1em" }}>
                        Jour
                    </span>
                </button>
            </span>
        </div>
    );
};

class CalendarMobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openEventModal: false,
            selectedEvent: null,
        };
    }

    openEventModal = (event) => {
        this.setState({ openEventModal: true, selectedEvent: event });
    };

    closeEventModal = () => {
        this.setState({ openEventModal: false, selectedEvent: null });
    };

    handleClientClick = () => {
        const { selectedEvent } = this.state;
        if (selectedEvent && selectedEvent.client) {
            this.props.navigate("/client-details", {
                state: { idClient: selectedEvent.idClient },
            });
        } else {
            console.error("Aucun idClient trouvé dans selectedEvent");
        }
    };

    render() {
        const { openEventModal, selectedEvent } = this.state;

        console.log("selectedEvent", selectedEvent);

        return (
            <div
                className="height"
                style={{ height: "90vh", margin: "2em 0.7em" }}
            >
                <BigCalendar
                    localizer={localizer}
                    events={this.props.events}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="day"
                    views={["work_week", "day"]}
                    min={new Date(1970, 1, 1, 8, 0, 0)}
                    max={new Date(1970, 1, 1, 20, 0, 0)}
                    timeslots={2}
                    step={30}
                    formats={{
                        timeGutterFormat: "HH:mm",
                        eventTimeRangeFormat: (
                            { start, end },
                            culture,
                            localizer
                        ) =>
                            localizer.format(start, "HH:mm", culture) +
                            " - " +
                            localizer.format(end, "HH:mm", culture),
                        dayFormat: (date, culture, localizer) =>
                            [1, 2, 3, 4, 5].includes(date.getDay())
                                ? localizer.format(date, "ddd DD/MM", culture)
                                : "", // Colonnes inchangées
                        monthHeaderFormat: "MMMM YYYY",
                    }}
                    messages={{
                        today: (
                            <span style={{ fontSize: "1.3em" }}>
                                Aujourd'hui
                            </span>
                        ),
                        previous: <i className="fa fa-chevron-left"></i>,
                        next: <i className="fa fa-chevron-right"></i>,
                        work_week: "Semaine",
                        day: "Jour",
                        date: "Date",
                        time: "Heure",
                        event: "Évènement",
                    }}
                    eventPropGetter={eventStyleGetter}
                    onSelectEvent={this.openEventModal}
                    components={{
                        toolbar: CustomToolbar, // Toolbar custom
                        event: ({ event }) => (
                            <span className="event-title">
                                {event.title} - {event.client}
                            </span>
                        ),
                    }}
                    dayPropGetter={(date) => {
                        const day = date.getDay();
                        if (day === 0 || day === 6) {
                            return {
                                style: {
                                    display: "none",
                                },
                            };
                        }
                        return {};
                    }}
                />
                {openEventModal && selectedEvent && (
                    <div
                        className="modalOverlay"
                        onClick={this.closeEventModal}
                    >
                        <div
                            className="modalContent"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="closeButton"
                                onClick={this.closeEventModal}
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                            <h3>{selectedEvent.title}</h3>
                            <p>
                                <span className="modalLabels">Client :</span>{" "}
                                <a href="#" onClick={this.handleClientClick}>
                                    {selectedEvent.client}{" "}
                                </a>
                            </p>
                            <p>
                                <span className="modalLabels">
                                    Description :
                                </span>{" "}
                                {selectedEvent.description}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default CalendarMobileWrapper;
