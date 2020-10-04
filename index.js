import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import appConfig from './src/config/appConfig';
import routerIndex from './src/routes';
import {verifyToken} from './src/util/jwt';

mongoose.connect(appConfig.mongoDsn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Successfully connected to Mongodb'))
    .catch(err => console.error('Mongo error::: ', err));

// express init
const app = express();

// body-parser config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// middlewares
app.use(express.static(path.join(__dirname, '/client')));

// replace req.user with null or user object from latest jwt in each request
app.use((req, res, next) => {
    req.user = null;
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            req.user = verifyToken(token);
        }
    }
    next();
});
app.use('/', routerIndex());

// express is ready :)
app.listen(appConfig.port, () => console.log(`app is listening on port ${ appConfig.port }`));
