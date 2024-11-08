const express = require("express");
const router = express.Router();
const eventServices = require("../services/event.services.js");
const authenticateToken = require("../middlewares/auth.middleware.js");

router.get("/", authenticateToken, eventServices.getAllEvents);

router.get("/:idEvent", eventServices.getEventById);

router.post("/", authenticateToken, eventServices.createEvent);

router.put("/:idEvent", eventServices.updateEvent);

router.delete("/:idEvent", eventServices.deleteEvent);

// Méthodes spécifiques aux sous classes
router.post(
    "/:idEvent/submitInterventionForm",
    eventServices.submitInterventionForm
);

router.post(
    "/:idEvent/submitAppointmentForm",
    eventServices.submitAppointmentForm
);

module.exports = router;
