import React, { Component } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment-timezone";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/fr";

// Setup the localizer by providing the moment Object to the correct localizer.
moment.tz.setDefault("Europe/Paris");
moment.locale("fr");
const localizer = momentLocalizer(moment);

function eventStyleGetter(event) {
    const employeeColors = {
        1: "#CC3333",
        2: "#FF6666",
        3: "#FF4D4D",
        4: "#FF4D1A",
        5: "#CC4d33",
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
        opacity: 0.88,
        color: "white",
        border: "0.15em solid lightgrey",
        paddingLeft: "0.5em",
        fontWeight: "300",
        fontSize: "0.9em",
    };
    return {
        style,
    };
}

class Calendar extends Component {
    render() {
        return (
            <div className="height" style={{ height: "80vh" }}>
                <BigCalendar
                    localizer={localizer}
                    events={this.props.events}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="work_week"
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
                        dayFormat: "dddd DD/MM",
                        monthHeaderFormat: "MMMM YYYY",
                    }}
                    messages={{
                        today: "Aujourd'hui",
                        previous: <i className="fa-solid fa-chevron-left"></i>,
                        next: <i className="fa-solid fa-chevron-right"></i>,
                        work_week: "Semaine",
                        day: "Jour",
                        date: "Date",
                        time: "Heure",
                        event: "Événement",
                    }}
                    eventPropGetter={eventStyleGetter}
                    components={{
                        event: ({ event }) => (
                            <span className="event-title">
                                {event.title} - {event.client}
                            </span>
                        ),
                    }}
                />
            </div>
        );
    }
}

export default Calendar;
