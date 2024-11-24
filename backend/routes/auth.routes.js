const express = require("express");
const router = express.Router();
const authServices = require("../services/auth.services.js");

// Route de connexion employé
router.post("/login", authServices.loginEmployee);

router.post("/create-account", authServices.createAccount);

module.exports = router;
