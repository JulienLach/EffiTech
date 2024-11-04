const pool = require("../config/db.config"); // Importer la configuration de la base de données

/**
 * Classe représentant une notification.
 */
class Notification {
    /**
     * Crée une instance de Notification.
     * @param {number} idNotification - L'identifiant de la notification.
     * @param {number} idEmployee - L'identifiant de l'employé associé à la notification.
     * @param {string} action - L'action de la notification.
     * @param {string} type - Le type de la notification.
     * @param {string} title - Le titre de la notification.
     * @param {string} creationDate - La date de création de la notification.
     * @param {string} creationHour - L'heure de création de la notification.
     */
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

    /**
     * Récupère toutes les notifications.
     * @param {function(Error, Notification[]):void} callback - La fonction de rappel à exécuter après la récupération des notifications.
     */
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
