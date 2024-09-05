const Report = require('../data/report.data.js'); // Importer le modèle Report

function createReport(req, res) {
    const report = req.body;
    Report.createReport(report, (error, report) => {
        if (error) {
            return res.status(500).send({ message: 'Erreur lors de la création du rapport', error: error.message });
        }
        res.status(201).send(report);
    });
}

function getReportById(req, res) {
    const idReport = req.params.idReport;
    Report.getReportById(idReport, (error, report) => {
        if (error) {
            return res.status(500).send({ message: 'Erreur lors de la récupération du rapport', error: error.message });
        }
        if (report) {
            res.status(200).send(report);
        } else {
            res.status(404).send({ message: 'Rapport non trouvé' });
        }
    });
};

function sendReport(req, res) {};

exports.getReportById = getReportById;
exports.createReport = createReport;