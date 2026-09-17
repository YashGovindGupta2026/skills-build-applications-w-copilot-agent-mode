import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    calories: { type: Number, min: 0 },
    distance: { type: Number, min: 0 },
    completedAt: { type: Date, required: true, default: Date.now },
    notes: String,
  },
  { timestamps: true },
);

export default model('Activity', activitySchema);
