import mongoose from 'mongoose';

const debugChallengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  bugType: { type: String, enum: ['Syntax', 'Logical', 'Runtime', 'Logical Bug', 'Syntax Bug', 'Runtime Bug'], required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard', 'Beginner', 'Intermediate', 'Advanced'], default: 'Easy' },
  language: { type: String, required: true },
  buggyCode: { type: String, required: true },
  solutionCode: { type: String, required: true }, // Protected
  hints: [{ type: String }],
  testCases: [
    {
      input: { type: String, default: '' },
      expectedOutput: { type: String, required: true },
      isHidden: { type: Boolean, default: false },
      explanation: { type: String }
    }
  ],
  isActive: { type: Boolean, default: true },
  status: { type: String, enum: ['draft', 'published'], default: 'published', index: true }
}, { timestamps: true });

// Prevent leaking the solution and hidden test cases to the client
debugChallengeSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.solutionCode;
  
  if (obj.testCases && Array.isArray(obj.testCases)) {
    obj.testCases = obj.testCases.map(tc => {
      if (tc.isHidden) {
        return { _id: tc._id, isHidden: true };
      }
      return tc;
    });
  }
  
  return obj;
};

export const DebugChallenge = mongoose.model('DebugChallenge', debugChallengeSchema);
export default DebugChallenge;
