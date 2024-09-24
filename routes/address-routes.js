const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address-controller');

router.get('/', addressController.getAddress, (req, res, next) => {
    const addresses = res.locals.addresses;
    res.render('address', {addresses});
});

router.post('/', addressController.createAddress, (req, res) => {
    res.redirect('/cart/address');
});

router.delete('/delete/:id', addressController.deleteAddress, (req, res) => {
    res.status(200).json({message: 'Address deleted successfully'});
});

module.exports = router;