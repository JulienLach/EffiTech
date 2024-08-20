const Invoice = require('../data/invoice.data.js')

exports.getAllInvoices = (req, res) => {
    Invoice.getAllInvoices((error, invoices) => {
        if (error) {
            return res.status(500).json({ message: 'Erreur lors de la récupération des factures', error: error.message });
        }
        res.status(200).json(invoices); // Renvoyer toutes les factures
    });
};

exports.getInvoiceById = (req, res) => {
    const idInvoice = req.params.idInvoice;
    Invoice.getInvoiceById(idInvoice, (error, invoice) => {
        if (error) {
            return res.status(500).json({ message: 'Erreur lors de la récupération de la facture', error: error.message });
        }
        if (invoice) {
            res.status(200).json(invoice);
        } else {
            res.status(404).json({ message: 'Facture non trouvée' });
        }
    });
};

exports.importInvoice = (req, res) => {
    const { idClient, amountIncludingTax, amountWithoutTax, invoiceDate, file } = req.body;
    Invoice.importInvoice(idClient, amountIncludingTax, amountWithoutTax, invoiceDate, file, (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Erreur lors de l\'importation de la facture', error: error.message });
        }
        res.status(201).json({ message: 'Facture importée avec succès', result });
    });
};