// Vibe Match Routes
const express = require('express');
const router = express.Router();
const vibeMatchController = require('../controllers/vibeMatchController');
const { validateBody } = require('../middleware/validators');

/**
 * POST /api/vibe-match/profile
 * Create a new anonymous vibe profile
 * Body: { city, interests[], mood, preferredTime, personalityType, budgetMin, budgetMax }
 */
router.post('/profile', validateBody, vibeMatchController.createVibeProfile);

/**
 * POST /api/vibe-match/find
 * Find a matching vibe profile
 * Body: { city, interests[], mood, preferredTime, budget }
 */
router.post('/find', validateBody, vibeMatchController.findMatch);

/**
 * GET /api/vibe-match/stats/:city
 * Get vibe statistics for a city
 */
router.get('/stats/:city', vibeMatchController.getVibeStats);

module.exports = router;
