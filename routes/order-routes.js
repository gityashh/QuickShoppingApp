const express = require('express');
const { Order } = require('../models/orderSchema');
const Payment = require('../models/paymentSchema');
const router = express.Router();
const {Cart} = require("../models/cartSchema");
const {userLoggedIn} = require("../middlewares/user-middleware")
const {User} = require("../models/userModel");


router.get('/', async (req, res) => {
    const userId = req.session.passport.user;
    const orders = await Order.find({user:userId}).populate("products").populate("payment");
    res.json({orders});
});

router.post('/:orderId/:paymentId/:signature', async (req, res) => {
    const { orderId } = req.params;
    const {user} = req.session.passport;
    const username = await User.findOne({_id:user});
    const cart = await Cart.findOne({user}).populate("products");
    const payment = await Payment.findOne({orderId});
    if(payment){
        if(payment.status === "completed"){
            const order = await Order.findOne({payment:payment._id});
            if(order){
                res.json({status:"already processed"})
            }else{
                const newOrder = await Order.create({
                    user,
                    products: cart.products ,
                    address:username.defaultAddress,
                    totalPrice:cart.totalPrice,
                    payment:payment._id,
                    status:"processing",
                    delivery:null
                })
                res.json({status:"order created"});
            }
        }
    }
});


module.exports = router;
