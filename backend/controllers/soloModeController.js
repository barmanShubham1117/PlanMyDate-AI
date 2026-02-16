// Solo Mode Controller
// Handles solo date planning requests

const aiService = require('../services/aiService');
const formatService = require('../services/formatService');
const validationService = require('../services/validationService');
const matchingService = require('../services/matchingService');
const { formatErrorResponse, formatSuccessResponse } = require('../utils/helpers');

/**
 * Generates a solo date plan and checks for vibe matches
 * POST /api/solo-mode
 */
const generateSoloPlan = async (req, res) => {
  try {
    const { interests, mood, preferredTime, budget, city, personalityType } = req.body;

    // Validate solo mode input
    const validation = validationService.validateSoloModeInput({
      interests,
      mood,
      preferredTime,
      budget,
    });

    if (!validation.isValid) {
      return res.status(400).json(formatErrorResponse(validation.errors.join(', ')));
    }

    // Generate solo plan
    console.log('🎯 Generating solo plan for:', { city, interests, mood, preferredTime, budget });
    const aiResponse = await aiService.generateSoloPlan(interests, mood, preferredTime, budget);
    console.log('✅ AI response:', aiResponse);

    // Format AI response
    const formattedResponse = formatService.formatSoloModeResponse(aiResponse);
    console.log('✅ Formatted solo plan response:', formattedResponse);
    

    // Try to find a vibe match
    let vibeMatchSuggestion = null;
    try {
      const matchedProfile = await matchingService.findMatchingProfile({
        city: city.toLowerCase(),
        interests,
        mood,
        preferredTime,
        budget,
      });

      if (matchedProfile) {
        console.log('💫 Found vibe match! Generating match suggestion...');
        
        const matchAiResponse = await aiService.generateVibeMatchSuggestion(
          { interests, mood, preferredTime, budget },
          matchedProfile
        );

        vibeMatchSuggestion = formatService.formatVibeMatchResponse(matchAiResponse);
      }
    } catch (matchError) {
      console.log('ℹ️  No vibe match found or error occurred:', matchError.message);
      // Continue without match, don't fail the request
    }

    // Save user's vibe profile for future matching
    try {
      await matchingService.saveVibeProfile({
        city: city.toLowerCase(),
        interests,
        mood,
        preferredTime,
        personalityType,
        budgetRange: {
          min: budget * 0.8,
          max: budget * 1.2,
        },
      });
      console.log('✅ Vibe profile saved for future matching');
    } catch (saveError) {
      console.log('ℹ️  Could not save vibe profile:', saveError.message);
    }

    // Return response
    res.json(
      formatSuccessResponse(
        {
          soloPlan: formattedResponse,
          vibeMatch: vibeMatchSuggestion,
          hasMatch: vibeMatchSuggestion !== null,
        },
        'Solo plan generated' + (vibeMatchSuggestion ? ' with vibe match!' : '')
      )
    );
  } catch (error) {
    console.error('Solo mode error:', error.message);
    res.status(500).json(formatErrorResponse(error.message || 'Failed to generate solo plan', 500));
  }
};

module.exports = {
  generateSoloPlan,
};
