const Transaction = require('../models/Transaction');

const getHostTransactions = async (req, res) => {
  const { hostId } = req.params;

  try {
    const transactions = await Transaction.find({ receiverId: hostId });

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: 'Found no transactions for the host' });
    }

    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getHostTransactions };
