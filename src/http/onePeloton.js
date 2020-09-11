import axios from 'axios';

let axiosOptions = {
    baseURL: 'https://api.onepeloton.com',
    timeout: 1000,
};

export async function loginPeloton(loginObj) {
    try {
        axiosOptions.headers = createPostHeaders(loginObj);
        const result = await axios.post('/auth/login', loginObj, axiosOptions);
        return result.data;
    } catch (err) {
        console.error('axios error: ', err.response);
    }
}

export async function listWorkouts(pelotonUserId, pelotonSessionId) {
    try {
        axiosOptions.headers = createGetHeaders();
        axiosOptions.headers = addCookieToHeaders(axiosOptions.headers, pelotonSessionId);
        return await axios.get(`/api/user/${ pelotonUserId }/workouts`, axiosOptions)
            .then(result => {
                return result.data;
            });
    } catch (err) {
        console.error('axios error: ', err.response);
    }
}

export async function getWorkoutDetails(workoutId, pelotonSessionId) {
    try {
        axiosOptions.headers = createGetHeaders();
        axiosOptions.headers = addCookieToHeaders(axiosOptions.headers, pelotonSessionId);
        return await axios.get(`/api/workout/${ workoutId }`, axiosOptions)
            .then(result => result.data);
    } catch(err) {
        console.error('axios error: ', err.response);
    }
}

const createGetHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'User-Agent': 'peloton-planner',
        'Accept': '*/*'
    }
};

const addCookieToHeaders = (headers, pelotonSessionId) => {
    headers['Cookie'] = `peloton_session_id=${ pelotonSessionId }`;
    return headers;
};

const createPostHeaders = postBody => {
    const headers = createGetHeaders();
    headers['Content-Length'] = JSON.stringify(postBody).length
    return headers;
};
