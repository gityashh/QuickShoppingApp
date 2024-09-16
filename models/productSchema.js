const mongoose = require('mongoose');
const Joi = require('joi');

// Product schema for Mongoose
const productSchema = mongoose.Schema({
    name: { type: String, required: true, minlength: 1, maxlength: 50 },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true },
    category: {type:String, required: true },
    description: { type: String, required: true, minlength: 10, maxlength: 500 },
    image: { type: Buffer, required: true }
}, 
{ timestamps: true }
);

// Export the Mongoose model
const Product = mongoose.model('Product', productSchema);

// Joi schema for validation
const validateProduct = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(50).required(),
        price: Joi.number().min(0).required(),
        stock: Joi.number().required(),
        category: Joi.string().required(),
        description: Joi.string().min(10).max(500).required(),
        image: Joi.binary().required(),
    });

    return schema.validate(data);
};

// Export the validation function
module.exports = {
    Product,
    validateProduct
};