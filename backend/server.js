const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const vanRoutes = require('./routes/vanRoutes');

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use('/api', vanRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
