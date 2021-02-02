const mongoose = require('mongoose');
const { User } = require('./models/UserModel');

async function dbConnection() {
    await mongoose.connect('mongodb://localhost:27017/jwt-auth', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

async function addUser(userInfo) {
    await User.create({...userInfo });
}

async function userLogin(username) {
    const user = await User.findOne({ username });
    return user.date.toString();
}

module.exports = {
    dbConnection,
    addUser,
    userLogin
}