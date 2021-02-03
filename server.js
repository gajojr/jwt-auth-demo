const express = require('express');
const app = express();
const auth = require('./middleware/auth');

const { dbConnection, registerUser, userLogin } = require('./db/mongoose');

const PORT = process.env.PORT || 4000;

// middleware 
// app.use((req, res, next) => {
// console.log(req.method, req.path);
// if (req.method === 'GET') {
//     res.send('GET request are disabled');
// } else {
//     next();
// }
// res.status(503).send('Site is under maintenance');
// });

app.use(express.json());
if (process.env.NODE_ENV === 'production') {
    const helmet = require('helmet');
    app.use(helmet());
}

dbConnection();

app.get('/', async(req, res) => {
    res.send('Get request succesful');
});

app.post('/register', async(req, res) => {
    try {
        const user = await req.body;
        const token = await registerUser(user);
        res.send({ user, token });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/login', async(req, res) => {
    try {
        const user = await req.body;
        const dataToSend = await userLogin(user);
        res.send(dataToSend);
    } catch (err) {
        res.status(400).send(err);
    }
});

// logout from this session
app.post('/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);

        await req.user.save();

        res.send('Loged out from this session');
    } catch (err) {
        res.status(500).send('Error occured while trying to log out the user');
    }
});

// logout from all sessions
app.post('/logoutAll', auth, async(req, res) => {
    try {
        req.user.tokens = [];

        await req.user.save();

        res.send('Loged out of all sessiong');
    } catch (err) {
        res.status(500).send('Error occured while trying to log out the user');
    }
});

app.get('/users/me', auth, async(req, res) => {
    res.send(req.user);
});


app.listen(PORT);