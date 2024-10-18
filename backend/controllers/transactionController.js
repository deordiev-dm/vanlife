const { default: mongoose } = require('mongoose');
const Transaction = require('../models/Transaction');

const getHostTransactions = async (req, res) => {
  const { userId } = req.params;

  try {
    const transactions = await Transaction.find({ receiverId: new mongoose.Types.ObjectId(userId) });

    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createTransaction = async (req, res) => {
  const { sum, senderId, receiverId, vanId } = req.body;

  if (!sum || !senderId || !receiverId || !vanId) {
    return res.status(400).json({ message: 'Missing required fields for transaction' });
  }

  if (sum <= 0) {
    return res.status(400).json({ message: 'Sum must be greater than zero' });
  }

  try {
    const transaction = new Transaction({
      sum,
      senderId: new mongoose.Types.ObjectId(senderId),
      receiverId: new mongoose.Types.ObjectId(receiverId),
      vanId: new mongoose.Types.ObjectId(vanId),
    });

    await transaction.save();

    res.status(201).json({ message: 'Transaction created successfully', transaction });
  } catch (error) {
    console.error('Error creating transaction', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getHostTransactions, createTransaction };
