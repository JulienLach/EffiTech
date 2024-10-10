const pool = require("../config/db.config"); // Importer la configuration de la base de données
const Address = require("./address.data");

class Client {
    constructor(
        idClient,
        category,
        firstname,
        lastname,
        email,
        address,
        phoneNumber,
        company
    ) {
        this.idClient = idClient;
        this.category = category;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.company = company;
    }

    static getAllClients(callback) {
        const query = `
            SELECT * FROM clients LEFT JOIN addresses ON clients.id_client = addresses.id_client;`;
        pool.query(query, function (error, result) {
            if (error) {
                return callback(error, null);
            }
            const clients = result.rows.map(function (row) {
                const address = new Address(
                    row.id_address,
                    row.address,
                    row.city,
                    row.zipcode
                );
                return new Client(
                    row.id_client,
                    row.category,
                    row.firstname,
                    row.lastname,
                    row.email,
                    address,
                    row.phone_number,
                    row.company
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
        pool.query(query, values, function (error, result) {
            if (error) {
                return callback(error, null);
            }
            const row = result.rows[0];
            const address = new Address(
                row.id_address,
                row.address,
                row.city,
                row.zipcode
            );
            const client = new Client(
                row.id_client,
                row.category,
                row.firstname,
                row.lastname,
                row.email,
                address,
                row.phone_number
            );
            callback(null, client);
        });
    }

    static createClient(
        category,
        firstname,
        lastname,
        email,
        addressDetails,
        phoneNumber,
        callback
    ) {
        // Première requête : insérer l'adresse
        const createAddressQuery =
            "INSERT INTO addresses (address, city, zipcode) VALUES ($1, $2, $3) RETURNING id_address";
        const addressValues = [
            addressDetails.address,
            addressDetails.city,
            addressDetails.zipcode,
        ];

        pool.query(
            createAddressQuery,
            addressValues,
            function (error, addressResult) {
                if (error) {
                    return callback(error, null);
                }
                const addressId = addressResult.rows[0].id_address;

                // Deuxième requête : insérer le client
                const createClientQuery =
                    "INSERT INTO clients (category, firstname, lastname, email, phone_number) VALUES ($1, $2, $3, $4, $5) RETURNING id_client, category, firstname, lastname, email, phone_number";
                const clientValues = [
                    category,
                    firstname,
                    lastname,
                    email,
                    phoneNumber,
                ];

                pool.query(
                    createClientQuery,
                    clientValues,
                    function (error, clientResult) {
                        if (error) {
                            return callback(error, null);
                        }
                        const clientId = clientResult.rows[0].id_client;

                        // Troisième requête : mettre à jour l'adresse avec l'id_client créé
                        const updateAddressQuery =
                            "UPDATE addresses SET id_client = $1 WHERE id_address = $2 RETURNING id_address, address, city, zipcode, id_client";
                        const updateValues = [clientId, addressId];

                        pool.query(
                            updateAddressQuery,
                            updateValues,
                            function (error, updateResult) {
                                if (error) {
                                    return callback(error, null);
                                }
                                const row = clientResult.rows[0];
                                const updatedAddress = updateResult.rows[0];
                                const address = new Address(
                                    updatedAddress.id_address,
                                    updatedAddress.address,
                                    updatedAddress.city,
                                    updatedAddress.zipcode
                                );
                                const newClient = new Client(
                                    row.id_client,
                                    row.category,
                                    row.firstname,
                                    row.lastname,
                                    row.email,
                                    address,
                                    row.phone_number
                                );
                                callback(null, newClient);
                            }
                        );
                    }
                );
            }
        );
    }

    static updateClient(
        idClient,
        category,
        firstname,
        lastname,
        email,
        phoneNumber,
        addressDetails,
        callback
    ) {
        const clientQuery =
            "UPDATE clients SET category = $1, firstname = $2, lastname = $3, email = $4, phone_number = $5 WHERE id_client = $6 RETURNING *";
        const clientValues = [
            category,
            firstname,
            lastname,
            email,
            phoneNumber,
            idClient,
        ];

        // Première requête : mettre à jour le client
        pool.query(clientQuery, clientValues, function (error, clientResult) {
            if (error) {
                return callback(error, null);
            }
            const updatedClientRow = clientResult.rows[0];
            const addressQuery =
                "UPDATE addresses SET address = $1, city = $2, zipcode = $3 WHERE id_client = $4 RETURNING *";
            const addressValues = [
                addressDetails.address,
                addressDetails.city,
                addressDetails.zipcode,
                idClient,
            ];

            // Deuxième requête : mettre à jour l'adresse
            pool.query(
                addressQuery,
                addressValues,
                function (error, addressResult) {
                    if (error) {
                        return callback(error, null);
                    }
                    const updatedAddress = addressResult.rows[0];
                    const address = new Address(
                        updatedAddress.id_address,
                        updatedAddress.address,
                        updatedAddress.city,
                        updatedAddress.zipcode
                    );
                    const updatedClient = new Client(
                        updatedClientRow.id_client,
                        updatedClientRow.category,
                        updatedClientRow.firstname,
                        updatedClientRow.lastname,
                        updatedClientRow.email,
                        address,
                        updatedClientRow.phone_number
                    );
                    callback(null, { updatedClient, updatedAddress });
                }
            );
        });
    }
}

module.exports = Client;
