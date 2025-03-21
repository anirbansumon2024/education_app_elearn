// router.js
const express = require('express');
const { db } = require('./Database'); // Database.js থেকে db ইম্পোর্ট

const router = express.Router();

// -----------------------------------
// Main Subject Routes
// -----------------------------------

// GET - সমস্ত মেইন সাব্জেক্ট দেখানো
router.get('/subjects', (req, res) => {
  db.all("SELECT * FROM main_subject", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ subjects: rows });
  });
});

// POST - নতুন মেইন সাব্জেক্ট যোগ করা
router.post('/subjects', (req, res) => {
  const { subject_name, subject_logo, subject_code, subject_rel_date } = req.body;
  const stmt = db.prepare("INSERT INTO main_subject (subject_name, subject_logo, subject_code, subject_rel_date) VALUES (?, ?, ?, ?)");
  stmt.run(subject_name, subject_logo, subject_code, subject_rel_date, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID, subject_name, subject_code });
  });
});

// -----------------------------------
// Subject Category Routes
// -----------------------------------

// GET - একটি সাব্জেক্টের সমস্ত ক্যাটাগরি দেখানো
router.get('/subject-categories/:subject_id', (req, res) => {
  const { subject_id } = req.params;
  db.all("SELECT * FROM subject_category WHERE subject_id = ?", [subject_id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ categories: rows });
  });
});

// POST - নতুন সাব্জেক্ট ক্যাটাগরি যোগ করা
router.post('/subject-categories', (req, res) => {
  const { category_name, subject_id } = req.body;
  const stmt = db.prepare("INSERT INTO subject_category (category_name, subject_id) VALUES (?, ?)");
  stmt.run(category_name, subject_id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID, category_name, subject_id });
  });
});

// -----------------------------------
// Chapter Routes
// -----------------------------------

// GET - একটি সাব্জেক্টের সমস্ত চ্যাপ্টার দেখানো
router.get('/chapters/:subject_code', (req, res) => {
  const { subject_code } = req.params;
  db.all("SELECT * FROM chapter WHERE subject_code = ?", [subject_code], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ chapters: rows });
  });
});

// POST - নতুন চ্যাপ্টার যোগ করা
router.post('/chapters', (req, res) => {
  const { chapter_title, subject_code, chapter_code } = req.body;
  const stmt = db.prepare("INSERT INTO chapter (chapter_title, subject_code, chapter_code) VALUES (?, ?, ?)");
  stmt.run(chapter_title, subject_code, chapter_code, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID, chapter_title, subject_code });
  });
});

// -----------------------------------
// Question Routes
// -----------------------------------

// GET - একটি চ্যাপ্টারের সমস্ত প্রশ্ন দেখানো
router.get('/questions/:chapter_id', (req, res) => {
  const { chapter_id } = req.params;
  db.all("SELECT * FROM question WHERE chapter_id = ?", [chapter_id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ questions: rows });
  });
});

// POST - নতুন প্রশ্ন যোগ করা
router.post('/questions', (req, res) => {
  const { question, answer, chapter_id } = req.body;
  const stmt = db.prepare("INSERT INTO question (question, answer, chapter_id) VALUES (?, ?, ?)");
  stmt.run(question, answer, chapter_id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID, question, answer });
  });
});

module.exports = router;
