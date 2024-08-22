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
        const query = `
            SELECT 
                clients.id_client,
                clients.category,
                clients.company,
                clients.firstname,
                clients.lastname,
                clients.email,
                clients.phone_number,
                addresses.address_street,
                addresses.zipcode,
                addresses.city
            FROM 
                clients
            LEFT JOIN 
                addresses ON clients.id_client = addresses.id_client;
        `;
        pool.query(query, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const clients = result.rows.map(row => {
                const client = new Client(
                    row.id_client, 
                    row.category, 
                    row.firstname, 
                    row.lastname, 
                    row.email, 
                    row.id_address, 
                    row.phone_number
                );
                client.idAddress = {
                    street: row.address_street,
                    zipcode: row.zipcode,
                    city: row.city
                };
                return client;
            });
            callback(null, clients);
        });
    }

    static getClientById(idClient, callback) {
        const query = 'SELECT * FROM clients WHERE idClient = $1';
        const values = [idClient];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const row = result.rows[0];
            let client = new Client(row.idClient, row.category, row.firstname, row.lastname, row.email, row.idAddress, row.phoneNumber);
            callback(null, client);
        });
    }

    static createClient(category, firstname, lastname, email, idAddress, phoneNumber, callback) {
        const query = 'INSERT INTO clients (category, firstname, lastname, email, idAddress, phoneNumber) VALUES ($1, $2, $3, $4, $5, $6)';
        const values = [category, firstname, lastname, email, idAddress, phoneNumber];
        pool.query(query, values, (error, newClient) => {
            if (error) {
                return callback(error, null);
            }
            const row = newClient.rows[0];
            newClient = new Client(row.idClient, row.category, row.firstname, row.lastname, row.email, row.idAddress, row.phoneNumber);
            callback(null, newClient);
        });
    }

    static updateClient(category, firstname, lastname, email, idAddress, phoneNumber, idClient, callback) {
        const query = 'UPDATE clients SET category = $1, firstname = $2, lastname = $3, email = $4, idAddress = $5, phoneNumber = $6 WHERE idClient = $7';
        const values = [category, firstname, lastname, email, idAddress, phoneNumber, idClient];
        pool.query(query, values, (error, updatedClient) => {
            if (error) {
                return callback(error, null);
            }
            const row = updatedClient.rows[0];
            updatedClient = new Client(row.idClient, row.category, row.firstname, row.lastname, row.email, row.idAddress, row.phoneNumber);
            callback(null, updatedClient);
        });
    }
}

module.exports = Client;