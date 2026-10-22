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
