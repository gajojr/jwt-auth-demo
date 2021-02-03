const express = require('express');
const app = express();

const { dbConnection, registerUser, userLogin } = require('./db/mongoose');

const PORT = process.env.PORT || 4000;

// middleware 
app.use((req, res, next) => {
    // console.log(req.method, req.path);
    // if (req.method === 'GET') {
    //     res.send('GET request are disabled');
    // } else {
    //     next();
    // }
    res.status(503).send('Site is under maintenance');
});

app.use(express.json());
if (process.env.NODE_ENV === 'production') {
    const helmet = require('helmet');
    app.use(helmet());
}

dbConnection();

app.get('/', async(req, res) => {
    try {
        res.send('Get request succesful');
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/register', async(req, res) => {
    try {
        const user = await req.body;
        const token = await registerUser(user);
        res.send({ user, token });
    } catch (err) {
        res.status(500).send(err);
    }
})

app.post('/login', async(req, res) => {
    try {
        const user = await req.body;
        const dataToSend = await userLogin(user);
        res.send(dataToSend);
    } catch (err) {
        res.status(400).send(err);
    }
})

app.listen(PORT);