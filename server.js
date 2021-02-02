const express = require('express');
const app = express();

const { dbConnection, addUser, userLogin } = require('./db/mongoose');

const PORT = process.env.PORT || 4000;

app.use(express.json())

dbConnection();

app.get('/', async(req, res) => {
    await res.send('Ide gas');
});

app.post('/', async(req, res) => {
    console.log(req.body);
    const user = await req.body;
    addUser(user);
    res.send(user);
})

app.post('/login', async(req, res) => {
    const username = await req.body.username;
    const dateToSend = await userLogin(username);
    res.send(dateToSend);
})

app.listen(PORT);