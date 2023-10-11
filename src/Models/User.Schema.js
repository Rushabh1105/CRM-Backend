const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:  {
        type: String,
        maxlength: 50,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    phone: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {timestamps: true});

userSchema.pre('save', async function encryptedPassword(next){
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);
    this.password = hash;
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;