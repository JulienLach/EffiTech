const Event = require('../models/event.model.js')

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.getAllEvents(); // Utiliser la méthode du modèle
        res.status(200).json(events); // Renvoyer tous les événements
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des événements', error: error.message });
    }
};

exports.getEventById = (req, res) => {
   
};

exports.createEvent = (req, res) => {
    
};

exports.updateEvent = (req, res) => {

};

exports.validateEvent = (req, res) => {

};

exports.deleteEvent = (req, res) => {

};

exports.fillInterventionForm = (req, res) => {

};

exports.fillAppointmentForm = (req, res) => {

};