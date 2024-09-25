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
        const newAddress = await Address.create({type, address, floor, landmark,pincode, username, phone , isDefault: true});
        res.locals.address = newAddress;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteAddress = async (req, res, next) => {
    try {
        const { id } = req.params;
        const address = await Address.findByIdAndDelete(id);
        res.locals.address = null; // Combine find and delete in one query
        if (address && address.isDefault) {
            const firstAddress = await Address.findOne();
            if (firstAddress) {
                firstAddress.isDefault = true;
                await firstAddress.save();
                res.locals.address = firstAddress;
            }
        }
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}