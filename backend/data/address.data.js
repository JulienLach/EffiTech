const pool = require('../config/db.config'); // Importer la configuration de la base de données

class Address {
    constructor(idAddress, address, city, zipcode) {
        this.idAddress = idAddress;
        this.address = address;
        this.city = city;
        this.zipcode = zipcode;
    }

    static getAddressById(idAddress, callback) {
        const query = 'SELECT * FROM addresses WHERE idAddress = $1';
        const values = [idAddress];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, result.rows[0]);
        });
    }
    
    static createAddress(address, city, zipcode, callback) {
        const query = 'INSERT INTO addresses (address, city, zipcode) VALUES ($1, $2, $3) RETURNING *';
        const values = [address, city, zipcode];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, result);
        });
    }
}

module.exports = Address;