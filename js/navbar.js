function initNavbar() {
  const navbar = document.getElementById('navbar');
  let ticking = false;
  document.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        navbar.classList.toggle('scrolled', scrollY > 50);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  const body = document.body;
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const overlay = document.getElementById('mobileOverlay');

  const focusables = () => navLinks.querySelectorAll('a[href],button:not([disabled]),input,textarea,select,[tabindex]:not([tabindex="-1"])');

  const trap = e => {
    if (e.key === 'Escape') { closeMenu(); return; }
    if (e.key === 'Tab') {
      const f = focusables();
      if (!f.length) return;
      if (e.shiftKey) {
        if (document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      } else {
        if (document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    }
  };

  const openMenu = () => {
    navLinks.classList.add('active'); overlay.classList.add('active');
    mobileToggle.classList.add('active'); body.classList.add('menu-open');
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileToggle.setAttribute('aria-label', 'Zamknij menu');
    const f = focusables();
    if (f.length) f[0].focus();
    document.addEventListener('keydown', trap);
  };

  const closeMenu = () => {
    navLinks.classList.remove('active'); overlay.classList.remove('active');
    mobileToggle.classList.remove('active'); body.classList.remove('menu-open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.setAttribute('aria-label', 'Otwórz menu');
    mobileToggle.focus();
    document.removeEventListener('keydown', trap);
  };

  mobileToggle.addEventListener('click', () => navLinks.classList.contains('active') ? closeMenu() : openMenu());
  overlay.addEventListener('click', closeMenu);
  navLinks.addEventListener('click', e => { if (e.target.tagName === 'A' || e.target.closest('a')) closeMenu(); });
}