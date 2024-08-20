const express = require('express');
const router = express.Router();
const documentServices = require('../services/document.services.js');

router.get('/:id/download', documentServices.downloadDocument);

module.exports = router;