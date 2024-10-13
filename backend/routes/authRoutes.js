const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/validate-token', authMiddleware, (req, res) => {
  res.json({ message: 'Token is valid', user: req.user });
});

module.exports = router;
