import express from 'express';
import profile from './profile';
import workouts from './workouts';
import peloton from './peloton';

const apiIndex = () => {
    const router = express.Router();
    router.use('/', (req, res, next) => next(), requireUser);
    router.use('/profile', profile());
    router.use('/workouts', workouts());
    router.use('/peloton', peloton());
    return router;
};

function requireUser(req, res, next) {
    if (req.user) {
        next();
    }
    else {
        res.sendStatus(401);
    }
}

export default apiIndex;



