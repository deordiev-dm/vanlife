const Van = require('../models/Van');
const mongoose = require('mongoose');

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

const getHostVans = async (req, res) => {
  const { userId } = req.params;

  try {
    const vans = await Van.find({ hostId: userId });

    if (!vans.length) {
      return res.status(404).json({ message: 'No vans found' });
    }

    res.json(vans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const addVan = async (req, res) => {
  const { description, hostId, imageUrl, name, price, type } = req.body;

  if (!description || !hostId || !imageUrl || !name || !price || !type) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (price <= 0) {
    return res.status(400).json({ message: 'Price must be greater that zero' });
  }

  try {
    const van = new Van({
      description,
      hostId: new mongoose.Types.ObjectId(hostId),
      imageUrl,
      name,
      price,
      type,
    });

    await van.save();

    res.status(201).json({ message: 'Van created successfully', van });
  } catch (error) {
    console.error('Error creating van:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllVans,
  getVanById,
  getHostVans,
  addVan,
};
