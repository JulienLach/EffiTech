const { body, validationResult } = require("express-validator");
const Company = require("../data/company.data.js"); // Importer le modèle Client

function getCompany(req, res) {
    Company.getCompany((error, company) => {
        if (error) {
            return res.status(500).send({
                message: "Erreur lors de la récupération de la société",
                error: error.message,
            });
        }
        if (company) {
            res.status(200).send(company);
        } else {
            res.status(404).send({ message: "Société non trouvée" });
        }
    });
}

function updateCompany(req, res) {
    const {
        name,
        phoneNumber,
        idAddress,
        siret,
        vatNumber,
        capital,
        logo,
        idCompany,
    } = req.body;

    // Exécuter les règles de validation
    const validationChecks = [
        body("name").isString().trim().escape().optional(),
        body("phoneNumber").isString().trim().escape().notEmpty(),
        body("idAddress.address").isString().trim().escape().notEmpty(),
        body("idAddress.zipcode").isString().trim().escape().notEmpty(),
        body("idAddress.city").isString().trim().escape().notEmpty(),
        body("idAddress.idAddress").isInt().notEmpty(),
        body("siret").isString().trim().escape().notEmpty(),
        body("vatNumber").isString().trim().escape().notEmpty(),
        body("capital").isString().trim().escape().notEmpty(),
        body("logo").isString().optional(),
        body("idCompany").isInt().notEmpty(),
    ];

    for (let validation of validationChecks) {
        validation.run(req);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const companyData = {
        name,
        phoneNumber,
        idAddress,
        siret,
        vatNumber,
        capital,
        logo,
        idCompany,
        databaseVersion: process.env.DATABASE_VERSION,
    };

    Company.updateCompany(companyData, (error, company) => {
        if (error) {
            return res.status(500).send({
                message: "Erreur lors de la mise à jour de la société",
                error: error.message,
            });
        }
        if (company) {
            res.status(200).send(company);
        } else {
            res.status(404).send({ message: "Société non trouvée" });
        }
    });
}

function createCompany(req, res) {
    const validationChecks = [
        body("name").isString().trim().escape().notEmpty(),
        body("phoneNumber").isString().trim().escape().notEmpty(),
        body("idAddress.address").isString().trim().escape().notEmpty(),
        body("idAddress.zipcode").isString().trim().escape().notEmpty(),
        body("idAddress.city").isString().trim().escape().notEmpty(),
        body("siret").isString().trim().escape().notEmpty(),
        body("vatNumber").isString().trim().escape().notEmpty(),
        body("capital").isString().trim().escape().notEmpty(),
        body("logo").isString().optional(),
    ];

    for (let validation of validationChecks) {
        validation.run(req);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, phoneNumber, idAddress, siret, vatNumber, capital, logo } =
        req.body;

    const companyData = {
        name,
        phoneNumber,
        idAddress,
        siret,
        vatNumber,
        capital,
        logo,
        databaseVersion: process.env.DATABASE_VERSION,
    };

    Company.createCompany(companyData, (error, company) => {
        if (error) {
            return res.status(500).send({
                message: "Erreur lors de la création de la société",
                error: error.message,
            });
        }
        res.status(201).send(company);
    });
}

exports.getCompany = getCompany;
exports.updateCompany = updateCompany;
exports.createCompany = createCompany;
