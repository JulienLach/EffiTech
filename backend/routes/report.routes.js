const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller.js');

router.post('/report', reportController.sendReport);

module.exports = router;