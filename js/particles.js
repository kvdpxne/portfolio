const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');
let particles = [], animId;

function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
    this.size = Math.random() * 5 + 2;
    this.vx = Math.random() * 0.4 - 0.2; this.vy = Math.random() * 0.4 - 0.2;
    this.opacity = Math.random() * 0.15 + 0.03;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }
  draw() {
    ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(108,92,231,${this.opacity})`; ctx.fill();
  }
}

function animLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  animId = requestAnimationFrame(animLoop);
}

function initParticles() {
  addEventListener('resize', resize, { passive: true }); resize();
  for (let i = 0; i < 35; i++) particles.push(new Particle());
  const start = window.requestIdleCallback || (fn => setTimeout(fn, 100));
  start(() => { if (!document.hidden) animLoop(); });
  document.addEventListener('visibilitychange', () => {
    document.hidden ? cancelAnimationFrame(animId) : animLoop();
  });
}