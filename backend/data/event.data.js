const pool = require('../config/db.config'); // Importer la configuration de la base de données

class Event {
    constructor(idEvent, title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee) {
        this.idEvent = idEvent;
        this.title = title;
        this.description = description;
        this.status = status;
        this.isPlanned = isPlanned;
        this.type = type;
        this.idClient = idClient;
        this.idAddress = idAddress;
        this.startingDate = startingDate;
        this.startingHour = startingHour;
        this.endingHour = endingHour;
        this.idEmployee = idEmployee;
    }

    static getAllEvents(callback) {
        const query = `
            SELECT * FROM events 
            JOIN clients ON events.id_client = clients.id_client 
            JOIN addresses ON events.id_address = addresses.id_address 
            JOIN employees ON events.id_employee = employees.id_employee
        `;
        pool.query(query, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const events = result.rows.map(row => {
                const event = new Event(
                    row.id_event, row.title, row.description, row.status, 
                    row.is_planned, row.type, row.id_client, row.id_address, 
                    row.starting_date, row.startingHour, row.endingHour, row.idEmployee
                );
                event.idClient = {
                    category: row.category,
                    firstname: row.firstname,
                    lastname: row.lastname,
                    email: row.email,
                    phoneNumber: row.phoneNumber
                };
                event.idAddress = {
                    street: row.address,
                    zipcode: row.zipcode,
                    city: row.city
                };
                return event;
            });
            callback(null, events);
        });
    }

    static getEventById(idEvent, callback) {
        const query = `
            SELECT * FROM events 
            JOIN clients ON events.id_client = clients.id_client 
            JOIN addresses ON events.id_address = addresses.id_address 
            WHERE events.id_event = $1
        `;
        const values = [idEvent];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const row = result.rows[0];
            let event = new Event(
                row.id_event, row.title, row.description, row.status, 
                row.is_planned, row.type, row.id_client, row.id_address, 
                row.starting_date, row.starting_hour, row.ending_hour, row.id_employee
            );
            event.idClient = {
                category: row.category,
                firstname: row.firstname,
                lastname: row.lastname,
                email: row.email,
                phoneNumber: row.phoneNumber
            };
            event.idAddress = {
                street: row.address,
                zipcode: row.zipcode,
                city: row.city
            };
            callback(null, event); 
        });
    }

    static createEvent(title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee, callback) {
        const query = 'INSERT INTO events (title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee) VALUES ()';
        const values = [title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee];
        pool.query(query, values, (error, newEvent) => {
            if (error) {
                return callback(error, null);
            }
            const row = newEvent.rows[0];
            newEvent = new Event(row.idEvent, row.title, row.description, row.status, row.isPlanned, row.type, row.idClient, row.idAddress, row.startingDate, row.startingHour, row.endingHour, row.idEmployee);
            callback(null, newEvent);
        });
    }

    static updateEvent(title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee, idEvent, callback) {
        const query = 'UPDATE events SET title = $1, description = $2, status = $3, isPlanned = $4, type = $5, idClient = $6, idAddress = $7, startingDate = $8, startingHour = $9, endingHour = $10, idEmployee = $11 WHERE idEvent = $12';
        const values = [title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee, idEvent];
        pool.query(query, values, (error, updatedEvent) => {
            if (error) {
                return callback(error, null);
            }
            const row = updatedEvent.rows[0];
            updatedEvent = new Event(row.idEvent, row.title, row.description, row.status, row.isPlanned, row.type, row.idClient, row.idAddress, row.startingDate, row.startingHour, row.endingHour, row.idEmployee);
            callback(null, updatedEvent);
        });
    }

    static deleteEvent(idEvent, callback) {
        const query = 'DELETE FROM events WHERE idEvent = $1 RETURNING *';
        const values = [idEvent];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const row = result.rows[0];
            const deletedEvent = new Event(row.idEvent, row.title, row.description, row.status, row.isPlanned, row.type, row.idClient, row.idAddress, row.startingDate, row.startingHour, row.endingHour, row.idEmployee);
            callback(null, deletedEvent);
        });
    }

    static getEventStatus(idEvent, callback) {
        const query = 'SELECT * FROM events WHERE idEvent = $1';
        const values = [idEvent];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const row = result.rows[0];
            let statusText;
            switch (row.status) {
                case '4':
                    statusText = 'Terminé';
                    break;
                case '3':
                    statusText = 'Aujourd\'hui';
                    break;
                case '2':
                    statusText = 'En retard';
                    break;
                case '1':
                    statusText = 'À venir';
                    break;
                case '0':
                    statusText = 'À planifier';
                    break;
                default:
                    statusText = 'Statut inconnu';
            }
            const event = new Event(row.idEvent, row.title, row.description, statusText, row.isPlanned, row.type, row.idClient, row.idAddress, row.startingDate, row.startingHour, row.endingHour, row.idEmployee);
            callback(null, event);
        });
    }

    static getEventsStatuses(callback) {
        const query = 'SELECT * FROM events';
        pool.query(query, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const events = result.rows.map(row => {
                let statusText;
                switch (row.status) {
                    case '4':
                        statusText = 'Terminé';
                        break;
                    case '3':
                        statusText = 'Aujourd\'hui';
                        break;
                    case '2':
                        statusText = 'En retard';
                        break;
                    case '1':
                        statusText = 'À venir';
                        break;
                    case '0':
                        statusText = 'À planifier';
                        break;
                    default:
                        statusText = 'Statut inconnu';
                }
                return new Event(row.idEvent, row.title, row.description, statusText, row.isPlanned, row.type, row.idClient, row.idAddress, row.startingDate, row.startingHour, row.endingHour, row.idEmployee);
            });
            callback(null, events);
        });
    }

    static sortEventsByClient(idClient, callback) {}

    static sortEventsByStatus(status, callback) {}

    static sortEventsByidEmployee(idEmployee, callback) {}

    static sortEventsByType(type, callback) {}

}

class Appointment extends Event {
    constructor(idEvent, title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee, workToDo, planIntervention) {
        super(idEvent, title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee);
        this.workToDo = workToDo;
        this.planIntervention = planIntervention;
    }
    // méthode spécifique à la sous classe
    static submitAppointmentForm(idEvent, workToDo, planIntervention, callback) {
        const query = 'UPDATE events SET work_to_do = $1, plan_intervention = $2 WHERE idEvent = $3 RETURNING *';
        const values = [workToDo, planIntervention, idEvent];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const row = result.rows[0];
            const updatedAppointment = new Appointment(row.idEvent, row.title, row.description, row.status, row.isPlanned, row.type, row.idClient, row.idAddress, row.startingDate, row.startingHour, row.endingHour, row.idEmployee, row.work_to_do, row.plan_intervention);
            callback(null, updatedAppointment);
        });
    }
}

class Intervention extends Event {
    constructor(idEvent, title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee, report, planIntervention) {
        super(idEvent, title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee);
        this.report = report; // Voir la dépendence à la classe report
        this.planIntervention = planIntervention;
    }

    // méthode spécifique à la sous classe
    static submitInterventionForm(idEvent, breakdown, workDone, reschedule, endingHour, duration, clientSignature, employeeSignature, callback) {
        const query = 'INSERT INTO reports (breakdown, work_done, reschedule, ending_hour, duration, client_signature, employee_signature, id_event) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
        const values = [breakdown, workDone, reschedule, endingHour, duration, clientSignature, employeeSignature, idEvent];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const row = result.rows[0];
            const updatedIntervention = new Intervention(row.idEvent, row.title, row.description, row.status, row.isPlanned, row.type, row.idClient, row.idAddress, row.startingDate, row.startingHour, row.endingHour, row.idEmployee, row.report, row.planIntervention);
            callback(null, updatedIntervention);
            // ajouter la condition "planIntervention" si coché crée directement l'intervention, créer un nouvel event avec la méthode createEvent
        });
    }
}

module.exports = Event;
module.exports = Appointment;
module.exports = Intervention;

