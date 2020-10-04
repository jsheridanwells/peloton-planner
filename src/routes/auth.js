import express from 'express';
import oAuthClient from '../util/googleOAuth';
import { findOrCreateNewUser } from '../controllers/usersController';
import { createToken } from '../util/jwt';
import { requestHasRequiredFields } from '../util/apiUtilities';
import { sendPelotonLogin } from '../controllers/pelotonController';

export function tokenSignIn() {
    const router = express.Router();
    return router.post('/', async(req, res) => {
        await oAuthClient.verifyIdToken({
            idToken: req.body.idtoken,
            audience: oAuthClient._clientId
        })
            .then(ticket => findOrCreateNewUser(ticket.getPayload()))
            .then(result => {
                const token = createToken(result.user);
                res.send(token);
            })
            .catch(err => console.error(err));
        })
}

export function pelotonLogin() {
    const router = express.Router();
    return router.post('/', async (req, res) => {
        // request must have onepeloton login and password
        if (!requestHasRequiredFields(req.body, ['username_or_email', 'password'])) {
            res.status(422).send('request body is missing onepeloton username/email or password');
        }

        // get session from peloton
        const pelotonResult = await sendPelotonLogin(req.body);
        res.json(pelotonResult);
    });
}
