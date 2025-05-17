const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const clearCompletedBtn = document.getElementById('btn-clear-completed');
const filterButtons = document.querySelectorAll('.filter-buttons button');
const themeToggleBtn = document.querySelector('.theme-toggle-btn');
const body = document.body;

let tasks = [];
let currentFilter = 'all';

taskForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ id: Date.now(), text: text, completed: false });
    taskInput.value = '';
    renderTasks();
  }
});

taskList.addEventListener('click', function (e) {
  const li = e.target.closest('li');
  if (!li) return;
  const id = Number(li.dataset.id);

  if (e.target.classList.contains('check-btn')) {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        tasks[i].completed = !tasks[i].completed;
        break;
      }
    }
  }

  if (e.target.classList.contains('remove-btn')) {
    tasks = tasks.filter(task => task.id !== id);
  }

  renderTasks();
});

filterButtons.forEach(button => {
  button.addEventListener('click', function () {
    currentFilter = this.textContent.toLowerCase();
    filterButtons.forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
    renderTasks();
  });
});

clearCompletedBtn.addEventListener('click', function () {
  tasks = tasks.filter(task => !task.completed);
  renderTasks();
});

themeToggleBtn.addEventListener('click', function () {
  body.classList.toggle('theme-dark');
  body.classList.toggle('theme-light');
  const icon = themeToggleBtn.querySelector('img');
  icon.src = body.classList.contains('theme-dark')
    ? 'images/icon-sun.svg'
    : 'images/icon-moon.svg';
});

function renderTasks() {
  taskList.innerHTML = '';

  const filtered = tasks.filter(function (task) {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'active') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
  });

  filtered.forEach(task => {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    if (task.completed) {
      li.classList.add('completed');
    }

    li.innerHTML =
      '<span class="check-btn"></span>' +
      '<span class="task-text">' + task.text + '</span>' +
      '<span class="remove-btn"></span>';

    taskList.appendChild(li);
  });

  const count = tasks.filter(task => !task.completed).length;
  taskCount.textContent = count + ' item' + (count !== 1 ? 's' : '') + ' left';
}