const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const resetPinSchema = new mongoose.Schema({
    
    pin: {
        type: String,
        maxlength: 6,
        minlength: 6,
    },
    email: {
        type: String,
        required: true,
    },
    expDate: {
        type: Date,
        required: true,
    }
}, {timestamps: true});



const ResetPin = mongoose.model('ResetPin', resetPinSchema);

module.exports = ResetPin;