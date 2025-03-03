const Employee = require("../data/employee.data");
const pool = require("../config/db.config");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

jest.mock("../config/db.config", () => ({
    query: jest.fn((query, values, callback) => {
        callback(null, { rows: [] }); // Réponse par défaut
    }),
}));
jest.mock("crypto");
jest.mock("jsonwebtoken");

describe("Employee", () => {
    describe("getAllEmployees", () => {
        const mockEmployees = [
            {
                id_employee: 1,
                firstname: "John",
                lastname: "Doe",
                job: "Developer",
                phone_number: "1234567890",
                email: "john.doe@example.com",
                is_admin: true,
                password: "hashedPassword",
                speciality: "JavaScript",
            },
            {
                id_employee: 2,
                firstname: "Jane",
                lastname: "Smith",
                job: "Manager",
                phone_number: "0987654321",
                email: "jane.smith@example.com",
                is_admin: false,
                password: "hashedPassword",
                speciality: "Management",
            },
        ];

        beforeEach(() => {
            pool.query.mockImplementation((query, callback) => {
                callback(null, { rows: mockEmployees });
            });
        });

        it("should retrieve all employees", (done) => {
            Employee.getAllEmployees((error, employees) => {
                expect(error).toBeNull();
                expect(employees).toHaveLength(2);
                expect(employees[0]).toEqual(
                    expect.objectContaining({
                        idEmployee: 1,
                        firstname: "John",
                        lastname: "Doe",
                        job: "Developer",
                        phoneNumber: "1234567890",
                        email: "john.doe@example.com",
                        isAdmin: true,
                        password: "hashedPassword",
                        speciality: "JavaScript",
                    })
                );
                expect(employees[1]).toEqual(
                    expect.objectContaining({
                        idEmployee: 2,
                        firstname: "Jane",
                        lastname: "Smith",
                        job: "Manager",
                        phoneNumber: "0987654321",
                        email: "jane.smith@example.com",
                        isAdmin: false,
                        password: "hashedPassword",
                        speciality: "Management",
                    })
                );
                done();
            });
        });
    });

    describe("getEmployeeById", () => {
        const mockEmployee = {
            id_employee: 1,
            firstname: "John",
            lastname: "Doe",
            job: "Developer",
            phone_number: "1234567890",
            email: "john.doe@example.com",
            is_admin: true,
            password: "hashedPassword",
            speciality: "JavaScript",
        };

        beforeEach(() => {
            pool.query.mockImplementation((query, values, callback) => {
                if (values[0] === 1) {
                    callback(null, { rows: [mockEmployee] });
                } else {
                    callback(null, { rows: [] });
                }
            });
        });

        it("should retrieve an employee by ID", (done) => {
            Employee.getEmployeeById(1, (error, employee) => {
                expect(error).toBeNull();
                expect(employee).toEqual(
                    expect.objectContaining({
                        idEmployee: 1,
                        firstname: "John",
                        lastname: "Doe",
                        job: "Developer",
                        phoneNumber: "1234567890",
                        email: "john.doe@example.com",
                        isAdmin: true,
                        password: "hashedPassword",
                        speciality: "JavaScript",
                    })
                );
                done();
            });
        });
    });

    describe("createEmployee", () => {
        const mockEmployee = {
            id_employee: 1,
            firstname: "John",
            lastname: "Doe",
            job: "Developer",
            phone_number: "1234567890",
            email: "john.doe@example.com",
            is_admin: true,
            password: "hashedPassword",
            speciality: "JavaScript",
        };

        const mockToken = "mockToken";

        beforeEach(() => {
            pool.query.mockImplementation((query, values, callback) => {
                callback(null, { rows: [mockEmployee] });
            });

            const hash = {
                update: jest.fn().mockReturnThis(),
                digest: jest.fn().mockReturnValue("hashedPassword"),
            };
            crypto.createHash.mockReturnValue(hash);

            jwt.sign.mockReturnValue(mockToken);
        });

        it("should create a new employee and return it", (done) => {
            Employee.createEmployee(
                "John",
                "Doe",
                "Developer",
                "1234567890",
                "john.doe@example.com",
                true,
                "password",
                "JavaScript",
                (error, newEmployee) => {
                    expect(error).toBeNull();
                    expect(newEmployee).toEqual(
                        expect.objectContaining({
                            idEmployee: 1,
                            firstname: "John",
                            lastname: "Doe",
                            job: "Developer",
                            phoneNumber: "1234567890",
                            email: "john.doe@example.com",
                            isAdmin: true,
                            password: "hashedPassword",
                            speciality: "JavaScript",
                        })
                    );
                    done();
                }
            );
        });
    });

    describe("updateEmployee", () => {
        const mockEmployee = {
            id_employee: 1,
            firstname: "John",
            lastname: "Doe",
            job: "Developer",
            phone_number: "1234567890",
            email: "john.doe@example.com",
            is_admin: true,
            password: "hashedPassword",
            speciality: "JavaScript",
        };

        beforeEach(() => {
            pool.query.mockImplementation((query, values, callback) => {
                callback(null, { rows: [mockEmployee] });
            });
        });

        it("should update an employee and return it", (done) => {
            Employee.updateEmployee(
                1,
                "John",
                "Doe",
                "Developer",
                "1234567890",
                "john.doe@example.com",
                true,
                "hashedPassword",
                "JavaScript",
                (error, updatedEmployee) => {
                    expect(error).toBeNull();
                    expect(updatedEmployee).toEqual(
                        expect.objectContaining({
                            idEmployee: 1,
                            firstname: "John",
                            lastname: "Doe",
                            job: "Developer",
                            phoneNumber: "1234567890",
                            email: "john.doe@example.com",
                            isAdmin: true,
                            password: "hashedPassword",
                            speciality: "JavaScript",
                        })
                    );
                    done();
                }
            );
        });
    });

    describe("loginEmployee", () => {
        beforeEach(() => {
            // Réinitialiser les mocks avant chaque test
            pool.query.mockClear();
            crypto.createHash.mockClear();
            jwt.sign.mockClear();
            // Mocker console.error pour éviter les logs
            jest.spyOn(console, "error").mockImplementation(() => {});
        });

        afterEach(() => {
            // Restaurer console.error après chaque test
            console.error.mockRestore();
        });

        it("should return an error if the employee is not found", (done) => {
            pool.query.mockImplementation((query, values, callback) => {
                callback(null, { rows: [] });
            });

            const res = {
                setHeader: jest.fn(),
            };

            Employee.loginEmployee(
                "test@gmail.com",
                "test",
                res,
                (error, employee) => {
                    expect(error).toEqual(
                        new Error("Compte employé non trouvé")
                    );
                    expect(employee).toBeNull();
                    done();
                }
            );
        });

        it("should return an error if the password is invalid", (done) => {
            pool.query.mockImplementation((query, values, callback) => {
                callback(null, {
                    rows: [
                        {
                            password: "validHashedPassword",
                        },
                    ],
                });
            });

            const hash = {
                update: jest.fn().mockReturnThis(),
                digest: jest.fn().mockReturnValue("invalidHashedPassword"),
            };
            crypto.createHash.mockReturnValue(hash);

            const res = {
                setHeader: jest.fn(),
            };

            Employee.loginEmployee(
                "test@gmail.com",
                "test",
                res,
                (error, employee) => {
                    expect(error).toEqual(new Error("Mot de passe invalide"));
                    expect(employee).toBeNull();
                    done();
                }
            );
        });

        it("should login the employee with valid credentials", (done) => {
            pool.query.mockImplementation((query, values, callback) => {
                callback(null, {
                    rows: [
                        {
                            id_employee: 1,
                            firstname: "John",
                            lastname: "Doe",
                            job: "Developer",
                            phone_number: "1234567890",
                            email: "test@gmail.com",
                            is_admin: false,
                            password: "validHashedPassword",
                            speciality: "JavaScript",
                        },
                    ],
                });
            });

            const hash = {
                update: jest.fn().mockReturnThis(),
                digest: jest.fn().mockReturnValue("validHashedPassword"),
            };
            crypto.createHash.mockReturnValue(hash);

            const token = "validToken";
            jwt.sign.mockReturnValue(token);

            const res = {
                setHeader: jest.fn(),
            };

            Employee.loginEmployee(
                "test@gmail.com",
                "validPassword",
                res,
                (error, employee) => {
                    expect(error).toBeNull();
                    expect(employee).toEqual(
                        expect.objectContaining({
                            idEmployee: 1,
                            firstname: "John",
                            lastname: "Doe",
                            job: "Developer",
                            phoneNumber: "1234567890",
                            email: "test@gmail.com",
                            isAdmin: false,
                            password: "validHashedPassword",
                            speciality: "JavaScript",
                        })
                    );
                    expect(res.setHeader).toHaveBeenCalledWith(
                        "Set-Cookie",
                        `token=${token}; HttpOnly; Max-Age=10800; Path=/`
                    );
                    done();
                }
            );
        });
    });
});
