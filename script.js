document.addEventListener("DOMContentLoaded", loadTasks);

// Add task
document.getElementById('add-task-btn').addEventListener('click', function() {
  const taskInput = document.getElementById('new-task');
  const task = taskInput.value.trim();

  if (task) {
    addTaskToList(task);
    saveTaskToLocalStorage(task);
    taskInput.value = '';
  } else {
    alert('Please enter a task before adding!');
  }
});

// Add task to the DOM
function addTaskToList(task) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span class="task-text">${task}</span>
    <span>
      <i class="complete icon">✔️</i>
      <i class="delete icon">❌</i>
    </span>
  `;

  document.getElementById('todo-list').appendChild(li);
}

// Mark task as complete
document.getElementById('todo-list').addEventListener('click', function(e) {
  if (e.target.classList.contains('complete')) {
    const task = e.target.parentElement.previousElementSibling;
    task.classList.toggle('completed');
  }

  // Delete task
  if (e.target.classList.contains('delete')) {
    const taskItem = e.target.parentElement.parentElement;
    removeTaskFromLocalStorage(taskItem.firstChild.textContent);
    taskItem.remove();
  }
});

// Clear all tasks
document.getElementById('clear-btn').addEventListener('click', function() {
  document.getElementById('todo-list').innerHTML = '';
  localStorage.removeItem('tasks');
});

// Save tasks to local storage
function saveTaskToLocalStorage(task) {
  let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
  let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
  tasks.forEach(task => addTaskToList(task));
}

// Remove task from local storage
function removeTaskFromLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
