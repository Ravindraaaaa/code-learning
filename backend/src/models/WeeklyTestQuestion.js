import mongoose from 'mongoose';

const weeklyTestQuestionSchema = new mongoose.Schema({
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'WeeklyTest', required: true },
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOptionIndex: { type: Number, required: true }, // Protected
  points: { type: Number, default: 1 }
}, { timestamps: true });

// Prevent leaking correct answers
weeklyTestQuestionSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.correctOptionIndex;
  return obj;
};

export const WeeklyTestQuestion = mongoose.model('WeeklyTestQuestion', weeklyTestQuestionSchema);
export default WeeklyTestQuestion;
