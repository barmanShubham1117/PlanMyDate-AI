// Matching Service
// Handles vibe profile matching logic

const VibeProfile = require('../models/VibeProfile');
const { countCommonElements, budgetsOverlap } = require('../utils/helpers');

/**
 * Finds matching vibe profiles based on similarity
 * Matching criteria:
 * - Same city (required)
 * - At least 2 common interests
 * - Similar mood preference
 * - Overlapping budget ranges
 * - Preferred time (optional but preferred)
 *
 * @param {object} userInput - Solo user's input
 * @returns {Promise<object|null>} - Matched profile or null if no match found
 */
const findMatchingProfile = async (userInput) => {
  try {
    // Get all profiles from the same city
    const profilesInCity = await VibeProfile.find({
      city: userInput.city.toLowerCase(),
    });

    if (profilesInCity.length === 0) {
      return null; // No profiles in this city
    }

    // Score each profile based on compatibility
    let bestMatch = null;
    let bestScore = 0;

    profilesInCity.forEach((profile) => {
      let score = 0;

      // Check common interests (required: at least 2)
      const commonInterests = countCommonElements(userInput.interests, profile.interests);
      if (commonInterests < 2) {
        return; // Skip this profile if not enough common interests
      }
      score += commonInterests * 10; // 10 points per common interest

      // Check if budgets overlap
      const userBudget = { min: userInput.budget * 0.8, max: userInput.budget * 1.2 };
      if (budgetsOverlap(userBudget, profile.budgetRange)) {
        score += 20; // 20 points for overlapping budget
      }

      // Check if mood matches (bonus points if exact match)
      if (userInput.mood === profile.mood) {
        score += 15; // 15 points for mood match
      }

      // Check if preferred time matches (bonus)
      if (userInput.preferredTime === profile.preferredTime) {
        score += 15; // 15 points for time match
      }

      // Update best match if this score is higher
      if (score > bestScore) {
        bestScore = score;
        bestMatch = profile;
      }
    });

    // Return match only if score is reasonable (>= 25 points minimum)
    return bestScore >= 25 ? bestMatch : null;
  } catch (error) {
    console.error('Error finding matching profile:', error);
    throw error;
  }
};

/**
 * Saves a new vibe profile to the database
 * @param {object} profileData - Vibe profile data
 * @returns {Promise<object>} - Saved profile
 */
const saveVibeProfile = async (profileData) => {
  try {
    const vibeProfile = new VibeProfile(profileData);
    return await vibeProfile.save();
  } catch (error) {
    console.error('Error saving vibe profile:', error);
    throw error;
  }
};

/**
 * Cleans up expired vibe profiles (older than 30 days)
 * Can be called periodically via cron job
 * @returns {Promise<object>} - Deletion result
 */
const cleanupExpiredProfiles = async () => {
  try {
    const result = await VibeProfile.deleteMany({
      expiresAt: { $lt: new Date() },
    });
    console.log(`Cleaned up ${result.deletedCount} expired vibe profiles`);
    return result;
  } catch (error) {
    console.error('Error cleaning up expired profiles:', error);
    throw error;
  }
};

module.exports = {
  findMatchingProfile,
  saveVibeProfile,
  cleanupExpiredProfiles,
};
