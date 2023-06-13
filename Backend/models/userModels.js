const mongoose = require('mongoose');


const addressSchema = new mongoose.Schema({
    address: String,
    state: String,
    country:String,
    postcode:Number
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: addressSchema,
    status: {
        type: String,
        default: "active"
    },
    profilePic: {
        type: String,
        default: null
    }
}, {
    timestamps: true
    
});

const User = mongoose.model("users", userSchema);
module.exports = User;
