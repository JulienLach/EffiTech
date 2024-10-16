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

    static updateCompany(company, callback) {
        const query =
            "UPDATE companies SET phone_number = $1, id_address = $2, siret = $3, vat_number = $4, capital = $5, logo = $6, database_version = $7 WHERE id_company = $8 RETURNING *";
        const values = [
            company.phoneNumber,
            company.idAddress,
            company.siret,
            company.vatNumber,
            company.capital,
            company.logo,
            company.databaseVersion,
            company.idCompany,
        ];

        pool.query(query, values, (error, result) => {
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
