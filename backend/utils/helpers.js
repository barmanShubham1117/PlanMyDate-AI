// Helper Utility Functions

/**
 * Validates if an email is in correct format
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates if budget is a positive number
 * @param {number} budget - Budget amount
 * @returns {boolean}
 */
const isValidBudget = (budget) => {
  return budget && budget > 0 && Number.isInteger(budget);
};

/**
 * Calculates similarity between two arrays (counts common elements)
 * @param {array} arr1 - First array
 * @param {array} arr2 - Second array
 * @returns {number} - Count of common elements
 */
const countCommonElements = (arr1, arr2) => {
  return arr1.filter((item) => arr2.includes(item)).length;
};

/**
 * Checks if two budget ranges overlap
 * @param {object} budget1 - First budget {min, max}
 * @param {object} budget2 - Second budget {min, max}
 * @returns {boolean}
 */
const budgetsOverlap = (budget1, budget2) => {
  return budget1.min <= budget2.max && budget2.min <= budget1.max;
};

/**
 * Formats error response
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 * @returns {object}
 */
const formatErrorResponse = (message, statusCode = 400) => {
  return {
    success: false,
    error: message,
    statusCode,
  };
};

/**
 * Formats success response
 * @param {object} data - Response data
 * @param {string} message - Success message
 * @returns {object}
 */
const formatSuccessResponse = (data, message = 'Success') => {
  return {
    success: true,
    message,
    data,
  };
};

module.exports = {
  isValidEmail,
  isValidBudget,
  countCommonElements,
  budgetsOverlap,
  formatErrorResponse,
  formatSuccessResponse,
};
