// Vibe Match Controller
// Handles vibe profile management and matching

const VibeProfile = require('../models/VibeProfile');
const matchingService = require('../services/matchingService');
const validationService = require('../services/validationService');
const { formatErrorResponse, formatSuccessResponse } = require('../utils/helpers');

/**
 * Creates a new vibe profile
 * POST /api/vibe-match/profile
 */
const createVibeProfile = async (req, res) => {
  try {
    const { city, interests, mood, preferredTime, personalityType, budgetMin, budgetMax } = req.body;

    // Validate input
    const validation = validationService.validateVibeProfileInput({
      city,
      interests,
      mood,
      preferredTime,
      personalityType,
      budgetRange: {
        min: budgetMin,
        max: budgetMax,
      },
    });

    if (!validation.isValid) {
      return res.status(400).json(formatErrorResponse(validation.errors.join(', ')));
    }

    // Save profile
    const profile = await matchingService.saveVibeProfile({
      city: city.toLowerCase(),
      interests,
      mood,
      preferredTime,
      personalityType,
      budgetRange: {
        min: budgetMin,
        max: budgetMax,
      },
    });

    console.log('✅ New vibe profile created');

    res.status(201).json(
      formatSuccessResponse(
        {
          profileId: profile._id,
          message: 'Anonymous profile created. Your vibe will help match others!',
        },
        'Vibe profile created successfully'
      )
    );
  } catch (error) {
    console.error('Error creating vibe profile:', error.message);
    res.status(500).json(formatErrorResponse(error.message || 'Failed to create vibe profile', 500));
  }
};

/**
 * Finds a matching vibe profile for a given user input
 * POST /api/vibe-match/find
 */
const findMatch = async (req, res) => {
  try {
    const { city, interests, mood, preferredTime, budget } = req.body;

    // Basic validation
    if (!city || !interests || !mood || !preferredTime || !budget) {
      return res.status(400).json(formatErrorResponse('Missing required fields'));
    }

    // Find matching profile
    const matchedProfile = await matchingService.findMatchingProfile({
      city: city.toLowerCase(),
      interests,
      mood,
      preferredTime,
      budget,
    });

    if (!matchedProfile) {
      return res.json(
        formatSuccessResponse(
          { match: null },
          'No compatible vibe found in your city yet. Your profile will help future matches!'
        )
      );
    }

    res.json(
      formatSuccessResponse(
        {
          match: {
            id: matchedProfile._id,
            city: matchedProfile.city,
            interests: matchedProfile.interests,
            mood: matchedProfile.mood,
            preferredTime: matchedProfile.preferredTime,
            // Do NOT expose personal data
          },
        },
        'Compatible vibe found!'
      )
    );
  } catch (error) {
    console.error('Error finding match:', error.message);
    res.status(500).json(formatErrorResponse(error.message || 'Failed to find match', 500));
  }
};

/**
 * Gets statistics about vibe profiles in a city
 * GET /api/vibe-match/stats/:city
 */
const getVibeStats = async (req, res) => {
  try {
    const { city } = req.params;

    const profiles = await VibeProfile.find({ city: city.toLowerCase() });

    if (profiles.length === 0) {
      return res.json(
        formatSuccessResponse(
          { stats: null },
          'No vibe profiles in this city yet'
        )
      );
    }

    // Calculate statistics
    const moods = {};
    const interests = {};
    const times = {};

    profiles.forEach((profile) => {
      // Count moods
      moods[profile.mood] = (moods[profile.mood] || 0) + 1;

      // Count interests
      profile.interests.forEach((interest) => {
        interests[interest] = (interests[interest] || 0) + 1;
      });

      // Count preferred times
      times[profile.preferredTime] = (times[profile.preferredTime] || 0) + 1;
    });

    res.json(
      formatSuccessResponse(
        {
          city: city.toLowerCase(),
          totalProfiles: profiles.length,
          moods,
          interests,
          preferredTimes: times,
        },
        'Vibe statistics retrieved'
      )
    );
  } catch (error) {
    console.error('Error getting vibe stats:', error.message);
    res.status(500).json(formatErrorResponse(error.message || 'Failed to get stats', 500));
  }
};

module.exports = {
  createVibeProfile,
  findMatch,
  getVibeStats,
};
