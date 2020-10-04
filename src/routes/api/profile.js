import express from 'express';
import { getUserProfile, removeUser, requestProfileDelete } from '../../controllers/usersController';

const profileRoutes = () => {
    const router = express.Router();

    router
        .get('/:uid', async (req, res) => {
            const uid = req.params.uid;
            const profileResult = await getUserProfile(uid);
            res.json(profileResult);
        })
        .post('/deleteRequest/:uid', (req, res) => {
            const uid = req.params.uid;
            const deleteRequest = requestProfileDelete(uid);
            res.send(deleteRequest);
        })
        .delete('/:uid', (req, res) => {
            removeUser(req.params.uid, req.body)
                .then(result => res.status(200).send())
                .catch(err => res.status(401).send(err.message));
        });

    return router;
};

export default profileRoutes;
