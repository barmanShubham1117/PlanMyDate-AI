// AI Service
// Handles all communication with Gemini AI API

const { GoogleGenerativeAI } = require('@google/generative-ai');
const aiConfig = require('../config/ai-config');
const prompts = require('../utils/prompts');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(aiConfig.apiKey);

/**
 * Calls Gemini AI API with a prompt
 * @param {string} prompt - The prompt to send to AI
 * @returns {Promise<string>} - AI response text
 */
const callGeminiAI = async (prompt) => {
  try {
    if (!aiConfig.apiKey) {
      throw new Error('Gemini API key not configured. Please set GEMINI_API_KEY in .env');
    }

    const model = genAI.getGenerativeModel({ 
      model: aiConfig.model,
      generationConfig: {
        temperature: aiConfig.temperature,
        maxOutputTokens: aiConfig.maxTokens,
      }
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini AI API Error:', error);
    
    if (error.message?.includes('API_KEY_INVALID') || error.message?.includes('403')) {
      throw new Error('Invalid Gemini API key. Please check your .env file.');
    }
    
    if (error.message?.includes('429') || error.message?.includes('RESOURCE_EXHAUSTED')) {
      throw new Error('Gemini API rate limited. Please try again later.');
    }

    throw new Error(`AI Service Error: ${error.message}`);
  }
};

/**
 * Generates date plan using AI
 * @param {string} city - City for the date
 * @param {number} budget - Budget amount
 * @param {string} dateType - Type of date
 * @param {string} partnerPersonality - Partner's personality
 * @returns {Promise<string>} - AI-generated date plan
 */
const generateDatePlan = async (city, budget, dateType, partnerPersonality) => {
  const prompt = prompts.datePlannerPrompt(city, budget, dateType, partnerPersonality);
  return await callGeminiAI(prompt);
};

/**
 * Generates solo mode plan using AI
 * @param {array} interests - User's interests
 * @param {string} mood - User's mood
 * @param {string} preferredTime - Preferred time of day
 * @param {number} budget - Budget amount
 * @returns {Promise<string>} - AI-generated solo plan
 */
const generateSoloPlan = async (interests, mood, preferredTime, budget) => {
  const prompt = prompts.soloModePrompt(interests, mood, preferredTime, budget);
  return await callGeminiAI(prompt);
};

/**
 * Generates vibe match suggestion using AI
 * @param {object} soloUserInput - Solo user's input
 * @param {object} matchedProfile - Matched vibe profile
 * @returns {Promise<string>} - AI-generated match suggestion
 */
const generateVibeMatchSuggestion = async (soloUserInput, matchedProfile) => {
  const prompt = prompts.vibeMatchPrompt(soloUserInput, matchedProfile);
  return await callGeminiAI(prompt);
};

module.exports = {
  callGeminiAI,
  generateDatePlan,
  generateSoloPlan,
  generateVibeMatchSuggestion,
};
