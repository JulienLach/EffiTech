import React, { Component } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/fr";
import { getAllEmployees } from "../../services/api";
import "./Calendar.css";

function CalendarWrapper(props) {
    const navigate = useNavigate();
    return <Calendar {...props} navigate={navigate} />;
}

moment.tz.setDefault("Europe/Paris");
moment.locale("fr");
const localizer = momentLocalizer(moment);

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
    10: "#7777CC",
    11: "#3399CC",
    12: "#CC3333",
    13: "#33CC33",
    14: "#3333CC",
    15: "#CC3399",
};

function eventStyleGetter(event) {
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
        transition: "transform 0.1s ease-in-out",
    };
    return {
        style,
        className: "event-hover",
    };
}

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedEmployees: [],
            employees: [],
            openEventModal: false,
            selectedEvent: null,
        };
    }

    componentDidMount() {
        getAllEmployees((error, data) => {
            if (error) {
                this.setState({ error: error.message });
            } else {
                this.setState({ employees: data });
            }
        });
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

    handleCheckboxChange = (idEmployee) => {
        this.setState((prevState) => {
            const { selectedEmployees } = prevState;
            if (selectedEmployees.includes(idEmployee)) {
                return {
                    selectedEmployees: selectedEmployees.filter(
                        (id) => id !== idEmployee
                    ),
                };
            } else {
                return {
                    selectedEmployees: [...selectedEmployees, idEmployee],
                };
            }
        });
    };

    render() {
        const { selectedEmployees, employees, openEventModal, selectedEvent } =
            this.state;
        const filteredEvents =
            selectedEmployees.length === 0
                ? this.props.events
                : this.props.events.filter((event) =>
                      selectedEmployees.includes(event.idEmployee)
                  );

        return (
            <div>
                <div className="employee-filters">
                    {employees.map((employee) => (
                        <label
                            key={employee.idEmployee}
                            style={{
                                backgroundColor:
                                    employeeColors[employee.idEmployee],
                                color: "white",
                                padding: "0.2em 0.5em",
                                borderRadius: "0.25em",
                                margin: "0.5em 0.2em",
                                display: "inline-block",
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={selectedEmployees.includes(
                                    employee.idEmployee
                                )}
                                onChange={() =>
                                    this.handleCheckboxChange(
                                        employee.idEmployee
                                    )
                                }
                                style={{ marginRight: "0.5em" }}
                            />
                            {employee.firstname} {employee.lastname}
                        </label>
                    ))}
                </div>
                <div className="height" style={{ height: "80vh" }}>
                    <BigCalendar
                        localizer={localizer}
                        events={filteredEvents}
                        startAccessor="start"
                        endAccessor="end"
                        defaultView="work_week"
                        views={["work_week", "day", "month"]}
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
                            dayFormat: "dddd DD/MM",
                            monthHeaderFormat: "MMMM YYYY",
                        }}
                        messages={{
                            today: "Aujourd'hui",
                            previous: (
                                <i className="fa-solid fa-chevron-left"></i>
                            ),
                            next: <i className="fa-solid fa-chevron-right"></i>,
                            work_week: "Semaine",
                            day: "Jour",
                            month: "Mois",
                            date: "Date",
                            time: "Heure",
                            event: "Évènement",
                            showMore: (count) => `+ ${count} de plus`,
                        }}
                        eventPropGetter={eventStyleGetter}
                        onSelectEvent={this.openEventModal}
                        components={{
                            event: ({ event }) => (
                                <span className="event-title">
                                    {event.title} - {event.client}
                                </span>
                            ),
                        }}
                    />
                </div>
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
                                Client :{" "}
                                <a href="" onClick={this.handleClientClick}>
                                    {selectedEvent.client}{" "}
                                </a>
                            </p>
                            <p>Description : {selectedEvent.description}</p>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default CalendarWrapper;
