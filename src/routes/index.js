import express from 'express';
import { tokenSignIn } from './auth';
import apiRoutes from './api';

const routerIndex = () => {
    const router = express.Router();
    router.use('/auth/tokensignin', tokenSignIn());
    router.use('/api', apiRoutes());
    return router
};

export default routerIndex;
