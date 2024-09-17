const mongoose = require('mongoose');
const Joi = require('joi');

// Cart schema for Mongoose
const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "productSchema",
        required: true
    }],
    totalPrice: { type: Number, required: true, min: 0 }
}, 
{ timestamps: true }
);

// Export the Mongoose model
const Cart = mongoose.model('Cart', cartSchema);


module.exports = {
    Cart
};