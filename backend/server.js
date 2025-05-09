const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const catererRoutes = require('./routes/caterers');
const customerRoutes = require('./routes/customers');

// Express app
const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', authRoutes);
app.use('/api', catererRoutes);
app.use('/api', customerRoutes); // Added the customerRoutes for customer handling

// Root route
app.get('/', (req, res) => res.send('Server running!'));

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
