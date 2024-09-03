const pool = require('../config/db.config'); // Importer la configuration de la base de données

class Client {
    constructor(idClient, category, firstname, lastname, email, address, phoneNumber) {
        this.idClient = idClient;
        this.category = category;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

    static getAllClients(callback) {
        const query = `
            SELECT * FROM clients LEFT JOIN addresses ON clients.id_client = addresses.id_client;`;
        pool.query(query, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const clients = result.rows.map(row => {
                return new Client(
                    row.id_client, 
                    row.category, 
                    row.firstname, 
                    row.lastname, 
                    row.email, 
                    {
                        street: row.address,
                        zipcode: row.zipcode,
                        city: row.city
                    },
                    row.phone_number
                );
            });
            callback(null, clients);
        });
    }

    static getClientById(idClient, callback) {
        const query = `
            SELECT * FROM clients LEFT JOIN addresses ON clients.id_client = addresses.id_client WHERE clients.id_client = $1;
        `;
        const values = [idClient];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const row = result.rows[0];
            const client = new Client(
                row.id_client, 
                row.category, 
                row.firstname, 
                row.lastname, 
                row.email, 
                { // ici l'objet défini correspond à la propriété address du constructeur de la classe Client
                    street: row.address,
                    zipcode: row.zipcode,
                    city: row.city
                },
                row.phone_number
            );
            callback(null, client);
        });
    }

    static createClient(category, firstname, lastname, email, addressDetails, phoneNumber, callback) {
        // Première requête : insérer l'adresse
        const createAddressQuery = 'INSERT INTO addresses (address, city, zipcode) VALUES ($1, $2, $3) RETURNING id_address';
        const addressValues = [addressDetails.address, addressDetails.city, addressDetails.zipcode];
    
        pool.query(createAddressQuery, addressValues, (error, addressResult) => {
            if (error) {
                return callback(error, null);
            }
            const addressId = addressResult.rows[0].id_address;
    
            // Deuxième requête : insérer le client
            const createClientQuery = 'INSERT INTO clients (category, firstname, lastname, email, phone_number) VALUES ($1, $2, $3, $4, $5) RETURNING id_client, category, firstname, lastname, email, phone_number';
            const clientValues = [category, firstname, lastname, email, phoneNumber];
    
            pool.query(createClientQuery, clientValues, (error, clientResult) => {
                if (error) {
                    return callback(error, null);
                }
                const clientId = clientResult.rows[0].id_client;
    
                // Troisième requête : mettre à jour l'adresse avec l'id_client créé
                const updateAddressQuery = 'UPDATE addresses SET id_client = $1 WHERE id_address = $2 RETURNING id_address, address, city, zipcode, id_client';
                const updateValues = [clientId, addressId];
    
                pool.query(updateAddressQuery, updateValues, (error, updateResult) => {
                    if (error) {
                        return callback(error, null);
                    }
                    const row = clientResult.rows[0];
                    const updatedAddress = updateResult.rows[0];
                    const newClient = new Client(
                        row.id_client,
                        row.category,
                        row.firstname,
                        row.lastname,
                        row.email,
                        {
                            street: updatedAddress.address,
                            zipcode: updatedAddress.zipcode,
                            city: updatedAddress.city
                        },
                        row.phone_number
                    );
                    callback(null, newClient);
                });
            });
        });
    }

    static updateClient(idClient, category, firstname, lastname, email, phoneNumber, addressDetails, callback) {
        const clientQuery = 'UPDATE clients SET category = $1, firstname = $2, lastname = $3, email = $4, phone_number = $5 WHERE id_client = $6 RETURNING *';
        const clientValues = [category, firstname, lastname, email, phoneNumber, idClient];

        pool.query(clientQuery, clientValues, (error, clientResult) => {
            if (error) {
                return callback(error, null);
            }
            const updatedClientRow = clientResult.rows[0];
            const updatedClient = new Client(
                updatedClientRow.id_client,
                updatedClientRow.category,
                updatedClientRow.firstname,
                updatedClientRow.lastname,
                updatedClientRow.email,
                {
                    street: addressDetails.address,
                    city: addressDetails.city,
                    zipcode: addressDetails.zipcode
                },
                updatedClientRow.phone_number
            );

            const addressQuery = 'UPDATE addresses SET address = $1, city = $2, zipcode = $3 WHERE id_client = $4 RETURNING *';
            const addressValues = [addressDetails.address, addressDetails.city, addressDetails.zipcode, idClient];

            pool.query(addressQuery, addressValues, (error, addressResult) => {
                if (error) {
                    return callback(error, null);
                }
                const updatedAddress = addressResult.rows[0];
                callback(null, { updatedClient, updatedAddress });
            });
        });
    }
}

module.exports = Client;