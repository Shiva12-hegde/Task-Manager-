const api = "http://localhost:5000/tasks";

function loadTasks() {
  fetch(api)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("taskList");
      list.innerHTML = "";
      data.forEach(task => {
        list.innerHTML += `
          <li>
            <b>${task.title}</b> - ${task.description} (${task.status})
            <button onclick="deleteTask(${task.id})">Delete</button>
          </li>
        `;
      });
    });
}

function addTask() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const status = document.getElementById("status").value;

  fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, status })
  }).then(() => {
    loadTasks();
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
  });
}

function deleteTask(id) {
  fetch(`${api}/${id}`, {
    method: "DELETE"
  }).then(() => loadTasks());
}

loadTasks();
