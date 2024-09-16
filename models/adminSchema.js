const mongoose = require('mongoose');
const Joi = require('joi');

// Admin schema for Mongoose
const adminSchema = mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    email: { type: String, required: true, unique: true, match: /^\S+@\S+\.\S+$/ },
    password: { type: String, required: true, minlength: 6 },  // Making password required
    admin: { type: Boolean, required: true },
    role: { type: String, enum: ['admin', 'superadmin'], required: true }  // Added type and required
}, 
{ timestamps: true }
);

// Mongoose model
const Admin = mongoose.model('Admin', adminSchema);


// const validateAdmin = (data) => {
//     const schema = Joi.object({
//         name: Joi.string().min(3).max(50).required(),
//         email: Joi.string().unique().required(),
//         password: Joi.string().min(6).required(),  // Marked as required for validation
//     });

//     return schema.validate(data);
// };

// Export the Mongoose model and Joi validation
module.exports = {
    Admin 
};