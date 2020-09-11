import express from 'express';
import profile from './profile';
import workouts from './workouts';

const apiIndex = () => {
    const router = express.Router();

    // TODO : register all api routes here
    router.use('/', (req, res, next) => next(), requireUser);
    router.use('/profile', profile());
    router.use('/workouts', workouts());

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
