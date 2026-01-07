// main.js - Hamburger menu with overlay navigation

// ==========================================
// CONFIGURATION
// ==========================================
const CONFIG = {
  ARTICLES_TO_SHOW: 3,
  EVENTS_TO_SHOW: 3,
  INTRO_DELAY: 500,
  INTRO_FADE: 1000,
  TYPEWRITER_MESSAGE: `Did you know that everytime you scroll, click or tap, you hold power?`
};

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing Userism.net...');
  
  initHamburgerMenu();
  initModalHandlers();
});

window.addEventListener('load', () => {
  initIntroAnimation();
  initTypewriterEffect();
  loadArticlePreviews();
  loadEventPreviews();
});

// ==========================================
// HAMBURGER MENU & OVERLAY
// ==========================================
function initHamburgerMenu() {
  // Create hamburger button
  const hamburgerHTML = `
    <button class="hamburger-btn" aria-label="Menu" aria-expanded="false">
      <span></span>
      <span></span>
      <span></span>
    </button>
  `;
  
  // Create overlay menu
  const overlayHTML = `
    <div class="menu-overlay">
      <div class="menu-content">
        <button class="menu-close" aria-label="Close menu">×</button>
        
        <nav class="overlay-nav">
          <a href="index.html" data-page="index">Home</a>
          <a href="articles.html" data-page="articles">Articles</a>
          <a href="events.html" data-page="events">Events</a>
          <a href="projects.html" data-page="projects">Projects</a>
          <a href="about.html" data-page="about">About</a>
        </nav>
        
        <div class="language-selector">
          <h3>Language</h3>
          <div class="lang-options">
            <a href="index.html" class="lang-option active">EN</a>
            <a href="index-fr.html" class="lang-option">FR</a>
            <a href="index-it.html" class="lang-option">IT</a>
            <a href="index-es.html" class="lang-option">ES</a>
            <a href="index-zh.html" class="lang-option">中文</a>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Insert into page
  document.body.insertAdjacentHTML('afterbegin', hamburgerHTML);
  document.body.insertAdjacentHTML('afterbegin', overlayHTML);
  
  // Get elements
  const hamburger = document.querySelector('.hamburger-btn');
  const overlay = document.querySelector('.menu-overlay');
  const closeBtn = document.querySelector('.menu-close');
  const menuLinks = document.querySelectorAll('.overlay-nav a');
  
  // Highlight current page
  activateCurrentPage();
  
  // Open menu
  hamburger.addEventListener('click', () => {
    openMenu();
  });
  
  // Close menu
  closeBtn.addEventListener('click', () => {
    closeMenu();
  });
  
  // Close when clicking outside menu content
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeMenu();
    }
  });
  
  // Close when clicking nav links
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
  
  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeMenu();
    }
  });
  
  function openMenu() {
    overlay.classList.add('active');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  
  function closeMenu() {
    overlay.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}

function activateCurrentPage() {
  const path = window.location.pathname;
  const currentPage = path.split('/').pop().replace('.html', '') || 'index';
  
  const links = document.querySelectorAll('.overlay-nav a');
  links.forEach(link => {
    const pageName = link.getAttribute('data-page');
    if (currentPage === pageName) {
      link.classList.add('active');
    }
  });
}

// ==========================================
// ANIMATIONS
// ==========================================
function initIntroAnimation() {
  const intro = document.getElementById("intro");
  if (!intro) return;

  setTimeout(() => {
    intro.style.opacity = "0";
    setTimeout(() => {
      intro.style.display = "none";
      document.body.classList.add("loaded");
    }, CONFIG.INTRO_FADE);
  }, CONFIG.INTRO_DELAY);
}

function initTypewriterEffect() {
  const output = document.getElementById("typewriter-text");
  const section = document.getElementById("typewriter-section");
  
  if (!output || !section) return;

  let scrollTimeout;
  
  window.addEventListener("scroll", () => {
    if (scrollTimeout) cancelAnimationFrame(scrollTimeout);
    
    scrollTimeout = requestAnimationFrame(() => {
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;
      
      let progress = 1 - rect.top / windowH;
      progress = Math.max(0, Math.min(1, progress));
      
      const chars = Math.floor(CONFIG.TYPEWRITER_MESSAGE.length * progress);
      output.textContent = CONFIG.TYPEWRITER_MESSAGE.substring(0, chars);
    });
  });
}

// ==========================================
// CONTENT LOADING (Articles & Events)
// ==========================================
async function loadArticlePreviews() {
  const container = document.getElementById('articles-preview');
  if (!container) return;

  try {
    const html = await fetchHTML('articles.html');
    const cards = parseElements(html, '.article-card');
    
    if (cards.length === 0) {
      container.innerHTML = '<p>No articles available yet.</p>';
      return;
    }

    container.innerHTML = '';
    cards.slice(0, CONFIG.ARTICLES_TO_SHOW).forEach(card => {
      container.appendChild(card.cloneNode(true));
    });
    
  } catch (error) {
    console.error('Failed to load articles:', error);
    showError(container, 'Failed to load articles.');
  }
}

async function loadEventPreviews() {
  const container = document.getElementById('events-preview');
  if (!container) return;

  try {
    const html = await fetchHTML('events.html');
    const items = parseElements(html, '.event-item');
    
    if (items.length === 0) {
      container.innerHTML = '<p>No upcoming events yet.</p>';
      return;
    }

    container.innerHTML = '';
    items.slice(0, CONFIG.EVENTS_TO_SHOW).forEach(item => {
      container.appendChild(item.cloneNode(true));
    });
    
  } catch (error) {
    console.error('Failed to load events:', error);
    showError(container, 'Failed to load events.');
  }
}

// ==========================================
// MODAL HANDLING
// ==========================================
function initModalHandlers() {
  // Make functions globally available for onclick handlers
  window.toggleArticle = toggleArticle;
  window.closeArticle = closeArticle;

  // Close on background click
  const modal = document.getElementById('articleModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeArticle();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('articleModal');
      if (modal && modal.classList.contains('active')) {
        closeArticle();
      }
    }
  });
}

function toggleArticle(element) {
  const content = element.nextElementSibling;
  const modal = document.getElementById('articleModal');
  const modalContent = document.getElementById('modalContent');
  
  if (!modal || !modalContent || !content) {
    console.error('Modal elements not found');
    return;
  }
  
  modalContent.innerHTML = content.innerHTML;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeArticle() {
  const modal = document.getElementById('articleModal');
  if (!modal) return;
  
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
async function fetchHTML(url, retries = 2) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.text();
    } catch (error) {
      if (i === retries - 1) throw error;
      console.warn(`Fetch attempt ${i + 1} failed, retrying...`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

function parseElements(html, selector) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return Array.from(doc.querySelectorAll(selector));
  } catch (error) {
    console.error('Error parsing HTML:', error);
    return [];
  }
}

function showError(container, message) {
  container.innerHTML = `
    <div class="error-state">
      <p>${message}</p>
      <button onclick="window.location.reload()">Retry</button>
    </div>
  `;
}