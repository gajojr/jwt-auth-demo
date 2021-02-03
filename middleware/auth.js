require('dotenv').config();

const jwt = require('jsonwebtoken');
const User = require('../db/models/UserModel');

const auth = async(req, res, next) => {
    try {
        // [Bearer, tokenValue] so we take second item(tokenValue)
        const token = req.header('authorization').split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_KEYWORD);
        // find the user with _id that has this token in his tokens
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        // so we can access it later in server.js;
        req.token = token;
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).send({ error: 'Please authenticate' });
    }
}

module.exports = auth;