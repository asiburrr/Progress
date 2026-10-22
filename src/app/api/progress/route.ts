import { NextRequest, NextResponse } from "next/server";
import { getDbPool, ensureDbInitialized } from "@/lib/db";

export interface ProgressBucket {
  label: string;
  min: number;
  max: number;
  percentageOfStudents: number; // e.g. 25 (%)
  count: number;
}

export interface ProgressDistributionResponse {
  totalStudents: number;
  buckets: ProgressBucket[];
  userPercentile: number;
  userBucketIndex: number;
}

export async function GET(request: NextRequest) {
  try {
    await ensureDbInitialized();
    const pool = getDbPool();

    const { searchParams } = new URL(request.url);
    const userPercent = Number(searchParams.get("percent") || 0);

    // Get total count
    const totalRes = await pool.query(
      "SELECT COUNT(*)::int AS total FROM student_progress"
    );
    const totalStudents = totalRes.rows[0]?.total || 0;

    // Get bucket counts using conditional aggregation
    const bucketRes = await pool.query(`
      SELECT
        COUNT(CASE WHEN progress_percent BETWEEN 0 AND 20 THEN 1 END)::int AS b0_20,
        COUNT(CASE WHEN progress_percent BETWEEN 21 AND 40 THEN 1 END)::int AS b21_40,
        COUNT(CASE WHEN progress_percent BETWEEN 41 AND 60 THEN 1 END)::int AS b41_60,
        COUNT(CASE WHEN progress_percent BETWEEN 61 AND 80 THEN 1 END)::int AS b61_80,
        COUNT(CASE WHEN progress_percent BETWEEN 81 AND 100 THEN 1 END)::int AS b81_100
      FROM student_progress
    `);

    const row = bucketRes.rows[0] || {
      b0_20: 0,
      b21_40: 0,
      b41_60: 0,
      b61_80: 0,
      b81_100: 0,
    };

    const definitions = [
      { label: "০–২০%", min: 0, max: 20, count: row.b0_20 },
      { label: "২১–৪০%", min: 21, max: 40, count: row.b21_40 },
      { label: "৪১–৬০%", min: 41, max: 60, count: row.b41_60 },
      { label: "৬১–৮০%", min: 61, max: 80, count: row.b61_80 },
      { label: "৮১–১০০%", min: 81, max: 100, count: row.b81_100 },
    ];

    const buckets: ProgressBucket[] = definitions.map((b) => ({
      label: b.label,
      min: b.min,
      max: b.max,
      count: b.count,
      percentageOfStudents:
        totalStudents > 0
          ? Math.round((b.count / totalStudents) * 1000) / 10
          : 0,
    }));

    // Calculate user percentile (how many students are below current user)
    let userPercentile = 0;
    if (totalStudents > 0) {
      const aheadRes = await pool.query(
        "SELECT COUNT(*)::int AS below FROM student_progress WHERE progress_percent < $1",
        [userPercent]
      );
      const below = aheadRes.rows[0]?.below || 0;
      userPercentile = Math.round((below / totalStudents) * 100);
    }

    const userBucketIndex = definitions.findIndex(
      (b) => userPercent >= b.min && userPercent <= b.max
    );

    return NextResponse.json({
      totalStudents,
      buckets,
      userPercentile,
      userBucketIndex: userBucketIndex >= 0 ? userBucketIndex : 0,
    });
  } catch (error) {
    console.error("API GET /api/progress error:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress distribution" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureDbInitialized();
    const pool = getDbPool();

    const body = await request.json();
    const { id, studentName, progressPercent, completedTopics, totalScore } =
      body;

    if (!id) {
      return NextResponse.json({ error: "Missing student ID" }, { status: 400 });
    }

    const safeProgress = Math.min(100, Math.max(0, Number(progressPercent) || 0));
    const safeTopics = Math.max(0, Number(completedTopics) || 0);
    const safeScore = Math.max(0, Number(totalScore) || 0);
    const safeName = studentName ? String(studentName).trim().slice(0, 120) : null;

    await pool.query(
      `
      INSERT INTO student_progress (id, student_name, progress_percent, completed_topics, total_score, updated_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      ON CONFLICT (id) DO UPDATE SET
        student_name = COALESCE(EXCLUDED.student_name, student_progress.student_name),
        progress_percent = EXCLUDED.progress_percent,
        completed_topics = EXCLUDED.completed_topics,
        total_score = EXCLUDED.total_score,
        updated_at = NOW()
    `,
      [id, safeName, safeProgress, safeTopics, safeScore]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API POST /api/progress error:", error);
    return NextResponse.json(
      { error: "Failed to save student progress" },
      { status: 500 }
    );
  }
}
