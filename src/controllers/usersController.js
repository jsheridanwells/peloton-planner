import mongoose from 'mongoose';
import UserModel from '../models/UserModel';

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
