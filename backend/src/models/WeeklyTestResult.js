import mongoose from 'mongoose';

const weeklyTestResultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'WeeklyTest', required: true },
  answers: [
    {
      question: { type: mongoose.Schema.Types.ObjectId, ref: 'WeeklyTestQuestion', required: true },
      selectedOptionIndex: { type: Number, required: true },
      isCorrect: { type: Boolean, required: true }
    }
  ],
  score: { type: Number, required: true },
  totalPoints: { type: Number, required: true },
  percentage: { type: Number, required: true },
  startedAt: { type: Date, required: true },
  completedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export const WeeklyTestResult = mongoose.model('WeeklyTestResult', weeklyTestResultSchema);
export default WeeklyTestResult;
