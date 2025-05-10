// Store tasks in an array
let tasks = [];

// Function to add a task
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const dueDate = document.getElementById('taskDueDate');
  
  const taskText = taskInput.value;
  const taskDate = dueDate.value;

  if (!taskText || !taskDate) {
    alert("Please enter both a task and a due date.");
    return;
  }

  // Create task object
  const task = {
    text: taskText,
    dueDate: taskDate,
    completed: false
  };

  // Add task to array
  tasks.push(task);

  // Update task list
  renderTasks();
  
  // Clear input fields
  taskInput.value = '';
  dueDate.value = '';
}

// Function to render tasks
function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTaskCompletion(index));

    // Task text
    const span = document.createElement('span');
    span.textContent = `${task.text} (Due: ${task.dueDate})`;

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.onclick = () => deleteTask(index);

    // Append elements to the list item
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    // Append list item to task list
    taskList.appendChild(li);
  });

  // Update progress bar
  updateProgress();
}

// Function to toggle task completion
function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Function to search tasks
function searchTasks() {
  const searchQuery = document.getElementById('search').value.toLowerCase();
  const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(searchQuery));
  renderFilteredTasks(filteredTasks);
}

// Function to render filtered tasks
function renderFilteredTasks(filteredTasks) {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTaskCompletion(index));

    // Task text
    const span = document.createElement('span');
    span.textContent = `${task.text} (Due: ${task.dueDate})`;

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.onclick = () => deleteTask(index);

    // Append elements to the list item
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    // Append list item to task list
    taskList.appendChild(li);
  });

  // Update progress bar
  updateProgress();
}

// Function to sort tasks
function sortTasks(criteria) {
  if (criteria === 'date') {
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  } else if (criteria === 'alphabet') {
    tasks.sort((a, b) => a.text.localeCompare(b.text));
  }
  renderTasks();
}

// Function to clear all tasks
function clearAllTasks() {
  tasks = [];
  renderTasks();
}

// Function to update the progress bar
function updateProgress() {
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  document.getElementById('progressBar').value = progress;
  document.getElementById('progressText').textContent = `Progress: ${Math.round(progress)}%`;
}
