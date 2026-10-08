import mongoose from 'mongoose';

const weeklyTestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WeeklyTestQuestion' }],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const WeeklyTest = mongoose.model('WeeklyTest', weeklyTestSchema);
export default WeeklyTest;
