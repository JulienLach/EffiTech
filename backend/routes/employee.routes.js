const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');

router.get('/employees', employeeController.getAllEmployees);

router.get('/employees/:id', employeeController.getEmployeeById);

router.post('/employees', employeeController.createEmployee);

router.put('/employees/:id', employeeController.updateEmployee);

router.delete('/employees/:id', employeeController.deleteEmployee);

module.exports = router;