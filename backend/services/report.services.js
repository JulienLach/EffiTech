const Report = require('../data/report.data.js'); // Importer le modèle Report


exports.getReportById = (req, res) => {
    const idReport = req.params.idReport;
    Report.getReportById(idReport, (error, report) => {
        if (error) {
            return res.status(500).json({ message: 'Erreur lors de la récupération du rapport', error: error.message });
        }
        if (report) {
            res.status(200).json(report);
        } else {
            res.status(404).json({ message: 'Rapport non trouvé' });
        }
    });
};

exports.sendReport = (req, res) => {};