const fs = require("fs");
const path = require("path");
const { Event } = require("../data/event.data.js");

class Utils {
    // Ajoute un message au fichier log.txt avec la date
    static addLog(message) {
        const logDir = path.join(__dirname, "logs"); // Chemin du dossier logs
        const logFile = path.join(logDir, "log.txt"); // Chemin du fichier log.txt

        // Crée le dossier logs s'il n'existe pas
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }

        // Écrit le message dans le fichier avec un timestamp
        const logMessage = `${new Date().toISOString()} - ${message}\n`;
        fs.appendFileSync(logFile, logMessage, "utf8");
    }

    // Récupérer des statistiques sur tous les événements
    static getAllEventStatistics(callback) {
        Event.getAllEvents(function (error, events) {
            if (error) {
                callback(error, null);
            } else {
                const eventStatistics = {
                    totalEvents: events.length, // Nombre total d'événements
                    events: events, // Liste des événements
                };
                callback(null, eventStatistics);
            }
        });
    }
}

module.exports = Utils;
