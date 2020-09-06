import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import { oAuthClient } from './src/util/google';
import mongoose from 'mongoose';
import { createUser } from './src/domain/users/userService';

mongoose.connect('mongodb://localhost:27017/pelotonPlanner', { useNewUrlParser: true })
    .then(() => console.log('Successfully connected to Mongodb'))
    .catch(err => console.error('Mongo error::: ', err));

// express init
const app = express();
const PORT = 3000;

// body-parser config
app.use(bodyParser.urlencoded({ extended: true }));

// middlewares
app.use(express.static(path.join(__dirname, '/client')));

// TODO : move these to router
app.get('/', (req, res) => {
    res.send(`app is listening on port ${ PORT }`);
});

app.get('auth/google/callback', (req, res) => {
    console.log('got called back')
});

app.get('/unauthorized', (req, res) => {
    res.sendStatus(401);
})

app.post('/tokensignin', async (req, res) => {
    await oAuthClient.verifyIdToken({
        idToken: req.body.idtoken,
        audience: oAuthClient._clientId
    })
    .then(ticket => createUser(ticket.getPayload()))
    .then(user => res.json(user))
    .catch(err => console.error(err));
});

// express is ready :)
app.listen(PORT, () => console.log(`app is listening on port ${ PORT }`));
