import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import liveReload from 'livereload';
import connectLivereload from 'connect-livereload';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import appConfig from './src/config/appConfig';
import routerIndex from './src/routes';
import {verifyToken} from './src/util/jwt';

let liveReloadServer;

mongoose.connect(appConfig.mongoDsn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Successfully connected to Mongodb'))
    .catch(err => console.error('Mongo error::: ', err));

// express init
const app = express();

if (process.env.NODE_ENV !== 'production') {
    liveReloadServer = liveReload.createServer();
    liveReloadServer.watch(path.join(__dirname, 'client/dist/peloton-planner'));
    app.use(connectLivereload());
    liveReloadServer.server.once('connection', () => {
        setTimeout(() => liveReloadServer.refresh('/'), 100);
    });
}


// body-parser config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// load client
// app.use(express.static(path.join(__dirname, '/temp_client'))); // temp harness
app.use(express.static(path.join(__dirname, 'client/dist/peloton-planner')));

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

// catch 404s
app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

// handle errors
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

export default app;
