// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks on page load
tasks.forEach(task => renderTask(task));

// Add new task on form submit
const form = document.querySelector("#new-task-form");
form.addEventListener("submit", e => {
  e.preventDefault();
  const taskInput = document.querySelector("#new-task-input");
  const task = { text: taskInput.value };
  tasks.push(task);
  renderTask(task);
  saveTasks();
  taskInput.value = "";
});

// Render a task element and attach event listeners
function renderTask(task) {
  const taskEl = document.createElement("div");
  taskEl.classList.add("task");
  const taskContentEl = document.createElement("div");
  taskContentEl.classList.add("content");
  taskEl.appendChild(taskContentEl);
  const taskInputEl = document.createElement("input");
  taskInputEl.classList.add("text");
  taskInputEl.type = "text";
  taskInputEl.value = task.text;
  taskInputEl.setAttribute("readonly", "readonly");
  taskContentEl.appendChild(taskInputEl);
  const taskActionsEl = document.createElement("div");
  taskActionsEl.classList.add("actions");
  const taskEditEl = document.createElement("button");
  taskEditEl.classList.add("edit");
  taskEditEl.innerText = "Edit";
  const taskDeleteEl = document.createElement("button");
  taskDeleteEl.classList.add("delete");
  taskDeleteEl.innerText = "Delete";
  taskActionsEl.appendChild(taskEditEl);
  taskActionsEl.appendChild(taskDeleteEl);
  taskEl.appendChild(taskActionsEl);
  const taskListEl = document.querySelector("#tasks");
  taskListEl.appendChild(taskEl);
  taskEditEl.addEventListener("click", e => {
    if (taskEditEl.innerText.toLowerCase() == "edit") {
      taskEditEl.innerText = "Save";
      taskInputEl.removeAttribute("readonly");
      taskInputEl.focus();
    } else {
      taskEditEl.innerText = "Edit";
      taskInputEl.setAttribute("readonly", "readonly");
      task.text = taskInputEl.value;
      saveTasks();
    }
  });
  taskDeleteEl.addEventListener("click", e => {
    taskListEl.removeChild(taskEl);
    tasks = tasks.filter(t => t !== task);
    saveTasks();
  });
}

// Save tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
