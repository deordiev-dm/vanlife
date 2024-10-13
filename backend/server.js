const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db');

const vanRoutes = require('./routes/vanRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const loggerMiddleware = require('./middlewares/loggerMiddleware');

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(loggerMiddleware);

app.use(express.json());

connectDB();

app.use(cors());

app.use('/api', vanRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
