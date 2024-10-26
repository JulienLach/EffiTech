const express = require("express");
const router = express.Router();
const companyServices = require("../services/company.services.js");

router.get("/", companyServices.getCompany);

router.put("/", companyServices.updateCompany);

router.post("/", companyServices.createCompany);

module.exports = router;
