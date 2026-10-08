import mongoose from 'mongoose';

const competitionParticipationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  competition: { type: mongoose.Schema.Types.ObjectId, ref: 'Competition', required: true },
  joinedAt: { type: Date, default: Date.now },
  totalScore: { type: Number, default: 0 },
  submissions: [
    {
      question: { type: mongoose.Schema.Types.ObjectId, ref: 'CompetitionQuestion' },
      submittedCode: { type: String },
      language: { type: String },
      passed: { type: Boolean },
      score: { type: Number },
      submittedAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

// Ensure a student can only join a competition once
competitionParticipationSchema.index({ student: 1, competition: 1 }, { unique: true });

export const CompetitionParticipation = mongoose.model('CompetitionParticipation', competitionParticipationSchema);
export default CompetitionParticipation;
