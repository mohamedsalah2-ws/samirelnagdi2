/* ============================================================
   PORTFOLIO — script.js
   ============================================================

*/
alert('Welcome to my website 😊, I hope you like it.');


/* ════════════════════════════════════════════════════════════
   ★  GALLERY DATA — EDIT THIS SECTION TO ADD YOUR MEDIA  ★
   ════════════════════════════════════════════════════════════ */

const GALLERY_DATA = {

  /* ── IMAGE FOLDERS ───────────────────────────────────── */

  "Cinematic Portraits": [
    // { src: "images/gallery/portrait1.jpg", caption: "وصف الصورة" },
    {src: "images/work1.jpg"},
    {src: "images/work2.jpg"}
  ],

  "Arabic Visual Identity": [
    // { src: "images/gallery/arabic1.jpg", caption: "هوية بصرية — مطعم شرقي" },
    {src: "images/work1.jpg"},
  ],

  "AI Concept Art": [
    // { src: "images/gallery/ai_art1.jpg", caption: "AI Concept — Futuristic City" },
    {src: "images/work1.jpg"},
  ],

  "Brand Campaigns": [
    // { src: "images/gallery/brand1.jpg", caption: "Brand Campaign — Fashion Client" },
    {src: "images/work1.jpg"},
  ],

  "Prompt Engineering": [
    // { src: "images/gallery/prompt1.jpg", caption: "Prompt Test — Cinematic Lighting" },
    {src: "images/work1.jpg"},
  ],

  "Storyboards": [
    // { src: "images/gallery/story1.jpg", caption: "Storyboard — Brand Film Scene 1" },
    {src: "images/work1.jpg"},
  ],

  /* ── VIDEO FOLDERS ───────────────────────────────────── */

  "Cinematic Reels": [
    // { src: "videos/gallery/reel1.mp4", caption: "وصف الفيديو" },
    {src: "videos/reel1.mp4"},
  ],

  "Brand Films": [
    { src: "videos/brand_film1.mp4", caption: "Brand Film — Restaurant Launch" },
    { src: "videos/brand_film2.mp4", caption: "Brand Film — Restaurant Launch" },
  ],

  "AI Video Generation": [
    {src: "videos/aivid1.mp4", caption: "AI Video — Runway ML Test"},
    {src: "videos/aivid2.mp4", caption: "AI Video — Runway ML Test"},
    {src: "videos/aivid3.mp4", caption: "AI Video — Runway ML Test"},
    {src: "videos/aivid4.mp4", caption: "AI Video — Runway ML Test"},
  ],

  "Social Media Edits": [
    // { src: "videos/gallery/social1.mp4", caption: "Reels Edit — Fashion Brand" },
    {src: "videos/social1.mp4", caption: "AI Video — Runway ML Test"},
  ],

  "Storyboard Animations": [
    // { src: "videos/gallery/anim1.mp4", caption: "Animatic — Brand Story" },
    {src: "videos/anim1.mp4", caption: "AI Video — Runway ML Test"},
  ],

  "Arabic Content": [
    // { src: "videos/gallery/ar1.mp4", caption: "إعلان — منتج عربي" },
    {src: "videos/ar1.mp4", caption: "AI Video — Runway ML Test"},
  ],

};

/* ════════════════════════════════════════════════════════════
   DO NOT EDIT BELOW THIS LINE UNLESS YOU KNOW WHAT YOU'RE DOING
   ════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ════════════════════════════════════════════════════
     TABS
  ════════════════════════════════════════════════════ */
  document.querySelectorAll('.gtab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.gtab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.gallery-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const id = 'panel' + tab.dataset.tab.charAt(0).toUpperCase() + tab.dataset.tab.slice(1);
      document.getElementById(id).classList.add('active');
    });
  });

  /* ════════════════════════════════════════════════════
     INIT GALLERY CARDS FROM STATIC DATA
  ════════════════════════════════════════════════════ */
  function initGallery() {
    let totalImages = 0;
    let totalVideos = 0;

    document.querySelectorAll('.fcard').forEach(card => {
      const folder  = card.dataset.folder;
      const isVideo = card.classList.contains('fcard-vid');
      const items   = GALLERY_DATA[folder] || [];
      const count   = items.length;
      const unit    = isVideo
        ? (count === 1 ? 'video' : 'videos')
        : (count === 1 ? 'image' : 'images');

      card.querySelector('.fcard-count').textContent = count + ' ' + unit;

      if (isVideo) totalVideos += count;
      else         totalImages += count;

      const coverDiv = card.querySelector('.fcard-cover');
      const ph       = coverDiv.querySelector('.fcard-cover-ph');

      if (items.length > 0) {
        if (ph) ph.style.display = 'none';
        const first = items[0];

        if (isVideo) {
          const vid = document.createElement('video');
          vid.src = first.src; vid.muted = true; vid.loop = true; vid.playsInline = true;
          card.addEventListener('mouseenter', () => vid.play().catch(() => {}));
          card.addEventListener('mouseleave', () => { vid.pause(); vid.currentTime = 0; });
          coverDiv.appendChild(vid);
        } else {
          const img = document.createElement('img');
          img.src = first.src; img.alt = first.caption || folder;
          coverDiv.appendChild(img);
        }

        let badge = coverDiv.querySelector('.fcard-cover-badge');
        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'fcard-cover-badge';
          coverDiv.appendChild(badge);
        }
        badge.textContent = count;
      } else {
        if (ph) ph.style.display = '';
      }

      card.querySelector('.fcard-front').addEventListener('click', () => {
        openOverlay(folder, isVideo ? 'video' : 'image');
      });
    });

    document.getElementById('tabCountImages').textContent = totalImages;
    document.getElementById('tabCountVideos').textContent = totalVideos;
  }

  /* ════════════════════════════════════════════════════
     OVERLAY
  ════════════════════════════════════════════════════ */
  let currentFolder = '';
  let currentType   = 'image';
  let currentItems  = [];

  const overlay      = document.getElementById('galleryOverlay');
  const overlayTitle = document.getElementById('galleryOverlayTitle');
  const overlayBadge = document.getElementById('galleryOverlayBadge');
  const overlayGrid  = document.getElementById('galleryOverlayGrid');
  const overlayEmpty = document.getElementById('galleryEmpty');
  const overlayClose = document.getElementById('galleryOverlayClose');

  function openOverlay(folder, type) {
    currentFolder = folder;
    currentType   = type;
    currentItems  = GALLERY_DATA[folder] || [];

    overlayTitle.textContent = folder;
    overlayBadge.textContent = type === 'video' ? '▶ Videos' : '🖼 Images';
    overlayBadge.className   = 'overlay-type-badge' + (type === 'video' ? ' vid' : '');

    renderOverlayGrid();
    overlay.classList.add('ov-visible');
    document.body.style.overflow = 'hidden';
  }

  function renderOverlayGrid() {
    overlayGrid.innerHTML = '';
    overlayGrid.className = 'fcard-overlay-grid' + (currentType === 'video' ? ' is-video' : '');

    if (currentItems.length === 0) {
      overlayEmpty.classList.add('visible');
      overlayGrid.style.display = 'none';
    } else {
      overlayEmpty.classList.remove('visible');
      overlayGrid.style.display = '';

      currentItems.forEach((item, idx) => {
        const div = document.createElement('div');
        div.className = 'img-item';

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

        overlayGrid.appendChild(div);
      });
    }
  }

  function closeOverlay() {
    overlay.classList.remove('ov-visible');
    document.body.style.overflow = '';
    overlayGrid.querySelectorAll('video').forEach(v => v.pause());
  }

  overlayClose.addEventListener('click', closeOverlay);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeOverlay(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('ov-visible')) closeOverlay();
  });

  /* ════════════════════════════════════════════════════
     LIGHTBOX
  ════════════════════════════════════════════════════ */
  const lightbox  = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lbImg');
  const lbCaption = document.getElementById('lbCaption');
  const lbClose   = document.getElementById('lbClose');
  const lbPrev    = document.getElementById('lbPrev');
  const lbNext    = document.getElementById('lbNext');
  let lbIndex = 0;

  function openLightbox(idx) {
    lbIndex = idx;
    showLb();
    lightbox.classList.add('lb-visible');
  }

  function showLb() {
    const item = currentItems[lbIndex];
    if (!item) return;
    lbImg.src = item.src;
    lbImg.alt = item.caption || '';
    lbCaption.textContent = (lbIndex + 1) + ' / ' + currentItems.length
      + (item.caption ? '  ·  ' + item.caption : '');
    lbPrev.style.display = currentItems.length > 1 ? '' : 'none';
    lbNext.style.display = currentItems.length > 1 ? '' : 'none';
  }

  function closeLightbox() { lightbox.classList.remove('lb-visible'); lbImg.src = ''; }

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  lbPrev.addEventListener('click', () => { lbIndex = (lbIndex - 1 + currentItems.length) % currentItems.length; showLb(); });
  lbNext.addEventListener('click', () => { lbIndex = (lbIndex + 1) % currentItems.length; showLb(); });
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('lb-visible')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  { lbIndex = (lbIndex - 1 + currentItems.length) % currentItems.length; showLb(); }
    if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % currentItems.length; showLb(); }
  });

  /* ════════════════════════════════════════════════════
     NAV SCROLL STATE
  ════════════════════════════════════════════════════ */
  const nav = document.querySelector('nav');
  function updateNav() { nav.classList.toggle('scrolled', window.scrollY > 60); }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ════════════════════════════════════════════════════
     HAMBURGER MENU
  ════════════════════════════════════════════════════ */
  const hamburger  = document.getElementById('navHamburger');
  const drawer     = document.getElementById('navDrawer');
  const navOverlay = document.getElementById('navOverlay');
  if (hamburger) {
    const openDrawer  = () => {
      hamburger.classList.add('is-open');
      drawer.classList.add('is-open');
      navOverlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };
    const closeDrawer = () => {
      hamburger.classList.remove('is-open');
      drawer.classList.remove('is-open');
      navOverlay.classList.remove('is-open');
      document.body.style.overflow = '';
    };
    hamburger.addEventListener('click', () =>
      drawer.classList.contains('is-open') ? closeDrawer() : openDrawer()
    );
    navOverlay.addEventListener('click', closeDrawer);
    document.querySelectorAll('.drawer-link').forEach(l => l.addEventListener('click', closeDrawer));
  }

  /* ════════════════════════════════════════════════════
     CURSOR GLOW
  ════════════════════════════════════════════════════ */
  const glow = document.getElementById('cursorGlow');
  if (glow) {
    document.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    });
  }

  /* ════════════════════════════════════════════════════
     SCROLL REVEAL
  ════════════════════════════════════════════════════ */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ════════════════════════════════════════════════════
     STAT COUNTERS
  ════════════════════════════════════════════════════ */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    let current  = 0;
    const step   = target / (1600 / 16);
    const timer  = setInterval(() => {
      current += step;
      if (current >= target) { el.textContent = target; clearInterval(timer); }
      else el.textContent = Math.floor(current);
    }, 16);
  }
  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) {
    let done = false;
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !done) {
        done = true;
        document.querySelectorAll('[data-target]').forEach(animateCounter);
      }
    }).observe(statsBar);
  }

  /* ════════════════════════════════════════════════════
     SMOOTH SCROLL + ACTIVE NAV
  ════════════════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  sections.forEach(s => {
    new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          navLinks.forEach(l => {
            l.style.color = l.getAttribute('href') === '#' + e.target.id ? 'var(--accent1)' : '';
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' }).observe(s);
  });

  /* ════════════════════════════════════════════════════
     PROJECT VIDEO HOVER
  ════════════════════════════════════════════════════ */
  document.querySelectorAll('.project-card').forEach(card => {
    const v = card.querySelector('video');
    if (!v) return;
    card.addEventListener('mouseenter', () => { v.muted = true; v.play().catch(() => {}); });
    card.addEventListener('mouseleave', () => { v.pause(); v.currentTime = 0; });
  });

  

  /* ════════════════════════════════════════════════════
     INIT
  ════════════════════════════════════════════════════ */
  initGallery();


});

