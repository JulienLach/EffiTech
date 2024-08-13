const Event = require('../models/event.model.js')

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.getAllEvents(); // Utiliser la méthode du modèle
        res.status(200).json(events); // Renvoyer tous les événements
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des événements', error: error.message });
    }
};

exports.getEventById = async (req, res) => {
   const idEvent = req.params.idEvent;
    try {
         const event = await Event.getEventById(idEvent);
         if (event) {
              res.status(200).json(event);
         } else {
              res.status(404).json({ message: 'Événement non trouvé' });
         }
    } catch (error) {
         res.status(500).json({ message: 'Erreur lors de la récupération de l\'événement', error: error.message });
    }
};

exports.createEvent = async (req, res) => {
    const { title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee } = req.body;
    try {
        await Event.createEvent(title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee);
        res.status(201).json({ message: 'Événement créé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'événement', error: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    const {title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee, idEvent} = req.body;
    try {
        await Event.updateEvent(title, description, status, isPlanned, type, idClient, idAddress, startingDate, startingHour, endingHour, idEmployee, idEvent);
        res.status(200).json({ message: 'Événement modifié avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la modification de l\'événement', error: error.message });
    }
};

exports.validateEvent = (req, res) => {

};

exports.deleteEvent = (req, res) => {

};

exports.fillInterventionForm = (req, res) => {

};

exports.fillAppointmentForm = (req, res) => {

};