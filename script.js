/* ============================================================
   PORTFOLIO — script.js
   ============================================================ */

/* ---- Typing animation ---- */
// ✏️ EDIT: Update phrases to match your roles
const phrases = [
  'Data & ML Enthusiast',
  'Data Scientist',
  'Machine Learning Engineer',
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
    setTimeout(type, 50);
  } else {
    charIdx++;
    typedEl.textContent = current.slice(0, charIdx);
    if (charIdx === current.length) {
      setTimeout(() => { deleting = true; type(); }, 2200);
      return;
    }
    setTimeout(type, 80);
  }
}
setTimeout(type, 1000);

function updateClock() {
  const clockEl = document.getElementById('clock');
  if (!clockEl) return;
  const now = new Date();
  const opts = {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };
  clockEl.textContent = now.toLocaleTimeString('en-US', opts);
}
updateClock();
setInterval(updateClock, 1000);


/* ---- Scroll fade-up reveal ---- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));


/* ---- Active nav link on scroll ---- */
const sections  = ['home', 'about', 'projects', 'experience', 'contact'];
const navLinks  = document.querySelectorAll('.nav-link');

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


const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.add('hidden'));
  });
}


const projects = [
  {
    title: 'Market Sales Performance Dashboard',
    category: 'Business Intelligence · Data Visualization',
    description: 'An interactive Business Intelligence dashboard built using Streamlit, Pandas, and Plotly to analyze sales performance, customer behavior, and product insights. This project transforms transactional data into actionable insights to support revenue optimization and strategic decision-making.',
    highlights: [
      '✅ Interactive revenue analysis with daily trends and year comparison',
      '✅ Customer segmentation: Biggest Spender vs Most Loyal Customer',
      '✅ Category-level revenue and demand driver identification',
      '✅ Item-level performance analysis to detect hero products and upsell opportunities',
      '✅ Built with Streamlit for real-time data exploration',
    ],
    tech: ['Python', 'Plotly', 'Streamlit', 'Pandas'],
    github: 'https://github.com/adnamard/Sales-Market-Dashboard',
    demo: 'https://sales-market-dashboard-adnamar.streamlit.app/'
  },
  {
    title: 'Reusable vs Non-Reusable Drink Container Classifier',
    category: 'Computer Vision · Transfer Learning',
    description: 'This thesis project, titled “Classification of Reusable and Non-Reusable Drink Containers,” applies transfer learning using MobileNetV2 to classify whether a person is using a tumbler or not. The model was trained, evaluated, and optimized for image-based detection, contributing to environmental awareness through AI-powered classification. The project has been deployed publicly on Hugging Face.',
    highlights: [
      '✅ 96% accuracy on benchmark test set',
      '✅ Implemented transfer learning with MobileNetV2',
      '✅ Public deployment on Hugging Face',
    ],
    tech: ['Python', 'TensorFlow/Keras', 'HuggingFace', 'MobileNetV2'],
    github: 'https://github.com/adnamard/Tumblr-Detection',
    demo: 'https://huggingface.co/spaces/Adnamar/Tumbler-detection'
  },
  {
    title: 'Tabir – Real-Time Sign Language Detection',
    category: 'Computer Vision · Deep Learning',
    description: 'Tabir is an AI-powered sign language translation system designed to reduce communication barriers for the deaf community. Using Computer Vision and Deep Learning, the system detects and translates SIBI (Indonesian Sign Language System) gestures captured through manually collected video datasets. This project aims to improve accessibility in education and employment through real-time AI interpretation.',
    highlights: [
      '✅ Real-time sign language detection using Computer Vision',
      '✅ Custom video dataset collection (SIBI-based)',
      '✅ Designed as an AI bridge for inclusive communication',
    ],
    tech: ['Python', 'Keras', 'TensorFlow', 'MediaPipe', 'MobileNetV1'],
    github: 'https://github.com/adnamard/tabir-official',
    demo: 'https://melodic-fudge-91078b.netlify.app/'
  },
  {
    title: 'Memorabilia – Recommendation System',
    category: 'Machine Learning · Recommender System',
    description: 'A deep learning system that classifies chest X-ray images to detect pneumonia using a fine-tuned ResNet-50 architecture. The model was trained on the NIH Chest X-Ray dataset and deployed as an interactive web app for medical practitioners.',
    highlights: [
      '✅ 96.2% accuracy, 95% sensitivity, 97% specificity',
      '✅ Grad-CAM visualization for explainability',
      '✅ Deployed as Streamlit web app',
      '✅ DICOM format support for clinical use',
    ],
    tech: ['Python', 'TensorFlow/Keras', 'Neural Collaborative Filtering', 'Pandas'],
    github: 'https://github.com/Memorabillia/Memorabillia',
    demo: 'https://www.canva.com/design/DAGH7-DqJGQ/JgxpttpFMlXDblRSSH94Ew/view?utm_content=DAGH7-DqJGQ&utm_campaign=designshare&utm_medium=link&utm_source=editor#15'
  }
];

/* ---- Modal open/close ---- */
function openModal(idx) {
  const p = projects[idx];
  document.getElementById('modal-title').textContent       = p.title;
  document.getElementById('modal-category').textContent    = p.category;
  document.getElementById('modal-description').textContent = p.description;

  document.getElementById('modal-highlights').innerHTML =
    p.highlights.map(h => `<li class="flex items-start gap-2">${h}</li>`).join('');

  document.getElementById('modal-tech').innerHTML =
    p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');

  document.getElementById('modal-github').href = p.github;
  document.getElementById('modal-demo').href   = p.demo;

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModalDirect();
}

function closeModalDirect() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModalDirect();
});

lottie.loadAnimation({
    container: document.getElementById('astronaut'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '404 error page with cat.json' 
  });

  