const mongoose = require('mongoose');
const Joi = require('joi');

// Delivery schema for Mongoose
const deliverySchema = mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orderSchema",
        required: true
    },
    deliveryBoy: { type: String, required: true },
    trackingUrl: { type: String, required: true },
    status: { type: String, required: true },
    estimatedDeliveryTime: { type: Number, required: true, min: 0 }  // In hours, for example
}, 
{ timestamps: true }
);

// Export the Mongoose model
const Delivery = mongoose.model('Delivery', deliverySchema);

// Joi schema for validation
const validateDelivery = (data) => {
    const schema = Joi.object({
        order: Joi.string().required(),  // Valid ObjectId
        deliveryBoy: Joi.string().required(),
        trackingUrl: Joi.string().uri().required(),
        status: Joi.string().valid('dispatched', 'in transit', 'delivered', 'cancelled').required(),  // Example statuses
        estimatedDeliveryTime: Joi.number().min(0).required()  // In hours
    });

    return schema.validate(data);
};

// Export the validation function
module.exports = {
    Delivery,
    validateDelivery
};