import express from 'express';
import oAuthClient from '../util/googleOAuth';
import { findOrCreateNewUser } from '../controllers/usersController';
import { createToken } from '../util/tokens';

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
    });
}
