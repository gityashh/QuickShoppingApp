const mongoose = require('mongoose');
const Joi = require('joi');

// Address schema for Mongoose
const adressSchema = mongoose.Schema({
    type: { type: String, enum: ['Home', 'Work' , 'Other'], required: true },
    address: { type: String, required: true,trim: true },
    floor: { type: Number, required: false },
    landmark: { type: String, required: true,trim: true },
    pincode: { type: Number, required: true, min: 100000, max: 999999 },
    username: { type: String, required: true },
    phone: { type: Number, required: true, min: 1000000000, max: 999999999999 },
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
        }
    },
}, { timestamps: true });

const Address = mongoose.model("Address", adressSchema);


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
    });

    return schema.validate(data);
};

// Export model and validation function
module.exports = {
    User,  
    Address,
    validateUser
};