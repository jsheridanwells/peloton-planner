import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    picture: { type: String },
    googleSubId: { type: String },
});

export const UserModel = mongoose.model('User', UserSchema);
