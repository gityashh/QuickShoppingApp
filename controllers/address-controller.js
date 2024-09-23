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
        let {type, address , floor, landmark,pincode, username, phone} = req.body;
        const newAddress = await Address.create({type, address, floor, landmark,pincode, username, phone});
        res.status(201).json( {address: newAddress} );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}