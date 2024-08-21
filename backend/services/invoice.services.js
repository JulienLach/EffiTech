const Invoice = require('../data/invoice.data.js')

function getAllInvoices(req, res) {
    Invoice.getAllInvoices((error, invoices) => {
        if (error) {
            return res.status(500).send({ message: 'Erreur lors de la récupération des factures', error: error.message });
        }
        res.status(200).send(invoices); // Renvoyer toutes les factures
    });
};

function getInvoiceById(req, res) {
    const idInvoice = req.params.idInvoice;
    Invoice.getInvoiceById(idInvoice, (error, invoice) => {
        if (error) {
            return res.status(500).send({ message: 'Erreur lors de la récupération de la facture', error: error.message });
        }
        if (invoice) {
            res.status(200).send(invoice);
        } else {
            res.status(404).send({ message: 'Facture non trouvée' });
        }
    });
};

function importInvoice(req, res) {
    const { idClient, amountIncludingTax, amountWithoutTax, invoiceDate, file } = req.body;
    Invoice.importInvoice(idClient, amountIncludingTax, amountWithoutTax, invoiceDate, file, (error, result) => {
        if (error) {
            return res.status(500).send({ message: 'Erreur lors de l\'importation de la facture', error: error.message });
        }
        res.status(201).send({ message: 'Facture importée avec succès', result });
    });
};

exports.getAllInvoices = getAllInvoices;
exports.getInvoiceById = getInvoiceById;
exports.importInvoice = importInvoice;