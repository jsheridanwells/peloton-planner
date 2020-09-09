import express from 'express';
import oAuthClient from '../util/googleOAuth';
// import { createUser } from '../domain/users/userService';
import { findOrCreateNewUser } from '../controllers/usersController';
import { createToken } from '../util/tokens';

export function tokenSignIn() {
    const router = express.Router();
    return router.post('/', async(req, res) => {
        await oAuthClient.verifyIdToken({
            idToken: req.body.idtoken,
            audience: oAuthClient._clientId
        })
            // .then(ticket => createUser(ticket.getPayload()))
            .then(ticket => findOrCreateNewUser(ticket.getPayload()))
            .then(user => {
                const token = createToken(user);
                res.send(token);
            })
            .catch(err => console.error(err));
    });
}
