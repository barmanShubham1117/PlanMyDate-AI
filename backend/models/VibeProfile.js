// VibeProfile Model
// Stores anonymous user vibe profiles for matching purposes

const mongoose = require('mongoose');

const vibeProfileSchema = new mongoose.Schema(
  {
    // User Profile (No Personal Identifiable Information)
    city: {
      type: String,
      required: true,
      lowercase: true,
      index: true, // Index for faster queries
    },

    interests: {
      type: [String],
      enum: [
        'movies',
        'gaming',
        'books',
        'cafe hopping',
        'fitness',
        'art',
        'music',
        'travel',
        'food',
        'sports',
        'nature',
        'shopping',
      ],
      required: true,
    },

    mood: {
      type: String,
      enum: ['relaxed', 'energetic', 'social', 'reflective'],
      required: true,
    },

    budgetRange: {
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
    },

    preferredTime: {
      type: String,
      enum: ['morning', 'evening', 'night'],
      required: true,
    },

    personalityType: {
      type: String,
      enum: ['introvert', 'foodie', 'filmy', 'nerd', 'gamer'],
      required: true,
    },

    // Anonymity (NO personal data stored)
    // No names, email, phone, or identity stored

    // Metadata
    createdAt: {
      type: Date,
      default: Date.now,
      index: true, // For cleanup/expiry if needed
    },

    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient matching queries
vibeProfileSchema.index({ city: 1, preferredTime: 1 });
vibeProfileSchema.index({ city: 1, mood: 1 });

module.exports = mongoose.model('VibeProfile', vibeProfileSchema);
