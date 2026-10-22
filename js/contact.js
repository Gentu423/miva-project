const f = document.getElementById('contactForm');
const rules = {
  name: v => v.trim() ? '' : 'Enter your name.',
  email: v => !v.trim() ? 'Enter your email address.' : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Enter a valid email, like name@example.com.',
  phone: v => !v.trim() ? 'Enter your phone number.' : /^\d+$/.test(v.trim()) ? '' : 'Use digits only, with no spaces, plus sign or dashes.',
  message: v => v.trim() ? '' : 'Write a short message.'
};
function check(field) {
  const el = f.elements[field], msg = rules[field](el.value);
  document.getElementById(field + 'Err').textContent = msg;
  el.setAttribute('aria-invalid', msg ? 'true' : 'false');
  return !msg;
}
const fields = Object.keys(rules);
fields.forEach(n => f.elements[n].addEventListener('blur', () => check(n)));
f.addEventListener('submit', e => {
  e.preventDefault();
  const ok = fields.map(n => check(n)).every(Boolean);
  const note = document.getElementById('ok');
  note.hidden = !ok;
  if (ok) f.reset();
});
