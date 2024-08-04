const pool = require('../config/db.config'); // Importer la configuration de la base de données

class Client {
    constructor(id_client, category, firstname, lastname, email, id_address, phoneNumber) {
        this.id_client = id_client;
        this.category = category;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.id_address = id_address;
        this.phoneNumber = phoneNumber;
    }

    static async getAllClients() {
        const result = await pool.query('SELECT * FROM clients');
        return result.rows;
    }

    // suite des méthodes
}

module.exports = Client;