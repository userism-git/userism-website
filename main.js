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

function setLanguage(lang) {
  currentLanguage = lang;
  if (!translations[lang]) return;
  for (const key in translations[lang]) {
    const el = document.getElementById(key);
    if (el) el.textContent = translations[lang][key];
  }
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.remove('active');
    const langMap = { 'EN': 'en', 'FR': 'fr', 'IT': 'it', 'ES': 'es', '中文': 'zh' };
    if (langMap[opt.textContent.trim()] === lang) opt.classList.add('active');
  });
}

// ==========================================
// PAGE-SPECIFIC NAVBAR COLORS
// ==========================================
function setNavbarColorByPage() {
  const path = window.location.pathname;
  const currentPage = path.split('/').pop().replace('.html', '') || 'index';
  const pageColors = { 'articles': '#00FFFF', 'events': '#FFFF00', 'projects': '#FF00FF', 'about': '#FFFF00' };
  const randomColors = ['#FFFF00', '#00FFFF', '#FF00FF'];
  const color = currentPage === 'index'
    ? randomColors[Math.floor(Math.random() * randomColors.length)]
    : (pageColors[currentPage] || '#00FFFF');
  document.documentElement.style.setProperty('--nav-bg-color', color);
  document.documentElement.style.setProperty('--page-bg-color', color);
}

function updateNavText() {
  const path = window.location.pathname;
  const currentPage = path.split('/').pop().replace('.html', '') || 'index';
  const pageNames = { 'index': 'HOME', 'articles': 'ARTICLES', 'events': 'EVENTS', 'projects': 'PROJECTS', 'about': 'ABOUT' };
  const navText = document.querySelector('.nav-logo-text');
  if (navText && currentPage !== 'index') {
    navText.textContent = ` ${pageNames[currentPage] || ''}`;
  }
}

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  setNavbarColorByPage();
  updateNavText();
  initHamburgerMenu();
  initModalHandlers();
  setTimeout(() => { setupLanguageButtons(); }, 500);
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
  const langMap = { 'EN': 'en', 'FR': 'fr', 'IT': 'it', 'ES': 'es', '中文': 'zh' };
  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const langCode = langMap[btn.textContent.trim()];
      if (langCode) setLanguage(langCode);
    });
  });
}

// ==========================================
// HAMBURGER MENU & OVERLAY
// ==========================================
function initHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('menuOverlay');
  if (!hamburger || !overlay) return;
  setupMenuListeners();
  activateCurrentPage();
}

function setupMenuListeners() {
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('menuOverlay');
  const menuLinks = document.querySelectorAll('.menu-link, .overlay-nav a');
  const closeMenuBtn = document.getElementById('closeMenu');
  if (!hamburger || !overlay) return;

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
  function toggleMenu() {
    overlay.classList.contains('active') ? closeMenu() : openMenu();
  }

  hamburger.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); toggleMenu(); });
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); closeMenu(); });
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeMenu(); });
  menuLinks.forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('active')) closeMenu(); });
}

function activateCurrentPage() {
  const path = window.location.pathname;
  const currentPage = path.split('/').pop().replace('.html', '') || 'index';
  document.querySelectorAll('.menu-link, .overlay-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href.includes(currentPage) || (currentPage === 'index' && href.includes('index.html')))) {
      link.classList.add('active');
    }
  });
}

// ==========================================
// INTRO ANIMATION
// ==========================================
function initIntroAnimation() {
  const intro = document.getElementById("intro");
  if (!intro) { document.body.classList.add("loaded"); return; }
  setTimeout(() => {
    intro.style.opacity = "0";
    intro.style.transition = `opacity ${CONFIG.INTRO_FADE}ms ease`;
    setTimeout(() => {
      intro.style.display = "none";
      intro.style.visibility = "hidden";
      document.body.classList.add("loaded");
      document.body.style.overflow = '';
    }, CONFIG.INTRO_FADE);
  }, CONFIG.INTRO_DELAY);
}

// ==========================================
// TYPEWRITER — STICKY SCROLL
// ==========================================
function initTypewriterEffect() {
  const output = document.getElementById("typewriter-text");
  const tunnel = document.getElementById("typewriter-tunnel");

  if (!output) { console.warn('[Typewriter] #typewriter-text not found'); return; }
  if (!tunnel) { console.warn('[Typewriter] #typewriter-tunnel not found — wrap the section in <div id="typewriter-tunnel">'); return; }

  const message    = CONFIG.TYPEWRITER_MESSAGE;
  const totalChars = message.length;
  const PAUSE_FRACTION = 0.30; // last 30% of scroll = full sentence sits still

  output.textContent = "";

  function tick() {
    const tunnelTop    = tunnel.getBoundingClientRect().top + window.scrollY; // absolute top
    const tunnelHeight = tunnel.offsetHeight;
    const viewH        = window.innerHeight;

    // Sticky travel: scrollY goes from tunnelTop → tunnelTop + (tunnelHeight - viewH)
    const stickyRange  = tunnelHeight - viewH;
    const scrolled     = Math.max(0, window.scrollY - tunnelTop);
    const rawProgress  = Math.min(1, scrolled / stickyRange);

    // Typing window = first (1 - PAUSE_FRACTION) of scroll
    const typingWindow = 1 - PAUSE_FRACTION;
    const typeProgress = Math.min(1, rawProgress / typingWindow);
    const charCount    = Math.round(typeProgress * totalChars);

    output.textContent = message.substring(0, charCount);
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
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
    if (cards.length === 0) { container.innerHTML = '<p>No articles available yet.</p>'; return; }
    container.innerHTML = '';
    const isHomePage = window.location.pathname.includes('index.html') || window.location.pathname === '/';
    const articlesToShow = isHomePage ? CONFIG.ARTICLES_TO_SHOW : cards.length;
    cards.slice(0, articlesToShow).forEach(card => container.appendChild(card.cloneNode(true)));
    if (currentLanguage && currentLanguage !== 'en') setTimeout(() => setLanguage(currentLanguage), 100);
  } catch (error) {
    container.innerHTML = '<p>No articles available yet.</p>';
  }
}

async function loadEventPreviews() {
  const container = document.getElementById('events-preview');
  if (!container) return;
  try {
    const html = await fetchHTML('events.html');
    const items = parseElements(html, '.event-item');
    if (items.length === 0) { container.innerHTML = '<p>No upcoming events yet.</p>'; return; }
    container.innerHTML = '';
    items.slice(0, CONFIG.EVENTS_TO_SHOW).forEach(item => container.appendChild(item.cloneNode(true)));
  } catch (error) {
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
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeArticle(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('articleModal');
      if (modal && modal.classList.contains('active')) closeArticle();
    }
  });
}

function toggleArticle(element) {
  const content = element.nextElementSibling;
  const modal = document.getElementById('articleModal');
  const modalContent = document.getElementById('modalContent');
  if (!modal || !modalContent || !content) return;
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
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

function parseElements(html, selector) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return Array.from(doc.querySelectorAll(selector));
  } catch (error) { return []; }
}

// ==========================================
// SCROLL INDICATOR — hide when typewriter visible
// ==========================================
(function () {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const typewriterTunnel = document.getElementById('typewriter-tunnel');
  if (!scrollIndicator || !typewriterTunnel) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      scrollIndicator.style.opacity = entry.isIntersecting ? '0' : '0.7';
      scrollIndicator.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
    });
  }, { threshold: 0.1 });
  observer.observe(typewriterTunnel);
})();

// ==========================================
// PROJECTS PAGE — section nav + block modal
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
  const navBtns = document.querySelectorAll('.nav-btn[data-section]');
  const sections = {
    'finds': document.getElementById('finds'),
    'our-projects': document.getElementById('our-projects')
  };
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.section;
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      Object.values(sections).forEach(s => s && s.classList.remove('active-section'));
      if (sections[target]) {
        sections[target].classList.add('active-section');
        sections[target].scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const overlay    = document.getElementById('blockModalOverlay');
  const closeBtn   = document.getElementById('blockModalClose');
  const modalImage = document.getElementById('blockModalImage');
  const modalType  = document.getElementById('blockModalType');
  const modalTitle = document.getElementById('blockModalTitle');
  const modalDesc  = document.getElementById('blockModalDesc');
  const modalLink  = document.getElementById('blockModalLink');
  const modalMeta  = document.getElementById('blockModalMeta');

  if (!overlay) return;

  function openModal(block) {
    modalType.textContent  = block.dataset.type  || '';
    modalTitle.textContent = block.dataset.title || '';
    modalDesc.textContent  = block.dataset.desc  || '';
    modalMeta.textContent  = block.dataset.date  || '';
    const img = block.querySelector('img');
    if (img) { modalImage.src = img.src; modalImage.alt = img.alt; modalImage.style.display = 'block'; }
    else { modalImage.style.display = 'none'; }
    const url = block.dataset.url || '';
    if (url) { modalLink.href = url; modalLink.style.display = 'inline-flex'; }
    else { modalLink.style.display = 'none'; }
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.block').forEach(block => block.addEventListener('click', () => openModal(block)));
  closeBtn && closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
});