// Database.js
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./education.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// ডেটাবেজে টেবিল তৈরি করা (IF NOT EXISTS)
const createTables = () => {
  db.serialize(() => {
    // Main Subject Table
    db.run(`CREATE TABLE IF NOT EXISTS main_subject (
      subject_id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject_name TEXT NOT NULL,
      subject_logo TEXT,
      subject_code TEXT UNIQUE,
      subject_rel_date TEXT
    )`);

    // Subject Category Table
    db.run(`CREATE TABLE IF NOT EXISTS subject_category (
      category_id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_name TEXT NOT NULL,
      subject_id INTEGER,
      FOREIGN KEY (subject_id) REFERENCES main_subject (subject_id)
    )`);

    // Chapter Table
    db.run(`CREATE TABLE IF NOT EXISTS chapter (
      chapter_id INTEGER PRIMARY KEY AUTOINCREMENT,
      chapter_title TEXT NOT NULL,
      subject_code TEXT,
      chapter_code TEXT UNIQUE,
      FOREIGN KEY (subject_code) REFERENCES main_subject (subject_code)
    )`);

    // Question Table
    db.run(`CREATE TABLE IF NOT EXISTS question (
      question_id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      chapter_id INTEGER,
      create_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (chapter_id) REFERENCES chapter (chapter_id)
    )`);
  });
};

module.exports = { db, createTables };
