import { Schema, model } from 'mongoose';
const leaderboardSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, min: 0, default: 0 },
    rank: { type: Number, min: 1 },
    period: { type: String, required: true, trim: true },
}, { timestamps: true });
leaderboardSchema.index({ period: 1, points: -1 });
export default model('Leaderboard', leaderboardSchema);
