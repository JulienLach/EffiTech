const fs = require("fs");
const path = require("path");

// Pour passer n'importe quel argument à la méthode addLog
// Exemple : Utils.addLog("Erreur : " + error.message); ou Utils.addLog("Message", employee.name);
class Utils {
    static addLog(message) {
        // Définit le chemin du dossier logs et du fichier log.txt à partir du dossier courant
        const logDir = path.join(__dirname, "logs");
        // définir le chemin du fichier log.txt à partir du dossier logs
        // grace à la méthode path.join qui permet de concaténer les chemins
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
