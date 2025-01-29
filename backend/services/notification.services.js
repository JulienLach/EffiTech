const Event = require("../data/notification.data.js");

function getAllNotifications(req, res) {
    Event.getAllNotifications((error, result) => {
        if (error) {
            res.status(500).send({
                message:
                    error.message ||
                    "Une erreur s'est produite lors de la récupération des notifications.",
            });
        } else {
            res.send(result);
        }
    });
}

function createNotification(req, res) {
    Event.createNotification(req.body, (error, result) => {
        if (error) {
            res.status(500).send({
                message:
                    error.message ||
                    "Une erreur s'est produite lors de la création de la notification.",
            });
        } else {
            res.send(result);
        }
    });
}

exports.getAllNotifications = getAllNotifications;
exports.createNotification = createNotification;
