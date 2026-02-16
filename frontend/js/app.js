// Main App
// Initialize app and manage page navigation

// Initialize app on page load
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  console.log('🚀 Initializing PlanMyDate AI');
  
  // Create navbar
  createNavbar();
  
  // Initialize pages
  initHomePage();
  initDatePlannerPage();
  initSoloModePage();
  
  // Show home page by default
  goToPage('home');
  
  console.log('✅ App initialized');
}

/**
 * Navigate to a specific page
 * @param {string} pageId - The ID of the page to navigate to
 */
function goToPage(pageId) {
  // Hide all pages
  const pages = document.querySelectorAll('.page');
  pages.forEach((page) => {
    page.classList.add('hidden');
  });
  
  // Show the requested page
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.remove('hidden');
  }
  
  // Scroll to top
  window.scrollTo(0, 0);
  
  console.log(`📄 Navigated to: ${pageId}`);
}

/**
 * Handle errors globally
 */
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  showError('An unexpected error occurred');
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  showError('An unexpected error occurred');
});
