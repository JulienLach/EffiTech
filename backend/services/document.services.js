const Document = require('../models/document.model');

exports.downloadDocument = async (req, res) => {
    const idDocument = req.params.id;
    try {
        const file = await Document.downloadDocument(idDocument);
        if (file) {
            res.status(200).send(file);
        } else {
            res.status(404).json({ message: 'Document non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors du téléchargement du document', error: error.message });
    }
};