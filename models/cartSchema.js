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

// Joi schema for validation
const validateCart = (data) => {
    const schema = Joi.object({
        user: Joi.string().required(),  // Valid ObjectId
        products: Joi.array().items(Joi.string().required()).min(1).required(),  // Array of valid ObjectIds
        totalPrice: Joi.number().min(0).required()
    });

    return schema.validate(data);
};

// Export the validation function
module.exports = {
    Cart,
    validateCart
};