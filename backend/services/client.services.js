const Client = require('../models/client.model.js'); // Importer le modèle Client

exports.getAllClients = (req, res) => {
    Client.getAllClients((error, clients) => {
        if (error) {
            return res.status(500).json({ message: 'Erreur lors de la récupération des clients', error: error.message });
        }
        res.status(200).json(clients); // Renvoyer les clients
    });
};

exports.getClientById = (req, res) => {
    const idClient = req.params.idClient;
    Client.getClientById(idClient, (error, client) => {
        if (error) {
            return res.status(500).json({ message: 'Erreur lors de la récupération du client', error: error.message });
        }
        if (client) {
            res.status(200).json(client);
        } else {
            res.status(404).json({ message: 'Client non trouvé' });
        }
    });
};


exports.createClient = (req, res) => {
    const newClient = req.body;
    Client.createClient(newClient, (error, createdClient) => {
        if (error) {
            return res.status(500).json({ message: 'Erreur lors de la création du client', error: error.message });
        }
        res.status(201).json(createdClient);
    });
};

exports.updateClient = (req, res) => {
    const clientId = req.params.id;
    const updatedClient = req.body;
    Client.updateClient(clientId, updatedClient, (error, updatedClient) => {
        if (error) {
            return res.status(500).json({ message: 'Erreur lors de la modification du client', error: error.message });
        }
        if (updatedClient) {
            res.status(200).json(updatedClient);
        } else {
            res.status(404).json({ message: 'Client non trouvé' });
        }
    });
};

exports.deleteClient = (req, res) => {
    const clientId = req.params.id;
    Client.deleteClient(clientId, (error, deletedClient) => {
        if (error) {
            return res.status(500).json({ message: 'Erreur lors de la suppression du client', error: error.message });
        }
        if (deletedClient) {
            res.status(204).json();
        } else {
            res.status(404).json({ message: 'Client non trouvé' });
        }
    });
};