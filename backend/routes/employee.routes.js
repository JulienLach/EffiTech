const express = require("express");
const router = express.Router();
const employeeServices = require("../services/employee.services.js");

router.get("/", employeeServices.getAllEmployees);

router.get("/:idEmployee", employeeServices.getEmployeeById);

router.post("/", employeeServices.createEmployee);

router.put("/:idEmployee", employeeServices.updateEmployee);

module.exports = router;
