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
      glossary TEXT,
      last_edited DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS careers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company_name TEXT,
      job_description TEXT,
      last_edited DATETIME DEFAULT CURRENT_TIMESTAMP
    );
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
    "INSERT INTO profiles (resume, user_story, glossary, last_edited) VALUES (?, ?, ?, CURRENT_TIMESTAMP)",
    [resume, user_story, glossary]
  );
  return result.lastID;
};

export const fetchProfile = async (id: number) => {
  const db = getDb();
  return await db.get("SELECT * FROM profiles WHERE id = ?", id);
};
export const getLastInsertedProfile = async () => {
  const db = getDb();
  const result = await db.get(
    "SELECT id, resume, user_story, glossary, last_edited FROM profiles ORDER BY id DESC LIMIT 1"
  );
  return result;
};

export const removeAllProfiles = async () => {
  const db = getDb();
  await db.exec("DELETE FROM profiles");
};

export const insertCareer = async (career: {
  company_name: string;
  job_description: string;
}) => {
  const db = getDb();
  const { company_name, job_description } = career;
  const result = await db.run(
    "INSERT INTO careers (company_name, job_description, last_edited) VALUES (?, ?, CURRENT_TIMESTAMP)",
    [company_name, job_description]
  );
  return result.lastID;
};

export const getLastInsertedCareer = async () => {
  const db = getDb();
  const result = await db.get(
    "SELECT id, company_name, job_description, last_edited FROM careers ORDER BY id DESC LIMIT 1"
  );
  return result;
};

export const removeAllCareers = async () => {
  const db = getDb();
  await db.run("DELETE FROM careers");
};
