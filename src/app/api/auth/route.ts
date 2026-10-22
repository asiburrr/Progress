import { NextRequest, NextResponse } from "next/server";
import { getDbPool, ensureDbInitialized } from "@/lib/db";
import {
  hashPassword,
  verifyPassword,
  createSessionToken,
  verifySessionToken,
} from "@/lib/auth-util";
import { normalizeBangladeshiPhone, isValidBangladeshiPhone } from "@/lib/phone-util";

export async function GET(request: NextRequest) {
  try {
    await ensureDbInitialized();
    const token =
      request.cookies.get("bob_session")?.value ||
      request.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const payload = verifySessionToken(token);
    if (!payload) {
      return NextResponse.json({ user: null });
    }

    const pool = getDbPool();
    const res = await pool.query(
      `SELECT id, name, phone, medical_progress, academic_progress, created_at, updated_at 
       FROM users WHERE id = $1`,
      [payload.userId]
    );

    const user = res.rows[0];
    if (!user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        medicalProgress: user.medical_progress || {},
        academicProgress: user.academic_progress || {},
      },
    });
  } catch (error) {
    console.error("GET /api/auth error:", error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureDbInitialized();
    const pool = getDbPool();
    const body = await request.json();
    const { action } = body;

    // 0. QUICK CHECK PHONE DUPLICITY
    if (action === "check_phone") {
      const { phone } = body;
      const cleanPhone = normalizeBangladeshiPhone(phone);
      if (!isValidBangladeshiPhone(cleanPhone)) {
        return NextResponse.json({ exists: false, valid: false, phone: cleanPhone });
      }
      const existing = await pool.query(
        "SELECT id, name FROM users WHERE phone = $1",
        [cleanPhone]
      );
      if (existing.rows.length > 0) {
        return NextResponse.json({
          exists: true,
          valid: true,
          phone: cleanPhone,
          name: existing.rows[0].name,
        });
      }
      return NextResponse.json({ exists: false, valid: true, phone: cleanPhone });
    }

    // 1. REGISTER
    if (action === "register") {
      const { name, phone, password, medicalProgress, academicProgress, clientUid } = body;

      if (!name || !phone || !password) {
        return NextResponse.json(
          { error: "নাম, ফোন নম্বর ও পাসওয়ার্ড আবশ্যক", code: "MISSING_FIELDS" },
          { status: 400 }
        );
      }

      const cleanPhone = normalizeBangladeshiPhone(phone);
      if (!isValidBangladeshiPhone(cleanPhone)) {
        return NextResponse.json(
          { error: "সঠিক ১১ ডিজিটের ফোন নম্বর দিন (যেমন: 01712345678)", code: "INVALID_PHONE" },
          { status: 400 }
        );
      }

      if (String(password).length < 4) {
        return NextResponse.json(
          { error: "পাসওয়ার্ড অন্তত ৪ অক্ষরের হতে হবে", code: "SHORT_PASSWORD" },
          { status: 400 }
        );
      }

      // Check if phone already registered
      const existing = await pool.query(
        "SELECT id, name FROM users WHERE phone = $1",
        [cleanPhone]
      );
      if (existing.rows.length > 0) {
        return NextResponse.json(
          {
            error: "এই ফোন নম্বরে ইতিমধ্যে একটি অ্যাকাউন্ট রয়েছে।",
            code: "ACCOUNT_EXISTS",
            phone: cleanPhone,
            name: existing.rows[0].name,
          },
          { status: 409 }
        );
      }

      const userId = "usr_" + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
      const passwordHash = hashPassword(String(password));

      const safeMed = medicalProgress || { completedTopicIds: [], percent: 0, score: 0 };
      const safeAcad = academicProgress || { completedTopicIds: [], percent: 0 };

      await pool.query(
        `INSERT INTO users (id, name, phone, password_hash, medical_progress, academic_progress, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())`,
        [userId, String(name).trim(), cleanPhone, passwordHash, JSON.stringify(safeMed), JSON.stringify(safeAcad)]
      );

      // Also link/sync to student_progress table for live distribution
      const recordId = clientUid || userId;
      if (safeMed.percent !== undefined) {
        await pool.query(
          `INSERT INTO student_progress (id, user_id, student_name, progress_percent, completed_topics, total_score, track_type, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, 'medical', NOW())
           ON CONFLICT (id) DO UPDATE SET
             user_id = EXCLUDED.user_id,
             student_name = EXCLUDED.student_name,
             progress_percent = EXCLUDED.progress_percent,
             completed_topics = EXCLUDED.completed_topics,
             total_score = EXCLUDED.total_score,
             updated_at = NOW()`,
          [
            recordId,
            userId,
            String(name).trim(),
            safeMed.percent || 0,
            safeMed.completedTopicIds?.length || 0,
            safeMed.score || 0,
          ]
        );
      }

      const ONE_YEAR_SECONDS = 365 * 24 * 60 * 60; // 1 full year in seconds (31,536,000s)

      const token = createSessionToken(userId, cleanPhone, String(name).trim());
      const response = NextResponse.json({
        success: true,
        token,
        user: {
          id: userId,
          name: String(name).trim(),
          phone: cleanPhone,
          medicalProgress: safeMed,
          academicProgress: safeAcad,
        },
      });

      response.cookies.set("bob_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: ONE_YEAR_SECONDS,
        path: "/",
      });

      return response;
    }

    // 2. LOGIN
    if (action === "login") {
      const { phone, password } = body;

      if (!phone || !password) {
        return NextResponse.json(
          { error: "ফোন নম্বর ও পাসওয়ার্ড প্রদান করুন", code: "MISSING_FIELDS" },
          { status: 400 }
        );
      }

      const cleanPhone = normalizeBangladeshiPhone(phone);
      if (!isValidBangladeshiPhone(cleanPhone)) {
        return NextResponse.json(
          { error: "সঠিক ১১ ডিজিটের ফোন নম্বর দিন (যেমন: 01712345678)", code: "INVALID_PHONE" },
          { status: 400 }
        );
      }

      const res = await pool.query(
        `SELECT id, name, phone, password_hash, medical_progress, academic_progress 
         FROM users WHERE phone = $1`,
        [cleanPhone]
      );

      const user = res.rows[0];
      if (!user) {
        return NextResponse.json(
          {
            error: "এই ফোন নম্বরে কোনো অ্যাকাউন্ট পাওয়া যায়নি।",
            code: "ACCOUNT_NOT_FOUND",
            phone: cleanPhone,
          },
          { status: 404 }
        );
      }

      const isValid = verifyPassword(String(password), user.password_hash);
      if (!isValid) {
        return NextResponse.json(
          { error: "পাসওয়ার্ড সঠিক নয়। পুনরায় চেষ্টা করুন।" },
          { status: 401 }
        );
      }

      // If account has NO data for medical or academic, fill from local selection and save to DB
      let userMedProgress = user.medical_progress || {};
      let userAcadProgress = user.academic_progress || {};
      let needDbSync = false;

      const hasAccountMed =
        Array.isArray(userMedProgress.completedTopicIds) &&
        userMedProgress.completedTopicIds.length > 0;
      const hasAccountAcad =
        Array.isArray(userAcadProgress.completedTopicIds) &&
        userAcadProgress.completedTopicIds.length > 0;

      const incomingMed = body.currentMedicalProgress;
      const incomingAcad = body.currentAcademicProgress;

      if (
        !hasAccountMed &&
        incomingMed &&
        Array.isArray(incomingMed.completedTopicIds) &&
        incomingMed.completedTopicIds.length > 0
      ) {
        userMedProgress = incomingMed;
        needDbSync = true;
      }

      if (
        !hasAccountAcad &&
        incomingAcad &&
        Array.isArray(incomingAcad.completedTopicIds) &&
        incomingAcad.completedTopicIds.length > 0
      ) {
        userAcadProgress = incomingAcad;
        needDbSync = true;
      }

      if (needDbSync) {
        await pool.query(
          `UPDATE users 
           SET medical_progress = $1, academic_progress = $2, updated_at = NOW() 
           WHERE id = $3`,
          [JSON.stringify(userMedProgress), JSON.stringify(userAcadProgress), user.id]
        );

        if (userMedProgress.percent !== undefined) {
          await pool.query(
            `INSERT INTO student_progress (id, user_id, student_name, progress_percent, completed_topics, total_score, track_type, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, 'medical', NOW())
             ON CONFLICT (id) DO UPDATE SET
               user_id = EXCLUDED.user_id,
               student_name = COALESCE(EXCLUDED.student_name, student_progress.student_name),
               progress_percent = EXCLUDED.progress_percent,
               completed_topics = EXCLUDED.completed_topics,
               total_score = EXCLUDED.total_score,
               updated_at = NOW()`,
            [
              user.id,
              user.id,
              user.name,
              userMedProgress.percent || 0,
              userMedProgress.completedTopicIds?.length || 0,
              userMedProgress.score || 0,
            ]
          );
        }
      }

      const ONE_YEAR_SECONDS = 365 * 24 * 60 * 60; // 1 full year in seconds
      const token = createSessionToken(user.id, user.phone, user.name);
      const response = NextResponse.json({
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          phone: user.phone,
          medicalProgress: userMedProgress,
          academicProgress: userAcadProgress,
        },
      });

      response.cookies.set("bob_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: ONE_YEAR_SECONDS,
        path: "/",
      });

      return response;
    }

    // 3. LOGOUT
    if (action === "logout") {
      const response = NextResponse.json({ success: true });
      response.cookies.set("bob_session", "", {
        httpOnly: true,
        maxAge: 0,
        path: "/",
      });
      return response;
    }

    // 4. SAVE PROGRESS (Separate Medical & Academic JSON)
    if (action === "save-progress") {
      const token = request.cookies.get("bob_session")?.value;
      const payload = token ? verifySessionToken(token) : null;
      const { trackType, progressData, studentName, clientUid } = body;

      const recordId = payload?.userId || clientUid;
      if (!recordId) {
        return NextResponse.json({ error: "No client/user ID" }, { status: 400 });
      }

      // If logged in, update users table
      if (payload?.userId) {
        if (body.medicalProgress && body.academicProgress) {
          await pool.query(
            `UPDATE users 
             SET medical_progress = $1, academic_progress = $2, name = COALESCE($3, name), updated_at = NOW() 
             WHERE id = $4`,
            [
              JSON.stringify(body.medicalProgress || {}),
              JSON.stringify(body.academicProgress || {}),
              studentName || null,
              payload.userId,
            ]
          );
        } else {
          const column = trackType === "academic" ? "academic_progress" : "medical_progress";
          await pool.query(
            `UPDATE users 
             SET ${column} = $1, name = COALESCE($2, name), updated_at = NOW() 
             WHERE id = $3`,
            [JSON.stringify(progressData || {}), studentName || null, payload.userId]
          );
        }
      }

      // Sync into student_progress table for the live distribution
      const percent = progressData?.percent || 0;
      const topicsCount = progressData?.completedTopicIds?.length || 0;
      const score = progressData?.score || 0;

      await pool.query(
        `INSERT INTO student_progress (id, user_id, student_name, progress_percent, completed_topics, total_score, track_type, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
         ON CONFLICT (id) DO UPDATE SET
           user_id = COALESCE(EXCLUDED.user_id, student_progress.user_id),
           student_name = COALESCE(EXCLUDED.student_name, student_progress.student_name),
           progress_percent = EXCLUDED.progress_percent,
           completed_topics = EXCLUDED.completed_topics,
           total_score = EXCLUDED.total_score,
           track_type = EXCLUDED.track_type,
           updated_at = NOW()`,
        [
          recordId,
          payload?.userId || null,
          studentName || payload?.name || null,
          percent,
          topicsCount,
          score,
          trackType || "medical",
        ]
      );

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("POST /api/auth error:", error);
    return NextResponse.json({ error: "সার্ভারে ত্রুটি হয়েছে" }, { status: 500 });
  }
}
