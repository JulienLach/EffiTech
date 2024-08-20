const express = require('express');
const router = express.Router();
const reportServices = require('../services/report.services.js');

router.post('/', reportServices.sendReport);

module.exports = router;