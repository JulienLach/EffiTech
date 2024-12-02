const Event = require("../data/event.data");
const Client = require("../data/client.data");
const Employee = require("../data/employee.data");
const pool = require("../config/db.config");

jest.mock("../config/db.config");
jest.mock("../data/client.data");
jest.mock("../data/employee.data");

describe("Event", () => {
    describe("updateEventStatuses", () => {
        beforeEach(() => {
            pool.query.mockImplementation((query, values, callback) => {
                callback(null, { rowCount: 1 });
            });
        });

        it("should update event statuses based on the current date", (done) => {
            Event.updateEventStatuses((error) => {
                expect(error).toBeNull();
                expect(pool.query).toHaveBeenCalledWith(
                    expect.stringContaining("UPDATE events"),
                    expect.any(Array),
                    expect.any(Function)
                );
                done();
            });
        });

        it("should handle errors during the update", (done) => {
            pool.query.mockImplementationOnce((query, values, callback) => {
                callback(new Error("Database error"));
            });

            Event.updateEventStatuses((error) => {
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toBe("Database error");
                done();
            });
        });
    });

    // describe("getAllEvents", () => {
    //     const mockClients = [
    //         {
    //             idClient: 1,
    //             category: "Business",
    //             firstname: "John",
    //             lastname: "Doe",
    //             email: "john.doe@example.com",
    //             address: {
    //                 idAddress: 1,
    //                 address: "123 Main St",
    //                 city: "Anytown",
    //                 zipcode: "12345",
    //             },
    //             phoneNumber: "1234567890",
    //             company: "Doe Inc.",
    //         },
    //     ];

    //     const mockEmployees = [
    //         {
    //             idEmployee: 1,
    //             firstname: "Jane",
    //             lastname: "Smith",
    //             email: "jane.smith@example.com",
    //             phoneNumber: "0987654321",
    //             position: "Manager",
    //         },
    //     ];

    //     const mockEvents = [
    //         {
    //             id_event: 1,
    //             title: "Event 1",
    //             description: "Description 1",
    //             status: 2,
    //             is_planned: true,
    //             type: "Type 1",
    //             starting_date: "2023-10-01",
    //             starting_hour: "10:00",
    //             ending_hour: "12:00",
    //             id_client: 1,
    //             id_employee: 1,
    //             work_to_do: "Work 1",
    //         },
    //     ];

    //     beforeEach(() => {
    //         Client.getAllClients.mockImplementation((callback) => {
    //             callback(null, mockClients);
    //         });

    //         Employee.getAllEmployees.mockImplementation((callback) => {
    //             callback(null, mockEmployees);
    //         });

    //         Event.updateEventStatuses = jest.fn((callback) => {
    //             callback(null);
    //         });

    //         pool.query.mockImplementation((query, callback) => {
    //             callback(null, { rows: mockEvents });
    //         });
    //     });

    //     it("should retrieve all events", (done) => {
    //         Event.getAllEvents((error, events) => {
    //             expect(error).toBeNull();
    //             expect(events).toHaveLength(1);
    //             expect(events[0]).toEqual(
    //                 expect.objectContaining({
    //                     idEvent: 1,
    //                     title: "Event 1",
    //                     description: "Description 1",
    //                     status: 2,
    //                     isPlanned: true,
    //                     type: "Type 1",
    //                     client: expect.objectContaining({
    //                         idClient: 1,
    //                         firstname: "John",
    //                         lastname: "Doe",
    //                     }),
    //                     address: expect.objectContaining({
    //                         address: "123 Main St",
    //                         city: "Anytown",
    //                         zipcode: "12345",
    //                     }),
    //                     startingDate: "2023-10-01",
    //                     startingHour: "10:00",
    //                     endingHour: "12:00",
    //                     employee: expect.objectContaining({
    //                         idEmployee: 1,
    //                         firstname: "Jane",
    //                         lastname: "Smith",
    //                     }),
    //                     workToDo: "Work 1",
    //                 })
    //             );
    //             done();
    //         });
    //     });

    //     it("should handle errors from getAllClients", (done) => {
    //         Client.getAllClients.mockImplementationOnce((callback) => {
    //             callback(new Error("Client error"));
    //         });

    //         Event.getAllEvents((error, events) => {
    //             expect(error).toBeInstanceOf(Error);
    //             expect(error.message).toBe("Client error");
    //             expect(events).toBeNull();
    //             done();
    //         });
    //     });

    //     it("should handle errors from getAllEmployees", (done) => {
    //         Employee.getAllEmployees.mockImplementationOnce((callback) => {
    //             callback(new Error("Employee error"));
    //         });

    //         Event.getAllEvents((error, events) => {
    //             expect(error).toBeInstanceOf(Error);
    //             expect(error.message).toBe("Employee error");
    //             expect(events).toBeNull();
    //             done();
    //         });
    //     });

    //     it("should handle errors from pool.query", (done) => {
    //         pool.query.mockImplementationOnce((query, callback) => {
    //             callback(new Error("Database error"));
    //         });

    //         Event.getAllEvents((error, events) => {
    //             expect(error).toBeInstanceOf(Error);
    //             expect(error.message).toBe("Database error");
    //             expect(events).toBeNull();
    //             done();
    //         });
    //     });
    // });
});

describe("getEventById", () => {
    const mockClient = {
        idClient: 1,
        category: "Business",
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        address: {
            idAddress: 1,
            address: "123 Main St",
            city: "Anytown",
            zipcode: "12345",
        },
        phoneNumber: "1234567890",
        company: "Doe Inc.",
    };

    const mockEmployee = {
        idEmployee: 1,
        firstname: "Jane",
        lastname: "Smith",
        email: "jane.smith@example.com",
        phoneNumber: "0987654321",
        position: "Manager",
    };

    const mockEvent = {
        id_event: 1,
        title: "Event 1",
        description: "Description 1",
        status: 2,
        is_planned: true,
        type: "Type 1",
        starting_date: "2023-10-01",
        starting_hour: "10:00",
        ending_hour: "12:00",
        id_client: 1,
        id_address: 1,
        id_employee: 1,
    };

    beforeEach(() => {
        pool.query = jest.fn((query, values, callback) => {
            callback(null, { rows: [mockEvent] });
        });

        Client.getClientById = jest.fn((id, callback) => {
            callback(null, mockClient);
        });

        Employee.getEmployeeById = jest.fn((id, callback) => {
            callback(null, mockEmployee);
        });
    });

    it("should retrieve an event by its ID", (done) => {
        Event.getEventById(1, (error, event) => {
            expect(error).toBeNull();
            expect(event).toEqual(
                expect.objectContaining({
                    idEvent: 1,
                    title: "Event 1",
                    description: "Description 1",
                    status: 2,
                    isPlanned: true,
                    type: "Type 1",
                    client: expect.objectContaining({
                        idClient: 1,
                        firstname: "John",
                        lastname: "Doe",
                    }),
                    address: expect.objectContaining({
                        address: "123 Main St",
                        city: "Anytown",
                        zipcode: "12345",
                    }),
                    startingDate: "2023-10-01",
                    startingHour: "10:00",
                    endingHour: "12:00",
                    employee: expect.objectContaining({
                        idEmployee: 1,
                        firstname: "Jane",
                        lastname: "Smith",
                    }),
                })
            );
            done();
        });
    });

    it("should handle errors from pool.query", (done) => {
        pool.query.mockImplementationOnce((query, values, callback) => {
            callback(new Error("Database error"));
        });

        Event.getEventById(1, (error, event) => {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Database error");
            expect(event).toBeNull();
            done();
        });
    });

    it("should handle errors from getClientById", (done) => {
        Client.getClientById.mockImplementationOnce((id, callback) => {
            callback(new Error("Client error"));
        });

        Event.getEventById(1, (error, event) => {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Client error");
            expect(event).toBeNull();
            done();
        });
    });

    it("should handle errors from getEmployeeById", (done) => {
        Employee.getEmployeeById.mockImplementationOnce((id, callback) => {
            callback(new Error("Employee error"));
        });

        Event.getEventById(1, (error, event) => {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Employee error");
            expect(event).toBeNull();
            done();
        });
    });
});

describe("createEvent", () => {
    const mockEvent = {
        id_event: 1,
        title: "Event 1",
        description: "Description 1",
        status: 2,
        is_planned: true,
        type: "Type 1",
        id_client: 1,
        id_address: 1,
        starting_date: "2023-10-01",
        starting_hour: "10:00",
        ending_hour: "12:00",
        id_employee: 1,
    };

    beforeEach(() => {
        pool.query = jest.fn((query, values, callback) => {
            callback(null, { rows: [mockEvent] });
        });
    });

    it("should create a new event", (done) => {
        Event.createEvent(
            "Event 1",
            "Description 1",
            2,
            true,
            "Type 1",
            1,
            1,
            "2023-10-01",
            "10:00",
            "12:00",
            1,
            (error, event) => {
                expect(error).toBeNull();
                expect(event).toEqual(
                    expect.objectContaining({
                        idEvent: 1,
                        title: "Event 1",
                        description: "Description 1",
                        status: 2,
                        isPlanned: true,
                        type: "Type 1",
                        client: 1,
                        address: 1,
                        startingDate: "2023-10-01",
                        startingHour: "10:00",
                        endingHour: "12:00",
                        employee: 1,
                        workToDo: undefined,
                    })
                );
                done();
            }
        );
    });

    it("should handle errors from pool.query", (done) => {
        pool.query.mockImplementationOnce((query, values, callback) => {
            callback(new Error("Database error"));
        });

        Event.createEvent(
            "Event 1",
            "Description 1",
            2,
            true,
            "Type 1",
            1,
            1,
            "2023-10-01",
            "10:00",
            "12:00",
            1,
            (error, event) => {
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toBe("Database error");
                expect(event).toBeNull();
                done();
            }
        );
    });
});

// describe("updateEvent", () => {
//     const mockEvent = {
//         id_event: 1,
//         title: "Updated Event",
//         description: "Updated Description",
//         status: 2,
//         is_planned: true,
//         type: "Type 1",
//         id_client: 1,
//         id_address: 1,
//         starting_date: "2023-10-01",
//         starting_hour: "10:00",
//         ending_hour: "12:00",
//         id_employee: 1,
//         work_to_do: "Updated Work",
//     };

//     beforeEach(() => {
//         pool.query = jest.fn((query, values, callback) => {
//             callback(null, { rows: [mockEvent] });
//         });
//     });

//     it("should update an existing event", (done) => {
//         Event.updateEvent(
//             1,
//             "Updated Event",
//             "Updated Description",
//             2,
//             true,
//             "Type 1",
//             1,
//             1,
//             "2023-10-01",
//             "10:00",
//             "12:00",
//             1,
//             "Updated Work",
//             (error, event) => {
//                 expect(error).toBeNull();
//                 expect(event).toEqual(
//                     expect.objectContaining({
//                         idEvent: 1,
//                         title: "Updated Event",
//                         description: "Updated Description",
//                         status: 2,
//                         isPlanned: true,
//                         type: "Type 1",
//                         client: expect.objectContaining({
//                             idClient: 1,
//                             category: undefined,
//                             firstname: undefined,
//                             lastname: undefined,
//                             email: undefined,
//                             address: expect.objectContaining({
//                                 idAddress: 1,
//                                 address: undefined,
//                                 city: undefined,
//                                 zipcode: undefined,
//                             }),
//                             phoneNumber: undefined,
//                             company: undefined,
//                         }),
//                         address: expect.objectContaining({
//                             idAddress: 1,
//                             address: undefined,
//                             city: undefined,
//                             zipcode: undefined,
//                         }),
//                         startingDate: "2023-10-01",
//                         startingHour: "10:00",
//                         endingHour: "12:00",
//                         employee: expect.objectContaining({
//                             idEmployee: 1,
//                             firstname: undefined,
//                             lastname: undefined,
//                             email: undefined,
//                             phoneNumber: undefined,
//                             position: undefined,
//                         }),
//                         workToDo: "Updated Work",
//                     })
//                 );
//                 done();
//             }
//         );
//     });

//     it("should handle errors from pool.query", (done) => {
//         pool.query.mockImplementationOnce((query, values, callback) => {
//             callback(new Error("Database error"));
//         });

//         Event.updateEvent(
//             1,
//             "Updated Event",
//             "Updated Description",
//             2,
//             true,
//             "Type 1",
//             1,
//             1,
//             "2023-10-01",
//             "10:00",
//             "12:00",
//             1,
//             "Updated Work",
//             (error, event) => {
//                 expect(error).toBeInstanceOf(Error);
//                 expect(error.message).toBe("Database error");
//                 expect(event).toBeNull();
//                 done();
//             }
//         );
//     });
// });

describe("deleteEvent", () => {
    const mockEvent = {
        id_event: 1,
        title: "Event 1",
        description: "Description 1",
        status: 2,
        is_planned: true,
        type: "Type 1",
        id_client: 1,
        id_address: 1,
        starting_date: "2023-10-01",
        starting_hour: "10:00",
        ending_hour: "12:00",
        id_employee: 1,
    };

    beforeEach(() => {
        pool.query = jest.fn((query, values, callback) => {
            callback(null, { rows: [mockEvent] });
        });
    });

    it("should delete an event by its ID", (done) => {
        Event.deleteEvent(1, (error, event) => {
            expect(error).toBeNull();
            expect(event).toEqual(
                expect.objectContaining({
                    idEvent: 1,
                    title: "Event 1",
                    description: "Description 1",
                    status: 2,
                    isPlanned: true,
                    type: "Type 1",
                    client: 1,
                    address: 1,
                    startingDate: "2023-10-01",
                    startingHour: "10:00",
                    endingHour: "12:00",
                    employee: 1,
                    workToDo: undefined,
                })
            );
            done();
        });
    });

    it("should handle errors from pool.query", (done) => {
        pool.query.mockImplementationOnce((query, values, callback) => {
            callback(new Error("Database error"));
        });

        Event.deleteEvent(1, (error, event) => {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Database error");
            expect(event).toBeNull();
            done();
        });
    });
});
