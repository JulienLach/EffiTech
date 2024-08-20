const Document = require('../data/document.data.js');

exports.getAllDocuments = (req, res) => {}

exports.getDocumentById = (req, res) => {
    const idDocument = req.params.id;
}

exports.importDocument = (req, res) => {
    const { idDocument, title, brand, model, file } = req.body
}

exports.downloadDocument = (req, res) => {
    const idDocument = req.params.id;
    Document.getDocumentById(idDocument, (error, document) => {
        if (error) {
            return res.status(500).json({ message: 'Erreur lors de la récupération du document', error: error.message });
        }
                if (document) {
            res.download(document.path, document.name);
        } else {
            res.status(404).json({ message: 'Document non trouvé' });
        }
    });
};