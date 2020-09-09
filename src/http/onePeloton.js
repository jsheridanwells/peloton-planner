import axios from 'axios';

export async function loginPeloton(loginObj) {
    try {
        const headers = createHeaders(loginObj);
        const axiosOptions = {
            baseURL: 'https://api.onepeloton.com',
            timeout: 1000,
            headers,
        };
        const result = await axios.post('/auth/login', loginObj, axiosOptions);
        return result.data;
    } catch (err) {
        console.error('axios error: ', err);
    }
}

const createHeaders = postBody => {
    return {
        'Content-Type': 'application/json',
        'Content-Length': JSON.stringify(postBody).length,
        'User-Agent': 'peloton-planner',
        'Accept': '*/*'
    }
};
