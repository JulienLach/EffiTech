const nodemailer = require("nodemailer");
require("dotenv").config();

// Transporteur avec les informations du serveur SMTP Mailjet
const transporter = nodemailer.createTransport({
    host: "in-v3.mailjet.com",
    port: 587,
    auth: {
        user: process.env.MAILJET_API_KEY,
        pass: process.env.MAILJET_SECRET_KEY,
    },
});

const sendEmail = (to, subject, text) => {
    const emailData = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        text: text,
        attachments: attachments,
    };

    transporter.sendMail(emailData, (error, info) => {
        if (error) {
            console.log("Erreur lors de l'envoi de l'email:", error);
        } else {
            console.log("Email envoyé:", info.response);
        }
    });
};

module.exports = sendEmail;
