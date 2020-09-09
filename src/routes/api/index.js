import express from 'express';
import profile from './profile';

const apiIndex = () => {
    const router = express.Router();

    // TODO : register all api routes here
    router.use('/profile', profile());

    return router;
}

export default apiIndex;
