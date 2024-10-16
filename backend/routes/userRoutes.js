const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { getHostReviews } = require('../controllers/reviewController');
const { getHostTransactions } = require('../controllers/transactionController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/validate-token', authMiddleware, (req, res) => {
  res.json({ message: 'Token is valid', user: req.user });
});
router.get('/:userId/hostReviews', getHostReviews);
router.get('/:userId/hostTransactions', getHostReviews);

module.exports = router;
