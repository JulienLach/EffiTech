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
            SELECT * FROM clients LEFT JOIN addresses ON clients.id_client = addresses.id_client;`;
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
                    street: row.address,
                    zipcode: row.zipcode,
                    city: row.city
                };
                return client;
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
                row.id_address, 
                row.phone_number
            );
            client.idAddress = {
                street: row.address, 
                zipcode: row.zipcode, 
                city: row.city
            };
            callback(null, client);
        });
    }

    static createClient(category, firstname, lastname, email, addressDetails, phoneNumber, callback) {
        //première requête insérer l'adresse
        const createAddressQuery = 'INSERT INTO addresses (address, city, zipcode) VALUES ($1, $2, $3) RETURNING id_address';
        const addressValues = [addressDetails.address, addressDetails.city, addressDetails.zipcode];
    
        pool.query(createAddressQuery, addressValues, (error, addressResult) => {
            if (error) {
                return callback(error, null);
            }
            const addressId = addressResult.rows[0].id_address;
    
            //deuxième requête insérer le client
            const createClientQuery = 'INSERT INTO clients (category, firstname, lastname, email, phone_number) VALUES ($1, $2, $3, $4, $5) RETURNING id_client, category, firstname, lastname, email, phone_number';
            const clientValues = [category, firstname, lastname, email, phoneNumber];
    
            pool.query(createClientQuery, clientValues, (error, clientResult) => {
                if (error) {
                    return callback(error, null);
                }
                const clientId = clientResult.rows[0].id_client;
    
                //troisième requête mettre à jour l'adresse avec l'id_client créé
                const updateAddressQuery = 'UPDATE addresses SET id_client = $1 WHERE id_address = $2 RETURNING id_address, address, city, zipcode, id_client';
                const updateValues = [clientId, addressId];
    
                pool.query(updateAddressQuery, updateValues, (error, updateResult) => {
                    if (error) {
                        return callback(error, null);
                    }
                    const row = clientResult.rows[0];
                    const updatedAddress = updateResult.rows[0];
                    const newClient = {
                        idClient: row.id_client,
                        category: row.category,
                        firstname: row.firstname,
                        lastname: row.lastname,
                        email: row.email,
                        phoneNumber: row.phone_number,
                        address: {
                            idAddress: updatedAddress.id_address,
                            address: updatedAddress.address,
                            city: updatedAddress.city,
                            zipcode: updatedAddress.zipcode
                        }
                    };
                    callback(null, newClient);
                });
            });
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