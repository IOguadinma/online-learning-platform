import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Enable verbose mode for debugging
sqlite3.verbose();

// Open the database connection
const db = await open({
  filename: './Database/learning-platform.db',
  driver: sqlite3.Database
});

export default db;
