// Copyright (c) 2026 Userist Collective
// Ce code est distribué sous licence EUPL v1.2. 
// Voir le fichier LICENSE pour plus de détails.
// Les contenus (textes, images, médias) sont distribués sous Licence Art Libre 1.3.

// ==========================================
// CONFIGURATION
// ==========================================
const CONFIG = {
  ARTICLES_TO_SHOW: 3,
  EVENTS_TO_SHOW: 3,
  INTRO_DELAY: 500,
  INTRO_FADE: 1000,
  TYPEWRITER_MESSAGE: `Did you know that everytime you scroll, click or tap, you hold power ?`
};

// ==========================================
// TRANSLATIONS
// ==========================================
const translations = {
  "en": {
    "headerTitle": "Articles & Ideas",
    "headerSubtitle": "Exploring userism through articles, podcasts, reviews and much more.",
    "article1Title": "What is userism?",
    "article1Preview": "Consumption is more relevant than work, and with that come great opportunities.",
    "article2Title": "Big Tech or Digital Democracy?",
    "article2Preview": "Computation for AI is a revolution within digitalization. Four proposals to grab the opportunities that come with it.",
    "article3Title": "Fiction and userism",
    "article3Preview": "When userism foreshadows future behaviors. How do we create conditions where users discover their freedom by using?"
  },
  "fr": {
    "headerTitle": "Articles & Idées",
    "headerSubtitle": "Explorer le userisme à travers des articles, podcasts, critiques et bien plus.",
    "article1Title": "Qu'est-ce que l'userisme ?",
    "article1Preview": "La consommation est plus pertinente que le travail, et avec elle viennent de grandes opportunités.",
    "article2Title": "Big Tech ou Démocratie Digitale ?",
    "article2Preview": "La computation pour l'IA est une révolution dans la digitalisation. Quatre propositions pour saisir les opportunités.",
    "article3Title": "Fiction et userisme",
    "article3Preview": "Quand le userisme préfigure les comportements futurs. Comment créer les conditions pour que les utilisateurs découvrent leur liberté en utilisant ?"
  },
  "it": {
    "headerTitle": "Articoli & Idee",
    "headerSubtitle": "Esplorare il userismo attraverso articoli, podcast, recensioni e molto altro.",
    "article1Title": "Cos'è il userismo?",
    "article1Preview": "Il consumo è più rilevante del lavoro, e con esso arrivano grandi opportunità.",
    "article2Title": "Big Tech o Democrazia Digitale?",
    "article2Preview": "Il calcolo per l'IA è una rivoluzione nella digitalizzazione. Quattro proposte per cogliere le opportunità.",
    "article3Title": "Finzione e userismo",
    "article3Preview": "Quando il userismo prefigura comportamenti futuri. Come creare condizioni in cui gli utenti scoprono la loro libertà usando?"
  },
  "es": {
    "headerTitle": "Artículos & Ideas",
    "headerSubtitle": "Explorando el userismo a través de artículos, podcasts, reseñas y mucho más.",
    "article1Title": "¿Qué es el userismo?",
    "article1Preview": "El consumo es más relevante que el trabajo, y con ello vienen grandes oportunidades.",
    "article2Title": "¿Big Tech o Democracia Digital?",
    "article2Preview": "El cómputo para IA es una revolución en la digitalización. Cuatro propuestas para aprovechar las oportunidades.",
    "article3Title": "Ficción y userismo",
    "article3Preview": "Cuando el userismo presagia comportamientos futuros. ¿Cómo crear condiciones donde los usuarios descubran su libertad usando?"
  },
  "zh": {
    "headerTitle": "文章与思想",
    "headerSubtitle": "通过文章、播客、评论等探索用户主义。",
    "article1Title": "什么是用户主义?",
    "article1Preview": "消费比工作更重要,这带来了巨大的机遇。",
    "article2Title": "大科技还是数字民主?",
    "article2Preview": "人工智能计算是数字化中的一场革命。四个把握机遇的提案。",
    "article3Title": "虚构与用户主义",
    "article3Preview": "当用户主义预示未来行为时。我们如何创造条件让用户在使用中发现自由?"
  }
};

let currentLanguage = 'en';

// Change language
function setLanguage(lang) {
  currentLanguage = lang;
  console.log('Setting language to:', lang);

  if (!translations[lang]) {
    console.error(' Translation not found for:', lang);
    return;
  }

  let translatedCount = 0;
  
  for (const key in translations[lang]) {
    const el = document.getElementById(key);
    if (el) {
      el.textContent = translations[lang][key];
      translatedCount++;
      console.log(` Translated ${key}`);
    } else {
      console.warn(` Element not found: ${key}`);
    }
  }
  
  console.log(` Total translated: ${translatedCount} elements`);
  
  // Update active language in selector
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.remove('active');
    const optText = opt.textContent.trim();
    const langMap = {
      'EN': 'en',
      'FR': 'fr',
      'IT': 'it',
      'ES': 'es',
      '中文': 'zh'
    };
    if (langMap[optText] === lang) {
      opt.classList.add('active');
    }
  });
}

// ==========================================
// PAGE-SPECIFIC NAVBAR COLORS
// ==========================================
function setNavbarColorByPage() {
  const path = window.location.pathname;
  const currentPage = path.split('/').pop().replace('.html', '') || 'index';
  
  const pageColors = {
    'articles': '#00FFFF',    // cyan
    'events': '#FFFF00',      // yellow
    'projects': '#FF00FF',    // magenta
    'about': '#FFFF00'        // yellow
  };

  const randomColors = ['#FFFF00', '#00FFFF', '#FF00FF'];

  function getRandomColor() {
    return randomColors[Math.floor(Math.random() * randomColors.length)];
  }

  // Decide navbar color
  let color;

  if (currentPage === 'index') {
    color = getRandomColor();
    console.log('Random homepage navbar:', color);
  } else {
    color = pageColors[currentPage] || '#00FFFF';
    console.log('Page navbar:', currentPage, '→', color);
  }
  
  // Set CSS variable for navbar
  document.documentElement.style.setProperty('--nav-bg-color', color);
  document.documentElement.style.setProperty('--page-bg-color', color);
}

// Update nav text with current page
function updateNavText() {
  const path = window.location.pathname;
  const currentPage = path.split('/').pop().replace('.html', '') || 'index';
  
  const pageNames = {
    'index': 'HOME',
    'articles': 'ARTICLES',
    'events': 'EVENTS',
    'projects': 'PROJECTS',
    'about': 'ABOUT'
  };
  
  const navText = document.querySelector('.nav-logo-text');
  if (navText && currentPage !== 'index') {
    navText.textContent = `USERISM COLLECTIVE — ${pageNames[currentPage] || ''}`;
  }
}

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  console.log(' Initializing Userism.net...');
  
  // Set page-specific navbar color
  setNavbarColorByPage();
  updateNavText();
  
  // Initialize hamburger menu
  initHamburgerMenu();
  initModalHandlers();
  
  // Setup language buttons
  setTimeout(() => {
    setupLanguageButtons();
  }, 500);
});

window.addEventListener('load', () => {
  initIntroAnimation();
  initTypewriterEffect();
  loadArticlePreviews();
  loadEventPreviews();
});

// ==========================================
// LANGUAGE BUTTONS SETUP
// ==========================================
function setupLanguageButtons() {
  const langButtons = document.querySelectorAll('.lang-option');
  
  console.log('Language buttons found:', langButtons.length);
  
  langButtons.forEach((btn, index) => {
    console.log(`Button ${index}:`, btn.textContent.trim());
    
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const langText = btn.textContent.trim();
      console.log(' Clicked:', langText);
      
      const langMap = {
        'EN': 'en',
        'FR': 'fr',
        'IT': 'it',
        'ES': 'es',
        '中文': 'zh'
      };
      
      const langCode = langMap[langText];
      console.log(' Language code:', langCode);
      
      if (langCode) {
        setLanguage(langCode);
      }
    });
  });
}

// ==========================================
// HAMBURGER MENU & OVERLAY
// ==========================================
function initHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('menuOverlay');
  
  if (!hamburger || !overlay) {
    console.error(' Hamburger or overlay not found!');
    return;
  }
  
  console.log(' Found hamburger and overlay elements');
  
  setupMenuListeners();
  activateCurrentPage();
}

function setupMenuListeners() {
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('menuOverlay');
  const menuLinks = document.querySelectorAll('.menu-link, .overlay-nav a');
  const closeMenuBtn = document.getElementById('closeMenu');
  
  if (!hamburger || !overlay) {
    console.error('Menu elements not found');
    return;
  }
  
  // Toggle menu with hamburger
  hamburger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(' Hamburger clicked!');
    toggleMenu();
  });
  
  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeMenu();
    });
  }
  
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
  
  function toggleMenu() {
    const isOpen = overlay.classList.contains('active');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }
  
  function openMenu() {
    console.log(' Opening menu');
    overlay.classList.add('active');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  
  function closeMenu() {
    console.log(' Closing menu');
    overlay.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}

function activateCurrentPage() {
  const path = window.location.pathname;
  const currentPage = path.split('/').pop().replace('.html', '') || 'index';
  
  const links = document.querySelectorAll('.menu-link, .overlay-nav a');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href.includes(currentPage) || (currentPage === 'index' && href.includes('index.html')))) {
      link.classList.add('active');
    }
  });
}

// ==========================================
// ANIMATIONS
// ==========================================
function initIntroAnimation() {
  const intro = document.getElementById("intro");
  
  if (!intro) {
    console.warn('No intro element found - skipping animation');
    document.body.classList.add("loaded");
    return;
  }

  console.log('Starting intro animation...');
  
  setTimeout(() => {
    intro.style.opacity = "0";
    intro.style.transition = `opacity ${CONFIG.INTRO_FADE}ms ease`;
    
    setTimeout(() => {
      intro.style.display = "none";
      intro.style.visibility = "hidden";
      document.body.classList.add("loaded");
      document.body.style.overflow = '';
      console.log('Intro animation complete');
    }, CONFIG.INTRO_FADE);
  }, CONFIG.INTRO_DELAY);
}

function initTypewriterEffect() {
  const output = document.getElementById("typewriter-text");
  const section = document.getElementById("typewriter-section");
  const landingSection = document.getElementById("landing");

  if (!output || !section || !landingSection) return;

  const message = CONFIG.TYPEWRITER_MESSAGE;
  const totalChars = message.length;

  let charIndex = 0;
  let typingStarted = false;
  let startScrollY = 0;

  function updateTypewriter() {
    const landingRect = landingSection.getBoundingClientRect();
    const viewportCenter = window.innerHeight / 2;

    // Start typing when viewport center passes the bottom of landing section
    if (landingRect.bottom <= viewportCenter && !typingStarted) {
      typingStarted = true;
      startScrollY = window.scrollY;
    }

    if (typingStarted) {
      // Calculate scroll distance since typing started
      const scrollDistance = window.scrollY - startScrollY;
      
      // More responsive typing
      const PIXELS_PER_CHAR = 4; // Adjust this: lower = faster typing
      const targetIndex = Math.floor(scrollDistance / PIXELS_PER_CHAR);
      
      // Smooth interpolation
      charIndex += (targetIndex - charIndex) * 0.15;
      
      const displayIndex = Math.max(0, Math.min(totalChars, Math.floor(charIndex)));
      output.textContent = message.substring(0, displayIndex);
    }

    requestAnimationFrame(updateTypewriter);
  }

  output.textContent = ""; // start empty
  requestAnimationFrame(updateTypewriter);
}
// ==========================================
// CONTENT LOADING (Articles & Events)
// ==========================================
async function loadArticlePreviews() {
  const container = document.getElementById('articles-preview');
  if (!container) return;

  try {
    const html = await fetchHTML('articles-list.html'); 
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const cards = Array.from(doc.querySelectorAll('.article-card'));
    
    if (cards.length === 0) {
      container.innerHTML = '<p>No articles available yet.</p>';
      return;
    }

    container.innerHTML = '';
    
    const isHomePage = window.location.pathname.includes('index.html') || window.location.pathname === '/';
    const articlesToShow = isHomePage ? CONFIG.ARTICLES_TO_SHOW : cards.length;
    
    cards.slice(0, articlesToShow).forEach(card => {
      container.appendChild(card.cloneNode(true));
    });
    
    if (currentLanguage && currentLanguage !== 'en') {
      setTimeout(() => setLanguage(currentLanguage), 100);
    }
    
  } catch (error) {
    console.error('Failed to load articles:', error);
    container.innerHTML = '<p>No articles available yet.</p>';
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
    container.innerHTML = '<p>No upcoming events yet.</p>';
  }
}

// ==========================================
// MODAL HANDLING
// ==========================================
function initModalHandlers() {
  window.toggleArticle = toggleArticle;
  window.closeArticle = closeArticle;

  const modal = document.getElementById('articleModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeArticle();
    });
  }

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