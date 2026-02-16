// MongoDB Database Connection Configuration
const mongoose = require('mongoose');
const env = require('./env');

/**
 * Connects to MongoDB database
 * Uses environment variable MONGODB_URI for connection string
 */
const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb://root:root123@localhost:27017/mernDB?authSource=admin"
    );

    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = { connectDatabase };
