const pool = require("../config/db.config");
const Address = require("./address.data");

class Company {
    constructor(
        idCompany,
        phoneNumber,
        idAddress,
        siret,
        vatNumber,
        capital,
        logo,
        databaseVersion
    ) {
        this.idCompany = idCompany;
        this.phoneNumber = phoneNumber;
        this.idAddress = idAddress;
        this.siret = siret;
        this.vatNumber = vatNumber;
        this.capital = capital;
        this.logo = logo;
        this.databaseVersion = databaseVersion;
    }

    static getCompany(callback) {
        const query = "SELECT * FROM companies";
        pool.query(query, (error, result) => {
            if (error) {
                return callback(error);
            }

            const row = result.rows[0];

            Address.getAddressById(row.id_address, function (error, address) {
                if (error) {
                    return callback(error, null);
                }

                let company = new Company(
                    row.id_company,
                    row.phone_number,
                    address,
                    row.siret,
                    row.vat_number,
                    row.capital,
                    row.logo,
                    row.database_version
                );
                callback(null, company);
            });
        });
    }
}

module.exports = Company;
