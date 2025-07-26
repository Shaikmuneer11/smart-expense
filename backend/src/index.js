const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();  // collects default Node.js metrics

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection with retry
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ DB connection failed, retrying in 5s...', err.message);
    setTimeout(connectDB, 5000);
  }
};

connectDB();

// Import and use expense routes
const expenseRoutes = require('./routes/expense');
app.use('/api/expenses', expenseRoutes);

// Root test route
app.get('/', (req, res) => res.send('SmartExpense API running'));

// Prometheus metrics route
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

