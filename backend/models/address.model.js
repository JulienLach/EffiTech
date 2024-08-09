const pool = require('../config/db.config'); // Importer la configuration de la base de données

class Address {
    constructor(idAddress, address, city, zipcode) {
        this.idAddress = idAddress;
        this.address = address;
        this.city = city;
        this.zipcode = zipcode;
    }

    static async getAddressById(idAddress) {
        const query = 'SELECT * FROM addresses WHERE idAddress = $1';
        const values = [idAddress];
        const result = await pool.query(query, values);
        return result.rows[0];
    }
    
    static async createAddress(address, city, zipcode) {
        const query = 'INSERT INTO addresses (address, city, zipcode) VALUES ($1, $2, $3) RETURNING *';
        const values = [address, city, zipcode];
        const result = await pool.query(query, values);
        return result.rows[0];
    }
}

module.exports = Address;