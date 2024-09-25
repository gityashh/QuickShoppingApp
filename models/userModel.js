const mongoose = require('mongoose');
// Address schema for Mongoose
const adressSchema = mongoose.Schema({
    type: { type: String, enum: ['Home', 'Work' , 'Other'], required: true },
    address: { type: String, required: true,trim: true },
    floor: { type: Number, required: false },
    landmark: { type: String, required: true,trim: true },
    pincode: { type: Number, required: true, min: 100000, max: 999999 },
    username: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
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
    savedAddress: [adressSchema],
    defaultAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: false },
}, 
{ timestamps: true }
);

// Mongoose model
const User = mongoose.model('User', userSchema);


// Export model and validation function
module.exports = {
    User,  
    Address,
};