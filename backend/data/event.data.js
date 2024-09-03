const pool = require('../config/db.config'); // Importer la configuration de la base de données
const Client = require('./client.data');
const Address = require('./address.data');
const Employee = require('./employee.data');

class Event {
    constructor(idEvent, title, description, status, isPlanned, type, client, address, startingDate, startingHour, endingHour, employee) {
        this.idEvent = idEvent;
        this.title = title;
        this.description = description;
        this.status = status;
        this.isPlanned = isPlanned;
        this.type = type;
        this.client = client;
        this.address = address;
        this.startingDate = startingDate;
        this.startingHour = startingHour;
        this.endingHour = endingHour;
        this.employee = employee;
    }

    static getAllEvents(callback) {
        const query = `
            SELECT 
                events.id_event, events.title, events.description, events.status, 
                events.is_planned, events.type, events.starting_date, events.starting_hour, 
                events.ending_hour, events.id_client, events.id_address, events.id_employee,
                clients.id_client, clients.firstname AS client_firstname, clients.lastname AS client_lastname,
                clients.category, clients.email, clients.phone_number,                
                addresses.id_address, addresses.address, addresses.zipcode, addresses.city,
                employees.id_employee, employees.firstname AS employee_firstname, employees.lastname AS employee_lastname
            FROM events 
            JOIN clients ON events.id_client = clients.id_client 
            JOIN addresses ON events.id_address = addresses.id_address 
            JOIN employees ON events.id_employee = employees.id_employee
        `;
        pool.query(query, function(error, result) {
            if (error) {
                return callback(error, null);
            }
            const events = result.rows.map(function(row) {
                const address = new Address(
                    row.id_address,
                    row.address,
                    row.zipcode,
                    row.city
                );
                const client = new Client(
                    row.id_client,
                    row.category,
                    row.client_firstname,
                    row.client_lastname,
                    row.email,
                    address,
                    row.phone_number
                );
                const employee = new Employee(
                    row.id_employee,
                    row.employee_firstname,
                    row.employee_lastname
                );
                return new Event(
                    row.id_event,
                    row.title,
                    row.description,
                    row.status,
                    row.is_planned,
                    row.type,
                    client,
                    address,
                    row.starting_date,
                    row.starting_hour,
                    row.ending_hour,
                    employee
                );
            });
            callback(null, events);
        });
    }

    static getEventById(idEvent, callback) {
        const query = `
            SELECT 
                events.id_event, events.title, events.description, events.status, 
                events.is_planned, events.type, events.starting_date, events.starting_hour, 
                events.ending_hour, events.id_client, events.id_address, events.id_employee,
                clients.id_client, clients.firstname AS client_firstname, clients.lastname AS client_lastname,
                clients.category, clients.email, clients.phone_number,
                addresses.id_address, addresses.address, addresses.zipcode, addresses.city,
                employees.id_employee, employees.firstname AS employee_firstname, employees.lastname AS employee_lastname
            FROM events 
            JOIN clients ON events.id_client = clients.id_client 
            JOIN addresses ON events.id_address = addresses.id_address
            JOIN employees ON events.id_employee = employees.id_employee
            WHERE events.id_event = $1
        `;
        const values = [idEvent];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const row = result.rows[0];
            const address = new Address(
                row.id_address,
                row.address,
                row.zipcode,
                row.city
            );
            const client = new Client(
                row.id_client,
                row.category,
                row.client_firstname,
                row.client_lastname,
                row.email,
                address,
                row.phone_number
            );
            const employee = new Employee(
                row.id_employee,
                row.employee_firstname,
                row.employee_lastname
            );
            const event = new Event(
                row.id_event,
                row.title,
                row.description,
                row.status,
                row.is_planned,
                row.type,
                client,
                address,
                row.starting_date,
                row.starting_hour,
                row.ending_hour,
                employee
            );
            callback(null, event);
        });
    }

    // appeler les données pour adresse, client et employé directement dans le formulaire de création d'événement au clique du bouton dans le front
    static createEvent(title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee, callback) {
        const query = 'INSERT INTO events (title, description, status, is_planned, type, id_client, id_address, starting_date, starting_hour, ending_hour, id_employee) VALUES ($1 ,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *';
        const values = [title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee];
        pool.query(query, values, (error, newEvent) => {
            if (error) {
                return callback(error, null);
            }
            const row = newEvent.rows[0];
            newEvent = new Event(row.title, row.description, row.status, row.is_planned, row.type, row.id_client, row.id_address, row.starting_date, row.starting_hour, row.ending_hour, row.id_employee);
            callback(null, newEvent);
        });
    }

    static updateEvent(title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee, idEvent, callback) {
        // Extraire les identifiants du Json pour les utiliser dans la requête
        const clientId = idClient.id;
        const addressId = idAddress.id;
        const employeeId = idEmployee.id;
    
        const updateQuery = `
            UPDATE events 
            SET title = $1, description = $2, status = $3, is_planned = $4, type = $5, 
                id_client = $6, id_address = $7, starting_date = $8, starting_hour = $9, 
                ending_hour = $10, id_employee = $11 
            WHERE id_event = $12
            RETURNING *;
        `;
        const updateValues = [title, description, status, isPlanned, type, clientId, addressId, startingDate, startingHour, endingHour, employeeId, idEvent];
        
        pool.query(updateQuery, updateValues, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const row = result.rows[0];
            const address = new Address(
                row.id_address,
                row.address,
                row.zipcode,
                row.city
            );
            const client = new Client(
                row.id_client,
                row.client_category,
                row.client_firstname,
                row.client_lastname,
                row.email,
                address,
                row.phone_number
            );
            const employee = new Employee(
                row.id_employee,
                row.employee_firstname,
                row.employee_lastname
            );
            const updatedEvent = new Event(
                row.id_event,
                row.title,
                row.description,
                row.status,
                row.is_planned,
                row.type,
                client,
                address,
                row.starting_date,
                row.starting_hour,
                row.ending_hour,
                employee
            );
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

