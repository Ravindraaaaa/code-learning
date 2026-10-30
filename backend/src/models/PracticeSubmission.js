import mongoose from 'mongoose';

const practiceSubmissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  questionId: { type: String, required: true, index: true },
  questionNumber: { type: Number, required: true, index: true },
  questionTitle: { type: String, required: true },
  language: { 
    type: String, 
    enum: ['cpp', 'java', 'javascript'], 
    required: true,
    index: true 
  },
  code: { type: String, required: true },
  status: {
    type: String,
    enum: ['Accepted', 'Wrong Answer', 'Compilation Error', 'Runtime Error', 'Time Limit Exceeded'],
    required: true,
    index: true
  },
  score: { type: Number, default: 0 },
  passedTestCases: { type: Number, default: 0 },
  totalTestCases: { type: Number, default: 0 },
  runtimeMs: { type: Number, default: 0 },
  error: { type: String, default: null },
  testCases: [{
    id: { type: mongoose.Schema.Types.Mixed },
    name: { type: String },
    input: { type: String, default: '' },
    expected: { type: String, default: '' },
    actual: { type: String, default: '' },
    passed: { type: Boolean, default: false },
    status: { type: String, default: '' },
    runtimeMs: { type: Number, default: 0 },
    error: { type: String, default: null }
  }],
  submittedAt: { type: Date, default: Date.now, index: true }
}, { timestamps: true });

export const PracticeSubmission = mongoose.model('PracticeSubmission', practiceSubmissionSchema);
export default PracticeSubmission;

