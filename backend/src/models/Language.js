import mongoose from 'mongoose';

const languageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Language name is required'],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Language slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    version: {
      type: String,
      required: [true, 'Language version is required'],
      trim: true,
    },
    fileExtension: {
      type: String,
      required: [true, 'File extension is required'],
      trim: true,
    },
    monacoMode: {
      type: String,
      required: [true, 'Monaco editor mode is required'],
      trim: true,
    },
    defaultTemplate: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Language = mongoose.model('Language', languageSchema);
export default Language;
