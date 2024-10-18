const { mongoose } = require('mongoose');
const Review = require('../models/Review');

const getVanReviews = async (req, res) => {
  const { vanId } = req.params;

  try {
    const reviews = await Review.find({ vanId: vanId });

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found' });
    }

    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal error' });
  }
};

const getHostReviews = async (req, res) => {
  const { userId } = req.params;

  try {
    const reviews = await Review.aggregate([
      {
        $lookup: {
          from: 'vans',
          localField: 'vanId',
          foreignField: '_id',
          as: 'van',
        },
      },
      {
        $match: {
          'van.hostId': new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $unwind: '$van',
      },
    ]);

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for that host' });
    }

    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createReview = async (req, res) => {
  const { reviewerId, vanId, rate, reviewBody } = req.body;

  if (!reviewerId || !vanId || !rate) {
    return res.status(400).json({ message: 'Missing required fields for review' });
  }

  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'Rate must be between 1 and 5' });
  }

  try {
    const review = new Review({
      reviewBody: reviewBody || '',
      reviewerId: new mongoose.Types.ObjectId(reviewerId),
      vanId: new mongoose.Types.ObjectId(vanId),
      rate,
    });

    await review.save();
    res.status(201).json({ message: 'Review successfully created', review });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getVanReviews, getHostReviews, createReview };
