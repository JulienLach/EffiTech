const { body, validationResult } = require("express-validator");
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
    //execute validation rules
    const validationChecks = [
        body("title").isString().trim().escape().notEmpty(),
        body("brand").isString().trim().escape().notEmpty(),
        body("model").isString().trim().escape().notEmpty(),
        body("file").isString().notEmpty(),
    ];

    //execute each validations
    for (let validation of validationChecks) {
        validation.run(req);
    }

    //check if validations errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, brand, model, file } = req.body;

    const buffer = Buffer.from(file, "base64");

    Document.importDocument(title, brand, model, buffer, (error, document) => {
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

function downloadDocument(req, res) {
    const idDocument = req.params.idDocument;
    Document.downloadDocument(idDocument, (error, fileData) => {
        if (error) {
            return res.status(500).send({
                message: "Erreur lors de la récupération du document",
                error: error.message,
            });
        }
        if (fileData) {
            res.setHeader("Content-Type", "application/pdf");
            res.status(200).send(fileData);
        } else {
            res.status(404).send({ message: "Document non trouvé" });
        }
    });
}

exports.getAllDocuments = getAllDocuments;
exports.importDocument = importDocument;
exports.getDocumentById = getDocumentById;
exports.downloadDocument = downloadDocument;
