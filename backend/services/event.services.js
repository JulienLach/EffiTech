const { body, validationResult } = require("express-validator");
const { Event, Appointment, Intervention } = require("../data/event.data");

function getAllEvents(req, res) {
    Event.getAllEvents((error, events) => {
        if (error) {
            return res.status(500).json({
                message: "Erreur lors de la récupération des événements",
                error: error.message,
            });
        }

        // Filtrer les événements en fonction de l'utilisateur connecté en vérifiant si l'utilisateur est un administrateur, infos récupéré dans le payload de la requête HTTP
        if (req.employee.isAdmin === false) {
            events = events.filter(
                (event) =>
                    event.employee.idEmployee === req.employee.idEmployee &&
                    event.status !== 1
            );
        }

        res.status(200).send(events);
    });
}

function getEventById(req, res) {
    const idEvent = req.params.idEvent;
    Event.getEventById(idEvent, (error, event) => {
        if (error) {
            return res.status(500).send({
                message: "Erreur lors de la récupération de l'événement",
                error: error.message,
            });
        }
        if (event) {
            res.status(200).send(event);
        } else {
            res.status(404).send({ message: "Événement non trouvé" });
        }
    });
}

function createEvent(req, res) {
    const {
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
    } = req.body;

    const validationChecks = [
        body("title").isString().trim().escape().notEmpty(),
        body("description").isString().trim().escape().optional(),
        body("status").isString().trim().escape(),
        body("isPlanned").isBoolean().notEmpty(),
        body("type").isString().trim().escape().notEmpty(),
        body("idClient").isInt().notEmpty(),
        body("idAddress").isInt().notEmpty(),
        body("startingDate").isISO8601().notEmpty().optional(),
        body("startingHour").isString().trim().escape().optional(),
        body("endingHour").isString().trim().escape().optional(),
        body("idEmployee").isInt().notEmpty(),
        body("workToDo").isString().trim().escape().optional(),
    ];

    for (let validation of validationChecks) {
        validation.run(req);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    Event.createEvent(
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
        (error) => {
            if (error) {
                return res.status(500).send({
                    message: "Erreur lors de la création de l'événement",
                    error: error.message,
                });
            }
            res.status(201).send({ message: "Événement créé avec succès" });
        }
    );
}

function updateEvent(req, res) {
    const idEvent = req.params.idEvent;
    const {
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
    } = req.body;

    const validationChecks = [
        body("title").isString().trim().escape().notEmpty(),
        body("description").isString().trim().escape().optional(),
        body("status").isString().trim().escape().notEmpty(),
        body("isPlanned").isBoolean().notEmpty(),
        body("type").isString().trim().escape().notEmpty(),
        body("idClient").isInt().notEmpty(),
        body("idAddress").isInt().notEmpty(),
        body("startingDate").isISO8601().notEmpty(),
        body("startingHour").isString().trim().escape().notEmpty(),
        body("endingHour").isString().trim().escape().notEmpty(),
        body("idEmployee").isInt().notEmpty(),
        body("workToDo").isString().trim().escape().optional(),
    ];

    for (let validation of validationChecks) {
        validation.run(req);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    Event.updateEvent(
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
        (error, updatedEvent) => {
            if (error) {
                console.error(
                    "Erreur lors de la mise à jour de l'événement:",
                    error
                );
                return res.status(500).send({
                    message: "Erreur lors de la modification de l'événement",
                    error: error.message,
                });
            }
            if (updatedEvent) {
                console.log("Événement mis à jour avec succès:", updatedEvent); // Log de la mise à jour réussie
                res.status(200).send({
                    message: "Événement modifié avec succès",
                });
            }
        }
    );
}

function deleteEvent(req, res) {
    const idEvent = req.params.idEvent;
    Event.deleteEvent(idEvent, (error, deletedEvent) => {
        if (error) {
            return res.status(500).send({
                message: "Erreur lors de la suppression de l'événement",
                error: error.message,
            });
        }
        if (deletedEvent) {
            res.status(200).send({
                message: "Événement supprimé avec succès",
            });
        } else {
            res.status(404).send({ message: "Événement non trouvé" });
        }
    });
}

function getEventsByClientId(req, res) {
    const idClient = req.params.idClient;
    Event.getEventsByClientId(idClient, (error, events) => {
        if (error) {
            return res.status(500).send({
                message: "Erreur lors de la récupération des évènements",
                error: error.message,
            });
        }
        res.status(200).send(events);
    });
}

function submitInterventionForm(req, res) {
    const {
        idEvent,
        breakdown,
        workDone,
        reschedule,
        endingHour,
        duration,
        clientSignature,
        employeeSignature,
    } = req.body;

    const validationChecks = [
        body("idEvent").isInt().notEmpty(),
        body("breakdown").isString().trim().escape().notEmpty(),
        body("workDone").isString().trim().escape().notEmpty(),
        body("reschedule").isBoolean().notEmpty(),
        body("endingHour").isString().trim().escape().notEmpty(),
        body("duration").isString().trim().escape().notEmpty(),
        body("clientSignature").isString().trim().escape().notEmpty(),
        body("employeeSignature").isString().trim().escape().notEmpty(),
    ];

    for (let validation of validationChecks) {
        validation.run(req);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    Intervention.submitInterventionForm(
        idEvent,
        breakdown,
        workDone,
        reschedule,
        endingHour,
        duration,
        clientSignature,
        employeeSignature,
        (error) => {
            if (error) {
                return res.status(500).send({
                    message:
                        "Erreur lors de la génération du formulaire d'intervention",
                    error: error.message,
                });
            }
            res.status(200).send({
                message: "Rapport d'intervention généré avec succès",
            });
        }
    );
}

function submitAppointmentForm(req, res) {
    const { idEvent, workToDo, planIntervention } = req.body;

    const validationChecks = [
        body("idEvent").isInt().notEmpty(),
        body("workToDo").isString().trim().escape().notEmpty(),
        body("planIntervention").isBoolean().notEmpty(),
    ];

    for (let validation of validationChecks) {
        validation.run(req);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    Appointment.submitAppointmentForm(
        idEvent,
        workToDo,
        planIntervention,
        (error) => {
            if (error) {
                return res.status(500).send({
                    message:
                        "Erreur lors de la validation du formulaire de rendez-vous",
                    error: error.message,
                });
            }
            res.status(200).send({
                message: "Formulaire de rendez-vous validé avec succès",
            });
        }
    );
}

exports.getAllEvents = getAllEvents;
exports.getEventById = getEventById;
exports.createEvent = createEvent;
exports.updateEvent = updateEvent;
exports.deleteEvent = deleteEvent;
exports.getEventsByClientId = getEventsByClientId;
exports.submitInterventionForm = submitInterventionForm;
exports.submitAppointmentForm = submitAppointmentForm;
