const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    reviewerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    vanId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Van' },
    rate: { type: Number, enum: [1, 2, 3, 4, 5], required: true, min: 1, max: 5 },
    reviewBody: { type: String, trim: true, maxLength: 500 },
  },
  { timestamps: true }
);

ReviewSchema.index({ vanId: 1 });

module.exports = mongoose.model('Review', ReviewSchema);
