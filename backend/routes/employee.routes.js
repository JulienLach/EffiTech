const express = require('express');
const router = express.Router();
const employeeServices = require('../services/employee.services.js');

router.get('/', employeeServices.getAllEmployees);

router.get('/:id', employeeServices.getEmployeeById);

router.post('/', employeeServices.createEmployee);

router.put('/:id', employeeServices.updateEmployee);

module.exports = router;