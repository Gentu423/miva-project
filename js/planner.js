const form = document.getElementById('taskForm'), list = document.getElementById('taskList');
const count = document.getElementById('count'), empty = document.getElementById('empty'), err = document.getElementById('taskErr');
let tasks = [], filter = 'all';
try { tasks = JSON.parse(localStorage.getItem('tasks')) || []; } catch (e) { tasks = []; }
function save() { try { localStorage.setItem('tasks', JSON.stringify(tasks)); } catch (e) {} }

function render() {
  list.innerHTML = '';
  const shown = tasks.filter(t => filter === 'all' || (filter === 'done') === t.done);
  shown.forEach(t => {
    const li = document.createElement('li');
    if (t.done) li.className = 'done';
    const box = document.createElement('input');
    box.type = 'checkbox'; box.checked = t.done; box.setAttribute('aria-label', 'Mark "' + t.title + '" as completed');
    box.addEventListener('change', () => { t.done = box.checked; save(); render(); });
    const wrap = document.createElement('div'), name = document.createElement('span'), meta = document.createElement('small');
    name.textContent = t.title;
    meta.textContent = [t.course, t.due && 'Due ' + t.due].filter(Boolean).join(' | ');
    wrap.append(name, meta);
    const del = document.createElement('button');
    del.className = 'ghost'; del.textContent = 'Delete';
    del.addEventListener('click', () => { tasks = tasks.filter(x => x.id !== t.id); save(); render(); });
    li.append(box, wrap, del);
    list.append(li);
  });
  const open = tasks.filter(t => !t.done).length;
  count.textContent = open + ' open, ' + (tasks.length - open) + ' completed';
  empty.hidden = shown.length > 0;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('taskTitle').value.trim();
  if (!title) { err.textContent = 'Enter a task name before adding it.'; return; }
  err.textContent = '';
  tasks.unshift({ id: Date.now(), title, course: document.getElementById('course').value, due: document.getElementById('due').value, done: false });
  save(); form.reset(); render();
});

document.querySelectorAll('[data-filter]').forEach(btn => btn.addEventListener('click', () => {
  filter = btn.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(b => b.classList.toggle('on', b === btn));
  render();
}));
render();
