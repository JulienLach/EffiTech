const express = require('express');
const router = express.Router();
const addressServices = require('../services/address.services.js');

router.get('/:idAddress', addressServices.getAddressById);

module.exports = router;