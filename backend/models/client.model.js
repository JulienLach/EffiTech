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

    static async getAllClients() {
        const result = await pool.query('SELECT * FROM clients');
        return result.rows;
    }

    // suite des méthodes
}

module.exports = Client;