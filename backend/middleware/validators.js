// Request Validation Middleware
// Validates common request properties

/**
 * Middleware to ensure JSON request body is present
 */
const validateJSON = (req, res, next) => {
  if (!req.is('application/json')) {
    return res.status(400).json({
      success: false,
      error: 'Content-Type must be application/json',
    });
  }
  next();
};

/**
 * Middleware to validate if request body exists
 */
const validateBody = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Request body is required',
    });
  }
  next();
};

module.exports = {
  validateJSON,
  validateBody,
};
