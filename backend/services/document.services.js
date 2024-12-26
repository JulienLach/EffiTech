const Document = require("../data/document.data.js");

function getAllDocuments(req, res) {
    Document.getAllDocuments((error, documents) => {
        if (error) {
            return res.status(500).send({
                message: "Erreur lors de la récupération des documents",
                error: error.message,
            });
        }
        res.status(200).send(documents);
    });
}

exports.getAllDocuments = getAllDocuments;
exports.getDocumentById = getDocumentById;
exports.importDocument = importDocument;
exports.downloadDocument = downloadDocument;
