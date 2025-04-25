const express = require("express");
const router = express.Router();
const emailServices = require("../services/email.services.js");

router.post("/", emailServices.sendReport);

router.post("/employeeCredentials", emailServices.sendEmployeeCredentials);

router.post("/requestPasswordReset", emailServices.sendPasswordResetLink);

module.exports = router;
