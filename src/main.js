document.addEventListener("DOMContentLoaded", () => {
  const  todoInput = document.getElementById('todo-input');
  const addTaskBtn = document.getElementById('add-task-btn');
  const todoList = document.getElementById('todo-list');
  
  let tasks = JSON.parse(localStorage.getItem("task")) || [];
    tasks.forEach(task => renderTasks(task));
    
    function addTask() {
      const taskText=todoInput.value.trim();
    if (taskText === "") return;
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed:false
    }
    tasks.push(newTask);
    saveTasks();
    renderTasks(newTask); 
    todoInput.value = "";
  }
  addTaskBtn.addEventListener('click', addTask);
  todoInput.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });
    
    function renderTasks(task) {
      const li = document.createElement('li');
      li.setAttribute("data-id", task.id);
      li.className = "flex items-center justify-between bg-gray-800 hover:bg-gray-700 rounded p-4 mb-3 text-white transition duration-200 mb-2";
      const span = document.createElement('span');
    span.className = `flex-1 cursor-pointer ${task.completed ? 'line-through text-gray-400' : ''}`;
    span.textContent = task.text;
  
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.className = "mr-4";
  
    const button = document.createElement('button');
    button.textContent = 'Delete';
      button.className = "ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer";
      
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(button);
    todoList.appendChild(li);
  
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      span.classList.toggle("line-through", task.completed);
      span.classList.toggle("text-gray-400", task.completed);
      saveTasks();
    });
  
      button.addEventListener("click", (e) => {
        e.preventDefault();
        tasks = tasks.filter(t => t.id !== task.id);
        li.remove();
        saveTasks();
  
      });
     
    }
    
    
    function saveTasks() {
      localStorage.setItem('task',JSON.stringify(tasks))
    }
  })
  