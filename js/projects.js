function buildProjectsHTML() {
  const cardsHTML = projData.map(p => `
    <article class="project-card" aria-label="${p.t}">
      <div class="project-image" style="background:${p.bg}" aria-hidden="true"><span class="project-icon">${p.i}</span></div>
      <div class="project-content"><h3>${p.t}</h3><p>${p.d}</p><div class="project-tags">${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}</div>
      <div class="project-links">
        <a href="#" class="project-link">🔗 Live Demo</a>
        ${p.gh ? `<a href="${p.gh}" class="project-link">📂 GitHub</a>` : ''}
       </div></div>
    </article>`).join('');

  const ghHTML = `
    <article class="github-more-card" aria-label="Zobacz więcej na GitHubie">
      <div class="github-icon"><svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg></div>
      <h3>Zobacz więcej</h3><p>Poznaj moje pozostałe repozytoria i projekty open-source.</p>
      <a href="https://github.com/kvdpxne" target="_blank" rel="noopener noreferrer" class="github-more-link">🚀 Przejdź do GitHuba</a>
    </article>`;

  return cardsHTML + ghHTML;
}

function initProjectsObserver() {
  const grid = document.getElementById('projectsGrid');
  let done = false;

  grid.innerHTML = '<div class="projects-placeholder">🔄 Ładowanie projektów…</div>';

  const observer = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting && !done) {
        done = true;
        grid.innerHTML = '';
        const fragment = document.createDocumentFragment();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = buildProjectsHTML();
        while (tempDiv.firstChild) {
          fragment.appendChild(tempDiv.firstChild);
        }
        grid.appendChild(fragment);

        const cards = grid.querySelectorAll('.project-card,.github-more-card');
        cards.forEach((c, i) => {
          requestAnimationFrame(() => setTimeout(() => c.classList.add('visible'), i * 120));
        });

        // Po zakończeniu wszystkich animacji (ostatnia karta + bufor) emitujemy zdarzenie
        const totalDuration = (cards.length - 1) * 120 + 300; // 300ms na ostatnią animację
        setTimeout(() => {
          document.dispatchEvent(new CustomEvent('projectsLoaded'));
        }, totalDuration);

        observer.unobserve(en.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

  observer.observe(grid);
}