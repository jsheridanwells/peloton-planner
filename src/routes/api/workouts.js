import express from 'express';
import {getPelotonWorkouts, loadWorkoutDetails} from '../../controllers/pelotonController';
import {requestHasRequiredFields} from '../../util/apiUtilities';

const workoutRoutes = () => {
    const router = express.Router();

    router
        .get('/new', async (req, res) => {
            if (!requestHasRequiredFields(req.query, ['peloton_user_id', 'peloton_session_id'])) {
                res.status(422).send('request parameters are missing peloton user_id or session_id');
            }
            const pelotonUserId = req.query.peloton_user_id;
            const pelotonSessionId = req.query.peloton_session_id;
            const data = await getPelotonWorkouts(pelotonUserId, pelotonSessionId);
            res.json(data);
        })
        .post('/new', async (req, res) => {
            const workouts = req.body.workouts;
            const sessionId = req.query.peloton_session_id;
            const userId = req.user._userId;
            await loadWorkoutDetails(workouts, sessionId, userId)
                .then(() => {
                    res.sendStatus(201);
                })
                .catch(err => res.sendStatus(500));
        });

    return router;
};

export default workoutRoutes;
