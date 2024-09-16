const mongoose = require('mongoose');
const Joi = require('joi');

// Address schema for Mongoose
const adressSchema = mongoose.Schema({
    state: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: Number, required: true, min: 100000, max: 999999 },
    address: { type: String, required: true }
});

// User schema for Mongoose
const userSchema = mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    email: { type: String, required: true, unique: true, match: /^\S+@\S+\.\S+$/ },
    phone: { type: Number, minlength: 10, maxlength: 12 },
    password: { type: String, minlength: 6 },
    savedAddress: [adressSchema],
}, 
{ timestamps: true }
);

// Mongoose model
const User = mongoose.model('User', userSchema);

// Joi validation schema
const validateUser = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        phone: Joi.number().min(1000000000).max(999999999999),
        password: Joi.string().min(6).required(),
        savedAddress: Joi.array().items(Joi.object({
            state: Joi.string().required(),
            city: Joi.string().required(),
            pincode: Joi.number().min(100000).max(999999).required(),
            address: Joi.string().required()
        })),
    });

    return schema.validate(data);
};

// Export model and validation function
module.exports = {
    User,   // Exported as 'User' to be used throughout the application
    validateUser
};