const pool = require("../config/db.config");

class Document {
    constructor(idDocument, title, brand, model, file) {
        this.idDocument = idDocument;
        this.title = title;
        this.brand = brand;
        this.model = model;
        this.file = file;
    }

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

    static importDocument(idDocument, title, brand, model, file, callback) {
        const query =
            "INSERT INTO documents (idDocument, title, brand, model, file) VALUES ($1, $2, $3, $4, $5)";
        const values = [idDocument, title, brand, model, file];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error);
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
