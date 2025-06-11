// ===== Import modules using ES Module syntax =====
import express from 'express';
import path from 'path';
import db from './Database/db.js'; // ✅ includes .js extension
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ===== Fix for __dirname (not available in ES Modules) =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ===== Initialize Express App =====
const app = express();
const PORT = 5000;

// ===== Set View Engine & View Path =====
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));

// ===== Middleware =====
app.use(express.static(path.join(__dirname, 'Public'))); // ✅ Serves CSS, JS, images, etc.
app.use(express.urlencoded({ extended: true })); // Parses POST form data

// ===== ROUTES =====

// Home Page
app.get('/', (req, res) => {
  res.render('index', { title: 'Online Learning Platform' });
});

// Courses
app.get('/courses', (req, res) => {
  db.all('SELECT * FROM courses', [], (err, rows) => {
    if (err) return res.status(500).send('Error loading courses');
    res.render('courses', { courses: rows });
  });
});

// Instructors
app.get('/instructors', (req, res) => {
  db.all('SELECT * FROM instructors', [], (err, rows) => {
    if (err) return res.status(500).send('Error loading instructors');
    res.render('instructors', { instructors: rows });
  });
});

// Schedules
app.get('/schedules', (req, res) => {
  db.all('SELECT * FROM schedule', [], (err, rows) => {
    if (err) return res.status(500).send('Error loading schedule');
    res.render('schedules', { schedule: rows });
  });
});

// FAQs
app.get('/faq', (req, res) => {
  db.all('SELECT * FROM faq', [], (err, rows) => {
    if (err) return res.status(500).send('Error loading FAQ');
    res.render('faq', { faqs: rows });
  });
});
// Contact Page - GET
app.get('/contact', (req, res) => {
  res.render('contact', {
    successMessage: null,
    errorMessage: null
  });
});

// Contact Form Submission - POST
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';

  db.run(sql, [name, email, message], (err) => {
    if (err) {
      console.error(err);
      return res.render('contact', {
        successMessage: null,
        errorMessage: '❌ Failed to save your message. Please try again.'
      });
    }

    res.render('contact', {
      successMessage: '✅ Message submitted successfully!',
      errorMessage: null
    });
  });
});

import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword' // Use environment variable in production!
  }
});

// ===== Start the Server =====
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
