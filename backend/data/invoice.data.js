const pool = require('../config/db.config');

class Invoice {
    constructor(idInvoice, idClient, amountIncludingTax, amountWithoutTax, invoiceDate, file) {
        this.idInvoice = idInvoice;
        this.idClient = idClient;
        this.amountIncludingTax = amountIncludingTax;
        this.amountWithoutTax = amountWithoutTax;
        this.invoiceDate = invoiceDate;
        this.file = file;
    }

    static async getAllInvoices() {
        const result = await pool.query('SELECT * FROM invoices');
        return result.rows;
    }

    static async getInvoiceById(idInvoice) {
        const query = 'SELECT * FROM invoices WHERE idInvoice = $1';
        const values = [idInvoice];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    static async importInvoice(idClient, amountIncludingTax, amountWithoutTax, invoiceDate, file) {
        const query = `
            INSERT INTO invoices (idClient, amountIncludingTax, amountWithoutTax, invoiceDate, file) 
            VALUES ($1, $2, $3, $4, $5)
        `;
        const values = [idClient, amountIncludingTax, amountWithoutTax, invoiceDate, file];
        await pool.query(query, values);
    }
}

module.exports = Invoice;