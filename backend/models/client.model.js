const pool = require('../config/db.config'); // Importer la configuration de la base de données

class Client {
    constructor(idClient, category, firstname, lastname, email, idAddress, phoneNumber) {
        this.idClient = idClient;
        this.category = category;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.idAddress = idAddress;
        this.phoneNumber = phoneNumber;
    }

    static async getAllClients() {
        const result = await pool.query('SELECT * FROM clients');
        return result.rows;
    }

    static async getClientById(idClient) {
        const query = 'SELECT * FROM clients WHERE idClient = $1';
        const values = [idClient];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    static async createClient(category, firstname, lastname, email, idAddress, phoneNumber) {
        const query = 'INSERT INTO clients (category, firstname, lastname, email, idAddress, phoneNumber) VALUES ($1, $2, $3, $4, $5, $6)';
        const values = [category, firstname, lastname, email, idAddress, phoneNumber];
        await pool.query(query, values);
    }

    static async updateClient(category, firstname, lastname, email, idAddress, phoneNumber, idClient) {
        const query = 'UPDATE clients SET category = $1, firstname = $2, lastname = $3, email = $4, idAddress = $5, phoneNumber = $6 WHERE idClient = $7';
        const values = [category, firstname, lastname, email, idAddress, phoneNumber, idClient];
        await pool.query(query, values);
    }
}

module.exports = Client;