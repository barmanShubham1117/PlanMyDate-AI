// Date Planner Controller
// Handles date planning requests

const DatePlan = require('../models/DatePlan');
const aiService = require('../services/aiService');
const formatService = require('../services/formatService');
const validationService = require('../services/validationService');
const { formatErrorResponse, formatSuccessResponse } = require('../utils/helpers');

/**
 * Generates a date plan based on user input
 * POST /api/date-planner
 */
const generateDatePlan = async (req, res) => {
  try {
    const { city, budget, dateType, partnerPersonality } = req.body;

    // Validate input
    const validation = validationService.validateDatePlannerInput({
      city,
      budget,
      dateType,
      partnerPersonality,
    });

    if (!validation.isValid) {
      return res.status(400).json(formatErrorResponse(validation.errors.join(', ')));
    }

    // Call AI service to generate plan
    console.log('📅 Generating date plan for:', { city, budget, dateType, partnerPersonality });
    const aiResponse = await aiService.generateDatePlan(city, budget, dateType, partnerPersonality);

    // Format AI response
    const formattedResponse = formatService.formatDatePlannerResponse(aiResponse);

    // Save to database
    const datePlan = new DatePlan({
      userInput: {
        city,
        budget,
        dateType,
        partnerPersonality,
      },
      aiResponse: formattedResponse,
    });

    await datePlan.save();
    console.log('✅ Date plan saved to database');

    // Return success response
    res.json(
      formatSuccessResponse(
        {
          planId: datePlan._id,
          ...formattedResponse,
        },
        'Date plan generated successfully'
      )
    );
  } catch (error) {
    console.error('Date planner error:', error.message);
    res.status(500).json(formatErrorResponse(error.message || 'Failed to generate date plan', 500));
  }
};

/**
 * Retrieves a previously generated date plan
 * GET /api/date-planner/:planId
 */
const getDatePlan = async (req, res) => {
  try {
    const { planId } = req.params;

    const datePlan = await DatePlan.findById(planId);

    if (!datePlan) {
      return res.status(404).json(formatErrorResponse('Date plan not found', 404));
    }

    res.json(formatSuccessResponse(datePlan, 'Date plan retrieved successfully'));
  } catch (error) {
    console.error('Error retrieving date plan:', error.message);
    res.status(500).json(formatErrorResponse(error.message || 'Failed to retrieve date plan', 500));
  }
};

/**
 * Lists recent date plans
 * GET /api/date-planner
 */
const getRecentDatePlans = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const datePlans = await DatePlan.find().sort({ createdAt: -1 }).limit(limit);

    res.json(formatSuccessResponse(datePlans, 'Recent date plans retrieved successfully'));
  } catch (error) {
    console.error('Error retrieving date plans:', error.message);
    res.status(500).json(formatErrorResponse(error.message || 'Failed to retrieve date plans', 500));
  }
};

module.exports = {
  generateDatePlan,
  getDatePlan,
  getRecentDatePlans,
};
