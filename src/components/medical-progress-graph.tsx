"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { bnNum } from "@/data/map-data";
import {
  fetchProgressDistribution,
  ProgressDistributionResponse,
  ProgressBucket,
} from "@/lib/student-tracker";

interface MedicalProgressGraphProps {
  currentPercent: number;
  totalScore: number;
}

export function MedicalProgressGraph({
  currentPercent,
  totalScore,
}: MedicalProgressGraphProps) {
  const [data, setData] = useState<ProgressDistributionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetchProgressDistribution(currentPercent)
      .then((res) => {
        if (isMounted && res) {
          setData(res);
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [currentPercent]);

  const defaultBuckets: ProgressBucket[] = [
    { label: "০–২০%", min: 0, max: 20, percentageOfStudents: 0, count: 0 },
    { label: "২১–৪০%", min: 21, max: 40, percentageOfStudents: 0, count: 0 },
    { label: "৪১–৬০%", min: 41, max: 60, percentageOfStudents: 0, count: 0 },
    { label: "৬১–৮০%", min: 61, max: 80, percentageOfStudents: 0, count: 0 },
    { label: "৮১–১০০%", min: 81, max: 100, percentageOfStudents: 0, count: 0 },
  ];

  const buckets: ProgressBucket[] = data?.buckets || defaultBuckets;

  const maxPercent = Math.max(...buckets.map((b: ProgressBucket) => b.percentageOfStudents), 10);
  const activeBucketIndex = buckets.findIndex(
    (b: ProgressBucket) => currentPercent >= b.min && currentPercent <= b.max
  );

  return (
    <div className="bg-white rounded-2xl border border-[#ebe6dc] p-4 sm:p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#ebe6dc] pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-sm sm:text-base font-black text-[#17201c] flex items-center gap-1.5">
              <span>লাইভ শিক্ষার্থী প্রগ্রেস ডিস্ট্রিবিউশন</span>
            </h3>
          </div>
          <p className="text-xs text-[#626965] font-medium">
            সকল শিক্ষার্থীর সিলেবাস শেষ করার হার অনুযায়ী শতকরা বণ্টন
          </p>
        </div>

        {data && data.totalStudents > 0 && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f6f2ea] text-[#0f6b4f] rounded-full text-xs font-bold self-start sm:self-auto">
            <Icon icon="solar:users-group-two-rounded-bold" className="w-4 h-4" />
            <span>
              মোট শিক্ষার্থী: {bnNum(data.totalStudents)} জন
            </span>
          </div>
        )}
      </div>

      {/* Main Bar Chart (% of students on Y-axis) */}
      <div className="pt-2">
        <div className="flex items-end justify-between gap-2 sm:gap-4 h-48 sm:h-52 px-1 pb-2">
          {buckets.map((bucket, idx) => {
            const isUserBucket = idx === activeBucketIndex;
            const barHeightPercent =
              maxPercent > 0
                ? Math.max(14, (bucket.percentageOfStudents / maxPercent) * 100)
                : 14;

            return (
              <div
                key={bucket.label}
                className="flex-1 flex flex-col items-center h-full justify-end group relative"
              >
                {/* Value above bar: Percentage of Students */}
                <div className="mb-1.5 text-center">
                  <span
                    className={`text-[11px] sm:text-xs font-black block transition-all ${isUserBucket
                      ? "text-[#0f6b4f] scale-110"
                      : "text-[#626965]"
                      }`}
                  >
                    {bnNum(bucket.percentageOfStudents)}%
                  </span>
                  <span className="text-[9px] text-[#8a918d] font-semibold hidden sm:block">
                    শিক্ষার্থী
                  </span>
                </div>

                {/* Animated Bar */}
                <div className="w-full max-w-[54px] bg-[#f0eae1] rounded-t-xl overflow-hidden relative flex flex-col justify-end h-full max-h-[140px]">
                  <div
                    className={`w-full rounded-t-xl transition-all duration-700 relative ${isUserBucket
                      ? "bg-gradient-to-t from-[#093e2e] via-[#0f6b4f] to-[#1f9a70] shadow-md"
                      : "bg-gradient-to-t from-[#cfc7b8] to-[#b3a895] hover:opacity-90"
                      }`}
                    style={{ height: `${barHeightPercent}%` }}
                  >
                    {/* User Pin / Crown indicator */}
                    {isUserBucket && (
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-300 shadow-xs ring-2 ring-white/50" />
                    )}
                  </div>
                </div>

                {/* X-axis Label (Progress Tier) */}
                <div className="mt-2 text-center">
                  <span
                    className={`text-[11px] sm:text-xs font-bold block ${isUserBucket ? "text-[#0f6b4f] font-black" : "text-[#17201c]"
                      }`}
                  >
                    {bucket.label}
                  </span>
                  <span className="text-[9px] text-[#8a918d] font-semibold">
                    প্রগ্রেস
                  </span>
                </div>

                {/* Active User Indicator Tag */}
                {isUserBucket && (
                  <div className="absolute -top-7 sm:-top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#0f6b4f] text-white text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" />
                    <span>আপনার অবস্থান</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
