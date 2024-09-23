const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address-controller');

router.get('/', addressController.getAddress, (req, res, next) => {
    const addresses = res.locals.addresses;
    res.render('address', {addresses});
});

router.post('/', addressController.createAddress, (req, res) => {
    const address = res.locals.address;
    res.redirect('/cart/address');
});

module.exports = router;