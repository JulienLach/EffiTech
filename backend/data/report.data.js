const pool = require('../config/db.config'); // Importer la configuration de la base de données

class Report {
    constructor(idReport, breakdown, workDone, reschedule, endingHour, duration, clientSignature, employeeSignature, idEvent) {
        this.idReport = idReport;
        this.breakdown = breakdown;
        this.workDone = workDone;
        this.reschedule = reschedule;
        this.endingHour = endingHour;
        this.duration = duration;
        this.clientSignature = clientSignature;
        this.employeeSignature = employeeSignature;
        this.idEvent = idEvent;
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