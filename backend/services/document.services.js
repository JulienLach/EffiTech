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

function importDocument(req, res) {
    const { title, brand, model } = req.body;
    const file = req.files.file;

    Document.importDocument(title, brand, model, file, (error, document) => {
        if (error) {
            return res.status(500).send({
                message: "Erreur lors de l'import du document",
                error: error.message,
            });
        }
        res.status(200).send(document);
    });
}

exports.getAllDocuments = getAllDocuments;
exports.importDocument = importDocument;
