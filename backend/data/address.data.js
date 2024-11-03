const pool = require("../config/db.config"); // Importer la configuration de la base de données

class Address {
    constructor(idAddress, address, city, zipcode, idClient) {
        this.idAddress = idAddress;
        this.address = address;
        this.city = city;
        this.zipcode = zipcode;
        this.idClient = idClient;
    }

    static getAddressById(idAddress, callback) {
        const query = "SELECT * FROM addresses WHERE id_address = $1";
        const values = [idAddress];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const row = result.rows[0];
            const address = new Address(
                row.id_address,
                row.address,
                row.city,
                row.zipcode,
                row.id_client
            );
            callback(null, address);
        });
    }

    static createAddress(address, city, zipcode, idClient, callback) {
        const query =
            "INSERT INTO addresses (address, city, zipcode, id_client) VALUES ($1, $2, $3, $4) RETURNING *";
        const values = [address, city, zipcode, idClient];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            // Récupérer la première ligne du résultat
            const row = result.rows[0];
            // Créer un nouvel objet Address avec les données de la ligne SQL
            const newAddress = new Address(
                row.id_address,
                row.address,
                row.city,
                row.zipcode,
                row.id_client
            );
            // Retourner l'objet Address avec ses données par le callback
            callback(null, newAddress);
        });
    }
}

module.exports = Address;
