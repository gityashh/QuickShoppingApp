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
        ref: "productSchema",
        required: true
    }],
    totalPrice: { type: Number, required: true, min: 0 },
    address: { type: String, required: true },
    status: { type: String, required: true },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "paymentSchema",
        required: true
    },
    delivery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "deliverySchema",
        required: true
    }
}, 
{ timestamps: true }
);

// Export the Mongoose model
const Order = mongoose.model('Order', orderSchema);

// Joi schema for validation
const validateOrder = (data) => {
    const schema = Joi.object({
        user: Joi.string().required(),  // Should be a valid ObjectId
        products: Joi.array().items(Joi.string().required()).min(1).required(),  // Array of valid ObjectIds
        totalPrice: Joi.number().min(0).required(),
        address: Joi.string().required(),
        status: Joi.string().valid('pending', 'processing', 'shipped', 'delivered', 'cancelled').required(),  // Example statuses
        payment: Joi.string().required(),  // Valid ObjectId
        delivery: Joi.string().required()  // Valid ObjectId
    });

    return schema.validate(data);
};

// Export the validation function
module.exports = {
    Order,
    validateOrder
};