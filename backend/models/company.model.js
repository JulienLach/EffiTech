const pool = require('../config/db.config'); // Importer la configuration de la base de données

class Company {
    constructor(idCompany, phoneNumber, idAddress, siret, vatNumber, capital, logo, databaseVersion) {
        this.idCompany = idCompany;
        this.phoneNumber = phoneNumber;
        this.idAddress = idAddress;
        this.siret = siret;
        this.vatNumber = vatNumber;
        this.capital = capital;
        this.logo = logo;
        this.databaseVersion = databaseVersion;
    }

    static async getCompanyById(idCompany) {
        const query = 'SELECT * FROM companies WHERE idCompany = $1';
        const values = [idCompany];
        const result = await pool.query(query, values);
        return result.rows[0];
    }
}

module.exports = Company;