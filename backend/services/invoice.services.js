const Invoice = require('../models/invoice.model.js')

exports.getAllInvoices = async (req, res) => {
    try {
        const employees = await Employee.getAllInvoices();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des factures', error: error.message });
    }
};
