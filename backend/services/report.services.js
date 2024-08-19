const Report = require('../models/report.model.js'); // Importer le modèle Report

exports.sendReport = async (req, res) => {
    try {
        const reportData = {
            breakdown: req.body.breakdown,
            workDone: req.body.workDone,
            reschedule: req.body.reschedule,
            endingHour: req.body.endingHour,
            duration: req.body.duration,
            clientSignature: req.body.clientSignature,
            employeeSignature: req.body.employeeSignature,
            idEvent: req.body.idEvent
        };
        const report = await Report.sendReport(reportData); // Utiliser la méthode du modèle
        if (report) {
            res.status(201).json(report);
        } else {
            res.status(400).json({ message: 'Échec de l\'envoi du rapport' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'envoi du rapport d\'intervention', error: error.message });
    }
};