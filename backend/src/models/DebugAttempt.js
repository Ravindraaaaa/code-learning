import mongoose from 'mongoose';

const debugAttemptSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  challenge: { type: mongoose.Schema.Types.ObjectId, ref: 'DebugChallenge', required: true },
  submittedCode: { type: String, required: true },
  status: { type: String, enum: ['Passed', 'Failed', 'Compile Error', 'Runtime Error', 'Timeout'], required: true },
  score: { type: Number, default: 0 },
  hintsUsed: { type: Number, default: 0 },
  hintPenalty: { type: Number, default: 0 },
  executionTimeMs: { type: Number, default: 0 },
  feedback: { type: String, default: '' },
  testCaseResults: [
    {
      testCaseId: { type: mongoose.Schema.Types.ObjectId },
      passed: { type: Boolean, required: true },
      actualOutput: { type: String },
      error: { type: String }
    }
  ]
}, { timestamps: true });

export const DebugAttempt = mongoose.model('DebugAttempt', debugAttemptSchema);
export default DebugAttempt;
