// seedDatabase.js (ES Module version)
import sqlite3 from 'sqlite3';
sqlite3.verbose();

const db = new sqlite3.Database('./Database/learning-platform.db', (err) => {
  if (err) {
    console.error('❌ Could not connect to the database:', err.message);
  } else {
    console.log('✅ Connected to SQLite for seeding...');
  }
});

db.serialize(() => {
  // Courses Table
  db.run(`CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    instructor TEXT,
    duration TEXT
  )`);

  db.run(`INSERT INTO courses (name, instructor, duration) VALUES
    ('HTML & CSS Fundamentals', 'Alice Johnson', '4 weeks'),
    ('JavaScript Essentials', 'Bob Smith', '5 weeks'),
    ('Node.js & Express', 'Carol Lee', '6 weeks')`);

  // Instructors Table
  db.run(`CREATE TABLE IF NOT EXISTS instructors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    bio TEXT,
    subjects TEXT,
    email TEXT
  )`);

  db.run(`INSERT INTO instructors (name, bio, subjects, email) VALUES
    ('Alice Johnson', 'Front-end developer with 10 years experience.', 'HTML, CSS', 'alice@edu.com'),
    ('Bob Smith', 'JavaScript guru and open-source contributor.', 'JavaScript, React', 'bob@edu.com'),
    ('Carol Lee', 'Back-end expert in Node and Express.', 'Node.js, APIs', 'carol@edu.com')`);

  // Schedule Table
  db.run(`CREATE TABLE IF NOT EXISTS schedule (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    date TEXT,
    time TEXT,
    description TEXT
  )`);

  db.run(`INSERT INTO schedule (title, date, time, description) VALUES
    ('Live Q&A with Instructors', '2025-06-10', '18:00', 'Weekly Q&A every Wednesday.'),
    ('Guest Lecture: Web Technologies', '2025-06-15', '14:00', 'Industry expert discusses the future of web tech.')`);

  // FAQ Table
  db.run(`CREATE TABLE IF NOT EXISTS faq (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT,
    answer TEXT
  )`);

  db.run(`INSERT INTO faq (question, answer) VALUES
    ('How do I sign up?', 'Use the contact form to request course access.'),
    ('Are courses free?', 'Yes, all courses are completely free.'),
    ('Do I get a certificate?', 'Currently, no certificates are provided.')`);

  // Contact Table
  db.run(`CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    message TEXT,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

db.close(() => {
  console.log('✅ Database setup complete with sample data!');
});
