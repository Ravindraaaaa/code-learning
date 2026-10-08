import mongoose from 'mongoose';

const roadmapSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    track: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Track',
      default: null,
    },
    language: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Language',
      default: null,
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      required: true,
    },
    topics: [
      {
        topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
        status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
        lessons: [
          {
            lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
            status: { type: String, enum: ['pending', 'completed'], default: 'pending' }
          }
        ]
      }
    ],
    progressPercentage: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export const Roadmap = mongoose.model('Roadmap', roadmapSchema);
export default Roadmap;
