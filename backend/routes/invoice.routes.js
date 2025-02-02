const express = require("express");
const router = express.Router();
const invoiceServices = require("../services/invoice.services.js");

router.get("/", invoiceServices.getAllInvoices);

router.post("/", invoiceServices.importInvoice);

module.exports = router;
