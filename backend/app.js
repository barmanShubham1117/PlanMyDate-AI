// Express Application Setup
// Configure middleware and routes

const express = require('express');
const cors = require('cors');
const env = require('./config/env');
const errorHandler = require('./middleware/errorHandler');
const aiRateLimiter = require('./middleware/rateLimiter');
const apiRoutes = require('./routes');

const app = express();

// ============ MIDDLEWARE ============

// CORS - Allow requests from frontend
app.use(
  cors({
    origin: '*', // For development; restrict in production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// JSON parser
app.use(express.json({ limit: '10mb' }));

// URL encoded parser
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging (simple)
app.use((req, res, next) => {
  console.log(`📍 ${req.method} ${req.path}`);
  next();
});

// ============ ROUTES ============

// Serve static files from frontend (if needed)
app.use(express.static('../frontend'));

// API routes (with rate limiting for AI endpoints)
app.use('/api', aiRateLimiter, apiRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to PlanMyDate AI API',
    version: '1.0.0',
    documentation: '/api/health',
    endpoints: {
      datePlanner: '/api/date-planner',
      soloMode: '/api/solo-mode',
      vibeMatch: '/api/vibe-match',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    path: req.path,
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

module.exports = app;
