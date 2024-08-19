const Client = require('../models/client.model.js'); // Importer le modèle Client

exports.getAllClients = async (req, res) => {
    try {
        const clients = await Client.getAllClients(); // Utiliser la méthode du modèle
        res.status(200).json(clients); // Renvoyer les clients
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des clients', error: error.message });
    }
};

exports.getClientById = async (req, res) => {
    const idClient = req.params.idClient;
    try {
        const client = await Client.getClientById(idClient); // Utiliser la méthode du modèle
        if (client) {
            res.status(200).json(client);
        } else {
            res.status(404).json({ message: 'Client non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du client', error: error.message });
    }
};

exports.createClient = async (req, res) => {
    const newClient = req.body;
    try {
        const createdClient = await Client.createClient(newClient); // Utiliser la méthode du modèle
        res.status(201).json(createdClient);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du client', error: error.message });
    }
};

exports.updateClient = async (req, res) => {
    const clientId = req.params.id;
    const updatedClient = req.body;
    try {
        const result = await Client.updateClient(clientId, updatedClient); // Utiliser la méthode du modèle
        if (result) {
            res.status(200).json({ message: 'Client mis à jour avec succès' });
        } else {
            res.status(404).json({ message: 'Client non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du client', error: error.message });
    }
};

exports.deleteClient = async (req, res) => {
    const clientId = req.params.id;
    try {
        const result = await Client.deleteClient(clientId); // Utiliser la méthode du modèle
        if (result) {
            res.status(200).json({ message: 'Client supprimé avec succès' });
        } else {
            res.status(404).json({ message: 'Client non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du client', error: error.message });
    }
};