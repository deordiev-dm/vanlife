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

module.exports = getVanReviews;
