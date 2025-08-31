const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Use JSON parser
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const db = new sqlite3.Database("./data.db");

// Create logs table if it doesn't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name1 TEXT,
    name2 TEXT,
    result INTEGER,
    timestamp TEXT
  )`, () => {
    // Check if 'userToken' column exists
    db.all(`PRAGMA table_info(logs);`, (err, columns) => {
      if (err) return console.error(err);
      const hasUserToken = columns.some(col => col.name === "userToken");
      if (!hasUserToken) {
        console.log("Adding missing 'userToken' column...");
        db.run(`ALTER TABLE logs ADD COLUMN userToken TEXT;`);
      }
    });
  });
});

// Client submit endpoint
app.post("/api/client/submit", (req, res) => {
  const { name1, name2, userToken } = req.body;
  if (!name1 || !name2 || !userToken) {
    return res.status(400).json({ error: "Missing data" });
  }

  const result = Math.floor(Math.random() * 86) + 10;
  const timestamp = new Date().toLocaleString();

  db.run(
    `INSERT INTO logs (userToken, name1, name2, result, timestamp) VALUES (?,?,?,?,?)`,
    [userToken, name1, name2, result, timestamp],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ result });
      io.emit("newLog", { id: this.lastID, userToken, name1, name2, result, timestamp });
    }
  );
});

// Admin logs endpoint
app.get("/api/admin/logs", (req, res) => {
  db.all(`SELECT * FROM logs ORDER BY id DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ logs: rows, totalVisitors: rows.length });
  });
});

// Track active users
let activeUsers = 0;
io.on("connection", socket => {
  activeUsers++;
  io.emit("userCount", activeUsers);

  socket.on("disconnect", () => {
    activeUsers--;
    io.emit("userCount", activeUsers);
  });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
