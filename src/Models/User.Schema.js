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
    refreshJWT: {
        token: {
            type: String,
            default: ''
        },
        addedAt:{
            type: Date,
            required: true,
            default: Date.now(),
        }
    }
}, {timestamps: true});

userSchema.pre('save', async function encryptedPassword(next){
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);
    this.password = hash;
    next();
});

userSchema.methods.isValidPassword = async function checkValidity(password){
    const user = this;
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
}

const User = mongoose.model('User', userSchema);

module.exports = User;