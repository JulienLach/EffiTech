const pool = require("../config/db.config");
const Client = require("./client.data");

/**
 * Classe représentant une facture.
 */
class Invoice {
    /**
     * Crée une instance d'Invoice.
     * @param {number} idInvoice - L'identifiant de la facture.
     * @param {number} idClient - L'identifiant du client associé à la facture.
     * @param {number} amountIncludingTax - Le montant TTC de la facture.
     * @param {number} amountWithoutTax - Le montant HT de la facture.
     * @param {string} invoiceDate - La date de la facture.
     * @param {Buffer} file - Le fichier de la facture.
     */
    constructor(
        idInvoice,
        idClient,
        amountIncludingTax,
        amountWithoutTax,
        invoiceDate,
        file
    ) {
        this.idInvoice = idInvoice;
        this.idClient = idClient;
        this.amountIncludingTax = amountIncludingTax;
        this.amountWithoutTax = amountWithoutTax;
        this.invoiceDate = invoiceDate;
        this.file = file;
    }

    /**
     * Récupère toutes les factures.
     * @param {function(Error, Invoice[]):void} callback - La fonction de rappel à exécuter après la récupération des factures.
     */
    static getAllInvoices(callback) {
        const query = `
            SELECT 
                invoices.*, 
                clients.firstname AS client_firstname, 
                clients.lastname AS client_lastname 
            FROM invoices 
            JOIN clients ON invoices.id_client = clients.id_client
            ORDER BY invoices.id_invoice DESC
        `;
        pool.query(query, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const invoices = result.rows.map(function (row) {
                const fileBase64 = row.file.toString("base64");
                return {
                    idInvoice: row.id_invoice,
                    idClient: row.id_client,
                    clientFirstname: row.client_firstname,
                    clientLastname: row.client_lastname,
                    amountIncludingTax: row.amount_including_tax,
                    amountWithoutTax: row.amount_without_tax,
                    invoiceDate: row.invoice_date,
                    file: fileBase64,
                };
            });
            callback(null, invoices);
        });
    }

    /**
     * Récupère une facture par son identifiant.
     * @param {number} idInvoice - L'identifiant de la facture.
     * @param {function(Error, Invoice):void} callback - La fonction de rappel à exécuter après la récupération de la facture.
     */
    static getInvoiceById(idInvoice, callback) {
        const query =
            "SELECT * FROM invoices WHERE id_invoice = $1 JOIN clients ON invoices.id_client = clients.id_client RETURNING *";
        const values = [idInvoice];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const row = result.rows[0];
            const fileBase64 = row.file.toString("base64");

            const invoice = new Invoice(
                row.id_invoice,
                row.id_client,
                row.amount_including_tax,
                row.amount_without_tax,
                row.invoice_date,
                row.fileBase64
            );
            callback(null, invoice);
        });
    }

    /**
     * Importe une nouvelle facture.
     * @param {number} idClient - L'identifiant du client associé à la facture.
     * @param {number} amountIncludingTax - Le montant TTC de la facture.
     * @param {number} amountWithoutTax - Le montant HT de la facture.
     * @param {string} invoiceDate - La date de la facture.
     * @param {string} file - Le fichier de la facture.
     * @param {function(Error, Invoice):void} callback - La fonction de rappel à exécuter après l'importation de la facture.
     */
    static importInvoice(
        idClient,
        amountIncludingTax,
        amountWithoutTax,
        invoiceDate,
        file,
        callback
    ) {
        const query = `
            INSERT INTO invoices (id_client, amount_including_tax, amount_without_tax, invoice_date, file) 
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const values = [
            idClient,
            amountIncludingTax,
            amountWithoutTax,
            invoiceDate,
            file,
        ];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error);
            }
            const row = result.rows[0];
            const invoice = new Invoice(
                row.id_invoice,
                row.id_client,
                row.amount_including_tax,
                row.amount_without_tax,
                row.invoice_date,
                row.file
            );
            callback(null, invoice);
        });
    }

    static getClientInvoices(idClient, callback) {
        const query = `
            SELECT 
                invoices.*, 
                clients.firstname AS client_firstname, 
                clients.lastname AS client_lastname 
            FROM invoices 
            JOIN clients ON invoices.id_client = clients.id_client
            WHERE invoices.id_client = $1
            ORDER BY invoices.id_invoice DESC
        `;
        const values = [idClient];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const invoices = result.rows.map(function (row) {
                const fileBase64 = row.file.toString("base64");
                return {
                    idInvoice: row.id_invoice,
                    idClient: row.id_client,
                    clientFirstname: row.client_firstname,
                    clientLastname: row.client_lastname,
                    amountIncludingTax: row.amount_including_tax,
                    amountWithoutTax: row.amount_without_tax,
                    invoiceDate: row.invoice_date,
                    file: fileBase64,
                };
            });
            callback(null, invoices);
        });
    }
}

module.exports = Invoice;
