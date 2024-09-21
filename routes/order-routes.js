const express = require('express');
const { Order } = require('../models/orderSchema');
const { Payment } = require('../models/paymentSchema');
const router = express.Router();

router.get('/:orderId/:paymentId/:signature', async (req, res) => {
    
});

module.exports = router;
