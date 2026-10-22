import { Pool } from "pg";

let pool: Pool | null = null;
let isInitialized = false;

export function getDbPool(): Pool {
  if (!pool) {
    const connectionString =
      process.env.DATABASE_URL ||
      "postgresql://postgres:root@localhost:5432/postgres";

    const isProduction = process.env.NODE_ENV === "production";
    const isRemote =
      connectionString.includes("amazonaws.com") ||
      connectionString.includes("sslmode=require");

    pool = new Pool({
      connectionString,
      ssl: isRemote || isProduction ? { rejectUnauthorized: false } : false,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  }
  return pool;
}

/**
 * Auto-initiates the database schema if not present.
 */
export async function ensureDbInitialized() {
  if (isInitialized) return;

  const p = getDbPool();
  try {
    await p.query(`
      CREATE TABLE IF NOT EXISTS student_progress (
        id VARCHAR(64) PRIMARY KEY,
        student_name VARCHAR(120),
        progress_percent INT NOT NULL DEFAULT 0,
        completed_topics INT NOT NULL DEFAULT 0,
        total_score NUMERIC(5, 1) NOT NULL DEFAULT 0,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_student_progress_percent 
        ON student_progress(progress_percent);
    `);
    isInitialized = true;
  } catch (error) {
    console.error("Failed to initialize database schema:", error);
  }
}
