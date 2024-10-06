const Company = require("../data/company.data.js"); // Importer le modèle Client

function getCompanyById() {
    const idCompany = req.params.idCompany;
    Company.getCompanyById(idCompany, (error, company) => {
        if (error) {
            return res
                .status(500)
                .send({
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

exports.getCompanyById = getCompanyById;
