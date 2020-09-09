import mongoose from 'mongoose';
import { toLowerCase } from '../util/schemaUtilities';

const UserSchema = mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true, required: true, set: toLowerCase},
    picture: { type: String },
    googleSubId: { type: String },
    pelotonUserName: { type: String },
    pelotonPasswordHash: { type: String },
    dateCreated: { type: Date, default: Date.now },
    active: { type: Boolean, default: true },
    profile: { type: Object },
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
