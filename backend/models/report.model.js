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

    static async sendReport(reportData) {
        const result = await pool.query(
            `INSERT INTO reports (breakdown, work_done, reschedule, ending_hour, duration, client_signature, employee_signature, id_event)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [
                reportData.breakdown,
                reportData.workDone,
                reportData.reschedule,
                reportData.endingHour,
                reportData.duration,
                reportData.clientSignature,
                reportData.employeeSignature,
                reportData.idEvent
            ]
        );
        const row = result.rows[0];
        return new Report(
            row.id_report,
            row.breakdown,
            row.work_done,
            row.reschedule,
            row.ending_hour,
            row.duration,
            row.client_signature,
            row.employee_signature,
            row.id_event
        );
    }
}

module.exports = Report;