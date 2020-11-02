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

// load client
app.use(express.static(path.join(__dirname, '/temp_client')));

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

// express is ready :)
// app.listen(appConfig.port, () => console.log(`app is listening on port ${ appConfig.port }`));

export default app;
