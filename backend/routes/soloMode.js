// Solo Mode Routes
const express = require('express');
const router = express.Router();
const soloModeController = require('../controllers/soloModeController');
const { validateBody } = require('../middleware/validators');

/**
 * POST /api/solo-mode
 * Generate a solo date plan with optional vibe matching
 * Body: { interests[], mood, preferredTime, budget, city, personalityType }
 */
router.post('/', validateBody, soloModeController.generateSoloPlan);

module.exports = router;
