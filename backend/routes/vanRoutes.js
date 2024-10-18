const experss = require('express');
const { getAllVans, getVanById, addVan } = require('../controllers/vanController');
const { getVanReviews } = require('../controllers/reviewController');

const router = experss.Router();

router.get('/', getAllVans);
router.get('/:id', getVanById);
router.get('/:vanId/reviews', getVanReviews);
router.post('/addVan', addVan);

module.exports = router;
