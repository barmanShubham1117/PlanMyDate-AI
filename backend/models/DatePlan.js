// DatePlan Model
// Stores generated date plans from the AI

const mongoose = require('mongoose');

const datePlanSchema = new mongoose.Schema(
  {
    // User Input
    userInput: {
      city: {
        type: String,
        required: true,
        lowercase: true,
      },
      budget: {
        type: Number,
        required: true,
      },
      dateType: {
        type: String,
        enum: ['romantic', 'fun', 'casual', 'adventure'],
        required: true,
      },
      partnerPersonality: {
        type: String,
        enum: ['introvert', 'foodie', 'filmy', 'nerd', 'gamer'],
        required: true,
      },
    },

    // AI Generated Content
    aiResponse: {
      itinerary: {
        type: String, // Hour-by-hour plan
        required: false,
      },
      conversationStarters: {
        type: [String], // Array of conversation starters
        required: false,
      },
      outfitSuggestions: {
        type: String,
        required: false,
      },
      estimatedCost: {
        type: String,
        required: false,
      },
      mistakesToAvoid: {
        type: [String],
        required: false,
      },
      emergencyRescueLines: {
        type: [String],
        required: false,
      },
    },

    // Metadata
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('DatePlan', datePlanSchema);
