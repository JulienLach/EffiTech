const Event = require('../data/event.data.js')

exports.getAllEvents = (req, res) => {
    Event.getAllEvents((error, events) => {
        if (error) {
            return res.status(500).json({ message: 'Erreur lors de la récupération des événements', error: error.message });
        }
        res.status(200).json(events); // Renvoyer tous les événements
    });
};

exports.getEventById = (req, res) => {
    const idEvent = req.params.idEvent;
    Event.getEventById(idEvent, (error, event) => {
        if (error) {
            return res.status(500).json({ message: 'Erreur lors de la récupération de l\'événement', error: error.message });
        }
        if (event) {
            res.status(200).json(event);
        } else {
            res.status(404).json({ message: 'Événement non trouvé' });
        }
    });
};

exports.createEvent = (req, res) => {
    const { title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee } = req.body;
    Event.createEvent(title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee, (error) => {
        if (error) {
            return res.status(500).json({ message: 'Erreur lors de la création de l\'événement', error: error.message });
        }
        res.status(201).json({ message: 'Événement créé avec succès' });
    });
};

exports.updateEvent = (req, res) => {
    const { title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee, idEvent } = req.body;
    Event.updateEvent(title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee, idEvent, (error) => {
        if (error) {
            return res.status(500).json({ message: 'Erreur lors de la modification de l\'événement', error: error.message });
        }
        res.status(200).json({ message: 'Événement modifié avec succès' });
    });
};

exports.submitInterventionForm = (req, res) => {
    const { idEvent, breakdown, workDone, reschedule, endingHour, duration, clientSignature, employeeSignature } = req.body;
    Intervention.submitInterventionForm(idEvent, breakdown, workDone, reschedule, endingHour, duration, clientSignature, employeeSignature, (error) => {
        if (error) {
            return res.status(500).json({ message: 'Erreur lors de la génération du formulaire d\'intervention', error: error.message });
        }
        res.status(200).json({ message: 'Rapport d\'intervention généré avec succès' });
    });
};

exports.submitAppointmentForm = (req, res) => {
    const { idEvent, workToDo, planIntervention } = req.body;
    Appointment.submitAppointmentForm(idEvent, workToDo, planIntervention, (error) => {
        if (error) {
            return res.status(500).json({ message: 'Erreur lors de la validation du formulaire de rendez-vous', error: error.message });
        }
        res.status(200).json({ message: 'Formulaire de rendez-vous validé avec succès' });
    });
};

exports.deleteEvent = (req, res) => {};