const express = require('express');
const router = express.Router();
const documentController = require('../controllers/document.controller');

router.get('/documents/:id/download', documentController.downloadDocument);

module.exports = router;