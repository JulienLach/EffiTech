const express = require('express');
const router = express.Router();
const eventServices = require('../services/event.services.js');

router.get('/', eventServices.getAllEvents);

router.get('/:idEvent', eventServices.getEventById);

router.post('/', eventServices.createEvent);

router.put('/:idEvent', eventServices.updateEvent);

router.delete('/:id', eventServices.deleteEvent);

// Méthodes spécifiques aux sous classes
router.post('/:idEvent/submitInterventionForm', eventServices.submitInterventionForm);

router.post('/:idEvent/submitAppointmentForm', eventServices.submitAppointmentForm);

module.exports = router;