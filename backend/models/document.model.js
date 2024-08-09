const pool = require('../config/db.config');

class Document {
    constructor(idDocument, title, brand, model, file) {
        this.idDocument = idDocument;
        this.title = title;
        this.brand = brand,
        this.model = model;
        this.file = file;
    }

    static async getAllDocuments() {
        const result = await pool.query('SELECT * FROM documents');
        return result.rows;
    }

    static async getDocumentById(idDocument) {
        const query = 'SELECT * FROM documents WHERE idDocument = $1'
        const values = [idDocument];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    static async importDocument(idDocument, title, brand, model, file) {
        const query = 'INSERT INTO documents (idDocument, title, brand, model, file) VALUES ($1, $2, $3, $4, $5)'
        const values = [idDocument, title, brand, model, file]
        await pool.query(query, values);
    }

    static async downloadDocument(idDocument) {
        const query = 'SELECT file FROM documents WHERE idDocument = $1'
        const values = [idDocument];
        const result = await pool.query(query, values);
        return result.rows[0].file;
    }
};

module.exports = Document;