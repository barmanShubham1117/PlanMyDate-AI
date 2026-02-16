// Gemini AI Configuration
const env = require('./env');

const aiConfig = {
  apiKey: env.GEMINI_API_KEY,
  model: 'gemini-3-flash-preview',
  temperature: 0.7,
  maxTokens: 2000,
  rateLimits: {
    requestsPerMinute: 15,
    tokensPerMinute: 1000000,
    requestsPerDay: 1500
  }
};

module.exports = aiConfig;
