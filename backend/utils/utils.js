const fs = require("fs");
const path = require("path");

class Utils {
    static addLog(message) {
        const logDir = path.join(__dirname, "logs");
        const logFile = path.join(logDir, "log.txt");

        // Vérifie si le dossier logs existe, sinon le crée
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }

        // Ajoute le message au fichier log.txt
        const logMessage = `${new Date().toISOString()} - ${message}\n`;
        fs.appendFileSync(logFile, logMessage, "utf8");
    }
}

module.exports = Utils;
