import { Pool } from "pg";

let pool: Pool | null = null;
let isInitialized = false;

export function getDbPool(): Pool {
  if (!pool) {
    const connectionString =
      process.env.DATABASE_URL ||
      "postgresql://postgres:root@localhost:5432/postgres";

    const isLocalhost =
      connectionString.includes("localhost") ||
      connectionString.includes("127.0.0.1") ||
      connectionString.includes("::1");

    const isRemote =
      connectionString.includes("amazonaws.com") ||
      connectionString.includes("rds.amazonaws.com") ||
      connectionString.includes("sslmode=require") ||
      (!isLocalhost && process.env.NODE_ENV === "production");

    pool = new Pool({
      connectionString,
      ssl: isRemote && !isLocalhost ? { rejectUnauthorized: false } : false,
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
    // 1. Existing student_progress table preserved with zero data loss
    await p.query(`
      CREATE TABLE IF NOT EXISTS student_progress (
        id VARCHAR(64) PRIMARY KEY,
        student_name VARCHAR(120),
        progress_percent INT NOT NULL DEFAULT 0,
        completed_topics INT NOT NULL DEFAULT 0,
        total_score NUMERIC(5, 1) NOT NULL DEFAULT 0,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      ALTER TABLE student_progress ADD COLUMN IF NOT EXISTS user_id VARCHAR(64);
      ALTER TABLE student_progress ADD COLUMN IF NOT EXISTS track_type VARCHAR(20) DEFAULT 'medical';

      CREATE INDEX IF NOT EXISTS idx_student_progress_percent 
        ON student_progress(progress_percent);
      CREATE INDEX IF NOT EXISTS idx_student_progress_user_id
        ON student_progress(user_id);
    `);

    // 2. Users table for optional account registration & login (saving medical & academic JSON separately)
    await p.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        phone VARCHAR(30) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        medical_progress JSONB DEFAULT '{"completedTopicIds": [], "percent": 0, "score": 0}'::jsonb,
        academic_progress JSONB DEFAULT '{"completedTopicIds": [], "percent": 0}'::jsonb,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
    `);

    isInitialized = true;
  } catch (error) {
    console.error("Failed to initialize database schema:", error);
  }
}
