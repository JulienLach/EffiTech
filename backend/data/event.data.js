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
        const query = 'SELECT * FROM events';
        pool.query(query, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, result.rows);
        });
    }

    static getEventById(idEvent, callback) {
        const query = 'SELECT * FROM events WHERE idEvent = $1';
        const values = [idEvent];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, result.rows[0]);
        });
    }

    static createEvent(title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee, callback) {
        const query = 'INSERT INTO events (title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee) VALUES ()';
        const values = [title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, result);
        });
    }

    static updateEvent(title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee, idEvent, callback) {
        const query = 'UPDATE events SET title = $1, description = $2, status = $3, isPlanned = $4, type = $5, idClient = $6, idAddress = $7, startingDate = $8, startingHour = $9, endingHour = $10, idEmployee = $11 WHERE idEvent = $12';
        const values = [title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee, idEvent];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, result);
        });
    }

    static deleteEvent(idEvent, callback) {
        const query = 'DELETE FROM events WHERE idEvent = $1';
        const values = [idEvent];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, result);
        });
    }

    static getEventStatus(idEvent, callback) {
        const query = 'SELECT status FROM events WHERE idEvent = $1';
        const values = [idEvent];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const status = result.rows[0].status;
            let statusText;
            switch (status) {
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
    
            callback(null, statusText);
        });
    }

    static getEventsStatuses(callback) {
        const query = 'SELECT id, status FROM events';
        pool.query(query, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const statuses = result.rows.map(row => ({
                id: row.id,
                status: (() => {
                    switch (row.status) {
                        case '4':
                            return 'Terminé';
                        case '3':
                            return 'Aujourd\'hui';
                        case '2':
                            return 'En retard';
                        case '1':
                            return 'À venir';
                        case '0':
                            return 'À planifier';
                        default:
                            return 'Statut inconnu';
                    }
                })()
            }));
            callback(null, statuses);
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
        const query = 'UPDATE events SET work_to_do = $1, plan_intervention = $2 WHERE idEvent = $3';
        const values = [workToDo, planIntervention, idEvent];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, result);
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
            callback(null, result);
            // ajouter la condition "planIntervention" si coché crée directement l'intervention, créer un nouvel event avec la méthode createEvent
        });
    }
}

module.exports = { Event, Appointment, Intervention };

