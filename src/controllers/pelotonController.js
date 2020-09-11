import {getWorkoutDetails, listWorkouts, loginPeloton} from '../http/onePeloton';

export async function sendPelotonLogin(loginObj) {
    const pelotonResponse = await loginPeloton(loginObj);
    return createPelotonLoginResult(pelotonResponse);
}

export async function getPelotonWorkouts(pelotonUserId, pelotonSessionId) {
    const workoutsResponse = await listWorkouts(pelotonUserId, pelotonSessionId);
    return createWorkoutsResult(workoutsResponse);

}

export async function loadWorkoutDetails(workouts, sessionId, userId) {
    Promise.all(
        workouts.map(async wo => {
            return await getWorkoutDetails(wo.workoutId, sessionId);
        })
    ).then(results => console.log('loadWorkoutDetails promise all result, :: ', results));
    // TODO : handle saving data to database
}

function createPelotonLoginResult(pelotonResponse) {
    return {
        pelotonUserId: pelotonResponse.user_id,
        pelotonSessionID: pelotonResponse.session_id,
        next: {
            url: '/api/workouts/new',
            method: 'GET',
        }
    };
}

function createWorkoutsResult(workoutResponse) {
    return workoutResponse.data.map(d => {
        return {
            workoutId: d.id,
            createdAt: d.created_at,
            type: d.name,
            status: d.status,
            totalWork: d.total_work,
            toSave: true,
        }
    });
}

