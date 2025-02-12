const nodemailer = require("nodemailer");
const { SMTPServer } = require("smtp-server");

const server = new SMTPServer({
    authOptional: true,
    onData(stream, session, callback) {
        stream.pipe(process.stdout);
        stream.on("end", callback);
    },
});

server.listen(2525, () => {
    console.log("Serveur SMTP local en écoute sur le port 2525");
});

// Transporteur avec les informations du serveur SMTP local
const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 2525,
    secure: false,
    auth: {
        user: "utilisateur",
        pass: "mot-de-passe",
    },
});

const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: "contact@effitech.com",
        to: to,
        subject: subject,
        text: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Erreur lors de l'envoi de l'email:", error);
        } else {
            console.log("Email envoyé:", info.response);
        }
    });
};

module.exports = sendEmail;
