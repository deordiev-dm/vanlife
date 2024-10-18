const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { getHostReviews } = require('../controllers/reviewController');
const { getHostTransactions } = require('../controllers/transactionController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { getHostVans } = require('../controllers/vanController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/validate-token', authMiddleware, (req, res) => {
  res.json({ message: 'Token is valid', user: req.user });
});
router.get('/:userId/hostReviews', getHostReviews);
router.get('/:userId/hostTransactions', getHostTransactions);
router.get('/:userId/hostVans', getHostVans);

module.exports = router;
