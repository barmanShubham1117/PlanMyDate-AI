// Rate Limiter Middleware
// Implements Gemini AI free tier rate limiting (15 requests per minute)

const aiConfig = require('../config/ai-config');

// In-memory store for rate limiting
const requestStore = {
  requests: [],
  dailyRequests: 0,
  lastResetDate: new Date().toDateString()
};

/**
 * Rate limiter middleware for Gemini AI free tier
 * Limits: 15 requests per minute, 1500 requests per day
 */
const aiRateLimiter = (req, res, next) => {
  const now = Date.now();
  const currentDate = new Date().toDateString();
  
  // Reset daily counter if new day
  if (requestStore.lastResetDate !== currentDate) {
    requestStore.dailyRequests = 0;
    requestStore.lastResetDate = currentDate;
  }
  
  // Check daily limit
  if (requestStore.dailyRequests >= aiConfig.rateLimits.requestsPerDay) {
    return res.status(429).json({
      success: false,
      error: 'Daily AI request limit reached. Please try again tomorrow.',
      retryAfter: 'tomorrow'
    });
  }
  
  // Remove requests older than 1 minute
  requestStore.requests = requestStore.requests.filter(
    timestamp => now - timestamp < 60000
  );
  
  // Check per-minute limit
  if (requestStore.requests.length >= aiConfig.rateLimits.requestsPerMinute) {
    const oldestRequest = requestStore.requests[0];
    const retryAfter = Math.ceil((60000 - (now - oldestRequest)) / 1000);
    
    return res.status(429).json({
      success: false,
      error: 'Too many requests. Please wait before trying again.',
      retryAfter: `${retryAfter} seconds`
    });
  }
  
  // Add current request
  requestStore.requests.push(now);
  requestStore.dailyRequests++;
  
  next();
};

module.exports = aiRateLimiter;
