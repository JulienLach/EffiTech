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
    Company.updateCompany(req.body, (error, company) => {
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

exports.getCompany = getCompany;
exports.updateCompany = updateCompany;
