import axios from "axios";
import { HSC_SUBJECTS, Subject } from "@/data/hsc-syllabus";

export const apiClient = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchSubjects(): Promise<Subject[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(HSC_SUBJECTS);
    }, 350);
  });
}

export function calculateStudentRank(completedTopics: number, totalTopics: number) {
  if (totalTopics === 0) return { percentile: 99, title: "শুরু করুন", tier: "নবীন" };
  const percentage = Math.round((completedTopics / totalTopics) * 100);

  if (percentage >= 90) {
    return { percentile: 5, title: "সিলেবাস দিগ্বিজয়ী", tier: "মাস্টার" };
  } else if (percentage >= 75) {
    return { percentile: 10, title: "অগ্নিবীর যোদ্ধা", tier: "উচ্চমান" };
  } else if (percentage >= 50) {
    return { percentile: 25, title: "অগ্রগামী প্রস্তুতি", tier: "মধ্যম" };
  } else if (percentage >= 25) {
    return { percentile: 50, title: "চলমান প্রস্তুতি", tier: "প্রাথমিক" };
  } else {
    return { percentile: 90, title: "প্রস্তুতি শুরু হয়েছে", tier: "সূচনা" };
  }
}
