import mongoose from 'mongoose';

const batchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Batch name is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    price: {
      type: Number,
      required: [true, 'Batch price is required'],
      min: [0, 'Price cannot be negative'],
      default: 49,
    },
    currency: {
      type: String,
      default: '₹',
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'upcoming', 'archived'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

const Batch = mongoose.models.Batch || mongoose.model('Batch', batchSchema);

export default Batch;
