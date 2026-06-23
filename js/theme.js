const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function getPreferredTheme() {
  return localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme:light)').matches ? 'light' : 'dark');
}

function applyTheme(theme) {
  body.classList.toggle('light', theme === 'light');
  themeIcon.textContent = theme === 'light' ? '☀️' : '🌙';
  themeToggle.setAttribute('aria-label', theme === 'light' ? 'Przełącz na ciemny motyw' : 'Przełącz na jasny motyw');
}

function initTheme() {
  applyTheme(getPreferredTheme());
  themeToggle.addEventListener('click', () => {
    const newTheme = body.classList.contains('light') ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
  matchMedia('(prefers-color-scheme:light)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) applyTheme(e.matches ? 'light' : 'dark');
  });
}