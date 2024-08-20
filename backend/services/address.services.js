const Address = require('../data/address.data.js')

exports.getAddressById = function(req, res) {
    const idAddress = req.params.idAddress;
    Address.getAddressById(idAddress, function(error, address) {
        if (error) {
            return res.status(500).send({ message: 'Erreur lors de la récupération de l\'adresse', error: error.message });
        }
        res.status(200).send(address);
    });
};

exports.createAddress = (req, res) => {
    const { address, city, zipcode } = req.body;
    Address.createAddress(address, city, zipcode, (error, newAddress) => {
        if (error) {
            return res.status(500).send({ message: 'Erreur lors de la création de l\'adresse', error: error.message });
        }
        res.status(201).send(newAddress);
    });
};