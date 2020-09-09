import { loginPeloton } from '../http/onePeloton';

export async function sendPelotonLogin(loginObj) {
    return await loginPeloton(loginObj);
}
