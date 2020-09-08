import express from 'express';
import { tokenSignIn } from './auth';
import userRoutes from './users';

function routerIndex() {
    const router = express.Router();
    router.use('/auth/tokensignin', tokenSignIn());
    router.use('/users', userRoutes());
    return router;
}

module.exports = routerIndex;
