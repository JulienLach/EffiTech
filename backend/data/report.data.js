const pool = require('../config/db.config'); // Importer la configuration de la base de données

class Report {
    constructor(idReport, breakdown, workDone, reschedule, startingDate, startingHour, endingHour, duration, clientSignature, employeeSignature, idEvent) {
        this.idReport = idReport;
        this.breakdown = breakdown;
        this.workDone = workDone;
        this.reschedule = reschedule;
        this.startingDate = startingDate;
        this.startingHour = startingHour;
        this.endingHour = endingHour;
        this.duration = duration;
        this.clientSignature = clientSignature;
        this.employeeSignature = employeeSignature;
        this.idEvent = idEvent;
    }

    static createReport(breakdown, workDone, reschedule, startingDate, startingHour, endingHour, duration, clientSignature, employeeSignature, idEvent, callback) {
        const query = 'INSERT INTO reports (breakdown, work_done, reschedule, starting_date, starting_hour, ending_hour, duration, client_signature, employee_signature, id_event) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
        const values = [breakdown, workDone, reschedule, startingDate, startingHour, endingHour, duration, clientSignature, employeeSignature, idEvent];
        
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            
            const row = result.rows[0];
            const newReport = new Report(
                row.id_report,
                row.breakdown,
                row.work_done,
                row.reschedule,
                row.starting_date,
                row.starting_hour,
                row.ending_hour,
                row.duration,
                row.client_signature,
                row.employee_signature,
                row.id_event
            );
            callback(null, newReport);
        });
    }

    static getReportById(idReport, callback) {
        const query = 'SELECT * FROM reports WHERE idReport = $1';
        const values = [idReport];
        pool.query(query, values, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const row = result.rows[0];
            let report = new Report(row.idReport, row.breakdown, row.workDone, row.reschedule, row.endingHour, row.duration, row.clientSignature, row.employeeSignature, row.idEvent);
            callback(null, report);
        });
    }

    static sendReportByEmail(reportData, callback) {}
}

module.exports = Report;