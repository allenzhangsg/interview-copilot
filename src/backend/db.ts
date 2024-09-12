import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let db: Database | null = null;

export const initDatabase = async (): Promise<Database> => {
  if (db) return db;

  db = await open({
    filename: 'db.sqlite',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      bio TEXT
    )
  `);

  return db;
};

export const getDb = (): Database => {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase first.');
  }
  return db;
};

export const insertProfile = async (profile: { name: string; email: string; bio: string }) => {
  const db = getDb();
  const { name, email, bio } = profile;
  const result = await db.run(
    'INSERT INTO profiles (name, email, bio) VALUES (?, ?, ?)',
    [name, email, bio]
  );
  return result.lastID;
};

export const fetchProfile = async (id: number) => {
  const db = getDb();
  return await db.get('SELECT * FROM profiles WHERE id = ?', id);
};
