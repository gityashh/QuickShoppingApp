const { Address } = require('../models/userModel');

exports.getAddress = async (req, res, next) => {
    try {
        const addresses = await Address.find();
        res.locals.addresses = addresses;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.createAddress = async (req, res) => {
    try {
        let {type, pincode, houseNo, landmark, phone} = req.body;
        const address = await Address.create({type, pincode, houseNo, landmark, phone});
        res.status(201).json({ address });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}