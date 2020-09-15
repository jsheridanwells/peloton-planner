import {getWorkoutDetails, listWorkouts, loginPeloton} from '../http/onePeloton';
import WorkoutModel from '../models/WorkoutModel';

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
    ).then(results => {
        const workoutsMap = results.map(result => mapWorkoutDetails(result, userId));
        WorkoutModel.create(workoutsMap);
    }).catch(err => console.log('Error: ', err));
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

// TODO : figure out how to parse date in DB
function mapWorkoutDetails(workoutData, uid) {
    return {
        userId: uid,
        createdAt: new Date(parseInt(workoutData.created_at)),
        workoutType: workoutData.fitness_discipline,
        totalWork: workoutData.total_work,
        totalTime: workoutData.total_time,
    }
}

