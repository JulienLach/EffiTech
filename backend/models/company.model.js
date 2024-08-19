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

    static getCompanyById(idCompany, callback) {
        const query = 'SELECT * FROM companies WHERE idCompany = $1';
        const values = [idCompany];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error);
            }
            return callback(null, result.rows[0]);
        });
    }
}

module.exports = Company;