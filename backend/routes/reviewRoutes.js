const express = require('express');
const { createReview } = require('../controllers/reviewController');

const router = express.Router();

router.post('/createReview', createReview);

module.exports = router;
