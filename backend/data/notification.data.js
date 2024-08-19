const pool = require('../config/db.config'); // Importer la configuration de la base de données

class Notification {
    constructor(idNotification, idEmployee, action, type, title, creationDate, creationHour) {
        this.idNotification = idNotification;
        this.idEmployee = idEmployee;
        this.action = action;
        this.type = type;
        this.title = title;
        this.creationDate = creationDate;
        this.creationHour = creationHour;
    }

    static async getAllNotifications() {
        const result = await pool.query('SELECT * FROM notifications');
        return result.rows;
    }
}