const Document = require("../data/document.data.js");

function getAllDocuments() {}

function getDocumentById() {}

function importDocument() {}

function downloadDocument(req, res) {
    const idDocument = req.params.id;
    Document.getDocumentById(idDocument, (error, document) => {
        if (error) {
            return res.status(500).send({
                message: "Erreur lors de la récupération du document",
                error: error.message,
            });
        }
        if (document) {
            res.download(document.path, document.name);
        } else {
            res.status(404).send({ message: "Document non trouvé" });
        }
    });
}

exports.getAllDocuments = getAllDocuments;
exports.getDocumentById = getDocumentById;
exports.importDocument = importDocument;
exports.downloadDocument = downloadDocument;
