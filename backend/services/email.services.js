require("dotenv").config();
const sendMail = require("../utils/email.js");
const pool = require("../config/db.config.js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

function sendReport(req, res) {
    const { to, subject, text, attachments } = req.body;

    sendMail(to, subject, text, attachments);

    res.status(200).send({ message: "Mail bien envoyé" });
}

function sendEmployeeCredentials(req, res) {
    const { to, subject, text } = req.body;

    sendMail(to, subject, text);

    res.status(200).send({ message: "Mail bien envoyé" });
}

async function sendPasswordResetLink(req, res) {
    const { to } = req.body;

    try {
        // Recherche de l'employé par email
        const query =
            "SELECT id_employee, firstname FROM employees WHERE email = $1";
        const values = [to];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).send({ error: "Employé non trouvé" });
        }

        const employee = result.rows[0];

        // Génération d'un token JWT pour la réinitialisation
        const token = jwt.sign(
            { email: to, id: employee.id_employee },
            process.env.JWT_SECRET,
            { expiresIn: "1h" } // Token valide 1 heure
        );

        // Lien de réinitialisation
        const resetLink = `${process.env.ORIGIN_URL}/reset-password?token=${token}&email=${to}`;
        const subject = "🔧 Réinitialisation de votre mot de passe EffiTech";
        const text = `Bonjour ${employee.firstname},\n\nCliquez sur ce lien pour réinitialiser votre mot de passe :\n${resetLink}\n\nCe lien est valide pendant 1 heure.\n`;

        // Envoi du mail
        sendMail(to, subject, text);

        res.status(200).send({ message: "Email de réinitialisation envoyé" });
    } catch (error) {
        console.error("Erreur lors de la demande de réinitialisation", error);
        res.status(500).send({ error: "Erreur serveur" });
    }
}

async function resetPassword(req, res) {
    const { email, token, newPassword } = req.body;

    try {
        // Vérification du token JWT
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(400).send({ error: "Lien invalide ou expiré" });
        }

        // Vérification que l'email du token correspond
        if (decoded.email !== email) {
            return res.status(400).send({ error: "Email invalide" });
        }

        // Recherche de l'employé par email
        const query = "SELECT id_employee FROM employees WHERE email = $1";
        const values = [email];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).send({ error: "Employé non trouvé" });
        }

        const employee = result.rows[0];

        // Vérification que l'ID de l'employé correspond
        if (decoded.id !== employee.id_employee) {
            return res.status(400).send({ error: "Lien invalide" });
        }

        // Hachage du nouveau mot de passe (comme dans Employee.createEmployee)
        const hash = crypto.createHash("sha512");
        hash.update(newPassword);
        const hashedPassword = hash.digest("hex");

        // Mise à jour du mot de passe dans la base de données
        const updateQuery =
            "UPDATE employees SET password = $1 WHERE email = $2";
        const updateValues = [hashedPassword, email];
        await pool.query(updateQuery, updateValues);

        res.status(200).send({ message: "Mot de passe réinitialisé" });
    } catch (error) {
        console.error(
            "Erreur lors de la réinitialisation du mot de passe",
            error
        );
        res.status(500).send({ error: "Erreur serveur" });
    }
}

exports.sendReport = sendReport;
exports.sendEmployeeCredentials = sendEmployeeCredentials;
exports.sendPasswordResetLink = sendPasswordResetLink;
exports.resetPassword = resetPassword;
