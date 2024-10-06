const express = require("express");
const router = express.Router();
const companyServices = require("../services/company.services.js");

router.get("/:id", companyServices.getCompanyById);

module.exports = router;
