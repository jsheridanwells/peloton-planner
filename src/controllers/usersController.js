import mongoose from 'mongoose';
import UserModel from '../models/UserModel';
import { createDeleteRequest, verifyDeleteRequest } from '../util/cryptography';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc)

export async function findOrCreateNewUser(userData) {
    const checkUser = await UserModel.findOne({ email: userData.email });
    if (!checkUser) {  // TODO : checking just for a user is working for now, but make sure this is enough.
        const userObj = {
            firstName: userData.given_name,
            lastName: userData.family_name,
            email: userData.email,
            picture: userData.picture,
            googleSubId: userData.sub,
        };

        const user = new UserModel(userObj);

        return await user.save();
    } else {
       return checkUser;
    }
}

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
