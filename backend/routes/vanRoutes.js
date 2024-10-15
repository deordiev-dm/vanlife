const experss = require('express');
const { getAllVans, getVanById } = require('../controllers/vanController');
const { getVanReviews } = require('../controllers/reviewController');

const router = experss.Router();

router.get('/', getAllVans);
router.get('/:id', getVanById);
router.get('/:vanId/reviews', getVanReviews);

module.exports = router;
