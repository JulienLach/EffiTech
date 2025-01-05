const pool = require("../config/db.config");

/**
 * Classe représentant un guide d'utilisation d'un équipement.
 */
class Document {
    /**
     * Crée une instance de Document.
     * @param {number} idDocument - L'ID du document.
     * @param {string} title - Le titre du document.
     * @param {string} brand - La marque du document.
     * @param {string} model - Le modèle du document.
     * @param {Buffer} file - Le fichier du document.
     */
    constructor(idDocument, title, brand, model, file) {
        this.idDocument = idDocument;
        this.title = title;
        this.brand = brand;
        this.model = model;
        this.file = file;
    }

    /**
     * Récupère tous les documents.
     * @param {function} callback - La fonction de rappel.
     */
    static getAllDocuments(callback) {
        const query = "SELECT * FROM documents";
        pool.query(query, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const documents = result.rows.map(function (row) {
                return new Document(
                    row.id_document,
                    row.title,
                    row.brand,
                    row.model,
                    row.file
                );
            });
            callback(null, documents);
        });
    }

    /**
     * Récupère un document par son ID.
     * @param {number} idDocument - L'ID du document.
     * @param {function} callback - La fonction de rappel.
     */
    static getDocumentById(idDocument, callback) {
        const query = "SELECT * FROM documents WHERE idDocument = $1";
        const values = [idDocument];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const row = result.rows[0];
            const document = new Document(
                row.id_document,
                row.title,
                row.brand,
                row.model,
                row.file
            );
            callback(null, document);
        });
    }

    /**
     * Importe un nouveau document.
     * @param {string} title - Le titre du document.
     * @param {string} brand - La marque du document.
     * @param {string} model - Le modèle du document.
     * @param {Buffer} file - Le fichier du document.
     * @param {function} callback - La fonction de rappel.
     */
    static importDocument(title, brand, model, file, callback) {
        const query =
            "INSERT INTO documents (title, brand, model, file) VALUES ($1, $2, $3, $4) RETURNING *";
        const values = [title, brand, model, file];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error);
            }
            const row = result.rows[0];
            const document = new Document(
                row.title,
                row.brand,
                row.model,
                row.file
            );
            callback(null, document);
        });
    }

    /**
     * Télécharge un document par son ID.
     * @param {number} idDocument - L'ID du document.
     * @param {function} callback - La fonction de rappel.
     */
    static downloadDocument(idDocument, callback) {
        const query = "SELECT file FROM documents WHERE idDocument = $1";
        const values = [idDocument];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const row = result.rows[0];
            const document = new Document(
                row.id_document,
                row.title,
                row.brand,
                row.model,
                row.file
            );
            callback(null, document);
        });
    }
}

module.exports = Document;
