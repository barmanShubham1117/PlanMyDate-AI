// API Client
// Handles all communication with the backend

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Make API request to backend
 * @param {string} endpoint - API endpoint path
 * @param {object} options - Fetch options (method, body, headers)
 * @returns {Promise<object>} - JSON response
 */
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const finalOptions = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, finalOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * Generate a couple date plan
 */
async function generateDatePlan(city, budget, dateType, partnerPersonality) {
  return apiCall('/date-planner', {
    method: 'POST',
    body: JSON.stringify({
      city,
      budget: parseInt(budget),
      dateType,
      partnerPersonality,
    }),
  });
}

/**
 * Generate a solo date plan
 */
async function generateSoloPlan(city, interests, mood, preferredTime, budget, personalityType) {
  return apiCall('/solo-mode', {
    method: 'POST',
    body: JSON.stringify({
      city,
      interests,
      mood,
      preferredTime,
      budget: parseInt(budget),
      personalityType,
    }),
  });
}

/**
 * Create a vibe profile
 */
async function createVibeProfile(city, interests, mood, preferredTime, personalityType, budgetMin, budgetMax) {
  return apiCall('/vibe-match/profile', {
    method: 'POST',
    body: JSON.stringify({
      city,
      interests,
      mood,
      preferredTime,
      personalityType,
      budgetMin: parseInt(budgetMin),
      budgetMax: parseInt(budgetMax),
    }),
  });
}

/**
 * Find a vibe match
 */
async function findVibeMatch(city, interests, mood, preferredTime, budget) {
  return apiCall('/vibe-match/find', {
    method: 'POST',
    body: JSON.stringify({
      city,
      interests,
      mood,
      preferredTime,
      budget: parseInt(budget),
    }),
  });
}

/**
 * Get vibe statistics for a city
 */
async function getVibeStats(city) {
  return apiCall(`/vibe-match/stats/${city}`);
}

/**
 * Health check
 */
async function healthCheck() {
  return apiCall('/health');
}
