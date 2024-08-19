const pool = require('../config/db.config');

class Document {
    constructor(idDocument, title, brand, model, file) {
        this.idDocument = idDocument;
        this.title = title;
        this.brand = brand,
        this.model = model;
        this.file = file;
    }

    static getAllDocuments(callback) {
        query = 'SELECT * FROM documents';
        pool.query(query, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, result.rows);
        }); 
    }

    static getDocumentById(idDocument, callback) {
        const query = 'SELECT * FROM documents WHERE idDocument = $1'
        const values = [idDocument];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, result.rows[0]);
        });
    }

    static importDocument(idDocument, title, brand, model, file, callback) {
        const query = 'INSERT INTO documents (idDocument, title, brand, model, file) VALUES ($1, $2, $3, $4, $5)';
        const values = [idDocument, title, brand, model, file];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error);
            }
            return callback(null);
        });
    }

    static downloadDocument(idDocument, callback) {
        const query = 'SELECT file FROM documents WHERE idDocument = $1';
        const values = [idDocument];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, result.rows[0].file);
        });
    }
};

module.exports = Document;