const root = document.documentElement;
try { const saved = localStorage.getItem('theme'); if (saved) root.dataset.theme = saved; } catch (e) {}
const themeBtn = document.getElementById('theme');
function themeLabel() { themeBtn.textContent = root.dataset.theme === 'light' ? 'Day shift' : 'Night shift'; }
themeBtn.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
  try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  themeLabel();
});
themeLabel();

const nav = document.getElementById('nav'), menuBtn = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});

const typed = document.getElementById('typed');
if (typed && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const roles = ['cybersecurity student', 'financial analyst', 'web developer', 'video editor and designer'];
  let r = 0, c = 0, erasing = false;
  function type() {
    const word = roles[r];
    typed.textContent = word.slice(0, c);
    if (!erasing && c < word.length) { c++; setTimeout(type, 70); }
    else if (!erasing) { erasing = true; setTimeout(type, 1400); }
    else if (c > 0) { c--; setTimeout(type, 35); }
    else { erasing = false; r = (r + 1) % roles.length; setTimeout(type, 250); }
  }
  type();
}

const projects = [
  { title: 'Financial Analysis: A Connoisseur of Directional Bias in the Market', img: 'market',
    text: 'A market study built around directional bias: reading price action, structure and sentiment to decide whether to lean long or short, and when to stay out.',
    tags: ['Markets', 'Analysis', 'Risk'], link: 'https://github.com/Gentu423' },
  { title: 'Cybersecurity Learning Lab', img: 'cyber',
    text: 'Notes and hands-on exercises from my course: common threats, network defence and secure habits for everyday users and small businesses.',
    tags: ['Security', 'Networks', 'Practice'], link: 'https://github.com/Gentu423' },
  { title: 'Brand and Video Studio', img: 'design',
    text: 'Logos, graphics and short edited videos for businesses, built around one clear identity.',
    tags: ['Design', 'Video', 'Branding'], link: 'https://github.com/Gentu423' }
];
const grid = document.getElementById('grid');
if (grid) {
  projects.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `<img src="assets/project-${p.img}.svg" alt="Illustration for ${p.title}" loading="lazy">
      <div><h3>${p.title}</h3><p>${p.text}</p>
      <ul class="tags">${p.tags.map(t => `<li>${t}</li>`).join('')}</ul>
      <a href="${p.link}" target="_blank" rel="noopener">View on GitHub</a></div>`;
    grid.appendChild(card);
  });
}
