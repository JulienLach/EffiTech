const express = require("express");
const router = express.Router();
const emailServices = require("../services/email.services.js");

router.post("/", emailServices.sendReport);

module.exports = router;
