const pool = require("../config/db.config"); // Importer la configuration de la base de données
const Client = require("./client.data");
const Address = require("./address.data");
const Employee = require("./employee.data");

class Event {
    constructor(
        idEvent,
        title,
        description,
        status,
        isPlanned,
        type,
        client,
        address,
        startingDate,
        startingHour,
        endingHour,
        employee,
        workToDo
    ) {
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
        this.workToDo = workToDo;
    }

    static getAllEvents(callback) {
        Client.getAllClients(function (error, clients) {
            if (error) {
                return callback(error, null);
            }

            Employee.getAllEmployees(function (error, employees) {
                if (error) {
                    return callback(error, null);
                }

                const queries = [
                    `(SELECT 
                        events.id_event, events.title, events.description, events.status, 
                        events.is_planned, events.type, events.starting_date, events.starting_hour, 
                        events.ending_hour, events.id_client, events.id_employee, events.work_to_do
                    FROM events
                    WHERE events.status = 1 AND events.is_planned = false
                    ORDER BY events.starting_date DESC)`,
                    `(SELECT 
                        events.id_event, events.title, events.description, events.status, 
                        events.is_planned, events.type, events.starting_date, events.starting_hour, 
                        events.ending_hour, events.id_client, events.id_employee, events.work_to_do
                    FROM events
                    WHERE events.status = 3
                    ORDER BY events.starting_date DESC)`,
                    `(SELECT 
                        events.id_event, events.title, events.description, events.status, 
                        events.is_planned, events.type, events.starting_date, events.starting_hour, 
                        events.ending_hour, events.id_client, events.id_employee, events.work_to_do
                    FROM events
                    WHERE events.status = 4 AND events.starting_date = CURRENT_DATE
                    ORDER BY events.starting_date DESC)`,
                    `(SELECT 
                        events.id_event, events.title, events.description, events.status, 
                        events.is_planned, events.type, events.starting_date, events.starting_hour, 
                        events.ending_hour, events.id_client, events.id_employee, events.work_to_do
                    FROM events
                    WHERE events.status = 2 AND events.starting_date > CURRENT_DATE
                    ORDER BY events.starting_date DESC)`,
                    `(SELECT 
                        events.id_event, events.title, events.description, events.status, 
                        events.is_planned, events.type, events.starting_date, events.starting_hour, 
                        events.ending_hour, events.id_client, events.id_employee, events.work_to_do
                    FROM events
                    WHERE events.status = 5
                    ORDER BY events.starting_date DESC)`,
                ];

                const allEvents = [];

                function executeQuery(index) {
                    if (index >= queries.length) {
                        const events = allEvents.map(function (row) {
                            const client = clients.find(function (client) {
                                return client.idClient === row.id_client;
                            });

                            const employee = employees.find(
                                function (employee) {
                                    return (
                                        employee.idEmployee === row.id_employee
                                    );
                                }
                            );

                            return new Event(
                                row.id_event,
                                row.title,
                                row.description,
                                row.status,
                                row.is_planned,
                                row.type,
                                client,
                                client.address, // Adresse du client récupéré avec Client.getAllClients
                                row.starting_date,
                                row.starting_hour,
                                row.ending_hour,
                                employee,
                                row.work_to_do
                            );
                        });

                        return callback(null, events);
                    }

                    pool.query(queries[index], function (error, result) {
                        if (error) {
                            return callback(error, null);
                        }

                        allEvents.push(...result.rows);
                        executeQuery(index + 1);
                    });
                }

                executeQuery(0);
            });
        });
    }

    static getEventById(idEvent, callback) {
        const query = `
            SELECT 
                events.id_event, events.title, events.description, events.status, 
                events.is_planned, events.type, events.starting_date, events.starting_hour, 
                events.ending_hour, events.id_client, events.id_address, events.id_employee
            FROM events 
            WHERE events.id_event = $1
        `;
        const values = [idEvent];

        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }

            const row = result.rows[0];

            Client.getClientById(row.id_client, function (error, client) {
                if (error) {
                    return callback(error, null);
                }

                Employee.getEmployeeById(
                    row.id_employee,
                    function (error, employee) {
                        if (error) {
                            return callback(error, null);
                        }

                        const event = new Event(
                            row.id_event,
                            row.title,
                            row.description,
                            row.status,
                            row.is_planned,
                            row.type,
                            client,
                            client.address, // Adresse du client récupéré avec Client.getClientById
                            row.starting_date,
                            row.starting_hour,
                            row.ending_hour,
                            employee // Employé récupéré avec Employee.getEmployeeById
                        );

                        callback(null, event);
                    }
                );
            });
        });
    }

    // appeler les données pour adresse, client et employé directement dans le formulaire de création d'événement au clique du bouton dans le front
    static createEvent(
        title,
        description,
        status,
        isPlanned,
        type,
        idClient,
        idAddress,
        startingDate,
        startingHour,
        endingHour,
        idEmployee,
        callback
    ) {
        const query =
            "INSERT INTO events (title, description, status, is_planned, type, id_client, id_address, starting_date, starting_hour, ending_hour, id_employee) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *";
        const values = [
            title,
            description,
            status,
            isPlanned,
            type,
            idClient,
            idAddress,
            startingDate,
            startingHour,
            endingHour,
            idEmployee,
        ];

        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }

            const row = result.rows[0];
            const newEvent = new Event(
                row.id_event,
                row.title,
                row.description,
                row.status,
                row.is_planned,
                row.type,
                row.id_client,
                row.id_address,
                row.starting_date,
                row.starting_hour,
                row.ending_hour,
                row.id_employee
            );

            callback(null, newEvent);
        });
    }

    static updateEvent(
        idEvent,
        title,
        description,
        status,
        isPlanned,
        type,
        idClient,
        idAddress,
        startingDate,
        startingHour,
        endingHour,
        idEmployee,
        workToDo,
        callback
    ) {
        const updateQuery = `
            UPDATE events 
            SET title = $1, description = $2, status = $3, is_planned = $4, type = $5, 
                id_client = $6, id_address = $7, starting_date = $8, starting_hour = $9, 
                ending_hour = $10, id_employee = $11, work_to_do = $12
            WHERE id_event = $13
            RETURNING *;
        `;
        const updateValues = [
            title,
            description,
            status,
            isPlanned,
            type,
            idClient,
            idAddress,
            startingDate,
            startingHour,
            endingHour,
            idEmployee,
            workToDo,
            idEvent,
        ];

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
                row.work_to_do,
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
        const query = "DELETE FROM events WHERE idEvent = $1 RETURNING *";
        const values = [idEvent];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const row = result.rows[0];
            const deletedEvent = new Event(
                row.id_event,
                row.title,
                row.description,
                row.status,
                row.is_planned,
                row.type,
                row.id_client,
                row.id_client,
                row.starting_date,
                row.startin_hour,
                row.ending_hour,
                row.id_employee
            );
            callback(null, deletedEvent);
        });
    }

    // pour cette méthode utiliser les UNION pour récupérer les événements planifiés et non planifiés et les afficher dans l'ordre des UNION
    static sortEventsByDate() {}
}

// Voir si ces classes sont nécessaires ou si on peut tout faire avec la classe Event
class Appointment extends Event {
    constructor(
        idEvent,
        title,
        description,
        status,
        isPlanned,
        type,
        idClient,
        idAddress,
        startingDate,
        startingHour,
        endingHour,
        idEmployee,
        workToDo,
        planIntervention
    ) {
        super(
            idEvent,
            title,
            description,
            status,
            isPlanned,
            type,
            idClient,
            idAddress,
            startingDate,
            startingHour,
            endingHour,
            idEmployee
        );
        this.workToDo = workToDo;
        this.planIntervention = planIntervention;
    }

    // Méthode spécifique à la sous classe
    static submitAppointmentForm(
        idEvent,
        workToDo,
        planIntervention,
        callback
    ) {
        const query =
            "UPDATE events SET work_to_do = $1, plan_intervention = $2 WHERE idEvent = $3 RETURNING *";
        const values = [workToDo, planIntervention, idEvent];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const row = result.rows[0];
            const updatedAppointment = new Appointment(
                row.id_event,
                row.title,
                row.description,
                row.status,
                row.is_planned,
                row.type,
                row.id_client,
                row.id_address,
                row.starting_date,
                row.starting_hour,
                row.ending_hour,
                row.id_employee,
                row.work_to_do,
                row.plan_intervention
            );
            callback(null, updatedAppointment);
        });
    }
}

class Intervention extends Event {
    constructor(
        idEvent,
        title,
        description,
        status,
        isPlanned,
        type,
        idClient,
        idAddress,
        startingDate,
        startingHour,
        endingHour,
        idEmployee,
        report,
        planIntervention
    ) {
        super(
            idEvent,
            title,
            description,
            status,
            isPlanned,
            type,
            idClient,
            idAddress,
            startingDate,
            startingHour,
            endingHour,
            idEmployee
        );
        this.report = report; // Voir la dépendence à la classe report
        this.planIntervention = planIntervention;
    }

    // méthode spécifique à la sous classe
    static submitInterventionForm(
        idEvent,
        breakdown,
        workDone,
        reschedule,
        endingHour,
        duration,
        clientSignature,
        employeeSignature,
        callback
    ) {
        const query =
            "INSERT INTO reports (breakdown, work_done, reschedule, ending_hour, duration, client_signature, employee_signature, id_event) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
        const values = [
            breakdown,
            workDone,
            reschedule,
            endingHour,
            duration,
            clientSignature,
            employeeSignature,
            idEvent,
        ];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const row = result.rows[0];
            const updatedIntervention = new Intervention(
                row.id_event,
                row.title,
                row.description,
                row.status,
                row.is_planned,
                row.type,
                row.id_client,
                row.id_address,
                row.starting_date,
                row.starting_hour,
                row.ending_hour,
                row.id_employee,
                row.report,
                row.plan_intervention
            );
            callback(null, updatedIntervention);
            // ajouter la condition "planIntervention" si coché crée directement l'intervention, créer un nouvel event avec la méthode createEvent
        });
    }
}

module.exports = Event;
module.exports = Appointment;
module.exports = Intervention;
