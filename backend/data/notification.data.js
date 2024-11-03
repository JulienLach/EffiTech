const pool = require("../config/db.config"); // Importer la configuration de la base de données

class Notification {
    constructor(
        idNotification,
        idEmployee,
        action,
        type,
        title,
        creationDate,
        creationHour
    ) {
        this.idNotification = idNotification;
        this.idEmployee = idEmployee;
        this.action = action;
        this.type = type;
        this.title = title;
        this.creationDate = creationDate;
        this.creationHour = creationHour;
    }

    static getAllNotifications(callback) {
        const query = "SELECT * FROM notifications";
        pool.query(query, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const notifications = result.rows.map(function (row) {
                return new Notification(
                    row.id_notification,
                    row.id_employee,
                    row.action,
                    row.type,
                    row.title,
                    row.creation_date,
                    row.creation_hour
                );
            });
            callback(null, notifications);
        });
    }
}

module.exports = Notification;
