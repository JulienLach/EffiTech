const Utils = require("../utils/utils.js");

function getAllEventStatistics(req, res) {
    Utils.getAllEventStatistics(function (error, statistics) {
        if (error) {
            return res.status(500).send({
                error: "Erreur lors de la récupération des statistiques",
            });
        }
        res.status(200).send(statistics);
    });
}

exports.getAllEventStatistics = getAllEventStatistics;
