import express from 'express';
import { tokenSignIn } from './auth';
import userRoutes from './users';

const routerIndex = () => {
    const router = express.Router();
    router.use('/auth/tokensignin', tokenSignIn());
    router.use('/users', userRoutes());
    return router
};

export default routerIndex;
