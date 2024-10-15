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

const getReviewsForHost = async (req, res) => {
  const { hostId } = req.params;

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
          'van.hostId': new mongoose.Types.ObjectId(hostId),
        },
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

module.exports = { getVanReviews, getReviewsForHost };

//       {
//  $unwind: '$van',
// },
