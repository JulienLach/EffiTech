const sendMail = require("../utils/email.js");

function sendReport(req, res) {
    const { to, subject, text } = req.body;

    sendMail(to, subject, text);

    res.status(200).send({ message: "Mail bien envoyé" });
}

exports.sendReport = sendReport;
