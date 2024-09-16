const mongoose = require('mongoose');
const Joi = require('joi');

// Payment schema for Mongoose
const paymentSchema = mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orderSchema",
        required: true
    },
    amount: { type: Number, required: true, min: 0 },
    method: { type: String, required: true },
    status: { type: String, required: true },
    transactionID: { type: String, required: true, unique: true }
}, 
{ timestamps: true }
);

// Export the Mongoose model
const Payment = mongoose.model('Payment', paymentSchema);

// Joi schema for validation
const validatePayment = (data) => {
    const schema = Joi.object({
        order: Joi.string().required(),  // Should be a valid ObjectId
        amount: Joi.number().min(0).required(),
        method: Joi.string().required(),
        status: Joi.string().valid('pending', 'completed', 'failed').required(),  // Example statuses
        transactionID: Joi.string().required()
    });

    return schema.validate(data);
};

// Export the validation function
module.exports = {
    Payment,
    validatePayment
};