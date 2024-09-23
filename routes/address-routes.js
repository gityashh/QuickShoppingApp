const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address-controller');

router.get('/', addressController.getAddress, (req, res) => {
    const addresses = res.locals.addresses;
    res.send(addresses);
});

router.post('/', addressController.createAddress, (req, res) => {
    const address = res.locals.address;
    res.send(address);
});

module.exports = router;