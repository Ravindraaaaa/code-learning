import mongoose from 'mongoose';

const competitionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  status: { type: String, enum: ['draft', 'published'], default: 'published', index: true }
}, { timestamps: true });

export const Competition = mongoose.model('Competition', competitionSchema);
export default Competition;
