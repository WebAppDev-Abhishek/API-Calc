const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// -------- User Route --------
app.post("/api/submit", (req, res) => {
  const { name1, name2 } = req.body;
  if (!name1 || !name2) {
    return res.status(400).json({ error: "Both names required" });
  }

  const result = Math.floor(Math.random() * (95 - 10 + 1)) + 10;
  const time = new Date().toISOString();

  db.run(
    `INSERT INTO submissions (name1, name2, result, time) VALUES (?, ?, ?, ?)`,
    [name1, name2, result, time],
    function (err) {
      if (err) {
        console.error("❌ Insert error:", err);
        return res.status(500).json({ error: "Database insert failed" });
      }
      res.json({ id: this.lastID, name1, name2, result, time });
    }
  );
});

// -------- Admin Route --------
app.get("/admin-api/history", (req, res) => {
  db.all(`SELECT * FROM submissions ORDER BY id DESC`, [], (err, rows) => {
    if (err) {
      console.error("❌ Select error:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json({ count: rows.length, submissions: rows });
  });
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running with SQLite on http://localhost:${PORT}`)
);
