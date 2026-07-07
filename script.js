/* ============================================================
   PORTFOLIO — script.js (homepage only)
   Include common.js BEFORE this file — it provides fadeObserver
   and the mobile-menu toggle.
   ============================================================ */

/* ---- Typing animation ---- */
const phrases = [
  'Turning messy data into',
  'clear decisions',
  'honest stories',
  'dashboards people open',
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  if (!typedEl) return;
  const current = phrases[phraseIdx];
  if (deleting) {
    charIdx--;
    typedEl.textContent = current.slice(0, charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(type, 400);
      return;
    }
    setTimeout(type, 40);
  } else {
    charIdx++;
    typedEl.textContent = current.slice(0, charIdx);
    if (charIdx === current.length) {
      setTimeout(() => { deleting = true; type(); }, 2200);
      return;
    }
    setTimeout(type, 70);
  }
}
setTimeout(type, 1000);

/* ---- Jakarta clock ---- */
function updateClock() {
  const clockEl = document.getElementById('clock');
  if (!clockEl) return;
  const now = new Date();
  const opts = { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  clockEl.textContent = now.toLocaleTimeString('en-US', opts);
}
updateClock();
setInterval(updateClock, 1000);

/* ---- Active nav link on scroll ---- */
const sections = ['home', 'projects', 'about', 'learned', 'experience', 'contact'];
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = 'home';
  sections.forEach(id => {
    const sec = document.getElementById(id);
    if (sec && window.scrollY >= sec.offsetTop - 130) current = id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}, { passive: true });

/* ---- What I've Learned ---- */
const learnings = [
  {
    title: 'Coastal Land Change Analysis using Google Earth Engine',
    summary: 'How I used cloud-based geospatial processing, AWEI_sh water masking, and ENDBSI to track land reclamation in North Jakarta over seven years.',
    date: '2025-06',
    status: 'Completed',
    url: 'https://notion.so'
  },
  {
    title: 'Building a MobileNetV2 Image Classifier',
    summary: 'Key takeaways on transfer learning, fine-tuning strategies, data augmentation, and deploying a Keras model to Hugging Face Spaces.',
    date: '2024-07',
    status: 'Completed',
    url: 'https://notion.so'
  },
];
const statusConfig = {
  'Completed':   { bg: 'rgba(16,37,66,0.06)', border: 'rgba(16,37,66,0.18)', color: '#102542', dot: '#102542' },
  'In Progress': { bg: 'rgba(201,162,39,0.12)', border: 'rgba(201,162,39,0.3)', color: '#C9A227', dot: '#C9A227' },
  'Planned':     { bg: 'rgba(16,37,66,0.04)', border: 'rgba(16,37,66,0.12)', color: 'rgba(16,37,66,0.55)', dot: 'rgba(16,37,66,0.55)' }
};
function formatLearnDate(d) {
  const [y, m] = d.split('-');
  return new Date(y, m - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}
function renderLearnings() {
  const grid = document.getElementById('learned-grid');
  if (!grid) return;
  grid.innerHTML = learnings.map(l => {
    const s = statusConfig[l.status] || statusConfig['Planned'];
    return `
      <a href="${l.url}" target="_blank" rel="noopener" class="learn-card fade-up" aria-label="${l.title}">
        <div class="learn-card-inner">
          <div class="learn-card-header">
            <span class="learn-status-badge" style="background:${s.bg};border-color:${s.border};color:${s.color}">
              <span class="learn-dot" style="background:${s.dot}"></span>${l.status}
            </span>
            <i class="fas fa-external-link-alt learn-link-icon"></i>
          </div>
          <h3 class="learn-title">${l.title}</h3>
          <p class="learn-summary">${l.summary}</p>
          <p class="learn-date"><i class="far fa-calendar-alt" style="margin-right:5px;opacity:.5"></i>${formatLearnDate(l.date)}</p>
        </div>
      </a>`;
  }).join('');
  grid.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));
}
renderLearnings();