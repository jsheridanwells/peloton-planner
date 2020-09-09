import express from 'express';
import { requestHasRequiredFields } from '../../util/apiUtilities';
import { sendPelotonLogin } from '../../controllers/pelotonController';

const profileRoutes = () => {
    const router = express.Router();

    router.get('/', (req, res) => {
        res.send('got from profile');
    });

    router.post('/pelotonLogin', async (req, res) => {
        // request must have onepeloton login and password
        if (!requestHasRequiredFields(req.body, ['username_or_email', 'password'])) {
            res.status(422).send('missing onepeloton username or password');
        }

        // get session from peloton
        const pelotonResult = await sendPelotonLogin(req.body);
        res.json(pelotonResult);
    });

    return router;
};

export default profileRoutes;
