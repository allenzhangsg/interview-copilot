import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db: Database | null = null;

export const initDatabase = async (): Promise<Database> => {
  if (db) return db;

  try {
    db = await open({
      filename: "db.sqlite",
      driver: sqlite3.Database,
    });
  } catch (error) {
    console.error("Failed to open database:", error);
    process.exit(1);
  }
  // init tables
  await db.exec(`
    CREATE TABLE IF NOT EXISTS profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      resume TEXT,
      user_story TEXT,
      glossary TEXT
    )
  `);

  return db;
};

export const getDb = (): Database => {
  if (!db) {
    throw new Error("Database not initialized. Call initDatabase first.");
  }
  return db;
};

export const insertProfile = async (profile: {
  resume: string;
  user_story: string;
  glossary: string;
}) => {
  const db = getDb();
  const { resume, user_story, glossary } = profile;
  const result = await db.run(
    "INSERT INTO profiles (resume, user_story, glossary) VALUES (?, ?, ?)",
    [resume, user_story, glossary]
  );
  return result.lastID;
};

export const fetchProfile = async (id: number) => {
  const db = getDb();
  return await db.get("SELECT * FROM profiles WHERE id = ?", id);
};
