const express = require('express');
const { getReviewsForHost } = require('../controllers/reviewController');

const router = express.Router();

router.get('/host/:hostId', getReviewsForHost);

module.exports = router;
