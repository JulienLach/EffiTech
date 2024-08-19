const express = require('express');
const router = express.Router();
const employeeServices = require('../services/employee.services.js');

router.get('/employees', employeeServices.getAllEmployees);

router.get('/employees/:id', employeeServices.getEmployeeById);

router.post('/employees', employeeServices.createEmployee);

router.put('/employees/:id', employeeServices.updateEmployee);

router.delete('/employees/:id', employeeServices.deleteEmployee);

module.exports = router;