import mongoose from 'mongoose';

const assessmentQuestionSchema = new mongoose.Schema({
  track: { type: mongoose.Schema.Types.ObjectId, ref: 'Track', default: null },
  language: { type: mongoose.Schema.Types.ObjectId, ref: 'Language', default: null },
  questionText: { type: String, required: true },
  options: {
    type: [String],
    required: true,
    validate: [v => v.length >= 2, 'A question must have at least 2 options']
  },
  correctOptionIndex: {
    type: Number,
    required: true,
    min: 0
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published',
    index: true
  }
}, { timestamps: true });

// Ensure correctOptionIndex is stripped when returning questions to the user
assessmentQuestionSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.correctOptionIndex;
  return obj;
};

export const AssessmentQuestion = mongoose.model('AssessmentQuestion', assessmentQuestionSchema);
export default AssessmentQuestion;
