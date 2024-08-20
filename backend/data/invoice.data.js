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

    static getAllInvoices(callback) {
        const query = 'SELECT * FROM invoices';
        pool.query(query, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, result.rows);
        });
    }

    static getInvoiceById(idInvoice, callback) {
        const query = 'SELECT * FROM invoices WHERE idInvoice = $1';
        const values = [idInvoice];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, result.rows[0]);
        });
    }

    static importInvoice(idClient, amountIncludingTax, amountWithoutTax, invoiceDate, file, callback) {
        const query = `
            INSERT INTO invoices (idClient, amountIncludingTax, amountWithoutTax, invoiceDate, file) 
            VALUES ($1, $2, $3, $4, $5)
        `;
        const values = [idClient, amountIncludingTax, amountWithoutTax, invoiceDate, file];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, result);
        }); 
    }
}

module.exports = Invoice;