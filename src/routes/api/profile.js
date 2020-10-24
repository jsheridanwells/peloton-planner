import express from 'express';
import { getUserProfile, removeUser, requestProfileDelete } from '../../controllers/usersController';

const profileRoutes = () => {
    const router = express.Router();

    // TODO : straighten out user id vs. profile id
    router
        .get('/:uid', async (req, res) => {
            const uid = req.params.uid;
            const profileResult = await getUserProfile(uid);
            res.json(profileResult);
        })
        // TODO : pick it up here   < ---   <---  <----  <----  !!!
        .post('/:uid', async (req, res) => {
            const uid = req.params.uid;
            console.log('chgeck user', req.user, uid);
            res.send('ok');
        })
        // TODO : make request go by user attached to profile id, add in switching profile object to inactive
        .post('/deleteRequest/:uid', (req, res) => {
            const uid = req.params.uid;
            const deleteRequest = requestProfileDelete(uid);
            res.send(deleteRequest);
        })
        // TODO : make request go by user attached to profile id, add in switching profile object to inactive
        .delete('/:uid', (req, res) => {
            removeUser(req.params.uid, req.body)
                .then(result => res.status(200).send())
                .catch(err => res.status(401).send(err.message));
        });

    return router;
};

export default profileRoutes;
