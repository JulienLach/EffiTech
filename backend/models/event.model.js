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

    static async getAllEvents() {
        const result = await pool.query('SELECT * FROM events');
        return result.rows;
    }

    static async getEventById(idEvent) {
        const query = 'SELECT * FROM events WHERE idEvent = $1';
        const values = [idEvent];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    static async createEvent(title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee) {
        const query = 'INSERT INTO events (title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee) VALUES ()';
        const values = [title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee];
        await pool.query(query, values);
    }

    static async updateEvent(title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee, idEvent) {
        const query = 'UPDATE events SET title = $1, description = $2, status = $3, isPlanned = $4, type = $5, idClient = $6, idAddress = $7, startingDate = $8, startingHour = $9, endingHour = $10, idEmployee = $11 WHERE idEvent = $12';
        const values = [title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee, idEvent];
        await pool.query(query, values);
    }

    static async deleteEvent(idEvent) {
        const query = 'DELETE FROM events WHERE idEvent = $1';
        const values = [idEvent];
        await pool.query(query, values);
    }

    static async getEventStatus(idEvent) {
        const query = 'SELECT status FROM events WHERE idEvent = $1';
        const values = [idEvent];
        const result = await pool.query(query, values);

        const status = result.rows[0].status;
        
        switch (status) {
            case '4':
                return 'Terminé';
            case '3':
                return 'Aujourd\'hui';
            case '2':
                return 'En retard';
            case '1':
                return 'À venir';
            case '0':
                return 'À planifier';}
    }

    static async getEventsStatuses() {
        const query = 'SELECT id, status FROM events';
        const result = await pool.query(query);
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
                }
            })()
        }));
        return statuses;
    }

    static async sortEventsByClient(idClient) {}

    static async sortEventsByStatus(status) {}

    static async sortEventsByidEmployee(idEmployee) {}

    static async sortEventsByType(type) {}

}

class Appointment extends Event {
    constructor(idEvent, title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee, workToDo, planIntervention) {
        super(idEvent, title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee);
        this.workToDo = workToDo;
        this.planIntervention = planIntervention;
    }
    // méthode spécifique à la sous classe
    static async submitAppointmentForm() {

    }
}

class Intervention extends Event {
    constructor(idEvent, title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee, report, planIntervention) {
        super(idEvent, title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee);
        this.report = report; // Voir la dépendence à la classe report
        this.planIntervention = planIntervention;
    }

    // méthode spécifique à la sous classe
    static async submitInterventionForm(idEvent, breakdown, workDone, reschedule, endingHour, duration, clientSignature, employeeSignature) {
        const query = 'INSERT INTO reports (breakdown, work_done, reschedule, ending_hour, duration, client_signature, employee_signature, id_event) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
        const values = [breakdown, workDone, reschedule, endingHour, duration, clientSignature, employeeSignature, idEvent];
        await pool.query(query, values);
        // ajouter la conditon "planIntervention" si coché crée directement l'intervention, créer un nouvel event avec la méthode createEvent
    }
}

module.exports = { Event, Appointment, Intervention };

