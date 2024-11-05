const Address = require("../data/address.data");
const pool = require("../config/db.config");

jest.mock("../config/db.config");

describe("Address", () => {
    describe("getAddressById", () => {
        const mockAddress = {
            id_address: 1,
            address: "123 Main St",
            city: "Anytown",
            zipcode: "12345",
            id_client: 1,
        };

        beforeEach(() => {
            pool.query.mockImplementation((query, values, callback) => {
                if (values[0] === 1) {
                    callback(null, { rows: [mockAddress] });
                } else {
                    callback(null, { rows: [] });
                }
            });
        });

        it("should retrieve an address by ID", (done) => {
            Address.getAddressById(1, (error, address) => {
                expect(error).toBeNull();
                expect(address).toEqual(
                    expect.objectContaining({
                        idAddress: 1,
                        address: "123 Main St",
                        city: "Anytown",
                        zipcode: "12345",
                        idClient: 1,
                    })
                );
                done();
            });
        });
    });

    describe("createAddress", () => {
        const mockAddress = {
            id_address: 1,
            address: "123 Main St",
            city: "Anytown",
            zipcode: "12345",
            id_client: 1,
        };

        beforeEach(() => {
            pool.query.mockImplementation((query, values, callback) => {
                callback(null, { rows: [mockAddress] });
            });
        });

        it("should create a new address and return it", (done) => {
            Address.createAddress(
                "123 Main St",
                "Anytown",
                "12345",
                1,
                (error, newAddress) => {
                    expect(error).toBeNull();
                    expect(newAddress).toEqual(
                        expect.objectContaining({
                            idAddress: 1,
                            address: "123 Main St",
                            city: "Anytown",
                            zipcode: "12345",
                            idClient: 1,
                        })
                    );
                    done();
                }
            );
        });

        it("should return an error if the address creation fails", (done) => {
            pool.query.mockImplementation((query, values, callback) => {
                callback(new Error("Failed to create address"), null);
            });

            Address.createAddress(
                "123 Main St",
                "Anytown",
                "12345",
                1,
                (error, newAddress) => {
                    expect(error).toEqual(
                        new Error("Failed to create address")
                    );
                    expect(newAddress).toBeNull();
                    done();
                }
            );
        });
    });
});
