const Event = require("../data/event.data.js");
const Intervention = require("../data/event.data.js");
const Appointment = require("../data/event.data.js");

function getAllEvents(req, res) {
    Event.getAllEvents((error, events) => {
        if (error) {
            return res.status(500).json({
                message: "Erreur lors de la récupération des événements",
                error: error.message,
            });
        }
        res.status(200).send(events); // Renvoyer tous les événements
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
    } = req.body;
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
        client,
        address,
        startingDate,
        startingHour,
        endingHour,
        employee,
        workToDo,
    } = req.body;

    // Extraire les identifiants des objets imbriqués
    const idClient = client.idClient;
    const idAddress = address.idAddress;
    const idEmployee = employee.idEmployee;

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
                res.status(200).send({
                    message: "Événement modifié avec succès",
                });
            }
        }
    );
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
exports.submitInterventionForm = submitInterventionForm;
exports.submitAppointmentForm = submitAppointmentForm;
