import { UserModel } from './UserModel';

async function get(userId) {
    return UserModel.findOne({ _id: userId });
}

async function create(userData) {
    const user = new UserModel(userData);
    return await user.save();
}

async function update(userId, userData) {
    const user = await getUser(userId);
    if (!user) {
        return new Error('user not found');
    }
    Object.keys(userData).forEach(key => user[key] = userData[key]);
    return user.save();
}

export {
    get,
    create,
    update,
}
