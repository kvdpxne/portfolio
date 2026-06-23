function initCaseStudyObserver() {
  const container = document.getElementById('caseStudyContainer');
  if (!container) return;
  let done = false;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting && !done) {
        done = true;
        container.innerHTML = caseStudyHTML();
        document.dispatchEvent(new CustomEvent('caseStudyLoaded'));
        // Globalny observer (z main.js) automatycznie doda klasę .visible
        observer.unobserve(en.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

  observer.observe(container);
}

function caseStudyHTML() {
  return `
    <div class="section-label animate-on-scroll"><span aria-hidden="true"></span>Case Study</div>
    <h2 class="section-title animate-on-scroll">Portfolio – od pomysłu do wdrożenia</h2>
    <div class="case-grid">
      <div class="case-card animate-on-scroll">
        <h3>🎯 Cel projektu</h3>
        <p>Stworzenie nowoczesnej, błyskawicznej i dostępnej strony wizytówkowej, łączącej estetykę z perfekcyjną wydajnością i pełną zgodnością z WCAG – prezentacja umiejętności Full-Stack Developera.</p>
      </div>
      <div class="case-card animate-on-scroll" style="transition-delay:0.1s">
        <h3>⚙️ Technologie</h3>
        <p>Czysty JavaScript (inline), CSS Custom Properties, Canvas + requestAnimationFrame, Service Worker, Web Manifest, Intersection Observer, semantyczny HTML5, walidacja formularza.</p>
      </div>
      <div class="case-card animate-on-scroll" style="transition-delay:0.2s">
        <h3>📈 Rezultaty</h3>
        <p>Doskonałe wyniki Lighthouse (Performance, Accessibility, Best Practices, SEO), pełna responsywność, działanie offline, płynne animacje przy 60 fps, optymalizacja pod kątem szybkiego ładowania i indeksowania.</p>
      </div>
    </div>
    <div class="case-detail animate-on-scroll">
      <h3>Proces realizacji</h3>
      <div class="case-detail-grid">
        <div>
          <h4>Wyzwania</h4>
          <ul>
            <li>Zapewnienie doskonałej wydajności przy animowanym tle cząsteczkowym</li>
            <li>Implementacja leniwego ładowania bez pogorszenia UX</li>
            <li>Pełna zgodność z wytycznymi dostępności (ARIA, focus trap, kontrasty)</li>
            <li>Optymalizacja pod kątem SEO i Open Graph</li>
            <li>Wsparcie dla trybu offline oraz szybkie ładowanie</li>
          </ul>
        </div>
        <div>
          <h4>Rozwiązania</h4>
          <ul>
            <li>Użycie Canvas z requestAnimationFrame dla wydajnych cząsteczek</li>
            <li>Progressive loading z Intersection Observer</li>
            <li>Semantyczne znaczniki, role ARIA, testy czytnikiem ekranu</li>
            <li>Dynamiczne meta tagi, Schema.org, dane strukturalne</li>
            <li>Service Worker z cache‑first dla zasobów statycznych i network‑first dla HTML</li>
          </ul>
        </div>
      </div>
    </div>`;
}