// Solo Mode Page
// Handles solo mode form and submission

function initSoloModePage() {
  const form = document.getElementById('solo-form');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const city = document.getElementById('solo-city').value;
    const mood = document.getElementById('solo-mood').value;
    const preferredTime = document.getElementById('solo-time').value;
    const budget = document.getElementById('solo-budget').value;
    const personalityType = document.getElementById('solo-personality').value;
    
    // Get selected interests
    const interestCheckboxes = document.querySelectorAll('input[name="interests"]:checked');
    const interests = Array.from(interestCheckboxes).map((cb) => cb.value);
    
    // Validate
    if (!city || interests.length === 0 || !mood || !preferredTime || !budget || !personalityType) {
      showError('Please fill in all fields and select at least one interest');
      return;
    }
    
    showLoading(true);
    
    try {
      const result = await generateSoloPlan(city, interests, mood, preferredTime, budget, personalityType);
      showLoading(false);
      
      if (result.success) {
        displaySoloModeResult(result.data);
        goToPage('results-page');
      } else {
        showError(result.error || 'Failed to generate plan');
      }
    } catch (error) {
      showLoading(false);
      showError(error.message);
    }
  });
}
