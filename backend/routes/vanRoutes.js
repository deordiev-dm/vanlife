const experss = require('express');
const { getAllVans, getVanById, addVan, editVanData } = require('../controllers/vanController');
const { getVanReviews } = require('../controllers/reviewController');

const router = experss.Router();

router.get('/', getAllVans);
router.post('/', addVan);
router.put('/:vanId', editVanData);
router.get('/:id', getVanById);
router.get('/:vanId/reviews', getVanReviews);

module.exports = router;
