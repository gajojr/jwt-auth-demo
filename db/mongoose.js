const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/UserModel');

async function dbConnection() {
    await mongoose.connect('mongodb://localhost:27017/jwt-auth', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
}

async function registerUser(userInfo) {
    const user = new User(userInfo);
    await user.save();

    const token = await user.generateAuthToken();

    return token;
}

async function userLogin(userInfo) {
    const { username, password } = userInfo;
    const user = await User.findOne({ username });

    if (!user) {
        return 'no user found';
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return 'access denied';
    }

    const token = await user.generateAuthToken();

    // return user.date.toString();
    return { user, token };
}

module.exports = {
    dbConnection,
    registerUser,
    userLogin
}