import express from 'express';
import { requestHasRequiredFields } from '../../util/apiUtilities';
import { sendPelotonLogin } from '../../controllers/pelotonController';
import {getUserProfile, removeUser, requestProfileDelete} from '../../controllers/usersController';

const profileRoutes = () => {
    const router = express.Router();

    router
        .get('/:uid', async (req, res) => {
            const uid = req.params.uid;
            const profileResult = await getUserProfile(uid);
            res.json(profileResult);
        })
        .post('/pelotonLogin', async (req, res) => {
            // request must have onepeloton login and password
            if (!requestHasRequiredFields(req.body, ['username_or_email', 'password'])) {
                res.status(422).send('request body is missing onepeloton username/email or password');
            }

            // get session from peloton
            const pelotonResult = await sendPelotonLogin(req.body);
            res.json(pelotonResult);
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
