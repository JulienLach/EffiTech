const { body, validationResult } = require("express-validator");
const Report = require("../data/report.data.js"); // Importer le modèle Report

function createReport(req, res) {
    const {
        breakdown,
        workDone,
        reschedule,
        startingDate,
        startingHour,
        endingHour,
        duration,
        clientSignature,
        employeeSignature,
        idEvent,
    } = req.body;

    // Exécuter les règles de validation
    const validationChecks = [
        body("breakdown").isString().trim().escape().notEmpty(),
        body("workDone").isString().trim().escape().notEmpty(),
        body("reschedule").isBoolean().notEmpty(),
        body("startingDate").isISO8601().notEmpty(),
        body("startingHour").isString().trim().escape().notEmpty(),
        body("endingHour").isString().trim().escape().notEmpty(),
        body("duration").isString().trim().escape().notEmpty(),
        body("clientSignature").isString().trim().escape().notEmpty(),
        body("employeeSignature").isString().trim().escape().notEmpty(),
        body("idEvent").isInt().notEmpty(),
    ];

    for (let validation of validationChecks) {
        validation.run(req);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    console.log("Données reçues:", req.body); // Log des données reçues

    Report.createReport(
        breakdown,
        workDone,
        reschedule,
        startingDate,
        startingHour,
        endingHour,
        duration,
        clientSignature,
        employeeSignature,
        idEvent,
        (error, report) => {
            if (error) {
                console.error(
                    "Erreur lors de l'insertion dans la base de données:",
                    error
                ); // Log de l'erreur
                return res.status(500).send({
                    message: "Erreur lors de la création du rapport",
                    error: error.message,
                });
            }
            res.status(201).send(report);
        }
    );
}

function getReportById(req, res) {
    const idEvent = req.params.idEvent;
    Report.getReportById(idEvent, (error, report) => {
        if (error) {
            return res.status(500).send({
                message: "Erreur lors de la récupération du rapport",
                error: error.message,
            });
        }
        if (report) {
            res.status(200).send(report);
        } else {
            res.status(404).send({ message: "Rapport non trouvé" });
        }
    });
}

exports.getReportById = getReportById;
exports.createReport = createReport;
