// Tier-1 Engineering Portfolio Logic & Dynamic Binding
(function() {
  'use strict';

  const cfg = window.CONFIG;
  if (!cfg) {
    console.error('config.js is missing!');
    return;
  }

  // --- Theme Toggle Engine (Light / Dark Mode) ---
  const htmlEl = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle');

  // Check saved preference or system default
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  setTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
    });
  }

  function setTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  // --- Footer Year ---
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --- Populate Projects ---
  const projectsGrid = document.getElementById('projects-grid');
  if (projectsGrid && cfg.projects) {
    projectsGrid.innerHTML = cfg.projects.map(p => `
      <article class="project-card">
        <div class="project-image-box">
          <img src="${p.image}" alt="${p.title}" class="project-image" loading="lazy">
          <span class="project-award-tag">${p.award}</span>
        </div>
        <div class="project-content">
          <h3 class="project-title">${p.title}</h3>
          <div class="project-tagline">${p.tagline}</div>
          <p class="project-desc">${p.desc}</p>
          <div class="project-tags">
            ${p.tech.map(t => `<span class="project-tag">${t}</span>`).join('')}
          </div>
          <div class="project-links-strip">
            ${p.live ? `
              <a href="${p.live}" target="_blank" rel="noreferrer" class="p-link">
                <span>Live System</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            ` : ''}
            <a href="${p.github}" target="_blank" rel="noreferrer" class="p-link">
              <span>Source Code</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>
          </div>
        </div>
      </article>
    `).join('');
  }

  // --- Populate Skills ---
  const skillsGrid = document.getElementById('skills-grid');
  if (skillsGrid && cfg.skills) {
    skillsGrid.innerHTML = Object.entries(cfg.skills).map(([category, items]) => `
      <div class="skill-category-card">
        <div class="skill-category-name">${category}</div>
        <div class="skill-chips-wrap">
          ${items.map(s => `<span class="chip">${s}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  // --- Populate Experience & Leadership ---
  const expList = document.getElementById('experience-list');
  if (expList && cfg.resume && cfg.resume.experience) {
    expList.innerHTML = cfg.resume.experience.map(e => `
      <div class="timeline-card">
        <div class="tl-role">${e.role}</div>
        <div class="tl-meta">${e.company} · ${e.period}</div>
        <p class="tl-desc">${e.desc}</p>
      </div>
    `).join('');
  }

  // --- Populate Education ---
  const eduList = document.getElementById('education-list');
  if (eduList && cfg.resume && cfg.resume.education) {
    eduList.innerHTML = cfg.resume.education.map(ed => `
      <div class="timeline-card">
        <div class="tl-role">${ed.degree}</div>
        <div class="tl-meta">${ed.institution} · ${ed.period}</div>
        <p class="tl-desc">${ed.details}</p>
      </div>
    `).join('');
  }

  // --- Populate Contact Channels ---
  const contactChannels = document.getElementById('contact-channels');
  if (contactChannels && cfg.contact) {
    contactChannels.innerHTML = `
      <a href="mailto:${cfg.contact.email}" class="contact-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        <span>${cfg.contact.email}</span>
      </a>
      <a href="${cfg.contact.linkedin}" target="_blank" rel="noreferrer" class="contact-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
        <span>LinkedIn</span>
      </a>
      <a href="${cfg.contact.github}" target="_blank" rel="noreferrer" class="contact-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
        <span>GitHub</span>
      </a>
      <a href="${cfg.contact.leetcode}" target="_blank" rel="noreferrer" class="contact-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        <span>LeetCode</span>
      </a>
    `;
  }

})();
