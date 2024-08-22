const express = require('express');
const router = express.Router();
const clientServices = require('../services/client.services.js');

router.get('/', clientServices.getAllClients);

router.get('/:idClient', clientServices.getClientById);

router.post('/', clientServices.createClient);

router.put('/:idClient', clientServices.updateClient);

module.exports = router;