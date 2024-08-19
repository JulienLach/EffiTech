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

    static getAllClients(callback) {
        const query = 'SELECT * FROM clients';
        pool.query(query, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, result.rows);
        });
    }

    static getClientById(idClient, callback) {
        const query = 'SELECT * FROM clients WHERE idClient = $1';
        pool.query(query, [idClient], (error, result) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, result.rows[0]);
        });
    }

    static createClient(category, firstname, lastname, email, idAddress, phoneNumber, callback) {
        const query = 'INSERT INTO clients (category, firstname, lastname, email, idAddress, phoneNumber) VALUES ($1, $2, $3, $4, $5, $6)';
        const values = [category, firstname, lastname, email, idAddress, phoneNumber];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, result);
        });
    }

    static updateClient(category, firstname, lastname, email, idAddress, phoneNumber, idClient, callback) {
        const query = 'UPDATE clients SET category = $1, firstname = $2, lastname = $3, email = $4, idAddress = $5, phoneNumber = $6 WHERE idClient = $7';
        const values = [category, firstname, lastname, email, idAddress, phoneNumber, idClient];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, result);
        });
    }
}

module.exports = Client;