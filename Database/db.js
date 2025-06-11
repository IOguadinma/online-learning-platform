import sqlite3 from 'sqlite3';
sqlite3.verbose();

const db = new sqlite3.Database('./Database/learning-platform.db', (err) => {
  if (err) {
    console.error('❌ Could not connect to database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database');
  }
});

export default db;
