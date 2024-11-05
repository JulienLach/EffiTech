const Client = require("../data/client.data");
const pool = require("../config/db.config");
const Address = require("../data/address.data");

jest.mock("../config/db.config");

describe("Client", () => {
    describe("getAllClients", () => {
        const mockClients = [
            {
                id_client: 1,
                category: "Business",
                firstname: "John",
                lastname: "Doe",
                email: "john.doe@example.com",
                id_address: 1,
                address: "123 Main St",
                city: "Anytown",
                zipcode: "12345",
                phone_number: "1234567890",
                company: "Doe Inc.",
            },
            {
                id_client: 2,
                category: "Individual",
                firstname: "Jane",
                lastname: "Smith",
                email: "jane.smith@example.com",
                id_address: 2,
                address: "456 Elm St",
                city: "Othertown",
                zipcode: "67890",
                phone_number: "0987654321",
                company: "Smith LLC",
            },
        ];

        beforeEach(() => {
            pool.query.mockImplementation((query, callback) => {
                callback(null, { rows: mockClients });
            });
        });

        it("should retrieve all clients", (done) => {
            Client.getAllClients((error, clients) => {
                expect(error).toBeNull();
                expect(clients).toHaveLength(2);
                expect(clients[0]).toEqual(
                    expect.objectContaining({
                        idClient: 1,
                        category: "Business",
                        firstname: "John",
                        lastname: "Doe",
                        email: "john.doe@example.com",
                        address: expect.any(Address),
                        phoneNumber: "1234567890",
                        company: "Doe Inc.",
                    })
                );
                expect(clients[0].address).toEqual(
                    expect.objectContaining({
                        idAddress: 1,
                        address: "123 Main St",
                        city: "Anytown",
                        zipcode: "12345",
                    })
                );
                expect(clients[1]).toEqual(
                    expect.objectContaining({
                        idClient: 2,
                        category: "Individual",
                        firstname: "Jane",
                        lastname: "Smith",
                        email: "jane.smith@example.com",
                        address: expect.any(Address),
                        phoneNumber: "0987654321",
                        company: "Smith LLC",
                    })
                );
                expect(clients[1].address).toEqual(
                    expect.objectContaining({
                        idAddress: 2,
                        address: "456 Elm St",
                        city: "Othertown",
                        zipcode: "67890",
                    })
                );
                done();
            });
        });
    });
});

describe("Client", () => {
    describe("getClientById", () => {
        const mockClient = {
            id_client: 1,
            category: "Business",
            firstname: "John",
            lastname: "Doe",
            email: "john.doe@example.com",
            id_address: 1,
            address: "123 Main St",
            city: "Anytown",
            zipcode: "12345",
            phone_number: "1234567890",
            company: "Doe Inc.",
        };

        beforeEach(() => {
            pool.query.mockImplementation((query, values, callback) => {
                callback(null, { rows: [mockClient] });
            });
        });

        it("should retrieve a client by ID", (done) => {
            Client.getClientById(1, (error, client) => {
                expect(error).toBeNull();
                expect(client).toEqual(
                    expect.objectContaining({
                        idClient: 1,
                        category: "Business",
                        firstname: "John",
                        lastname: "Doe",
                        email: "john.doe@example.com",
                        address: expect.any(Address),
                        phoneNumber: "1234567890",
                        company: "Doe Inc.",
                    })
                );
                expect(client.address).toEqual(
                    expect.objectContaining({
                        idAddress: 1,
                        address: "123 Main St",
                        city: "Anytown",
                        zipcode: "12345",
                    })
                );
                done();
            });
        });
    });
});

describe("Client", () => {
    describe("createClient", () => {
        const mockAddressDetails = {
            address: "123 Main St",
            city: "Anytown",
            zipcode: "12345",
        };

        const mockClient = {
            id_client: 1,
            category: "Business",
            firstname: "John",
            lastname: "Doe",
            email: "john.doe@example.com",
            phone_number: "1234567890",
            company: "Doe Inc.",
        };

        const mockAddress = {
            id_address: 1,
            address: "123 Main St",
            city: "Anytown",
            zipcode: "12345",
            id_client: 1,
        };

        beforeEach(() => {
            pool.query.mockImplementation((query, values, callback) => {
                if (query.includes("INSERT INTO addresses")) {
                    callback(null, { rows: [{ id_address: 1 }] });
                } else if (query.includes("INSERT INTO clients")) {
                    callback(null, { rows: [mockClient] });
                } else if (query.includes("UPDATE addresses")) {
                    callback(null, { rows: [mockAddress] });
                }
            });
        });

        it("should create a new client", (done) => {
            Client.createClient(
                "Business",
                "Doe Inc.",
                "John",
                "Doe",
                "john.doe@example.com",
                mockAddressDetails,
                "1234567890",
                (error, newClient) => {
                    expect(error).toBeNull();
                    expect(newClient).toEqual(
                        expect.objectContaining({
                            idClient: 1,
                            category: "Business",
                            firstname: "John",
                            lastname: "Doe",
                            email: "john.doe@example.com",
                            address: expect.any(Address),
                            phoneNumber: "1234567890",
                            company: "Doe Inc.",
                        })
                    );
                    expect(newClient.address).toEqual(
                        expect.objectContaining({
                            idAddress: 1,
                            address: "123 Main St",
                            city: "Anytown",
                            zipcode: "12345",
                        })
                    );
                    done();
                }
            );
        });
    });
});

describe("Client", () => {
    describe("updateClient", () => {
        const mockClientData = {
            idClient: 1,
            category: "Business",
            firstname: "John",
            lastname: "Doe",
            email: "john.doe@example.com",
            phoneNumber: "1234567890",
            company: "Doe Inc.",
            addressDetails: {
                address: "123 Main St",
                city: "Anytown",
                zipcode: "12345",
            },
        };

        const mockUpdatedClient = {
            id_client: 1,
            category: "Business",
            firstname: "John",
            lastname: "Doe",
            email: "john.doe@example.com",
            phone_number: "1234567890",
            company: "Doe Inc.",
        };

        const mockUpdatedAddress = {
            id_address: 1,
            address: "123 Main St",
            city: "Anytown",
            zipcode: "12345",
            id_client: 1,
        };

        beforeEach(() => {
            pool.query.mockImplementation((query, values, callback) => {
                if (query.includes("UPDATE clients")) {
                    callback(null, { rows: [mockUpdatedClient] });
                } else if (query.includes("UPDATE addresses")) {
                    callback(null, { rows: [mockUpdatedAddress] });
                }
            });
        });

        it("should update a client", (done) => {
            Client.updateClient(mockClientData, (error, result) => {
                expect(error).toBeNull();
                expect(result.updatedClient).toEqual(
                    expect.objectContaining({
                        idClient: 1,
                        category: "Business",
                        firstname: "John",
                        lastname: "Doe",
                        email: "john.doe@example.com",
                        address: expect.any(Address),
                        phoneNumber: "1234567890",
                        company: "Doe Inc.",
                    })
                );
                expect(result.updatedClient.address).toEqual(
                    expect.objectContaining({
                        idAddress: 1,
                        address: "123 Main St",
                        city: "Anytown",
                        zipcode: "12345",
                    })
                );
                done();
            });
        });
    });
});
