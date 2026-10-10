import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Batch',
      required: [true, 'Batch ID is required'],
      index: true,
    },
    orderId: {
      type: String,
      required: [true, 'Gateway order ID is required'],
      unique: true,
      index: true,
    },
    paymentId: {
      type: String,
      default: null,
      index: true,
    },
    amountPaid: {
      type: Number,
      required: [true, 'Amount paid is required'],
      min: [0, 'Amount paid cannot be negative'],
      immutable: true, // Amount paid is immutable once purchase order is created
    },
    currency: {
      type: String,
      default: '₹',
      trim: true,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      default: 'GATEWAY_SANDBOX',
      trim: true,
    },
    paymentSignature: {
      type: String,
      default: null,
    },
    transactionId: {
      type: String,
      default: null,
    },
    verifiedAt: {
      type: Date,
      default: null,
    },
    purchasedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index user and batch to look up enrollment status quickly
purchaseSchema.index({ user: 1, batch: 1 });

const Purchase = mongoose.models.Purchase || mongoose.model('Purchase', purchaseSchema);

export default Purchase;
