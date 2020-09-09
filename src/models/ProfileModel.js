import mongoose from 'mongoose';

const ProfileSchema = mongoose.Schema({
    pelotonUsernameHash: { type: String },
    pelotonPasswordHash: { type: String },
    currentGoalWeight: { type: Number },
    currentDailyCalories: { type: Number },
});

const ProfileModel = mongoose.model('Profile', ProfileSchema);

export default ProfileModel;
