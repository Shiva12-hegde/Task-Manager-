const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Alone@123",
  database: "taskdb"
});

db.connect(err => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// Create task
app.post("/tasks", (req, res) => {
  const { title, description, status } = req.body;
  const sql = "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)";
  db.query(sql, [title, description, status], (err) => {
    if (err) return res.send(err);
    res.send("Task added");
  });
});

// Get tasks
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

// Update task
app.put("/tasks/:id", (req, res) => {
  const { title, description, status } = req.body;
  const id = req.params.id;
  const sql = "UPDATE tasks SET title=?, description=?, status=? WHERE id=?";
  db.query(sql, [title, description, status, id], (err) => {
    if (err) return res.send(err);
    res.send("Task updated");
  });
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM tasks WHERE id=?", [id], (err) => {
    if (err) return res.send(err);
    res.send("Task deleted");
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
