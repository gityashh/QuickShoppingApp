const mongoose = require('mongoose');
const Joi = require('joi');

// Category schema for Mongoose
const categorySchema = mongoose.Schema({
    name: { type: String,unique:true, required: true, minlength: 3, maxlength: 50 }
}, 
{ timestamps: true }
);

// Export the Mongoose model
const Category = mongoose.model('Category', categorySchema);

// Joi schema for validation
const validateCategory = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required()
    });

    return schema.validate(data);
};

// Export the validation function
module.exports = {
    Category,
    validateCategory
};