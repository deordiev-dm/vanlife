const Van = require('../models/Van');
const mongoose = require('mongoose');

const getAllVans = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 6;
  const skip = (page - 1) * limit;
  const typeFilter = req.query.type;

  try {
    const query = typeFilter ? { type: typeFilter } : {};

    const [vans, total] = await Promise.all([
      Van.find(query)
        .sort(typeFilter ? { [typeFilter]: 1 } : {})
        .skip(skip)
        .limit(limit),
      Van.countDocuments(query)
    ]);

    const pageCount = Math.ceil(total / limit);

    res.json({ vans, pageCount });
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
      return res.json([]);
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
      type
    });

    await van.save();

    res.status(201).json({ message: 'Van created successfully', van });
  } catch (error) {
    console.error('Error creating van:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const editVanData = async (req, res) => {
  const { vanId } = req.params;
  const vanUpdates = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(vanId)) {
      return res.status(400).json({ message: 'Invalid van ID' });
    }

    const updatedVan = await Van.findByIdAndUpdate(vanId, vanUpdates, { new: true, runValidators: true });

    if (!updatedVan) {
      return res.status(404).json({ message: 'Van not found' });
    }

    res.json({ message: 'Van updated successfully', updatedVan });
  } catch (error) {
    console.error('Error updating van', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteVan = async (req, res) => {
  const { vanId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(vanId)) {
      return res.status(400).json({ message: `Invalid van ID: ${vanId}` });
    }

    await Van.findByIdAndDelete(vanId);
    res.json({ message: 'Van deleted successfully' });
  } catch (error) {
    console.error('Error deleting van', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllVans,
  getVanById,
  getHostVans,
  addVan,
  editVanData,
  deleteVan
};
