import { Schema, model } from 'mongoose';
const workoutSchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: String,
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: [{ name: String, sets: Number, reps: Number, durationSeconds: Number }],
    tags: [String],
}, { timestamps: true });
export default model('Workout', workoutSchema);
