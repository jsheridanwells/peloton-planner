import UserModel from '../models/UserModel';
import ProfileModel from '../models/ProfileModel';
import { createDeleteRequest, verifyDeleteRequest } from '../util/cryptography';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc)

export async function findOrCreateNewUser(userData) {
    const checkUser = await UserModel.findOne({ email: userData.email });
    if (!checkUser) {  // TODO : checking just for a user is working for now, but make sure this is enough.
        const userResult = await createUser(userData);
        const userId = userResult._id.toString();
        const profileResult = await createProfile(userResult)
        return { user: userResult, profile: profileResult };
    } else {
       return { user: checkUser };
    }
}

export async function getUserProfile(profileId) {
    return ProfileModel.findById(profileId).populate('user');
}

// TODO : now that we fetch profiles with embedded users, refactor to delete user associated
// with profile id
export function requestProfileDelete(uid) {
    return createDeleteRequest(uid);
}

export async function removeUser(userId, deleteRequest) {
    const verified = verifyDeleteRequest(userId, deleteRequest.encrypted, deleteRequest.key);
    const expires = dayjs(verified.expires);
    const now = dayjs(new Date());
    if (verified) {
        if (verified.uid === userId && expires.isAfter(now)) {
            await UserModel.findByIdAndRemove({ _id: verified.uid }, {}, (err) => {
                if (err) throw new Error(err.message);
            });
        }
        else {
            throw new Error('Invalid delete request');
        }
    } else {
        throw new Error('Invalid delete request');
    }
}

async function createUser(userData) {
    const userObj = {
        firstName: userData.given_name,
        lastName: userData.family_name,
        email: userData.email,
        picture: userData.picture,
        googleSubId: userData.sub,
    };
    const user = new UserModel(userObj);
    return await user.save();
}

async function createProfile(user) {
    const profileObj = { user };
    const profile = new ProfileModel(profileObj);
    return await profile.save();
}
