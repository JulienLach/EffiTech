const express = require('express');
const router = express.Router();
const eventServices = require('../services/event.services.js');

router.get('/events', eventServices.getAllEvents);

router.get('/events/:id', eventServices.getEventById);

router.post('/events', eventServices.createEvent);

router.put('/events/:id', eventServices.updateEvent);

router.delete('/events/:id', eventServices.deleteEvent);

// Méthodes spécifiques aux sous classes
router.get('/events/:id/intervention', eventServices.submitInterventionForm);

router.get('/events/:id/appointment', eventServices.submitAppointmentForm);

module.exports = router;