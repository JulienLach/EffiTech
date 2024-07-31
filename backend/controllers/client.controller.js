const pool = require('../config/db.config'); //importer la configuration de la base de données pour utiliser pool.query

const getAllClients = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM clients'); // obtenir tous les clients
        res.status(200).json(result.rows); //renvoyer les clients
    } catch (error) {
        res.status(500).json({message: 'Erreur lors de la récupération des employés', error: error.message});
    }
}

const getClientById = (req, res) => {
    const clientId = req.params.id;
    // logique pour récuperer l'id du client
    res.send(`Obtenir le client avec l'ID ${clientId}`);
}

const createClient = (req, res) => {
    const newClient = req.body;
    // logique pour récupérer les inputs du nouveau client crééé
    res.send(`Créer un nouveau client`)
}

const updateClient = (req, res) => {
    const clientId = req.params.id;
    const updatedClient = req.body
    //
    res.send(`Mettre à jour le client avec l'ID ${clientId}`);
}

const deleteCLient = (req, res) => {
    const clientId = req.params.id;
    //
    res.send(`Supprimer le client avec l'ID ${clientId}`);
}