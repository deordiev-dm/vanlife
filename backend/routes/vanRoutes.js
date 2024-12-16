const experss = require('express');
const { getAllVans, getVanById, addVan, editVanData, deleteVan } = require('../controllers/vanController');
const { getVanReviews } = require('../controllers/reviewController');

const router = experss.Router();

router.get('/', getAllVans);
router.post('/', addVan);
router.put('/:vanId', editVanData);
router.get('/:id', getVanById);
router.get('/:vanId/reviews', getVanReviews);
router.delete('/:vanId', deleteVan);

module.exports = router;
