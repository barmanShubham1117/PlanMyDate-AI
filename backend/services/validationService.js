// Validation Service
// Validates all user inputs before processing

const validations = {
  // Validate date planner input
  validateDatePlannerInput: (input) => {
    const errors = [];

    if (!input.city || input.city.trim() === '') {
      errors.push('City is required');
    }

    if (!input.budget || input.budget <= 0) {
      errors.push('Budget must be a positive number');
    }

    const validDateTypes = ['romantic', 'fun', 'casual', 'adventure'];
    if (!input.dateType || !validDateTypes.includes(input.dateType)) {
      errors.push('Date type must be one of: romantic, fun, casual, adventure');
    }

    const validPersonalities = ['introvert', 'foodie', 'filmy', 'nerd', 'gamer'];
    if (!input.partnerPersonality || !validPersonalities.includes(input.partnerPersonality)) {
      errors.push('Partner personality must be one of: introvert, foodie, filmy, nerd, gamer');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  // Validate solo mode input
  validateSoloModeInput: (input) => {
    const errors = [];

    if (!input.interests || !Array.isArray(input.interests) || input.interests.length === 0) {
      errors.push('At least one interest is required');
    }

    const validMoods = ['relaxed', 'energetic', 'social', 'reflective'];
    if (!input.mood || !validMoods.includes(input.mood)) {
      errors.push('Mood must be one of: relaxed, energetic, social, reflective');
    }

    const validTimes = ['morning', 'evening', 'night'];
    if (!input.preferredTime || !validTimes.includes(input.preferredTime)) {
      errors.push('Preferred time must be one of: morning, evening, night');
    }

    if (!input.budget || input.budget <= 0) {
      errors.push('Budget must be a positive number');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  // Validate vibe profile input
  validateVibeProfileInput: (input) => {
    const errors = [];

    if (!input.city || input.city.trim() === '') {
      errors.push('City is required');
    }

    if (!input.interests || !Array.isArray(input.interests) || input.interests.length === 0) {
      errors.push('At least one interest is required');
    }

    const validMoods = ['relaxed', 'energetic', 'social', 'reflective'];
    if (!input.mood || !validMoods.includes(input.mood)) {
      errors.push('Mood must be one of: relaxed, energetic, social, reflective');
    }

    if (!input.budgetRange || input.budgetRange.min <= 0 || input.budgetRange.max <= 0) {
      errors.push('Budget range must be positive numbers');
    }

    if (input.budgetRange && input.budgetRange.min > input.budgetRange.max) {
      errors.push('Minimum budget cannot be greater than maximum budget');
    }

    const validTimes = ['morning', 'evening', 'night'];
    if (!input.preferredTime || !validTimes.includes(input.preferredTime)) {
      errors.push('Preferred time must be one of: morning, evening, night');
    }

    const validPersonalities = ['introvert', 'foodie', 'filmy', 'nerd', 'gamer'];
    if (!input.personalityType || !validPersonalities.includes(input.personalityType)) {
      errors.push('Personality type must be one of: introvert, foodie, filmy, nerd, gamer');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },
};

module.exports = validations;
