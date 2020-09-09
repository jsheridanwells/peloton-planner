import express from 'express';
import api from './api';

const userRoutes = () => {
    const router = express.Router();

    router.use('/', (req, res, next) => next(), requireUser);
    router.use('/api', api());

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

export default userRoutes;
