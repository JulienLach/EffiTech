const Client = require('../data/client.data.js'); // Importer le modèle Client

function getAllClients(req, res) {
    Client.getAllClients((error, clients) => {
        if (error) {
            return res.status(500).send({ message: 'Erreur lors de la récupération des clients', error: error.message });
        }
        res.status(200).send(clients); // Renvoyer les clients
    });
};

function getClientById(req, res) {
    const idClient = req.params.idClient;
    Client.getClientById(idClient, (error, client) => {
        if (error) {
            return res.status(500).send({ message: 'Erreur lors de la récupération du client', error: error.message });
        }
        if (client) {
            res.status(200).send(client);
        } else {
            res.status(404).send({ message: 'Client non trouvé' });
        }
    });
};


function createClient(req, res) {
    const { category, firstname, lastname, email, idAddress, phoneNumber } = req.body;
    Client.createClient(category, firstname, lastname, email, idAddress, phoneNumber, (error, createdClient) => {
        if (error) {
            return res.status(500).send({ message: 'Erreur lors de la création du client', error: error.message });
        }
        res.status(201).send(createdClient);
    });
};

function updateClient(req, res) {
    const clientId = req.params.clientId;
    const { category, firstname, lastname, email, idAddress, phoneNumber } = req.body;
    Client.updateClient(category, firstname, lastname, email, idAddress, phoneNumber, clientId, (error, updatedClient) => {
        if (error) {
            return res.status(500).send({ message: 'Erreur lors de la modification du client', error: error.message });
        }
        if (updatedClient) {
            res.status(200).send(updatedClient);
        } else {
            res.status(404).send({ message: 'Client non trouvé' });
        }
    });
};

exports.getAllClients = getAllClients;
exports.getClientById = getClientById;
exports.createClient = createClient;
exports.updateClient = updateClient;