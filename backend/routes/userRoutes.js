const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { getReviewsForHost } = require('../controllers/reviewController');
const { getHostReviews } = require('../controllers/transactionController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/validate-token', authMiddleware, (req, res) => {
  res.json({ message: 'Token is valid', user: req.user });
});
router.get('/:userId/hostReviews', getReviewsForHost);
router.get('/:userId/hostTransactions', getHostReviews);

module.exports = router;
