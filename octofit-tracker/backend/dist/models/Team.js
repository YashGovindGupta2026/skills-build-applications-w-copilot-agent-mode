import { Schema, model } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true, trim: true },
    description: String,
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });
export default model('Team', teamSchema);
