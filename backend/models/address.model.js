const pool = require('../config/db.config'); // Importer la configuration de la base de données

class Address {
    constructor(idAddress, address, city, zipcode) {
        this.idAddress = idAddress;
        this.address = address;
        this.city = city;
        this.zipcode = zipcode;
    }

    static async getAddressById() {
        const result = await pool.query('SELECT * FROM addresses WHERE idAddress = $1', [this.idAddress]);
        return result.rows[0];
    }

    static async createAddress() {
        const result = await pool.query('INSERT INTO addresses (address, city, zipcode) VALUES ($1, $2, $3) RETURNING *', [this.address, this.city, this.zipcode]);
        return result.rows[0];
    }
}

module.exports = Address;