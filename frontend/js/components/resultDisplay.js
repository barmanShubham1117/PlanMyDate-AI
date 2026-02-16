// Result Display Component
// Formats and displays API results

function displayDatePlanResult(result) {
  const content = document.getElementById('results-content');
  
  const html = `
    <div class="result-container">
      <h2>Your Perfect Date Plan</h2>
      
      <div class="result-section">
        <h3>📅 Itinerary</h3>
        <div class="result-text">${result.itinerary || 'No itinerary available'}</div>
      </div>

      <div class="result-section">
        <h3>💬 Conversation Starters</h3>
        <ul class="result-list">
          ${result.conversationStarters.map((starter) => `<li>${starter}</li>`).join('')}
        </ul>
      </div>

      <div class="result-section">
        <h3>👗 Outfit Suggestions</h3>
        <div class="result-text">${result.outfitSuggestions || 'No suggestions available'}</div>
      </div>

      <div class="result-section">
        <h3>💰 Estimated Cost</h3>
        <div class="result-text">${result.estimatedCost || 'No cost available'}</div>
      </div>

      <div class="result-section">
        <h3>⚠️ Mistakes to Avoid</h3>
        <ul class="result-list">
          ${result.mistakesToAvoid.map((mistake) => `<li>${mistake}</li>`).join('')}
        </ul>
      </div>

      <div class="result-section">
        <h3>🆘 Emergency Rescue Lines</h3>
        <ul class="result-list">
          ${result.emergencyRescueLines.map((line) => `<li>${line}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
  
  content.innerHTML = html;
}

function displaySoloModeResult(result) {
  const content = document.getElementById('results-content');
  
  let html = `
    <div class="result-container">
      <h2>Your Solo Adventure Plan</h2>
      
      <div class="result-section">
        <h3>🎯 Solo Activities</h3>
        <div class="result-text">${result.soloPlan.soloActivities || 'No activities available'}</div>
      </div>

      <div class="result-section">
        <h3>💪 Confidence Building</h3>
        <ul class="result-list">
          ${result.soloPlan.confidenceBuilding.map((tip) => `<li>${tip}</li>`).join('')}
        </ul>
      </div>

      <div class="result-section">
        <h3>🏞️ Places to Visit Alone</h3>
        <ul class="result-list">
          ${result.soloPlan.placesToVisitAlone.map((place) => `<li>${place}</li>`).join('')}
        </ul>
      </div>

      <div class="result-section">
        <h3>👥 Social Opportunities</h3>
        <ul class="result-list">
          ${result.soloPlan.socialOpportunities.map((opp) => `<li>${opp}</li>`).join('')}
        </ul>
      </div>

      <div class="result-section">
        <h3>🧘 Self-Care Tips</h3>
        <ul class="result-list">
          ${result.soloPlan.selfCareTips.map((tip) => `<li>${tip}</li>`).join('')}
        </ul>
      </div>

      <div class="result-section">
        <h3>💰 Budget Breakdown</h3>
        <div class="result-text">${result.soloPlan.budgetBreakdown || 'No breakdown available'}</div>
      </div>
  `;

  // Add vibe match if available
  if (result.vibeMatch && result.hasMatch) {
    html += `
      <div class="result-section vibe-match-section">
        <h2>💫 Vibe Match Suggestion</h2>
        
        <div class="result-subsection">
          <h4>🎯 Compatibility Match</h4>
          <p>${result.vibeMatch.compatibilityMatch}</p>
        </div>

        <div class="result-subsection">
          <h4>📍 Suggested Meetup Location</h4>
          <p>${result.vibeMatch.suggestedLocation}</p>
        </div>

        <div class="result-subsection">
          <h4>🤝 Natural Interaction Scenario</h4>
          <p>${result.vibeMatch.naturalScenario}</p>
        </div>

        <div class="result-subsection">
          <h4>🎭 Shared Activity Idea</h4>
          <p>${result.vibeMatch.sharedActivity}</p>
        </div>

        <div class="result-subsection">
          <h4>💌 No Pressure Approach</h4>
          <p>${result.vibeMatch.noPressureApproach}</p>
        </div>
      </div>
    `;
  } else if (!result.hasMatch) {
    html += `
      <div class="info-box">
        <p>ℹ️ No compatible vibes found in your city yet. Your profile has been saved to help future matches!</p>
      </div>
    `;
  }

  html += `</div>`;
  content.innerHTML = html;
}

function showError(errorMessage) {
  const errorDiv = document.getElementById('error-message');
  errorDiv.textContent = errorMessage;
  errorDiv.classList.remove('hidden');
  setTimeout(() => {
    errorDiv.classList.add('hidden');
  }, 5000);
}

function showLoading(show = true) {
  const loading = document.getElementById('loading');
  if (show) {
    loading.classList.remove('hidden');
  } else {
    loading.classList.add('hidden');
  }
}
