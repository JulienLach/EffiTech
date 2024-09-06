const express = require('express');
const router = express.Router();
const reportServices = require('../services/report.services.js');

router.post('/', reportServices.createReport);

router.get('/', reportServices.getReportById);

module.exports = router;