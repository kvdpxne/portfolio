function initComponents() {
  document.getElementById('aboutTextContainer').innerHTML = aboutTexts.map((t, i) =>
    `<p class="animate-on-scroll" style="transition-delay:${i * 0.1}s">${t}</p>`).join('');

  document.getElementById('aboutStatsContainer').innerHTML = statsData.map((s, i) =>
    `<div class="stat-card animate-on-scroll" style="transition-delay:${i * 0.12}s"><div class="stat-number">${s.n}</div><div class="stat-label">${s.l}</div></div>`).join('');

  const beforeLast = timelineData.length - 2;
  document.getElementById('timelineContainer').innerHTML = timelineData.map((item, i) => {
    const cls = (item.future ? 'timeline-future' : 'timeline-item') + ' animate-on-scroll-x';
    const always = (i === beforeLast && !item.future) ? ' always-visible' : '';
    return `<div class="${cls}${always}" style="transition-delay:${i * 0.1}s"><div class="timeline-dot" aria-hidden="true"></div><div class="timeline-date">${item.d}</div><div class="timeline-role">${item.r}</div><div class="timeline-company">${item.c}</div><div class="timeline-desc">${item.desc}</div></div>`;
  }).join('');

  document.getElementById('skillsContainer').innerHTML = skillsData.map((s, i) =>
    `<span class="skill-chip animate-on-scroll" style="transition-delay:${i * 0.03}s"><span class="skill-dot ${s.c}" aria-hidden="true"></span>${s.n}<span class="skill-level">· ${s.l}</span></span>`).join('');
}