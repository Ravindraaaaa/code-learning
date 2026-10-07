import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Module name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Module slug is required'],
      lowercase: true,
      trim: true,
    },
    order: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    level: {
      type: String,
      default: 'Foundational',
      trim: true,
    },
    topicsCount: {
      type: Number,
      default: 10,
    },
    estimatedHours: {
      type: Number,
      default: 15,
    },
  },
  { _id: false }
);

const trackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Track name is required'],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Track slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Track description is required'],
      trim: true,
    },
    category: {
      type: String,
      default: 'Full-Stack Development',
      trim: true,
    },
    modules: {
      type: [moduleSchema],
      validate: {
        validator: function (modules) {
          return Array.isArray(modules) && modules.length > 0;
        },
        message: 'Track must have at least one module',
      },
    },
    totalModules: {
      type: Number,
      default: 0,
    },
    level: {
      type: String,
      default: 'Beginner to Advanced',
      trim: true,
    },
    estimatedHours: {
      type: Number,
      default: 120,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    displayOrder: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

trackSchema.pre('save', function (next) {
  if (Array.isArray(this.modules)) {
    this.totalModules = this.modules.length;
  }
  next();
});

export const Track = mongoose.model('Track', trackSchema);
export default Track;
