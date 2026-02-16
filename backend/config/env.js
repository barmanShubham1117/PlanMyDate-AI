// Environment variable configuration
// This module loads and validates all required environment variables

require('dotenv').config();

const env = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/planmydate_ai',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};

// Validate required environment variables
if (!env.GEMINI_API_KEY) {
  console.warn('⚠️  WARNING: GEMINI_API_KEY is not set in .env file');
}

if (!env.MONGODB_URI) {
  console.warn('⚠️  WARNING: MONGODB_URI is not set in .env file');
}

module.exports = env;
