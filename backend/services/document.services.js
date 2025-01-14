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

function getDocumentById(req, res) {
    const idDocument = req.params.idDocument;
    Document.getDocumentById(idDocument, (error, document) => {
        if (error) {
            return res.status(500).send({
                message: "Erreur lors de la récupération du document",
                error: error.message,
            });
        }
        if (document) {
            res.status(200).send(document);
        } else {
            res.status(404).send({ message: "Document non trouvé" });
        }
    });
}
exports.getAllDocuments = getAllDocuments;
exports.importDocument = importDocument;
exports.getDocumentById = getDocumentById;
