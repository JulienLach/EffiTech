const Event = require('../models/notification.model.js')

exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.getAllNotifications(); // Utiliser la méthode du modèle
        res.status(200).json(notifications); // Renvoyer tous les événements
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des notifications', error: error.message });
    }
}