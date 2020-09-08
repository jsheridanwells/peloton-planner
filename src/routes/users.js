import express from 'express';

const routes = () => {
    const router = express.Router();
    router.use('/', (req, res, next) => {
        next();
    }, requireUser);
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

export default routes;
