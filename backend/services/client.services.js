const Client = require('../data/client.data.js'); // Importer le modèle Client

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
    const { category, firstname, lastname, email, idAddress, phoneNumber } = req.body;
    Client.createClient(category, firstname, lastname, email, idAddress, phoneNumber, (error, createdClient) => {
        if (error) {
            return res.status(500).json({ message: 'Erreur lors de la création du client', error: error.message });
        }
        res.status(201).json(createdClient);
    });
};

exports.updateClient = (req, res) => {
    const clientId = req.params.clientId;
    const { category, firstname, lastname, email, idAddress, phoneNumber } = req.body;
    Client.updateClient(category, firstname, lastname, email, idAddress, phoneNumber, clientId, (error, updatedClient) => {
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