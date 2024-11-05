const Report = require("../data/report.data");
const pool = require("../config/db.config");

jest.mock("../config/db.config");

describe("Report", () => {
    describe("createReport", () => {
        const mockReport = {
            breakdown: "Engine failure",
            workDone: "Replaced engine",
            reschedule: false,
            startingDate: "2023-10-01",
            startingHour: "08:00",
            endingHour: "12:00",
            duration: 4,
            clientSignature: "data:image/png;base64,clientSignatureBase64",
            employeeSignature: "data:image/png;base64,employeeSignatureBase64",
            idEvent: 1,
        };

        const mockReportResult = {
            rows: [
                {
                    id_report: 1,
                    breakdown: "Engine failure",
                    work_done: "Replaced engine",
                    reschedule: false,
                    starting_date: "2023-10-01",
                    starting_hour: "08:00",
                    ending_hour: "12:00",
                    duration: 4,
                    client_signature: Buffer.from(
                        "clientSignatureBase64",
                        "base64"
                    ),
                    employee_signature: Buffer.from(
                        "employeeSignatureBase64",
                        "base64"
                    ),
                    id_event: 1,
                },
            ],
        };

        const mockUpdateEventResult = { rowCount: 1 };

        beforeEach(() => {
            pool.query
                .mockImplementationOnce((query, values, callback) => {
                    callback(null, mockReportResult);
                })
                .mockImplementationOnce((query, values, callback) => {
                    callback(null, mockUpdateEventResult);
                });
        });

        it("should create a new report and return it", (done) => {
            Report.createReport(
                mockReport.breakdown,
                mockReport.workDone,
                mockReport.reschedule,
                mockReport.startingDate,
                mockReport.startingHour,
                mockReport.endingHour,
                mockReport.duration,
                mockReport.clientSignature,
                mockReport.employeeSignature,
                mockReport.idEvent,
                (error, newReport) => {
                    expect(error).toBeNull();
                    expect(newReport).toEqual(
                        expect.objectContaining({
                            idReport: 1,
                            breakdown: "Engine failure",
                            workDone: "Replaced engine",
                            reschedule: false,
                            startingDate: "2023-10-01",
                            startingHour: "08:00",
                            endingHour: "12:00",
                            duration: 4,
                            clientSignature: Buffer.from(
                                "clientSignatureBase64",
                                "base64"
                            ),
                            employeeSignature: Buffer.from(
                                "employeeSignatureBase64",
                                "base64"
                            ),
                            idEvent: 1,
                        })
                    );
                    done();
                }
            );
        });
    });

    describe("getReportById", () => {
        it("should retrieve the report by event ID", (done) => {
            const mockReportResult = {
                rows: [
                    {
                        id_report: 1,
                        breakdown: "Engine failure",
                        work_done: "Replaced engine",
                        reschedule: false,
                        starting_date: "2023-10-01",
                        starting_hour: "08:00",
                        ending_hour: "12:00",
                        duration: 4,
                        client_signature: Buffer.from(
                            "clientSignatureBase64",
                            "base64"
                        ),
                        employee_signature: Buffer.from(
                            "employeeSignatureBase64",
                            "base64"
                        ),
                        id_event: 1,
                    },
                ],
            };

            pool.query.mockImplementationOnce((query, values, callback) => {
                callback(null, mockReportResult);
            });

            Report.getReportById(1, (error, report) => {
                expect(error).toBeNull();
                expect(report).toEqual(
                    expect.objectContaining({
                        idReport: 1,
                        breakdown: "Engine failure",
                        workDone: "Replaced engine",
                        reschedule: false,
                        startingDate: "2023-10-01",
                        startingHour: "08:00",
                        endingHour: "12:00",
                        duration: 4,
                        clientSignature: Buffer.from(
                            "clientSignatureBase64",
                            "base64"
                        ).toString("base64"),
                        employeeSignature: Buffer.from(
                            "employeeSignatureBase64",
                            "base64"
                        ).toString("base64"),
                        idEvent: 1,
                    })
                );
                done();
            });
        });
    });
});
