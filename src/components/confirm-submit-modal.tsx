"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { bnNum } from "@/data/map-data";

interface ConfirmSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  studentName: string;
  progressPercent: number;
  completedTopicsCount: number;
  totalScore?: number;
  isSubmitting?: boolean;
}

export function ConfirmSubmitModal({
  isOpen,
  onClose,
  onConfirm,
  studentName,
  progressPercent,
  completedTopicsCount,
  totalScore,
  isSubmitting = false,
}: ConfirmSubmitModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-[#ebe6dc] space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#ebe6dc]">
          <div className="flex items-center gap-2 text-[#0f6b4f]">
            <Icon icon="solar:shield-check-bold" className="w-5 h-5 flex-shrink-0" />
            <h3 className="text-sm sm:text-base font-black text-[#17201c]">
              প্রগ্রেস সাবমিশন নিশ্চিতকরণ
            </h3>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1 text-[#8a918d] hover:text-[#17201c] rounded-full hover:bg-[#f3efe7] transition cursor-pointer"
          >
            <Icon icon="solar:close-circle-bold" className="w-5 h-5" />
          </button>
        </div>

        {/* Question & Summary Box */}
        <div className="space-y-3">
          <p className="text-xs sm:text-sm font-bold text-[#17201c] leading-snug">
            আপনি কি নিশ্চিতভাবে আপনার বর্তমান অগ্রগতি লাইভ ডাটাবেজে সাবমিট করতে চান?
          </p>

          <div className="bg-[#faf8f4] border border-[#ebe6dc] rounded-2xl p-3.5 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#626965] font-semibold">শিক্ষার্থীর নাম:</span>
              <span className="font-bold text-[#17201c]">
                {studentName.trim() ? studentName : "নামহীন শিক্ষার্থী"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#626965] font-semibold">সিলেবাস সম্পন্ন:</span>
              <span className="font-black text-[#0f6b4f]">
                {bnNum(progressPercent)}%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#626965] font-semibold">সম্পন্ন টপিক:</span>
              <span className="font-bold text-[#17201c]">
                {bnNum(completedTopicsCount)}টি টপিক
              </span>
            </div>

            {totalScore !== undefined && (
              <div className="flex items-center justify-between border-t border-[#ebe6dc] pt-1.5">
                <span className="text-[#626965] font-semibold">মেডিকেল স্কোর:</span>
                <span className="font-black text-[#b91c1c]">
                  {bnNum(totalScore)} / ১০০
                </span>
              </div>
            )}
          </div>

          <p className="text-[11px] text-[#626965]">
            সাবমিট করার পর এটি সকল শিক্ষার্থীর সম্মিলিত প্রগ্রেস গ্রাফে যুক্ত হবে।
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2.5 pt-2">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 py-2.5 px-3 rounded-xl border border-[#ded8cc] text-xs font-bold text-[#626965] hover:bg-[#f3efe7] transition cursor-pointer"
          >
            বাতিল
          </button>

          <button
            onClick={onConfirm}
            disabled={isSubmitting}
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#0f6b4f] hover:bg-[#093e2e] text-white text-xs sm:text-sm font-black rounded-xl shadow-md transition cursor-pointer disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Icon icon="solar:restart-bold" className="w-4 h-4 animate-spin" />
                <span>সাবমিট হচ্ছে...</span>
              </>
            ) : (
              <>
                <Icon icon="solar:check-circle-bold" className="w-4 h-4" />
                <span>হ্যাঁ, সাবমিট করুন</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
