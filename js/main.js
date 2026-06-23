document.getElementById('currentYear').textContent = new Date().getFullYear();

initTheme();

const loadingScreen = document.getElementById('loadingScreen');
const loaderLogo = document.getElementById('loaderLogo');
const particlesCanvas = document.getElementById('particlesCanvas');

const finishLoading = () => {
  loadingScreen.classList.add('hidden');
  document.body.classList.remove('loading-active');
  particlesCanvas.classList.add('visible');
  const scheduleObserver = window.requestIdleCallback || (fn => setTimeout(fn, 50));
  scheduleObserver(() => initObserver());
};

requestAnimationFrame(() => loaderLogo.classList.add('animate-in'));
window.addEventListener('load', () => setTimeout(finishLoading, Math.max(0, 1200 - performance.now())));

// SW
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}

// Inicjalizacja
initComponents();
initProjectsObserver();
initCaseStudyObserver();
initContactForm();
initNavbar();
initParticles();

// Smooth scroll z korektą po lazy-loadzie
let projectsLoaded = false;
let pendingScroll = null;

const performScroll = (target, offset = 70) => {
  const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: 'smooth' });
};

document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  e.preventDefault();
  const target = document.querySelector(a.getAttribute('href'));
  if (!target) return;

  performScroll(target);

  if (!projectsLoaded && (a.getAttribute('href') === '#contact' || a.getAttribute('href') === '#projects')) {
    pendingScroll = { target, offset: 70 };
  }
});

document.addEventListener('projectsLoaded', () => {
  projectsLoaded = true;
  if (pendingScroll) {
    const { target, offset } = pendingScroll;
    performScroll(target, offset);
    pendingScroll = null;
  }
});

document.addEventListener('caseStudyLoaded', () => {
  initObserver();
});

// Observer dla animacji
function initObserver() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) en.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.animate-on-scroll,.animate-on-scroll-x,.timeline-item,.timeline-future,.stat-card,.skill-chip').forEach(el => obs.observe(el));
}