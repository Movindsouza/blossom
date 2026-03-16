/**
 * Blossom Backend Server
 * Handles Claude AI API requests securely from the mobile app
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Import routes
const recommendationsRoute = require('./routes/recommendations');
const careRoute = require('./routes/care');
const faqRoute = require('./routes/faq');
const identifyRoute = require('./routes/identify');

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Backend is running! 🌱' });
});

// API Routes
app.use('/api/recommendations', recommendationsRoute);
app.use('/api/care', careRoute);
app.use('/api/faq', faqRoute);
app.use('/api/identify', identifyRoute);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : undefined,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
  🌱 Blossom Backend Server Running
  ✅ Server: http://localhost:${PORT}
  ✅ Health Check: http://localhost:${PORT}/health
  ✅ CORS enabled for mobile apps
  `);
});

module.exports = app;
