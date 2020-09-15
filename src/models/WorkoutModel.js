import mongoose from 'mongoose';

const WorkoutSchema = mongoose.Schema({
    userId: { type: String },
    createdAt: { type: Date },
    workoutType: { type: String },
    totalWork: { type: Number },
    totalTime: { type: Number },
});

const WorkoutModel = mongoose.model('Workout', WorkoutSchema);

export default  WorkoutModel;
