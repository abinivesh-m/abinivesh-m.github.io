// ==========================================================================
// CINEMATIC 3D INTERACTIVE ENGINE — ABINIVESH M
// Three.js WebGL Real-Time Character, Cursor Orbit, Volumetric Lights & Physics
// ==========================================================================

(function() {
  'use strict';

  const cfg = window.CONFIG;
  if (!cfg) {
    console.error('config.js is missing!');
    return;
  }

  // --- Preloader Logic ---
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loader-bar');
  const loaderPercent = document.getElementById('loader-percent');
  const scrollProgress = document.getElementById('scroll-progress');
  const panels = document.querySelectorAll('.panel');
  const navLinks = document.querySelectorAll('.nav-link');

  // --- Populate DOM Content with ZERO Emojis ---
  populateContent();

  // ==========================================================================
  // CINEMATIC SCROLL-SCRUBBING FILM ENGINE (Page 14 Visual Guide: Blob URL)
  // ==========================================================================
  const film = document.getElementById('film');
  const cacheKey = '?v=20261123_topnotch_v1';
  const videoSrc = ((window.innerWidth <= 760) ? 'media/film_mobile.mp4' : 'media/film.mp4') + cacheKey;
  let targetFilmTime = 0;
  let currentFilmTime = 0;
  let isFilmReady = false;

  function loadFilmBlob() {
    fetch(videoSrc)
      .then(res => {
        if (!res.ok) throw new Error('Direct fetch failed');
        const contentLength = res.headers.get('content-length');
        const total = contentLength ? parseInt(contentLength, 10) : 0;
        let loaded = 0;

        const reader = res.body.getReader();
        return new Response(new ReadableStream({
          start(controller) {
            function pump() {
              return reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close();
                  return;
                }
                loaded += value.byteLength;
                if (total && loaderBar && loaderPercent) {
                  const pct = Math.min(100, Math.round((loaded / total) * 100));
                  loaderBar.style.width = pct + '%';
                  loaderPercent.textContent = pct + '%';
                }
                controller.enqueue(value);
                return pump();
              });
            }
            return pump();
          }
        })).blob();
      })
      .then(blob => {
        const blobUrl = URL.createObjectURL(blob);
        if (film) {
          film.src = blobUrl;
          film.load();
          film.addEventListener('loadedmetadata', onFilmMetadata, { once: true });
        }
      })
      .catch(() => {
        // Fallback to direct src if fetch is blocked
        if (film) {
          film.src = videoSrc;
          film.load();
          film.addEventListener('loadedmetadata', onFilmMetadata, { once: true });
        }
      });
  }

  function onFilmMetadata() {
    isFilmReady = true;
    film.currentTime = 0;
    film.pause();
    if (loaderBar) loaderBar.style.width = '100%';
    if (loaderPercent) loaderPercent.textContent = '100%';
    setTimeout(() => {
      if (loader) loader.classList.add('loaded');
    }, 200);
  }

  // Start blob preloading
  if (film) {
    loadFilmBlob();
  } else {
    setTimeout(() => {
      if (loader) loader.classList.add('loaded');
    }, 400);
  }

  // iOS / Mobile first-touch unlock for smooth scrubbing
  document.addEventListener('touchstart', () => {
    if (film) {
      film.play().then(() => film.pause()).catch(() => {});
    }
  }, { once: true });

  // ==========================================================================
  // THREE.JS 3D INTERACTIVE STAGE & REAL-TIME PARTICLES (Atmosphere & Lights)
  // ==========================================================================
  const canvas = document.getElementById('stage-3d');
  if (!canvas || typeof THREE === 'undefined') {
    console.warn('Three.js or stage-3d canvas not available.');
    return;
  }

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.085);

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(1.4, 0.2, 5.2);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  // --- Real-time Dynamic Lighting ---
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
  scene.add(ambientLight);

  // Moving Amber Specular Point Light (Follows Cursor)
  const cursorLight = new THREE.PointLight(0xff9a4d, 2.8, 12);
  cursorLight.position.set(2, 1, 3);
  scene.add(cursorLight);

  // Cyan / Cool Rim Light for Cinematic Contrast
  const rimLight = new THREE.PointLight(0x38bdf8, 1.8, 10);
  rimLight.position.set(-3, 2, -1);
  scene.add(rimLight);

  // Top Spotlight
  const topLight = new THREE.SpotLight(0xffffff, 1.5);
  topLight.position.set(0, 6, 4);
  topLight.angle = Math.PI / 4;
  topLight.penumbra = 0.8;
  scene.add(topLight);

  // Character group for camera target tracking
  const characterGroup = new THREE.Group();
  scene.add(characterGroup);
  let characterMesh = null;

  // --- Volumetric 3D Floating Particles ---
  const particleCount = 650;
  const particleGeo = new THREE.BufferGeometry();
  const particlePos = new Float32Array(particleCount * 3);
  const particleScales = new Float32Array(particleCount);

  for (let i = 0; i < particleCount * 3; i += 3) {
    particlePos[i] = (Math.random() - 0.5) * 14;
    particlePos[i + 1] = (Math.random() - 0.5) * 8;
    particlePos[i + 2] = (Math.random() - 0.5) * 10;
    particleScales[i / 3] = Math.random() * 0.8 + 0.2;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
  particleGeo.setAttribute('scale', new THREE.BufferAttribute(particleScales, 1));

  // Particle Shader Material with Amber Glow
  const particleMat = new THREE.PointsMaterial({
    color: 0xff9a4d,
    size: 0.045,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(particleGeo, particleMat);
  scene.add(particleSystem);

  // --- Mouse Movement & Gyro Tracking ---
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  }, { passive: true });

  // Mobile Device Orientation support
  window.addEventListener('deviceorientation', (e) => {
    if (e.gamma !== null && e.beta !== null) {
      targetMouseX = Math.min(1, Math.max(-1, e.gamma / 30));
      targetMouseY = Math.min(1, Math.max(-1, (e.beta - 45) / 30));
    }
  }, { passive: true });

  // --- Scroll Camera Navigation ---
  let scrollProgressVal = 0;
  const targetCamPos = new THREE.Vector3(1.4, 0.2, 5.2);
  const targetCharPos = new THREE.Vector3(1.1, 0, 0);

  window.addEventListener('scroll', onScroll, { passive: true });

  function onScroll() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;

    scrollProgressVal = Math.max(0, Math.min(1, window.scrollY / docHeight));
    if (scrollProgress) scrollProgress.style.width = (scrollProgressVal * 100) + '%';

    // Desktop: Shift film slightly right during intro so character stands right of intro text
    if (window.innerWidth > 760 && film) {
      if (scrollProgressVal < 0.16) {
        film.style.transform = 'scale(1) translateX(10vw)';
      } else {
        film.style.transform = 'scale(1) translateX(0vw)';
      }
    }

    // 6-Section Camera & Character Choreography in 3D Space
    if (scrollProgressVal < 0.16) {
      targetCamPos.set(1.4, 0.2, 5.2);
      targetCharPos.set(1.1, 0, 0);
      setActivePanel('intro');
    } else if (scrollProgressVal < 0.33) {
      targetCamPos.set(0.8, 0.3, 4.3);
      targetCharPos.set(0.9, -0.05, 0);
      setActivePanel('about');
    } else if (scrollProgressVal < 0.55) {
      targetCamPos.set(0, 0.5, 5.8);
      targetCharPos.set(0, -0.2, 0);
      setActivePanel('work');
    } else if (scrollProgressVal < 0.72) {
      targetCamPos.set(-0.9, 0.2, 4.8);
      targetCharPos.set(-1.1, 0, 0);
      setActivePanel('skills');
    } else if (scrollProgressVal < 0.88) {
      targetCamPos.set(0, 0.3, 5.0);
      targetCharPos.set(0, -0.1, 0);
      setActivePanel('resume');
    } else {
      targetCamPos.set(-1.2, 0.2, 5.2);
      targetCharPos.set(-1.65, -0.05, 0);
      setActivePanel('contact');
    }
  }

  function setActivePanel(sectionId) {
    panels.forEach(p => {
      if (p.getAttribute('data-section') === sectionId) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      if (href === sectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // --- Universal Anchor Click Smooth Scroll (Every button works reliably) ---
  const sectionProgressMap = {
    'intro': 0.0,
    'about': 0.22,
    'work': 0.45,
    'skills': 0.68,
    'resume': 0.84,
    'contact': 0.98
  };

  function scrollToSection(id) {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = sectionProgressMap[id] !== undefined ? sectionProgressMap[id] : 0;
    window.scrollTo({
      top: progress * docHeight,
      behavior: 'smooth'
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').replace('#', '');
      if (targetId) {
        scrollToSection(targetId);
      }
    });
  });

  // --- Window Resize ---
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // --- Main 60 FPS Render Loop ---
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsed = clock.getElapsedTime();

    // Cinematic Video Scroll-Scrubbing (Hardware-throttled seek)
    if (film && isFilmReady && !film.seeking) {
      const filmDur = film.duration || 36.67;
      targetFilmTime = scrollProgressVal * filmDur;
      const diff = targetFilmTime - currentFilmTime;
      if (Math.abs(diff) > 0.01) {
        currentFilmTime += diff * 0.25;
        film.currentTime = Math.max(0, Math.min(filmDur, currentFilmTime));
      }
    }

    // Smooth Mouse Coordinates Lerp (Inertia physics)
    mouseX += (targetMouseX - mouseX) * 0.08;
    mouseY += (targetMouseY - mouseY) * 0.08;

    // Move Cursor Point Light in 3D Space
    cursorLight.position.x = mouseX * 4 + 1;
    cursorLight.position.y = mouseY * 2.5 + 1;
    cursorLight.position.z = 2.5 + Math.sin(elapsed) * 0.3;

    // Interactive Head & Body 3D Rotation
    if (characterMesh) {
      // Smooth 3D tilt tracking the cursor
      characterMesh.rotation.y = mouseX * 0.22;
      characterMesh.rotation.x = -mouseY * 0.12;

      // Subtle lifelike breathing float
      characterMesh.position.y = targetCharPos.y + Math.sin(elapsed * 1.6) * 0.035;
      characterMesh.position.x += (targetCharPos.x - characterMesh.position.x) * 0.08;
    }

    // Camera Smooth Position Lerp
    camera.position.x += (targetCamPos.x + mouseX * 0.25 - camera.position.x) * 0.06;
    camera.position.y += (targetCamPos.y + mouseY * 0.2 - camera.position.y) * 0.06;
    camera.position.z += (targetCamPos.z - camera.position.z) * 0.06;
    camera.lookAt(characterGroup.position.x * 0.5, 0.1, 0);

    // Particle Swarm Orbit
    particleSystem.rotation.y = elapsed * 0.035;
    particleSystem.rotation.x = Math.sin(elapsed * 0.02) * 0.1;

    renderer.render(scene, camera);
  }

  animate();

  // ==========================================================================
  // 3D CARD TILT ON MOUSE HOVER (PHYSICS-BASED)
  // ==========================================================================
  function init3DCardTilt() {
    const cards = document.querySelectorAll('.project-card, .glass, .stat-item, .resume-sheet');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  // ==========================================================================
  // CONTENT INJECTION (NO GENERIC EMOJIS)
  // ==========================================================================
  function populateContent() {
    // Hero
    const heroRole = document.getElementById('hero-role');
    if (heroRole) heroRole.textContent = cfg.role;

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

    // Projects Spotlight Showcase with Interactive Tabs (Leaves laptop/desk 100% visible)
    const projectTabs = document.getElementById('project-tabs');
    const projectsDeck = document.getElementById('projects-deck');
    let activeProjectIdx = 0;

    function renderActiveProject(idx) {
      activeProjectIdx = idx;
      const p = cfg.projects[idx];
      const cleanAward = p.award.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim();

      if (projectTabs) {
        projectTabs.querySelectorAll('.project-tab').forEach((tab, i) => {
          if (i === idx) tab.classList.add('active');
          else tab.classList.remove('active');
        });
      }

      if (projectsDeck) {
        projectsDeck.innerHTML = `
          <article class="project-card spotlight-card">
            <div class="project-img-wrap" title="Click to zoom in">
              <img src="${p.image}" alt="${p.title}" class="project-img" loading="lazy">
              <span class="project-award">${cleanAward}</span>
              <div class="zoom-hint">Click image to zoom</div>
            </div>
            <div class="project-body">
              <div class="project-top-row">
                <h3 class="project-title">${p.title}</h3>
                <span class="project-badge">${p.tagline}</span>
              </div>
              <p class="project-desc">${p.desc}</p>
              <div class="project-tech">
                ${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
              </div>
              <div class="project-footer">
                <div class="project-links">
                  ${p.live ? `
                    <a href="${p.live}" target="_blank" rel="noreferrer" class="project-btn primary">
                      <span>Live Demo</span>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                    </a>
                  ` : ''}
                  <a href="${p.github}" target="_blank" rel="noreferrer" class="project-btn secondary">
                    <span>Source Code</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                  </a>
                </div>
                <div class="project-nav-buttons">
                  <button type="button" class="project-nav-btn" id="prev-project-btn" aria-label="Previous Project">←</button>
                  <span class="project-counter">${idx + 1} / ${cfg.projects.length}</span>
                  <button type="button" class="project-nav-btn" id="next-project-btn" aria-label="Next Project">→</button>
                </div>
              </div>
            </div>
          </article>
        `;

        // Image zoom click
        const imgWrap = projectsDeck.querySelector('.project-img-wrap');
        if (imgWrap) {
          imgWrap.addEventListener('click', () => {
            const lightbox = document.getElementById('image-lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            if (lightbox && lightboxImg) {
              lightboxImg.src = p.image;
              lightboxImg.alt = p.title;
              lightbox.classList.add('active');
            }
          });
        }

        // Prev / Next button click handlers
        const prevBtn = document.getElementById('prev-project-btn');
        const nextBtn = document.getElementById('next-project-btn');
        if (prevBtn) {
          prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const prev = (activeProjectIdx - 1 + cfg.projects.length) % cfg.projects.length;
            renderActiveProject(prev);
          });
        }
        if (nextBtn) {
          nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const next = (activeProjectIdx + 1) % cfg.projects.length;
            renderActiveProject(next);
          });
        }
      }
    }

    if (projectTabs && cfg.projects) {
      projectTabs.innerHTML = cfg.projects.map((p, i) => `
        <button type="button" class="project-tab ${i === 0 ? 'active' : ''}" data-idx="${i}">
          ${p.title.split(' ')[0]}
        </button>
      `).join('');

      projectTabs.querySelectorAll('.project-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
          e.preventDefault();
          const idx = parseInt(tab.getAttribute('data-idx'), 10);
          renderActiveProject(idx);
        });
      });
    }

    if (cfg.projects && cfg.projects.length > 0) {
      renderActiveProject(0);
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

    // Contact Links (Pure SVGs)
    const contactLinks = document.getElementById('contact-links');
    if (contactLinks && cfg.contact) {
      contactLinks.innerHTML = `
        <a href="mailto:${cfg.contact.email}" class="contact-pill">
          <svg class="contact-pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <span>${cfg.contact.email}</span>
        </a>
        <a href="${cfg.contact.linkedin}" target="_blank" rel="noreferrer" class="contact-pill">
          <svg class="contact-pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          <span>LinkedIn / abinivesh-m</span>
        </a>
        <a href="${cfg.contact.github}" target="_blank" rel="noreferrer" class="contact-pill">
          <svg class="contact-pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
          <span>GitHub / abinivesh-m</span>
        </a>
        <a href="${cfg.contact.leetcode}" target="_blank" rel="noreferrer" class="contact-pill">
          <svg class="contact-pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <span>LeetCode / Rating 1480 (113 Solved)</span>
        </a>
      `;
    }

    setTimeout(init3DCardTilt, 200);
    initImageLightbox();
  }

  function initImageLightbox() {
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');
    const backdrop = document.getElementById('lightbox-backdrop');

    if (!lightbox || !lightboxImg) return;

    document.querySelectorAll('.project-img-wrap').forEach(wrap => {
      wrap.setAttribute('title', 'Click to zoom in');
      wrap.addEventListener('click', () => {
        const img = wrap.querySelector('.project-img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || 'Project Preview';
          lightbox.classList.add('active');
          lightbox.setAttribute('aria-hidden', 'false');
        }
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (backdrop) backdrop.addEventListener('click', closeLightbox);
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

})();
