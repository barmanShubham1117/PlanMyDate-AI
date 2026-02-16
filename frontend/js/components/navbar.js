// Navbar Component
// Creates and manages navigation bar

function createNavbar() {
  const navbar = document.getElementById('navbar');
  
  navbar.innerHTML = `
    <div class="navbar-container">
      <div class="navbar-logo" onclick="goToPage('home')">
        <span class="logo-icon">💕</span>
        <span class="logo-text">PlanMyDate AI</span>
      </div>
      
      <div class="navbar-links">
        <a href="#" onclick="goToPage('home'); return false;" class="nav-link">Home</a>
        <a href="#" onclick="goToPage('couple-mode'); return false;" class="nav-link">Couple Mode</a>
        <a href="#" onclick="goToPage('solo-mode'); return false;" class="nav-link">Solo Mode</a>
      </div>
      
      <div class="navbar-status">
        <span id="status-indicator" class="status-dot"></span>
        <span id="status-text">Checking...</span>
      </div>
    </div>
  `;

  // Check API status
  checkAPIStatus();
}

function checkAPIStatus() {
  healthCheck()
    .then(() => {
      updateStatusIndicator(true, 'Online');
    })
    .catch(() => {
      updateStatusIndicator(false, 'Offline');
    });
}

function updateStatusIndicator(isOnline, text) {
  const indicator = document.getElementById('status-indicator');
  const statusText = document.getElementById('status-text');
  
  if (isOnline) {
    indicator.classList.remove('offline');
    indicator.classList.add('online');
  } else {
    indicator.classList.remove('online');
    indicator.classList.add('offline');
  }
  
  statusText.textContent = text;
}
