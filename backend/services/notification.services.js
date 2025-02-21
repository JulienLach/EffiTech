const { body, validationResult } = require("express-validator");
const Notification = require("../data/notification.data.js");

function getAllNotifications(req, res) {
    Notification.getAllNotifications((error, notifications) => {
        if (error) {
            return res.status(500).json({
                message:
                    error.message ||
                    "Une erreur s'est produite lors de la récupération des notifications.",
            });
        }

        // Filtrer les notifications en fonction de l'utilisateur connecté
        if (req.employee.isAdmin === false) {
            notifications = notifications.filter(
                (notification) =>
                    notification.idEmployee === req.employee.idEmployee
            );
        }

        res.status(200).send(notifications); // Renvoyer toutes les notifications
    });
}
function createNotification(req, res) {
    const { action, type, title, creationDate, creationHour, idEmployee } =
        req.body;
    const validationChecks = [
        body("action").isString().trim().escape().notEmpty(),
        body("type").isString().trim().escape().notEmpty(),
        body("title").isString().trim().escape().notEmpty(),
        body("creationDate").isISO8601().toDate().notEmpty(),
        body("creationHour").isString().trim().notEmpty(),
        body("idEmployee").isInt().notEmpty(),
    ];

    for (let validation of validationChecks) {
        validation.run(req);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    Notification.createNotification(
        { action, type, title, creationDate, creationHour, idEmployee },
        (error, createdNotification) => {
            if (error) {
                res.status(500).send({
                    message:
                        error.message ||
                        "Une erreur s'est produite lors de la création de la notification.",
                });
            } else {
                res.status(201).send(createdNotification);
            }
        }
    );
}

exports.getAllNotifications = getAllNotifications;
exports.createNotification = createNotification;
