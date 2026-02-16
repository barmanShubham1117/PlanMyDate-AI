// Couple Date Planner Page
// Handles couple mode form and submission

function initDatePlannerPage() {
  const form = document.getElementById('couple-form');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const city = document.getElementById('couple-city').value;
    const budget = document.getElementById('couple-budget').value;
    const dateType = document.getElementById('couple-type').value;
    const partnerPersonality = document.getElementById('couple-personality').value;
    
    // Validate
    if (!city || !budget || !dateType || !partnerPersonality) {
      showError('Please fill in all fields');
      return;
    }
    
    showLoading(true);
    
    try {
      const result = await generateDatePlan(city, budget, dateType, partnerPersonality);
      showLoading(false);
      
      if (result.success) {
        displayDatePlanResult(result.data);
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
