const experss = require('express');
const { getAllVans, getVanById } = require('../controllers/vanController');

const router = express.Router();

router.get('/vans', getAllVans);
router.get('/vans/:id', getVanById);

module.exports = router;
