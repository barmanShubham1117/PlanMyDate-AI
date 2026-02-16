// Format Service
// Formats AI responses into structured, readable sections

/**
 * Parses AI response text and extracts sections based on headers
 * @param {string} aiResponseText - Raw AI response text
 * @returns {object} - Structured response object
 */
const parseAIResponse = (aiResponseText) => {
  const sections = {};
  
  // Split by common section headers
  const lines = aiResponseText.split('\n');
  let currentSection = null;
  let currentContent = [];

  lines.forEach((line) => {
    // Check if this line is a section header (ends with colon and is in caps)
    if (line.includes(':') && line === line.toUpperCase() && line.length < 50) {
      // Save previous section
      if (currentSection) {
        sections[currentSection] = currentContent
          .join('\n')
          .trim()
          .split('\n')
          .filter((item) => item.trim() !== '');
      }
      
      // Start new section
      currentSection = line.replace(':', '').toLowerCase().trim();
      currentContent = [];
    } else if (currentSection) {
      currentContent.push(line);
    }
  });

  // Save last section
  if (currentSection) {
    sections[currentSection] = currentContent
      .join('\n')
      .trim()
      .split('\n')
      .filter((item) => item.trim() !== '');
  }

  return sections;
};

/**
 * Formats date planner response
 * @param {string} aiResponse - Raw AI response
 * @returns {object} - Formatted response
 */
const formatDatePlannerResponse = (aiResponse) => {
  const parsed = parseAIResponse(aiResponse);
  console.log("Parsed Date Planner AI Response: ", parsed);

  return {
    itinerary: parsed['itinerary'] ? parsed['itinerary'].join('\n') : '',
    conversationStarters: parsed['conversation starters'] || [],
    outfitSuggestions: parsed['outfit suggestions'] ? parsed['outfit suggestions'].join('\n') : '',
    estimatedCost: parsed['estimated cost'] ? parsed['estimated cost'].join('\n') : '',
    mistakesToAvoid: parsed['mistakes to avoid'] || [],
    emergencyRescueLines: parsed['emergency rescue lines'] || [],
  };
};

/**
 * Formats solo mode response
 * @param {string} aiResponse - Raw AI response
 * @returns {object} - Formatted response
 */
const formatSoloModeResponse = (aiResponse) => {
  const parsed = parseAIResponse(aiResponse);
  console.log("Parsed Solo AI Response: ", parsed);
  

  return {
    soloActivities: parsed['solo activities'] ? parsed['solo activities'].join('\n') : '',
    confidenceBuilding: parsed['confidence building'] || [],
    placesToVisitAlone: parsed['places to visit alone'] || [],
    socialOpportunities: parsed['social exposure opportunities'] || [],
    selfCareTips: parsed['self-care tips'] || [],
    budgetBreakdown: parsed['budget breakdown'] ? parsed['budget breakdown'].join('\n') : '',
  };
};

/**
 * Formats vibe match response
 * @param {string} aiResponse - Raw AI response
 * @returns {object} - Formatted response
 */
const formatVibeMatchResponse = (aiResponse) => {
  const parsed = parseAIResponse(aiResponse);

  return {
    compatibilityMatch: parsed['compatibility match'] ? parsed['compatibility match'].join('\n') : '',
    suggestedLocation: parsed['suggested meetup location'] ? parsed['suggested meetup location'].join('\n') : '',
    naturalScenario: parsed['natural interaction scenario'] ? parsed['natural interaction scenario'].join('\n') : '',
    sharedActivity: parsed['shared activity idea'] ? parsed['shared activity idea'].join('\n') : '',
    noPressureApproach: parsed['no pressure approach'] ? parsed['no pressure approach'].join('\n') : '',
  };
};

module.exports = {
  parseAIResponse,
  formatDatePlannerResponse,
  formatSoloModeResponse,
  formatVibeMatchResponse,
};
