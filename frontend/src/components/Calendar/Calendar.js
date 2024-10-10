import React, { Component } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment-timezone";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Setup the localizer by providing the moment Object to the correct localizer.
moment.tz.setDefault("Europe/Paris");
const localizer = momentLocalizer(moment);

class Calendar extends Component {
    render() {
        return (
            <div className="myCustomHeight">
                <BigCalendar
                    localizer={localizer}
                    events={this.props.events}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="week"
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
                    }}
                    messages={{
                        today: "Aujourd'hui",
                        previous: "Précédent",
                        next: "Suivant",
                        month: "Mois",
                        week: "Semaine",
                        day: "Jour",
                        agenda: "Agenda",
                        date: "Date",
                        time: "Heure",
                        event: "Événement",
                    }}
                />
            </div>
        );
    }
}

export default Calendar;
