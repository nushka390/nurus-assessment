const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const itemsCounter = document.getElementById('items-count');
const clearCompletedButton = document.getElementById('clear-completed-btn');
const filterButtons = document.querySelectorAll('.filter-buttons button');
const themeToggleButton = document.querySelector('.theme-toggle-btn');
const pageBody = document.body;

let todos = [];
let activeFilter = 'all';

// Handle form submission for new todos
todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const taskText = todoInput.value.trim();
  
  if (taskText) {
    todos.push({
      id: Date.now(),
      text: taskText,
      completed: false
    });
    todoInput.value = '';
    renderTodoList();
  }
});

// Handle todo list interactions
todoList.addEventListener('click', (event) => {
  const listItem = event.target.closest('li');
  if (!listItem) return;
  
  const todoId = Number(listItem.dataset.id);

  // Toggle completion status
  if (event.target.classList.contains('check-btn')) {
    const todo = todos.find(item => item.id === todoId);
    if (todo) todo.completed = !todo.completed;
  }

  // Remove todo item
  if (event.target.classList.contains('remove-btn')) {
    todos = todos.filter(item => item.id !== todoId);
  }

  renderTodoList();
});

// Set up filter buttons
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    activeFilter = button.textContent.toLowerCase();
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    renderTodoList();
  });
});

// Clear completed todos
clearCompletedButton.addEventListener('click', () => {
  todos = todos.filter(todo => !todo.completed);
  renderTodoList();
});

// Toggle between light/dark theme
themeToggleButton.addEventListener('click', () => {
  pageBody.classList.toggle('theme-dark');
  pageBody.classList.toggle('theme-light');
  
  const themeIcon = themeToggleButton.querySelector('img');
  themeIcon.src = pageBody.classList.contains('theme-dark')
    ? 'images/icon-sun.svg'
    : 'images/icon-moon.svg';
});

// Render the todo list based on current filter
function renderTodoList() {
  todoList.innerHTML = '';

  const filteredTodos = todos.filter(todo => {
    switch (activeFilter) {
      case 'active': return !todo.completed;
      case 'completed': return todo.completed;
      default: return true;
    }
  });

  filteredTodos.forEach(todo => {
    const listItem = document.createElement('li');
    listItem.dataset.id = todo.id;
    
    if (todo.completed) {
      listItem.classList.add('completed');
    }

    listItem.innerHTML = `
      <span class="check-btn"></span>
      <span class="task-text">${todo.text}</span>
      <span class="remove-btn"></span>
    `;

    todoList.appendChild(listItem);
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  itemsCounter.textContent = `${activeTodosCount} item${activeTodosCount !== 1 ? 's' : ''} left`;
}
