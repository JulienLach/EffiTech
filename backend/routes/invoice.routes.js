const express = require("express");
const router = express.Router();
const invoiceServices = require("../services/invoice.services.js");

router.get("/", invoiceServices.getAllInvoices);

router.post("/", invoiceServices.importInvoice);

router.get("/:idInvoice", invoiceServices.getInvoiceById);

router.get("/:idClient", invoiceServices.getClientInvoices);

module.exports = router;
