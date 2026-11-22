// Cinematic AI Character Portfolio Engine
(function() {
  'use strict';

  const cfg = window.CONFIG;
  if (!cfg) {
    console.error('config.js not loaded!');
    return;
  }

  // DOM Elements
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loader-bar');
  const loaderPercent = document.getElementById('loader-percent');
  const scrollProgress = document.getElementById('scroll-progress');
  const video = document.getElementById('film');
  const canvas = document.getElementById('stage-canvas');
  const panels = document.querySelectorAll('.panel');
  const navLinks = document.querySelectorAll('.nav-link');

  // Populate Dynamic Content
  populateDOM();

  // Timing Segments according to the guide
  // Total film duration: ~46s
  const SEGMENTS = [
    { id: 'intro',    start: 0.0,  hold: 7.6,  end: 8.6,  shiftX: 22 },
    { id: 'about',    start: 8.6,  hold: 14.6, end: 15.6, shiftX: 18 },
    { id: 'work',     start: 15.6, hold: 26.5, end: 28.8, shiftX: 0 },
    { id: 'skills',   start: 28.8, hold: 37.5, end: 39.2, shiftX: -18 },
    { id: 'resume',   start: 39.2, hold: 42.3, end: 43.6, shiftX: 0 },
    { id: 'contact',  start: 43.6, hold: 45.7, end: 46.5, shiftX: -15 }
  ];

  let totalDuration = 46.0;
  let hasVideo = false;
  let targetTime = 0;
  let currentTime = 0;
  let isSeeking = false;
  let targetShiftX = 22;
  let currentShiftX = 22;

  // Preloader Logic
  let loadProgress = 0;
  const loadInterval = setInterval(() => {
    loadProgress += Math.floor(Math.random() * 18) + 12;
    if (loadProgress >= 100) {
      loadProgress = 100;
      clearInterval(loadInterval);
      setTimeout(finishLoading, 400);
    }
    loaderBar.style.width = loadProgress + '%';
    loaderPercent.textContent = loadProgress + '%';
  }, 100);

  function finishLoading() {
    loader.classList.add('loaded');
  }

  // Attempt to load video file
  const videoSrc = window.innerWidth <= 760 ? 'media/film_mobile.mp4' : 'media/film.mp4';
  video.src = videoSrc;

  video.addEventListener('loadedmetadata', () => {
    hasVideo = true;
    totalDuration = video.duration || 46.0;
    canvas.style.display = 'none';
    video.style.display = 'block';
  });

  video.addEventListener('error', () => {
    hasVideo = false;
    video.style.display = 'none';
    canvas.style.display = 'block';
    initCanvasFallback();
  });

  // Mobile / iOS touch unlock for video seeking
  window.addEventListener('touchstart', function unlockVideo() {
    if (hasVideo && video.paused) {
      video.play().then(() => video.pause()).catch(() => {});
    }
    window.removeEventListener('touchstart', unlockVideo);
  }, { once: true });

  // Main Scroll Listener
  window.addEventListener('scroll', onScroll, { passive: true });

  function onScroll() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;

    const scrollFraction = Math.max(0, Math.min(1, window.scrollY / docHeight));
    
    // Update top progress bar
    scrollProgress.style.width = (scrollFraction * 100) + '%';

    // Map scroll to film time
    targetTime = scrollFraction * totalDuration;

    // Determine current active section
    updateActiveSection(scrollFraction);
  }

  function updateActiveSection(fraction) {
    const index = Math.min(SEGMENTS.length - 1, Math.floor(fraction * SEGMENTS.length));
    const activeSeg = SEGMENTS[index];

    panels.forEach(p => {
      if (p.getAttribute('data-section') === activeSeg.id) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      if (href === activeSeg.id) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    targetShiftX = window.innerWidth > 900 ? activeSeg.shiftX : 0;
  }

  // Smooth Render Loop (60 FPS lerp)
  function renderLoop() {
    // Smooth time lerp (0.16 factor)
    currentTime += (targetTime - currentTime) * 0.16;

    if (hasVideo && !isSeeking && Math.abs(video.currentTime - currentTime) > 0.02) {
      isSeeking = true;
      video.currentTime = currentTime;
    }

    // Smooth camera shift lerp
    currentShiftX += (targetShiftX - currentShiftX) * 0.1;
    if (video.style.display !== 'none') {
      video.style.transform = `translateX(${currentShiftX}vw)`;
    }

    requestAnimationFrame(renderLoop);
  }

  video.addEventListener('seeked', () => {
    isSeeking = false;
  });

  requestAnimationFrame(renderLoop);

  // Smooth Nav Click Scrolling
  navLinks.forEach((link, idx) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const targetScroll = (idx / (SEGMENTS.length - 1)) * docHeight;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    });
  });

  // Fallback Canvas: Cinematic Dark Character Stage
  function initCanvasFallback() {
    const ctx = canvas.getContext('2d');
    const portrait = new Image();
    portrait.src = 'media/character_cutout.png';

    portrait.onerror = () => {
      // Fallback to regular portrait if cutout not ready yet
      portrait.src = 'media/portrait.png';
    };

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    let angle = 0;
    function drawFallback() {
      if (hasVideo) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Deep dark stage background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle warm amber rim glow
      const glowGrad = ctx.createRadialGradient(
        canvas.width * 0.65, canvas.height * 0.45, 50,
        canvas.width * 0.65, canvas.height * 0.45, canvas.height * 0.8
      );
      glowGrad.addColorStop(0, 'rgba(255, 154, 77, 0.16)');
      glowGrad.addColorStop(0.6, 'rgba(255, 154, 77, 0.03)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (portrait.complete && portrait.naturalWidth > 0) {
        angle += 0.02;
        const breath = Math.sin(angle) * 4;

        // Calculate responsive scale
        const targetH = canvas.height * 0.86;
        const scale = targetH / portrait.naturalHeight;
        const targetW = portrait.naturalWidth * scale;

        // Character offset according to segment shift
        const shiftPx = (currentShiftX / 100) * canvas.width;
        const posX = (canvas.width - targetW) / 2 + shiftPx;
        const posY = canvas.height - targetH + breath;

        ctx.save();
        ctx.drawImage(portrait, posX, posY, targetW, targetH);
        ctx.restore();
      }

      requestAnimationFrame(drawFallback);
    }

    drawFallback();
  }

  // Populate Content from config.js
  function populateDOM() {
    // Hero
    document.getElementById('hero-role').textContent = cfg.role;

    // About Stats
    const statsGrid = document.getElementById('stats-grid');
    if (statsGrid && cfg.about && cfg.about.stats) {
      statsGrid.innerHTML = cfg.about.stats.map(s => `
        <div class="stat-item">
          <div class="stat-value">${s.value}</div>
          <div class="stat-label">${s.label}</div>
          <div class="stat-sub">${s.sub}</div>
        </div>
      `).join('');
    }

    // Projects
    const projectsDeck = document.getElementById('projects-deck');
    if (projectsDeck && cfg.projects) {
      projectsDeck.innerHTML = cfg.projects.map(p => `
        <article class="project-card">
          <div class="project-img-wrap">
            <img src="${p.image}" alt="${p.title}" class="project-img" loading="lazy">
            <span class="project-award">${p.award}</span>
          </div>
          <div class="project-body">
            <h3 class="project-title">${p.title}</h3>
            <div class="project-tagline">${p.tagline}</div>
            <p class="project-desc">${p.desc}</p>
            <div class="project-tech">
              ${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
            </div>
            <div class="project-links">
              ${p.live ? `<a href="${p.live}" target="_blank" rel="noreferrer" class="project-link">Live Demo →</a>` : ''}
              <a href="${p.github}" target="_blank" rel="noreferrer" class="project-link">GitHub →</a>
            </div>
          </div>
        </article>
      `).join('');
    }

    // Skills
    const skillsCat = document.getElementById('skills-categories');
    if (skillsCat && cfg.skills) {
      skillsCat.innerHTML = Object.entries(cfg.skills).map(([category, items]) => `
        <div class="skill-group">
          <div class="skill-category-title">${category}</div>
          <div class="skill-chips">
            ${items.map(skill => `<span class="skill-chip">${skill}</span>`).join('')}
          </div>
        </div>
      `).join('');
    }

    // Résumé Experience
    const expContainer = document.getElementById('resume-experience');
    if (expContainer && cfg.resume && cfg.resume.experience) {
      expContainer.innerHTML = cfg.resume.experience.map(e => `
        <div class="resume-card">
          <div class="resume-role">${e.role}</div>
          <div class="resume-meta">${e.company} · ${e.period}</div>
          <p class="resume-desc">${e.desc}</p>
        </div>
      `).join('');
    }

    // Résumé Education
    const eduContainer = document.getElementById('resume-education');
    if (eduContainer && cfg.resume && cfg.resume.education) {
      eduContainer.innerHTML = cfg.resume.education.map(ed => `
        <div class="resume-card">
          <div class="resume-role">${ed.degree}</div>
          <div class="resume-meta">${ed.institution} · ${ed.period}</div>
          <p class="resume-desc">${ed.details}</p>
        </div>
      `).join('');
    }

    // Contact Links
    const contactLinks = document.getElementById('contact-links');
    if (contactLinks && cfg.contact) {
      contactLinks.innerHTML = `
        <a href="mailto:${cfg.contact.email}" class="contact-pill">
          <svg class="contact-pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <span>${cfg.contact.email}</span>
        </a>
        <a href="${cfg.contact.linkedin}" target="_blank" rel="noreferrer" class="contact-pill">
          <svg class="contact-pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          <span>LinkedIn Profile</span>
        </a>
        <a href="${cfg.contact.github}" target="_blank" rel="noreferrer" class="contact-pill">
          <svg class="contact-pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
          <span>GitHub: github.com/abinivesh-m</span>
        </a>
        <a href="${cfg.contact.leetcode}" target="_blank" rel="noreferrer" class="contact-pill">
          <svg class="contact-pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <span>LeetCode (Rating 1480 · 113 Solved)</span>
        </a>
      `;
    }
  }

})();
