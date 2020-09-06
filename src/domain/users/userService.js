import { create } from './userRepository';

export async function createUser(userData) {
    const userObj = {
        firstName: userData.given_name,
        lastName: userData.family_name,
        email: userData.email,
        picture: userData.picture,
        googleSubId: userData.sub,
    };
    return await create(userObj);
}
