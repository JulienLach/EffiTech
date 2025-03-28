const { body, validationResult } = require("express-validator");
const Invoice = require("../data/invoice.data.js");

function getAllInvoices(req, res) {
    Invoice.getAllInvoices((error, invoices) => {
        if (error) {
            return res.status(500).send({
                message: "Erreur lors de la récupération des factures",
                error: error.message,
            });
        }
        res.status(200).send(invoices);
    });
}

function getInvoiceById(req, res) {
    const idInvoice = req.params.idInvoice;
    Invoice.getInvoiceById(idInvoice, (error, invoice) => {
        if (error) {
            return res.status(500).send({
                message: "Erreur lors de la récupération de la facture",
                error: error.message,
            });
        }
        if (invoice) {
            res.status(200).send(invoice);
        } else {
            res.status(404).send({ message: "Facture non trouvée" });
        }
    });
}

function importInvoice(req, res) {
    const validationChecks = [
        body("idClient").isInt().notEmpty(),
        body("amountIncludingTax").isFloat().notEmpty(),
        body("amountWithoutTax").isFloat().notEmpty(),
        body("invoiceDate").isString().trim().escape().notEmpty(),
        body("file").isString().notEmpty(),
    ];

    for (let validation of validationChecks) {
        validation.run(req);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        idClient,
        amountIncludingTax,
        amountWithoutTax,
        invoiceDate,
        file,
    } = req.body;

    const buffer = Buffer.from(file, "base64");

    Invoice.importInvoice(
        idClient,
        amountIncludingTax,
        amountWithoutTax,
        invoiceDate,
        buffer,
        (error, invoice) => {
            if (error) {
                return res.status(500).send({
                    message: "Erreur lors de l'importation de la facture",
                    error: error.message,
                });
            }
            res.status(201).send({
                message: "Facture importée avec succès",
                invoice,
            });
        }
    );
}

exports.getAllInvoices = getAllInvoices;
exports.getInvoiceById = getInvoiceById;
exports.importInvoice = importInvoice;
