const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address-controller');
let {User, Address} = require('../models/userModel');
let {userLoggedIn} = require('../middlewares/user-middleware');


router.get('/', userLoggedIn, addressController.getAddress, async (req, res, next) => {
    res.render('address', {addresses: res.locals.addresses});
});

router.post('/', userLoggedIn, addressController.createAddress, async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.session.passport.user });
        let defaultAddress = user.defaultAddress;
        if(defaultAddress){
            await Address.findByIdAndUpdate(defaultAddress, {isDefault: false});
        }
        user.defaultAddress = res.locals.address._id;
        await user.save();
        res.redirect('/cart/address');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/delete/:id', userLoggedIn, addressController.deleteAddress, async (req, res) => {
    try {
        if(res.locals.address){
            let user = await User.findOne({ _id: req.session.passport.user });
            user.defaultAddress = res.locals.address._id;
            await user.save();
        }
        res.status(200).json({message: 'Address deleted successfully'});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;