// Date Planner Routes
const express = require('express');
const router = express.Router();
const datePlannerController = require('../controllers/datePlannerController');
const { validateBody } = require('../middleware/validators');

/**
 * POST /api/date-planner
 * Generate a new date plan
 * Body: { city, budget, dateType, partnerPersonality }
 */
router.post('/', validateBody, datePlannerController.generateDatePlan);

/**
 * GET /api/date-planner/:planId
 * Get a specific date plan by ID
 */
router.get('/:planId', datePlannerController.getDatePlan);

/**
 * GET /api/date-planner
 * Get recent date plans
 * Query: ?limit=10 (optional)
 */
router.get('/', datePlannerController.getRecentDatePlans);

module.exports = router;
