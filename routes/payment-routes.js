require('dotenv').config();
const Razorpay = require('razorpay');
const Payment = require('../models/paymentSchema');
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const {Cart} = require('../models/cartSchema');
const {userLoggedIn} = require('../middlewares/user-middleware');
const {Order} = require('../models/orderSchema');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post('/create/orderId', async (req, res) => {
  let userId = req.session.passport.user;
  const cart = await Cart.findOne({user:userId});
  const totalPrice = cart.totalPrice;
  const options = {
    amount: totalPrice * 100,
    currency: "INR",
  };
  try {
    const order = await razorpay.orders.create(options);
    
    const newPayment = await Payment.create({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      status: 'pending',
    });
    res.json(order);
    
  } catch (error) {
    res.status(500).send('Error creating order');
  }
});

router.post('/api/payment/verify', async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, signature } = req.body;
  const secret = process.env.RAZORPAY_KEY_SECRET

  try {
    const { validatePaymentVerification } = require('../node_modules/razorpay/dist/utils/razorpay-utils.js')

    const result = validatePaymentVerification({ "order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);
    if (result) {
      const payment = await Payment.findOne({ orderId: razorpayOrderId });
      payment.paymentId = razorpayPaymentId;
      payment.signature = signature;
      payment.status = 'completed';
      await payment.save();
      res.json({ status: 'success' });
    } else {
      res.status(400).send('Invalid signature');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error verifying payment');
  }
});


module.exports = router;
