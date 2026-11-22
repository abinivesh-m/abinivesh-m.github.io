const cfg = window.CONFIG;
const SEGMENTS = [
  { id: 'intro', t: [0, 7.6], h: 100 },
  { id: 'about', t: [7.6, 14.6], h: 100 },
  { id: 'work', t: [14.6, 26.5], h: 100 },
  { id: 'skills', t: [26.5, 37.5], h: 100 },
  { id: 'resume', t: [37.5, 42.3], h: 100 },
  { id: 'contact', t: [42.3, 46], h: 100 },
];

const video = document.getElementById('film');
const panels = document.querySelectorAll('.panel');
const progressFill = document.getElementById('progress-fill');
let isSeeking = false;
let lastTime = 0;

function scrollToTime(y, max) {
  const p = Math.min(1, Math.max(0, y / max));
  return p * 46;
}

function timeToScroll(t) {
  return (t / 46) * document.documentElement.scrollHeight;
}

function updateUI() {
  const scrollY = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const t = scrollToTime(scrollY, maxScroll);
  const pct = (scrollY / maxScroll) * 100;
  progressFill.style.width = pct + '%';

  if (isSeeking) return;

  const seg = SEGMENTS.find(s => t >= s.t[0] && t <= s.t[1]);
  if (!seg) return;

  panels.forEach(p => {
    p.classList.toggle('visible', p.id === seg.id);
  });

  if (!isSeeking && Math.abs(t - lastTime) > 0.02) {
    video.currentTime = t;
    lastTime = t;
  }
}

video.addEventListener('timeupdate', () => {
  if (isSeeking) return;
  const t = video.currentTime;
  const scrollY = timeToScroll(t);
  window.scrollTo(0, scrollY);
});

window.addEventListener('scroll', () => {
  if (isSeeking) return;
  updateUI();
});

video.addEventListener('click', () => {
  if (video.paused) video.play();
  else video.pause();
});

window.addEventListener('load', () => {
  document.getElementById('loader').classList.add('loader-hidden');
  video.play().catch(() => {});
});