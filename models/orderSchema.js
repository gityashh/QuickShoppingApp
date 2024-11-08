const mongoose = require('mongoose');
const Joi = require('joi');

// Order schema for Mongoose
const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }],
    totalPrice: { type: Number, required: true, min: 0 },
    address: { type: String, required: true },
    status: { type: String, required: true },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
        required: true
    },
    delivery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "deliverySchema",
    }
}, 
{ timestamps: true }
);

// Export the Mongoose model
const Order = mongoose.model('Order', orderSchema);


// Export the validation function
module.exports = {
    Order,
    orderSchema
};