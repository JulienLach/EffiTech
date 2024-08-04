const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/event.controller');

router.get('/events', eventController.getAllEvents);

router.get('/events/:id', eventController.getEventById);

router.post('/events', eventController.createEvent);

router.put('/events/:id', eventController.updateEvent);

router.put('/events/:id', eventController.validateEvent);

router.delete('/events/:id', eventController.deleteEvent);

// Méthodes spécifiques aux sous classes
router.get('/events/:id', eventController.fillInterventionForm);

router.get('/events/:id', eventController.fillAppointmentForm);

module.exports = router;