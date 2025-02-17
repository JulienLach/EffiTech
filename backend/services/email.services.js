const sendMail = require("../utils/email.js");

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

exports.sendReport = sendReport;
exports.sendEmployeeCredentials = sendEmployeeCredentials;
