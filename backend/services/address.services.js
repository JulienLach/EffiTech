const Address = require("../data/address.data.js");

function getAddressById(req, res) {
    const idAddress = req.params.idAddress;
    Address.getAddressById(idAddress, function (error, address) {
        if (error) {
            return res.status(500).send({
                message: "Erreur lors de la récupération de l'adresse",
                error: error.message,
            });
        }
        res.status(200).send(address);
    });
}

function createAddress(req, res) {
    const { address, city, zipcode, idClient } = req.body;
    Address.createAddress(
        address,
        city,
        zipcode,
        idClient,
        (error, newAddress) => {
            if (error) {
                return res.status(500).send({
                    message: "Erreur lors de la création de l'adresse",
                    error: error.message,
                });
            }
            res.status(201).send(newAddress);
        }
    );
}

exports.getAddressById = getAddressById;
exports.createAddress = createAddress;
