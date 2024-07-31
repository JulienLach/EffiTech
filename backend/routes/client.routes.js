const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller');

router.get('/clients', clientController.getAllClients);

router.get('/clients/:id', clientController.getClientById);

router.post('/clients', clientController.createClient);

router.put('/clients/:id', clientController.updateClient);

router.delete('/clients/:id', clientController.deleteClient);

module.exports = router;