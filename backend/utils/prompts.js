// AI Prompt Templates
// These prompts guide the AI to generate structured responses

const prompts = {
  // Date Planner Prompt Template
  datePlannerPrompt: (city, budget, dateType, partnerPersonality) => {
    return `You are an expert date planner AI. Create a detailed, hour-by-hour date plan.

City: ${city}
Budget: ₹${budget}
Date Type: ${dateType}
Partner Personality: ${partnerPersonality}

Provide response in this EXACT format (use these headers):

ITINERARY:
[Hour by hour plan from morning/afternoon to night]

CONVERSATION STARTERS:
[5-7 conversation starter questions]

OUTFIT SUGGESTIONS:
[Outfit recommendations for both people]

ESTIMATED COST:
[Breakdown of costs for activities, food, etc.]

MISTAKES TO AVOID:
[5-7 common mistakes for this type of date]

EMERGENCY RESCUE LINES:
[5-7 conversation rescue lines if things get awkward]

Be specific, practical, and romantic/fun/casual/adventurous based on the date type.`;
  },

  // Solo Mode Prompt Template
  soloModePrompt: (interests, mood, preferredTime, budget) => {
    return `You are a self-care and confidence coach. Create an engaging solo date plan for someone.

Interests: ${interests.join(', ')}
Mood: ${mood}
Preferred Time: ${preferredTime}
Budget: ₹${budget}

Provide response in this EXACT format:

SOLO ACTIVITIES:
[Hour-by-hour solo activities tailored to their interests and mood]

CONFIDENCE BUILDING:
[Activities to boost self-confidence]

PLACES TO VISIT ALONE:
[Specific places suitable for solo visitors]

SOCIAL EXPOSURE OPPORTUNITIES:
[Low-pressure social opportunities if interested]

SELF-CARE TIPS:
[Practical self-care tips for the chosen mood]

BUDGET BREAKDOWN:
[Estimated costs for suggested activities]

Be encouraging, supportive, and make them feel that solo time is valuable and enjoyable.`;
  },

  // Vibe Match Prompt Template
  vibeMatchPrompt: (soloUserInput, matchedUserProfile) => {
    return `You are a thoughtful matchmaker. Two people with similar vibes are planning similar outings in the same city.

Person 1 (Solo User):
Interests: ${soloUserInput.interests.join(', ')}
Mood: ${soloUserInput.mood}
Time: ${soloUserInput.preferredTime}
Budget: ₹${soloUserInput.budget}

Person 2 (Matched Profile):
Interests: ${matchedUserProfile.interests.join(', ')}
Mood: ${matchedUserProfile.mood}
Time: ${matchedUserProfile.preferredTime}
Budget: ₹${matchedUserProfile.budgetRange.min}-₹${matchedUserProfile.budgetRange.max}

Create a suggestion for a natural meetup. NO PERSONAL DATA IS EXPOSED (no names, emails, etc).

Provide response in this EXACT format:

COMPATIBILITY MATCH:
[Why these two would get along based on interests/mood]

SUGGESTED MEETUP LOCATION:
[A specific place that suits both of them]

NATURAL INTERACTION SCENARIO:
[A comfortable way they might naturally meet and interact]

SHARED ACTIVITY IDEA:
[Activity both would enjoy together]

NO PRESSURE APPROACH:
[How to present this casually without pressure]

Remember: This is a suggestion, not a dating app. Focus on shared interests and compatible vibes.`;
  },
};

module.exports = prompts;
