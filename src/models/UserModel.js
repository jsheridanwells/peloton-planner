import mongoose from 'mongoose';
import { toLowerCase } from '../util/schemaUtilities';

// this schema will hold any PII and can be removed from the database by the user
const UserSchema = mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true, required: true, set: toLowerCase},
    picture: { type: String },
    googleSubId: { type: String },
    dateCreated: { type: Date, default: Date.now },
    // profile: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Profile'
    // }
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
