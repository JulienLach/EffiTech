const { body, validationResult } = require("express-validator");
const Client = require("../data/client.data.js"); // Importer le modèle Client

function getAllClients(req, res) {
    Client.getAllClients((error, clients) => {
        if (error) {
            return res.status(500).send({
                message: "Erreur lors de la récupération des clients",
                error: error.message,
            });
        }
        res.status(200).send(clients); // Renvoyer les clients
    });
}

function getClientById(req, res) {
    const idClient = req.params.idClient;
    Client.getClientById(idClient, (error, client) => {
        if (error) {
            return res.status(500).send({
                message: "Erreur lors de la récupération du client",
                error: error.message,
            });
        }
        if (client) {
            res.status(200).send(client);
        } else {
            res.status(404).send({ message: "Client non trouvé" });
        }
    });
}

function createClient(req, res) {
    const validationChecks = [
        body("category").isString().trim().escape().notEmpty(),
        body("company").isString().trim().escape().optional(),
        body("firstname").isString().trim().escape().notEmpty(),
        body("lastname").isString().trim().escape().notEmpty(),
        body("email").isEmail().normalizeEmail().notEmpty(),
        body("addressDetails").isObject().notEmpty(),
        body("phoneNumber").isString().trim().escape().notEmpty(),
    ];

    for (let validation of validationChecks) {
        validation.run(req);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        category,
        company,
        firstname,
        lastname,
        email,
        addressDetails,
        phoneNumber,
    } = req.body;
    Client.createClient(
        category,
        company,
        firstname,
        lastname,
        email,
        addressDetails,
        phoneNumber,
        (error, createdClient) => {
            if (error) {
                return res.status(500).send({
                    message: "Erreur lors de la création du client",
                    error: error.message,
                });
            }
            res.status(201).send(createdClient);
        }
    );
}

function updateClient(req, res) {
    const idClient = req.params.idClient;
    const validationChecks = [
        body("category").isString().trim().escape().notEmpty(),
        body("company").isString().trim().escape().optional(),
        body("firstname").isString().trim().escape().notEmpty(),
        body("lastname").isString().trim().escape().notEmpty(),
        body("email").isEmail().normalizeEmail().notEmpty(),
        body("addressDetails").isObject().notEmpty(),
        body("phoneNumber").isString().trim().escape().notEmpty(),
    ];

    for (let validation of validationChecks) {
        validation.run(req);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        category,
        firstname,
        lastname,
        email,
        phoneNumber,
        company,
        addressDetails,
    } = req.body;
    Client.updateClient(
        {
            idClient,
            category,
            firstname,
            lastname,
            email,
            phoneNumber,
            company,
            addressDetails,
        },
        (error, updatedClient) => {
            if (error) {
                return res.status(500).send({
                    message: "Erreur lors de la modification du client",
                    error: error.message,
                });
            }
            if (updatedClient) {
                res.status(200).send({ message: "Client modifié avec succès" });
            }
        }
    );
}

exports.getAllClients = getAllClients;
exports.getClientById = getClientById;
exports.createClient = createClient;
exports.updateClient = updateClient;
