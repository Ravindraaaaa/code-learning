import mongoose from 'mongoose';

const assessmentSubmissionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  track: { type: mongoose.Schema.Types.ObjectId, ref: 'Track', default: null },
  language: { type: mongoose.Schema.Types.ObjectId, ref: 'Language', default: null },
  answers: [{
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'AssessmentQuestion', required: true },
    selectedOptionIndex: { type: Number, required: true },
    isCorrect: { type: Boolean, required: true }
  }],
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  percentage: { type: Number, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  startedAt: { type: Date, default: Date.now },
  completedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export const AssessmentSubmission = mongoose.model('AssessmentSubmission', assessmentSubmissionSchema);
export default AssessmentSubmission;
