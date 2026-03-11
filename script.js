/* ============================================================
   SAMIR ELNAGDI PORTFOLIO — script.js
   ============================================================

/* ════════════════════════════════════════════════════════
   ★  GALLERY DATA — EDIT THIS TO ADD YOUR MEDIA  ★
   ════════════════════════════════════════════════════════ */
const GALLERY_DATA = {

  /* ── IMAGE FOLDERS ─────────────────────────────────── */
  "Cinematic Portraits": [
    { src: "images/work1.jpg" },
    { src: "images/work2.jpg" },
  ],
  "Arabic Visual Identity": [
    { src: "images/work1.jpg" },
  ],
  "AI Concept Art": [
    { src: "images/work1.jpg" },
  ],
  "Brand Campaigns": [
    { src: "images/work1.jpg" },
  ],
  "Prompt Engineering": [
    { src: "images/work1.jpg" },
  ],
  "Storyboards": [
    { src: "images/work1.jpg" },
  ],

  /* ── VIDEO FOLDERS ─────────────────────────────────── */
  "Cinematic Reels": [
    { src: "videos/reel1.mp4" },
  ],
  "Brand Films": [
    { src: "videos/brand_film1.mp4", caption: "Brand Film — Restaurant Launch" },
    { src: "videos/brand_film2.mp4", caption: "Brand Film — Restaurant Launch" },
  ],
  "AI Video Generation": [
    { src: "videos/aivid1.mp4", caption: "AI Video — Runway ML Test" },
    { src: "videos/aivid2.mp4", caption: "AI Video — Runway ML Test" },
    { src: "videos/aivid3.mp4", caption: "AI Video — Runway ML Test" },
    { src: "videos/aivid4.mp4", caption: "AI Video — Runway ML Test" },
  ],
  "Social Media Edits": [
    { src: "videos/social1.mp4" },
  ],
  "Storyboard Animations": [
    { src: "videos/anim1.mp4" },
  ],
  "Arabic Content": [
    { src: "videos/ar1.mp4" },
  ],
};

/* ════════════════════════════════════════════════════════
   ANIMATED BACKGROUND CANVAS
   ════════════════════════════════════════════════════════ */
function initCanvas() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : H + 5;
      this.vy = -(Math.random() * 0.3 + 0.1);
      this.vx = (Math.random() - 0.5) * 0.2;
      this.r  = Math.random() * 1.2 + 0.3;
      this.alpha = Math.random() * 0.5 + 0.1;
      const palette = ['rgba(0,242,234,', 'rgba(155,89,255,', 'rgba(255,255,255,'];
      this.color = palette[Math.floor(Math.random() * palette.length)];
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.y < -5) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: 80 }, () => new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);
  init(); loop();
}

/* ════════════════════════════════════════════════════════
   CUSTOM CURSOR
   ════════════════════════════════════════════════════════ */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const trail  = document.getElementById('cursorTrail');
  if (!cursor || !trail) return;

  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
    setTimeout(() => {
      trail.style.left = mx + 'px';
      trail.style.top  = my + 'px';
    }, 80);
  });

  document.querySelectorAll('a,button,.fcard,.pj-card,.sk-card,.tl-card,.contact-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

/* ════════════════════════════════════════════════════════
   NAV
   ════════════════════════════════════════════════════════ */
function initNav() {
  const nav     = document.getElementById('mainNav');
  const burger  = document.getElementById('navHamburger');
  const drawer  = document.getElementById('navDrawer');
  const overlay = document.getElementById('navOverlay');

  // scroll class
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // hamburger
  if (burger) {
    const toggle = open => {
      burger.classList.toggle('open', open);
      drawer.classList.toggle('open', open);
      overlay.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', () => toggle(!drawer.classList.contains('open')));
    overlay.addEventListener('click', () => toggle(false));
    document.querySelectorAll('.drawer-link').forEach(l => l.addEventListener('click', () => toggle(false)));
  }

  // active link highlight
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => io.observe(s));
}

/* ════════════════════════════════════════════════════════
   HERO ROLE CYCLE
   ════════════════════════════════════════════════════════ */
function initRoleCycle() {
  const roles = document.querySelectorAll('.role');
  if (!roles.length) return;
  let idx = 0;
  setInterval(() => {
    roles[idx].classList.remove('active');
    idx = (idx + 1) % roles.length;
    roles[idx].classList.add('active');
  }, 2200);
}

/* ════════════════════════════════════════════════════════
   STAT COUNTERS
   ════════════════════════════════════════════════════════ */
function initCounters() {
  const run = el => {
    const target = +el.dataset.target;
    let current  = 0;
    const step   = target / (1400 / 16);
    const timer  = setInterval(() => {
      current += step;
      if (current >= target) { el.textContent = target; clearInterval(timer); }
      else el.textContent = Math.floor(current);
    }, 16);
  };
  const allCounters = document.querySelectorAll('[data-target]');
  let done = false;
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !done) { done = true; allCounters.forEach(run); }
  }, { threshold: 0.3 }).observe(document.querySelector('.hero-stats') || document.body);
}

/* ════════════════════════════════════════════════════════
   SCROLL REVEAL
   ════════════════════════════════════════════════════════ */
function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ════════════════════════════════════════════════════════
   SMOOTH SCROLL
   ════════════════════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}

/* ════════════════════════════════════════════════════════
   SCROLL TO TOP
   ════════════════════════════════════════════════════════ */
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ════════════════════════════════════════════════════════
   GALLERY TABS
   ════════════════════════════════════════════════════════ */
function initTabs() {
  document.querySelectorAll('.gtab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.gtab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.gallery-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const id = 'panel' + tab.dataset.tab.charAt(0).toUpperCase() + tab.dataset.tab.slice(1);
      document.getElementById(id)?.classList.add('active');
    });
  });
}

/* ════════════════════════════════════════════════════════
   GALLERY CARDS
   ════════════════════════════════════════════════════════ */
function initGallery() {
  let totalImages = 0, totalVideos = 0;

  document.querySelectorAll('.fcard').forEach(card => {
    const folder  = card.dataset.folder;
    const isVideo = card.classList.contains('fcard-vid');
    const items   = GALLERY_DATA[folder] || [];
    const count   = items.length;
    const unit    = isVideo ? (count === 1 ? 'video' : 'videos') : (count === 1 ? 'image' : 'images');

    card.querySelector('.fcard-count').textContent = count + ' ' + unit;
    if (isVideo) totalVideos += count;
    else         totalImages += count;

    const cover = card.querySelector('.fcard-cover');
    const ph    = cover.querySelector('.fcard-ph');

    if (items.length) {
      if (ph) ph.style.display = 'none';
      const first = items[0];
      if (isVideo) {
        const vid = document.createElement('video');
        vid.src = first.src; vid.muted = true; vid.loop = true; vid.playsInline = true;
        card.addEventListener('mouseenter', () => vid.play().catch(() => {}));
        card.addEventListener('mouseleave', () => { vid.pause(); vid.currentTime = 0; });
        cover.appendChild(vid);
      } else {
        const img = document.createElement('img');
        img.src = first.src; img.alt = first.caption || folder;
        cover.appendChild(img);
      }
    }

    card.addEventListener('click', () => openOverlay(folder, isVideo ? 'video' : 'image'));
  });

  document.getElementById('tabCountImages').textContent = totalImages;
  document.getElementById('tabCountVideos').textContent = totalVideos;
}

/* ════════════════════════════════════════════════════════
   OVERLAY
   ════════════════════════════════════════════════════════ */
let currentFolder = '';
let currentType   = 'image';
let currentItems  = [];

function openOverlay(folder, type) {
  currentFolder = folder;
  currentType   = type;
  currentItems  = GALLERY_DATA[folder] || [];

  document.getElementById('galleryOverlayTitle').textContent = folder;
  const badge = document.getElementById('galleryOverlayBadge');
  badge.textContent = type === 'video' ? '▶ Videos' : '🖼 Images';
  badge.className   = 'go-badge' + (type === 'video' ? ' vid' : '');

  renderOverlayGrid();
  document.getElementById('galleryOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function renderOverlayGrid() {
  const grid  = document.getElementById('galleryOverlayGrid');
  const empty = document.getElementById('galleryEmpty');
  grid.innerHTML = '';
  grid.className = 'go-grid' + (currentType === 'video' ? ' vid-grid' : '');

  if (!currentItems.length) {
    empty.classList.add('visible');
    grid.style.display = 'none';
  } else {
    empty.classList.remove('visible');
    grid.style.display = '';
    currentItems.forEach((item, idx) => {
      const div = document.createElement('div');
      div.className = 'go-item';
      if (currentType === 'image') {
        const img = document.createElement('img');
        img.src = item.src; img.alt = item.caption || '';
        div.appendChild(img);
        div.addEventListener('click', () => openLightbox(idx));
      } else {
        const vid = document.createElement('video');
        vid.src = item.src; vid.controls = true; vid.preload = 'metadata';
        div.appendChild(vid);
      }
      grid.appendChild(div);
    });
  }
}

function closeOverlay() {
  const overlay = document.getElementById('galleryOverlay');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  overlay.querySelectorAll('video').forEach(v => v.pause());
}

/* ════════════════════════════════════════════════════════
   LIGHTBOX
   ════════════════════════════════════════════════════════ */
let lbIndex = 0;

function openLightbox(idx) {
  lbIndex = idx;
  showLb();
  document.getElementById('lightbox').classList.add('open');
}

function showLb() {
  const item = currentItems[lbIndex];
  if (!item) return;
  const img = document.getElementById('lbImg');
  img.src = item.src; img.alt = item.caption || '';
  document.getElementById('lbCaption').textContent =
    (lbIndex + 1) + ' / ' + currentItems.length + (item.caption ? '  ·  ' + item.caption : '');
  const showNav = currentItems.length > 1;
  document.getElementById('lbPrev').style.display = showNav ? '' : 'none';
  document.getElementById('lbNext').style.display = showNav ? '' : 'none';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.getElementById('lbImg').src = '';
}

/* ════════════════════════════════════════════════════════
   PROJECT VIDEO HOVER
   ════════════════════════════════════════════════════════ */
function initProjectVideos() {
  document.querySelectorAll('.pj-card').forEach(card => {
    const v = card.querySelector('video');
    if (!v) return;
    card.addEventListener('mouseenter', () => { v.muted = true; v.play().catch(() => {}); });
    card.addEventListener('mouseleave', () => { v.pause(); v.currentTime = 0; });
  });
}

/* ════════════════════════════════════════════════════════
   CARD TILT EFFECT (subtle, desktop only)
   ════════════════════════════════════════════════════════ */
function initTilt() {
  if (window.innerWidth <= 768) return;
  document.querySelectorAll('.sk-card, .tl-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const xRel   = (e.clientX - rect.left) / rect.width  - 0.5;
      const yRel   = (e.clientY - rect.top)  / rect.height - 0.5;
      const rotate = `perspective(600px) rotateY(${xRel * 6}deg) rotateX(${-yRel * 4}deg) translateZ(4px)`;
      card.style.transform = rotate;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

/* ════════════════════════════════════════════════════════
   INIT ALL
   ════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initCanvas();
  initCursor();
  initNav();
  initRoleCycle();
  initCounters();
  initReveal();
  initSmoothScroll();
  initScrollTop();
  initTabs();
  initGallery();
  initProjectVideos();
  initTilt();

  // Overlay & Lightbox events
  document.getElementById('galleryOverlayClose')?.addEventListener('click', closeOverlay);
  document.getElementById('galleryOverlay')?.addEventListener('click', e => {
    if (e.target.id === 'galleryOverlay') closeOverlay();
  });

  document.getElementById('lbClose')?.addEventListener('click', closeLightbox);
  document.getElementById('lightbox')?.addEventListener('click', e => {
    if (e.target.id === 'lightbox') closeLightbox();
  });
  document.getElementById('lbPrev')?.addEventListener('click', () => {
    lbIndex = (lbIndex - 1 + currentItems.length) % currentItems.length; showLb();
  });
  document.getElementById('lbNext')?.addEventListener('click', () => {
    lbIndex = (lbIndex + 1) % currentItems.length; showLb();
  });
  document.addEventListener('keydown', e => {
    if (document.getElementById('lightbox')?.classList.contains('open')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft')  { lbIndex = (lbIndex - 1 + currentItems.length) % currentItems.length; showLb(); }
      if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % currentItems.length; showLb(); }
    }
    if (document.getElementById('galleryOverlay')?.classList.contains('open')) {
      if (e.key === 'Escape') closeOverlay();
    }
  });
});
