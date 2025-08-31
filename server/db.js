const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const DB_PATH = path.join(__dirname, "data.db");

// Connect to SQLite database (creates file if not exists)
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("❌ Could not connect to SQLite", err);
  } else {
    console.log("✅ Connected to SQLite database");
  }
});

// Create table if not exists
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name1 TEXT NOT NULL,
      name2 TEXT NOT NULL,
      result INTEGER NOT NULL,
      time TEXT NOT NULL
    )
  `);
});

module.exports = db;
