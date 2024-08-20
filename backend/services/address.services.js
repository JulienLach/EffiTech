const Address = require('../models/address.model.js')

exports.getAddressById = (req, res) => {
    const idAddress = req.params.idAddress;
    Address.getAddressById(idAddress, (error, address) => {
        if (error) {
            return res.status(500).json({ message: 'Erreur lors de la récupération de l\'adresse', error: error.message });
        }
        res.status(200).json(address);
    });
};


exports.createAddress = (req, res) => {
    const { address, city, zipcode } = req.body;
    Address.createAddress(address, city, zipcode, (error, newAddress) => {
        if (error) {
            return res.status(500).json({ message: 'Erreur lors de la création de l\'adresse', error: error.message });
        }
        res.status(201).json(newAddress);
    });
};