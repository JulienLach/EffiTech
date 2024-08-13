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

    static async getReportById(idReport) {
        const query = 'SELECT * FROM reports WHERE idReport = $1';
        const values = [idReport];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    static async sendReportByEmail(reportData) {}
}

module.exports = Report;