import express from 'express';
import {requestHasRequiredFields} from '../../util/apiUtilities';
import {sendPelotonLogin} from '../../controllers/pelotonController';


const pelotonRoutes = () => {
    const router = express.Router();

    router.post('/login', async (req, res) => {
        // request must have onepeloton login and password
        if (!requestHasRequiredFields(req.body, ['username_or_email', 'password'])) {
            res.status(422).send('request body is missing onepeloton username/email or password');
        }

        // get session from peloton
        const pelotonResult = await sendPelotonLogin(req.body);
        res.json(pelotonResult);
    });

    return router;
};

export default pelotonRoutes;
