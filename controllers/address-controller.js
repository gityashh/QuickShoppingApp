const { Address } = require('../models/userModel');

exports.getAddress = async (req, res) => {
    try {
        const addresses = await Address.find();
        res.status(200).json({ addresses });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.createAddress = async (req, res) => {
    try {
        const address = await Address.create(req.body);
        res.status(201).json({ address });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}