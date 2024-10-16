const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
  {
    sum: {
      type: Number,
      required: true,
      min: 0.01,
    },
    senderId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiverId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    vanId: {
      type: mongoose.Types.ObjectId,
      ref: 'Van',
      required: true,
    },
  },
  { timestamps: true }
);

TransactionSchema.index({ receiverId: 1 });

module.exports = mongoose.model('Transaction', TransactionSchema);
