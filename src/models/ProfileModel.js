import mongoose from 'mongoose';

// this schema will hold any non-identifiable user data that will be persisted.
// any PII should be part of UserSchema in ./models/UserModel.js
const ProfileSchema = mongoose.Schema({
    currentWeightGoal: { type: Number, default: 0 },
    currentDailyCalories: { type: Number, default: 0 },
    previousWeightGoal: { type: Number, default: 0 },
    previousDailyCalories: { type: Number, default: 0 },
    dateCreated: { type: Date, default: Date.now },
    dateLastModified: { type: Date },
    active: { type: Boolean, default: true },
    userId: { type: String },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const ProfileModel = mongoose.model('Profile', ProfileSchema);

export default ProfileModel;
