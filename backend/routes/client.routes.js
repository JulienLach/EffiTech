const express = require('express');
const router = express.Router();
const clientServices = require('../services/client.services.js');

router.get('/clients', clientServices.getAllClients);

router.get('/clients/:id', clientServices.getClientById);

router.post('/clients', clientServices.createClient);

router.put('/clients/:id', clientServices.updateClient);

router.delete('/clients/:id', clientServices.deleteClient);

module.exports = router;