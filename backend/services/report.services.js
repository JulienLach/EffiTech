const Report = require('../data/report.data.js'); // Importer le modèle Report

function createReport(req, res) {
    const { breakdown, workDone, reschedule, startingDate, startingHour, endingHour, duration, clientSignature, employeeSignature, idEvent } = req.body;
    console.log('Données reçues:', req.body); // Log des données reçues

    Report.createReport(breakdown, workDone, reschedule, startingDate, startingHour, endingHour, duration, clientSignature, employeeSignature, idEvent, (error, report) => {
        if (error) {
            console.error('Erreur lors de l\'insertion dans la base de données:', error); // Log de l'erreur
            return res.status(500).send({ message: 'Erreur lors de la création du rapport', error: error.message });
        }
        res.status(201).send(report);
    });
}

function getReportById(req, res) {
    const idEvent = req.params.idEvent;
    Report.getReportById(idEvent, (error, report) => {
        if (error) {
            return res.status(500).send({ message: 'Erreur lors de la récupération du rapport', error: error.message });
        }
        if (report) {
            res.status(200).send(report);
        } else {
            res.status(404).send({ message: 'Rapport non trouvé' });
        }
    });
}

exports.getReportById = getReportById;
exports.createReport = createReport;