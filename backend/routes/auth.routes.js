const express = require("express");
const router = express.Router();
const authServices = require("../services/auth.services.js");

// Route de connexion employé
router.post("/login", authServices.loginEmployee);

module.exports = router;
