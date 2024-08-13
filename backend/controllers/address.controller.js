const Address = require('../models/address.model.js')

exports.getAddressById = async (req, res) => {
    const idAddress = req.params.idAddress;
    try {
        const address = await Address.getAddressById(idAddress);

        if (!address) {
            return res.status(404).json({ message: 'Adresse non trouvée' });
        }
        res.status(200).json(address);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'adresse', error: error.message });
    }
};

exports.createAddress = async (req, res) => {
    try {
        const address = await Address.createAddress(req.body.address, req.body.city, req.body.zipcode);
        res.status(201).json(address);
    } catch (error) {
        res.status(500).json({ message : 'Erreur lors de la création de l\'adresse', error: error.message});
    }
};
