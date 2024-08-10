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
        const query = 'SELECT * FROM employees WHERE idEmployee = $1';
        const values = [idEvent];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    static async createEvent(title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee) {
        const query = 'INSERT INTO employees (title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee) VALUES ()';
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
}

class Appointment extends Event {
    constructor(idEvent, title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee, workToDo, planIntervention) {
        super(idEvent, title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee);
        this.workToDo = workToDo;
        this.planIntervention = planIntervention;
    }
    // méthode spécifique à la sous classe
    static async fillAppointmentForm() {}
}

class Intervention extends Event {
    constructor(idEvent, title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee, report, planIntervention) {
        super(idEvent, title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee);
        this.report = report; // Voir la dépendence à la classe report
        this.planIntervention = planIntervention;
    }
    // méthode spécifique à la sous classe
    static async fillInterventionForm() {}
}

module.exports = { Event, Appointment, Intervention };

