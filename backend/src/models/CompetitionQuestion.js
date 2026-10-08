import mongoose from 'mongoose';

const competitionQuestionSchema = new mongoose.Schema({
  competition: { type: mongoose.Schema.Types.ObjectId, ref: 'Competition', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  points: { type: Number, default: 100 },
  testCases: [
    {
      input: { type: String, required: true },
      expectedOutput: { type: String, required: true },
      isHidden: { type: Boolean, default: false }
    }
  ]
}, { timestamps: true });

// Prevent leaking hidden test cases
competitionQuestionSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.testCases = obj.testCases.map(tc => {
    if (tc.isHidden) {
      return { _id: tc._id, isHidden: true };
    }
    return tc;
  });
  return obj;
};

export const CompetitionQuestion = mongoose.model('CompetitionQuestion', competitionQuestionSchema);
export default CompetitionQuestion;
