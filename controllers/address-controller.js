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

exports.createAddress = async (req, res, next) => {
    try {
        let {type, address , floor, landmark,pincode, username, phone} = req.body;
        const newAddress = await Address.create({type, address, floor, landmark,pincode, username, phone});
        res.locals.address = newAddress;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteAddress = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Address.findByIdAndDelete(id);
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}