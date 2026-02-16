// Main Routes Index
const express = require('express');
const router = express.Router();

// Import all route modules
const datePlannerRoutes = require('./datePlanner');
const soloModeRoutes = require('./soloMode');
const vibeMatchRoutes = require('./vibeMatch');

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'PlanMyDate AI API is running',
    timestamp: new Date().toISOString(),
  });
});

// Mount all route modules
router.use('/date-planner', datePlannerRoutes);
router.use('/solo-mode', soloModeRoutes);
router.use('/vibe-match', vibeMatchRoutes);

// 404 handler for /api
router.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path,
  });
});

module.exports = router;
