export interface ProgressBucket {
  label: string;
  min: number;
  max: number;
  percentageOfStudents: number;
  count: number;
}

export interface ProgressDistributionResponse {
  totalStudents: number;
  buckets: ProgressBucket[];
  userPercentile: number;
  userBucketIndex: number;
}

export function getOrCreateStudentId(): string {
  if (typeof window === "undefined") return "temp-id";

  const STORAGE_KEY = "bob_student_uid";
  let uid = localStorage.getItem(STORAGE_KEY);
  if (!uid) {
    uid = "stu_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now().toString(36);
    localStorage.setItem(STORAGE_KEY, uid);
  }
  return uid;
}

export async function syncStudentProgressToDb({
  studentName,
  progressPercent,
  completedTopics,
  totalScore,
}: {
  studentName?: string;
  progressPercent: number;
  completedTopics: number;
  totalScore: number;
}) {
  try {
    const id = getOrCreateStudentId();
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        studentName,
        progressPercent,
        completedTopics,
        totalScore,
      }),
    });
  } catch (error) {
    console.error("Failed to sync progress to database:", error);
  }
}

export async function fetchProgressDistribution(userPercent: number) {
  try {
    const res = await fetch(`/api/progress?percent=${encodeURIComponent(userPercent)}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch distribution");
    return await res.json();
  } catch (error) {
    console.error("Error fetching progress distribution:", error);
    return null;
  }
}

export async function saveProgressToCloud({
  trackType,
  completedTopicIds,
  percent,
  score,
  medicalProgress,
  academicProgress,
  studentName,
}: {
  trackType?: "medical" | "academic";
  completedTopicIds?: string[];
  percent?: number;
  score?: number;
  medicalProgress?: { completedTopicIds: string[]; percent: number; score?: number };
  academicProgress?: { completedTopicIds: string[]; percent: number };
  studentName?: string;
}) {
  try {
    const clientUid = getOrCreateStudentId();
    const payload: any = {
      action: "save-progress",
      studentName,
      clientUid,
    };

    if (medicalProgress && academicProgress) {
      payload.medicalProgress = medicalProgress;
      payload.academicProgress = academicProgress;
      payload.trackType = trackType || "medical";
      payload.progressData = trackType === "academic" ? academicProgress : medicalProgress;
    } else {
      payload.trackType = trackType || "medical";
      payload.progressData = {
        completedTopicIds: completedTopicIds || [],
        percent: percent || 0,
        score,
      };
    }

    const localToken =
      typeof window !== "undefined"
        ? localStorage.getItem("bob_session_token")
        : null;

    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (localToken) {
      headers["Authorization"] = `Bearer ${localToken}`;
    }

    const res = await fetch("/api/auth", {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch (error) {
    console.error("Failed to save progress to cloud:", error);
    return false;
  }
}

export async function fetchCurrentUser() {
  try {
    const localToken =
      typeof window !== "undefined"
        ? localStorage.getItem("bob_session_token")
        : null;

    const headers: Record<string, string> = {};
    if (localToken) {
      headers["Authorization"] = `Bearer ${localToken}`;
    }

    const res = await fetch("/api/auth", { cache: "no-store", headers });
    if (!res.ok) return null;
    const data = await res.json();

    if (data.user && typeof window !== "undefined") {
      localStorage.setItem("bob_cached_user", JSON.stringify(data.user));
    } else if (!data.user && typeof window !== "undefined") {
      localStorage.removeItem("bob_session_token");
      localStorage.removeItem("bob_cached_user");
    }

    return data.user || null;
  } catch {
    return null;
  }
}

export async function logoutUser() {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem("bob_session_token");
      localStorage.removeItem("bob_cached_user");
    }
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
  } catch {
    // Ignore network error on logout
  }
}

