require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: { type: Date, default: Date.now },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

// we use this NOT to send password in response
userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

userSchema.methods.generateAuthToken = async function() {
    const user = this;

    const token = await jwt.sign({ _id: user._id.toString() }, process.env.JWT_KEYWORD, { expiresIn: '10 days' });

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;