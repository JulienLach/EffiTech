const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller.js');

router.get('/events', eventController.getAllEvents);

router.get('/events/:id', eventController.getEventById);

router.post('/events', eventController.createEvent);

router.put('/events/:id', eventController.updateEvent);

router.delete('/events/:id', eventController.deleteEvent);

// Méthodes spécifiques aux sous classes
router.get('/events/:id/intervention', eventController.submitInterventionForm);

router.get('/events/:id/appointment', eventController.submitAppointmentForm);

module.exports = router;