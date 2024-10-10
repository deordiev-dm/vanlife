const Van = require('../models/Van');

const getAllVans = async (req, res) => {
  try {
    const vans = await Van.find();
    res.json(vans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error ' });
  }
};

const getVanById = async (req, res) => {
  const { id } = req.params;

  try {
    const van = await Van.findById(id);

    if (!van) {
      return res.status(404).json({ message: 'Van not found ' });
    }

    res.json(van);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllVans,
  getVanById,
};
