const Company = require("../data/company.data");
const pool = require("../config/db.config");
const Address = require("../data/address.data");

jest.mock("../config/db.config");
jest.mock("../data/address.data");

describe("Company", () => {
    describe("createCompany", () => {
        const mockCompany = {
            phoneNumber: "1234567890",
            idAddress: {
                address: "123 Main St",
                city: "Anytown",
                zipcode: "12345",
            },
            siret: "12345678901234",
            vatNumber: "FR12345678901",
            capital: 100000,
            logo: "base64string",
            databaseVersion: "1.0",
        };

        const mockAddressResult = { rows: [{ id_address: 1 }] };
        const mockCompanyResult = {
            rows: [
                {
                    id_company: 1,
                    phone_number: "1234567890",
                    id_address: 1,
                    siret: "12345678901234",
                    vat_number: "FR12345678901",
                    capital: 100000,
                    logo: Buffer.from("base64string", "base64"),
                    database_version: "1.0",
                },
            ],
        };

        beforeEach(() => {
            pool.query
                .mockImplementationOnce((query, values, callback) => {
                    callback(null, mockAddressResult);
                })
                .mockImplementationOnce((query, values, callback) => {
                    callback(null, mockCompanyResult);
                });
        });

        it("should create a new company and return it", (done) => {
            Company.createCompany(mockCompany, (error, newCompany) => {
                expect(error).toBeNull();
                expect(newCompany).toEqual(
                    expect.objectContaining({
                        idCompany: 1,
                        phoneNumber: "1234567890",
                        idAddress: expect.objectContaining({
                            id_address: 1,
                            address: "123 Main St",
                            city: "Anytown",
                            zipcode: "12345",
                        }),
                        siret: "12345678901234",
                        vatNumber: "FR12345678901",
                        capital: 100000,
                        logo: "base64string",
                        databaseVersion: "1.0",
                    })
                );
                done();
            });
        });
    });

    describe("getCompany", () => {
        it("should retrieve the company information", (done) => {
            const mockCompanyResult = {
                rows: [
                    {
                        id_company: 1,
                        phone_number: "1234567890",
                        id_address: 1,
                        siret: "12345678901234",
                        vat_number: "FR12345678901",
                        capital: 100000,
                        logo: Buffer.from("base64string", "base64"),
                        database_version: "1.0",
                    },
                ],
            };

            const mockAddress = {
                id_address: 1,
                address: "123 Main St",
                city: "Anytown",
                zipcode: "12345",
            };

            pool.query.mockImplementationOnce((query, callback) => {
                callback(null, mockCompanyResult);
            });

            Address.getAddressById.mockImplementationOnce((id, callback) => {
                callback(null, mockAddress);
            });

            Company.getCompany((error, company) => {
                expect(error).toBeNull();
                expect(company).toEqual(
                    expect.objectContaining({
                        idCompany: 1,
                        phoneNumber: "1234567890",
                        idAddress: expect.objectContaining({
                            id_address: 1,
                            address: "123 Main St",
                            city: "Anytown",
                            zipcode: "12345",
                        }),
                        siret: "12345678901234",
                        vatNumber: "FR12345678901",
                        capital: 100000,
                        logo: "base64string",
                        databaseVersion: "1.0",
                    })
                );
                done();
            });
        });
    });

    describe("updateCompany", () => {
        const mockCompany = {
            idCompany: 1,
            phoneNumber: "1234567890",
            idAddress: {
                idAddress: 1,
                address: "123 Main St",
                city: "Anytown",
                zipcode: "12345",
            },
            siret: "12345678901234",
            vatNumber: "FR12345678901",
            capital: 100000,
            logo: "base64string",
            databaseVersion: "1.0",
        };

        const mockAddressResult = {
            rows: [
                {
                    id_address: 1,
                    address: "123 Main St",
                    city: "Anytown",
                    zipcode: "12345",
                },
            ],
        };

        const mockCompanyResult = {
            rows: [
                {
                    id_company: 1,
                    phone_number: "1234567890",
                    id_address: 1,
                    siret: "12345678901234",
                    vat_number: "FR12345678901",
                    capital: 100000,
                    logo: Buffer.from("base64string", "base64"),
                    database_version: "1.0",
                },
            ],
        };

        beforeEach(() => {
            pool.query
                .mockImplementationOnce((query, values, callback) => {
                    callback(null, mockAddressResult);
                })
                .mockImplementationOnce((query, values, callback) => {
                    callback(null, mockCompanyResult);
                });
        });

        it("should update the company information and return it", (done) => {
            Address.getAddressById.mockImplementationOnce((id, callback) => {
                callback(null, mockCompany.idAddress);
            });

            Company.updateCompany(mockCompany, (error, updatedCompany) => {
                expect(error).toBeNull();
                expect(updatedCompany).toEqual(
                    expect.objectContaining({
                        idCompany: 1,
                        phoneNumber: "1234567890",
                        idAddress: expect.objectContaining({
                            idAddress: 1,
                            address: "123 Main St",
                            city: "Anytown",
                            zipcode: "12345",
                        }),
                        siret: "12345678901234",
                        vatNumber: "FR12345678901",
                        capital: 100000,
                        logo: "base64string",
                        databaseVersion: "1.0",
                    })
                );
                done();
            });
        });
    });
});
