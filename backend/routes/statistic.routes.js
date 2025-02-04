const express = require("express");
const router = express.Router();
const statisticServices = require("../services/statistic.services.js");

router.get("/", statisticServices.getAllEventStatistics);

module.exports = router;
