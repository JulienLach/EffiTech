const pool = require("../config/db.config");
const Address = require("./address.data");

/**
 * Classe représentant une société.
 */
class Company {
    /**
     * Crée une instance de Company.
     * @param {number} idCompany - L'ID de la société.
     * @param {string} phoneNumber - Le numéro de téléphone de la société.
     * @param {Object} idAddress - L'adresse de la société.
     * @param {string} siret - Le numéro SIRET de la société.
     * @param {string} vatNumber - Le numéro de TVA de la société.
     * @param {number} capital - Le capital de la société.
     * @param {string} logo - Le logo de la société en base64.
     * @param {string} databaseVersion - La version de la base de données.
     */
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

    /**
     * Crée une nouvelle société.
     * @param {Object} company - Les détails de la société.
     * @param {function} callback - La fonction de rappel.
     */
    static createCompany(company, callback) {
        // console.log("Données reçues pour la création de la société :", company);

        // Première requête : insérer l'adresse
        const createAddressQuery =
            "INSERT INTO addresses (address, city, zipcode) VALUES ($1, $2, $3) RETURNING id_address";
        const addressValues = [
            company.idAddress.address,
            company.idAddress.city,
            company.idAddress.zipcode,
        ];

        pool.query(
            createAddressQuery,
            addressValues,
            function (error, addressResult) {
                if (error) {
                    console.error(
                        "Erreur lors de l'insertion de l'adresse :",
                        error
                    );
                    return callback(error, null);
                }
                const addressId = addressResult.rows[0].id_address;
                // console.log("Adresse insérée avec succès, ID :", addressId);

                // Deuxième requête : insérer la société
                const createCompanyQuery =
                    "INSERT INTO companies (phone_number, id_address, siret, vat_number, capital, logo, database_version) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
                const companyValues = [
                    company.phoneNumber,
                    addressId, // Utiliser l'ID de la nouvelle adresse
                    company.siret,
                    company.vatNumber,
                    company.capital,
                    Buffer.from(company.logo, "base64"), // Convertir la chaîne base64 en Buffer
                    company.databaseVersion,
                ];

                pool.query(
                    createCompanyQuery,
                    companyValues,
                    function (error, companyResult) {
                        if (error) {
                            console.error(
                                "Erreur lors de l'insertion de la société :",
                                error
                            );
                            return callback(error, null);
                        }

                        const row = companyResult.rows[0];
                        // console.log(
                        //     "Société insérée avec succès, données :",
                        //     row
                        // );

                        // Convertir l'image en base64
                        let logoBase64 = null;
                        if (row.logo) {
                            logoBase64 = row.logo.toString("base64");
                        }

                        const newCompany = new Company(
                            row.id_company,
                            row.phone_number,
                            {
                                id_address: addressId,
                                address: company.idAddress.address,
                                city: company.idAddress.city,
                                zipcode: company.idAddress.zipcode,
                            }, // Utiliser l'objet adresse créé
                            row.siret,
                            row.vat_number,
                            row.capital,
                            logoBase64,
                            row.database_version
                        );
                        callback(null, newCompany);
                    }
                );
            }
        );
    }

    /**
     * Récupère les informations de la société.
     * @param {function} callback - La fonction de rappel.
     */
    static getCompany(callback) {
        const query = "SELECT * FROM companies";
        pool.query(query, (error, result) => {
            if (error) {
                return callback(error);
            }

            const row = result.rows[0];

            if (!row) {
                return callback(null, null);
            }

            Address.getAddressById(row.id_address, function (error, address) {
                if (error) {
                    return callback(error, null);
                }

                // Convertir l'image en base64
                let logoBase64 = null;
                if (row.logo) {
                    logoBase64 = row.logo.toString("base64");
                }

                const company = new Company(
                    row.id_company,
                    row.phone_number,
                    address,
                    row.siret,
                    row.vat_number,
                    row.capital,
                    logoBase64,
                    row.database_version
                );
                callback(null, company);
            });
        });
    }

    /**
     * Met à jour les informations de la société.
     * @param {Object} company - Les détails de la société.
     * @param {function} callback - La fonction de rappel.
     */
    static updateCompany(company, callback) {
        // Première requête : mettre à jour l'adresse
        const updateAddressQuery =
            "UPDATE addresses SET address = $1, city = $2, zipcode = $3 WHERE id_address = $4 RETURNING *";
        const addressValues = [
            company.idAddress.address,
            company.idAddress.city,
            company.idAddress.zipcode,
            company.idAddress.idAddress,
        ];

        pool.query(updateAddressQuery, addressValues, (error) => {
            if (error) {
                return callback(error);
            }

            // Deuxième requête : mettre à jour la société
            const query =
                "UPDATE companies SET phone_number = $1, id_address = $2, siret = $3, vat_number = $4, capital = $5, logo = $6, database_version = $7 WHERE id_company = $8 RETURNING *";
            const values = [
                company.phoneNumber,
                company.idAddress.idAddress,
                company.siret,
                company.vatNumber,
                company.capital,
                Buffer.from(company.logo, "base64"), // Convertir la chaîne base64 en Buffer
                company.databaseVersion,
                company.idCompany,
            ];

            pool.query(query, values, (error, result) => {
                if (error) {
                    return callback(error);
                }

                const row = result.rows[0];

                Address.getAddressById(
                    row.id_address,
                    function (error, address) {
                        if (error) {
                            return callback(error, null);
                        }

                        // Convertir l'image en base64
                        let logoBase64 = null;
                        if (row.logo) {
                            logoBase64 = row.logo.toString("base64");
                        }

                        const updatedCompany = new Company(
                            row.id_company,
                            row.phone_number,
                            address,
                            row.siret,
                            row.vat_number,
                            row.capital,
                            logoBase64,
                            row.database_version
                        );
                        callback(null, updatedCompany);
                    }
                );
            });
        });
    }
}

module.exports = Company;
