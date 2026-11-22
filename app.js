const SEGMENTS = [
  { id: 'intro', t: [0, 7.6] },
  { id: 'about', t: [7.6, 14.6] },
  { id: 'work', t: [14.6, 26.5] },
  { id: 'skills', t: [26.5, 37.5] },
  { id: 'resume', t: [37.5, 42.3] },
  { id: 'contact', t: [42.3, 46] },
];

const panels = document.querySelectorAll('.panel');
const progressFill = document.getElementById('progress-fill');

function updateUI() {
  const scrollY = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll <= 0) return;
  const t = Math.min(46, (scrollY / maxScroll) * 46);
  const pct = (scrollY / maxScroll) * 100;
  progressFill.style.width = pct + '%';

  const seg = SEGMENTS.find(s => t >= s.t[0] && t <= s.t[1]);
  if (!seg) return;

  panels.forEach(p => {
    p.classList.toggle('visible', p.id === seg.id);
  });
}

window.addEventListener('scroll', updateUI, { passive: true });

window.addEventListener('load', () => {
  document.getElementById('loader').classList.add('loader-hidden');
  updateUI();
});

updateUI();