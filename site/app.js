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

  let loadProgress = 0;
  const loadInterval = setInterval(() => {
    loadProgress += Math.floor(Math.random() * 20) + 15;
    if (loadProgress >= 100) {
      loadProgress = 100;
      clearInterval(loadInterval);
      setTimeout(() => {
        loader.classList.add('loaded');
      }, 350);
    }
    if (loaderBar) loaderBar.style.width = loadProgress + '%';
    if (loaderPercent) loaderPercent.textContent = loadProgress + '%';
  }, 80);

  // --- Populate DOM Content with ZERO Emojis ---
  populateContent();

  // ==========================================================================
  // CINEMATIC SCROLL-SCRUBBING FILM ENGINE (All intra-keyframes -g 1)
  // ==========================================================================
  const film = document.getElementById('film');
  let targetFilmTime = 0;
  let currentFilmTime = 0;
  let isFilmReady = false;

  if (film) {
    const initFilm = () => {
      isFilmReady = true;
      film.currentTime = 0;
      film.pause();
      if (characterMesh) {
        characterMesh.visible = false;
      }
    };
    film.addEventListener('loadedmetadata', initFilm);
    film.addEventListener('canplay', initFilm);
    if (film.readyState >= 1) initFilm();
  }

  // ==========================================================================
  // THREE.JS 3D INTERACTIVE STAGE & REAL-TIME PARTICLES
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

  // --- 3D Character Plane ---
  const textureLoader = new THREE.TextureLoader();
  let characterMesh = null;
  const characterGroup = new THREE.Group();
  scene.add(characterGroup);

  textureLoader.load('media/character_cutout.png', (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;

    // Aspect ratio calculation (cutout is ~1000x1500)
    const aspect = tex.image.width / tex.image.height;
    const height = 3.6;
    const width = height * aspect;

    const geo = new THREE.PlaneGeometry(width, height, 32, 32);
    const mat = new THREE.MeshStandardMaterial({
      map: tex,
      transparent: true,
      roughness: 0.25,
      metalness: 0.1,
      side: THREE.DoubleSide
    });

    characterMesh = new THREE.Mesh(geo, mat);
    characterMesh.position.set(0, -0.15, 0);
    characterGroup.add(characterMesh);
  }, undefined, () => {
    // Fallback to portrait.png if cutout not loaded
    textureLoader.load('media/portrait.png', (tex) => {
      const geo = new THREE.PlaneGeometry(2.4, 3.6);
      const mat = new THREE.MeshStandardMaterial({ map: tex, transparent: true, roughness: 0.3 });
      characterMesh = new THREE.Mesh(geo, mat);
      characterGroup.add(characterMesh);
    });
  });

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

    // 6-Section Camera & Character Choreography in 3D Space
    if (scrollProgressVal < 0.16) {
      // 01: INTRO (Character stands right, camera looks at torso)
      targetCamPos.set(1.4, 0.2, 5.2);
      targetCharPos.set(1.1, 0, 0);
      setActivePanel('intro');
    } else if (scrollProgressVal < 0.33) {
      // 02: ABOUT (Camera zooms in smoothly for an intimate perspective)
      targetCamPos.set(0.8, 0.3, 4.3);
      targetCharPos.set(0.9, -0.05, 0);
      setActivePanel('about');
    } else if (scrollProgressVal < 0.55) {
      // 03: WORK (Camera elevates and pulls back; character centers at desk level)
      targetCamPos.set(0, 0.5, 5.8);
      targetCharPos.set(0, -0.2, 0);
      setActivePanel('work');
    } else if (scrollProgressVal < 0.72) {
      // 04: SKILLS (Character shifts left to showcase floating skills on the right)
      targetCamPos.set(-0.9, 0.2, 4.8);
      targetCharPos.set(-1.1, 0, 0);
      setActivePanel('skills');
    } else if (scrollProgressVal < 0.88) {
      // 05: RÉSUMÉ (Camera centers with dramatic depth)
      targetCamPos.set(0, 0.3, 5.0);
      targetCharPos.set(0, -0.1, 0);
      setActivePanel('resume');
    } else {
      // 06: CONTACT (Character positioned gracefully on left, contact sheet on right)
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

  // --- Nav Click Smooth Scroll ---
  navLinks.forEach((link, idx) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const targetScroll = (idx / (navLinks.length - 1)) * docHeight;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
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

    // Cinematic Video Scroll-Scrubbing (60 FPS Intra-Keyframe Seek)
    if (film && isFilmReady) {
      const filmDur = film.duration || 40.12;
      targetFilmTime = scrollProgressVal * filmDur;
      const diff = targetFilmTime - currentFilmTime;
      if (Math.abs(diff) > 0.003) {
        currentFilmTime += diff * 0.28;
        film.currentTime = Math.max(0, Math.min(filmDur, currentFilmTime));
      }
      if (characterMesh && characterMesh.visible) {
        characterMesh.visible = false;
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

    // Projects (Clean SVGs, no emojis)
    const projectsDeck = document.getElementById('projects-deck');
    if (projectsDeck && cfg.projects) {
      projectsDeck.innerHTML = cfg.projects.map(p => {
        // Strip any emojis from award string
        const cleanAward = p.award.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim();

        return `
          <article class="project-card">
            <div class="project-img-wrap">
              <img src="${p.image}" alt="${p.title}" class="project-img" loading="lazy">
              <span class="project-award">${cleanAward}</span>
            </div>
            <div class="project-body">
              <h3 class="project-title">${p.title}</h3>
              <div class="project-tagline">${p.tagline}</div>
              <p class="project-desc">${p.desc}</p>
              <div class="project-tech">
                ${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
              </div>
              <div class="project-links">
                ${p.live ? `
                  <a href="${p.live}" target="_blank" rel="noreferrer" class="project-link">
                    <span>Live Demo</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                  </a>
                ` : ''}
                <a href="${p.github}" target="_blank" rel="noreferrer" class="project-link">
                  <span>Source Code</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                </a>
              </div>
            </div>
          </article>
        `;
      }).join('');
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
