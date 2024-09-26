const express = require('express');
const { Order } = require('../models/orderSchema');
const { Payment } = require('../models/paymentSchema');
const router = express.Router();

router.get('/:orderId/:paymentId/:signature', async (req, res) => {
});

router.post('/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const { address } = req.body;
    const order = await Order.findById(orderId);
    order.address = address;
    await order.save();
    res.redirect(`/order/${orderId}`);
});

module.exports = router;
