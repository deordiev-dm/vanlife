const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db');

const vanRoutes = require('./routes/vanRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const loggerMiddleware = require('./middlewares/loggerMiddleware');

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(loggerMiddleware);

app.use(express.json());

connectDB();

app.use(cors());

app.use('/api/vans', vanRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/transactions', transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
