"use client";

import React from "react";
import { Icon } from "@iconify/react";

interface CloudSavePromptProps {
  isOpen: boolean;
  onOpenAccount: () => void;
  onDismiss: () => void;
}

export function CloudSavePrompt({
  isOpen,
  onOpenAccount,
  onDismiss,
}: CloudSavePromptProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl max-w-sm sm:max-w-md w-full p-5 sm:p-7 shadow-2xl border border-[#ebe6dc] space-y-4 text-center relative animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onDismiss}
          className="absolute right-4 top-4 p-1.5 text-[#8a918d] hover:text-[#17201c] rounded-full hover:bg-[#f3efe7] transition cursor-pointer"
          title="বন্ধ করুন"
        >
          <Icon icon="solar:close-circle-bold" className="w-5 h-5" />
        </button>

        {/* Cloud Upload Icon */}
        <div className="w-16 h-16 rounded-3xl bg-[#e3f0ea] text-[#0f6b4f] flex items-center justify-center mx-auto shadow-inner border border-emerald-500/20">
          <Icon icon="solar:cloud-upload-bold" className="w-8 h-8 animate-pulse text-[#0f6b4f]" />
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5 pt-1">
          <h3 className="text-base sm:text-lg font-black text-[#17201c] tracking-tight">
            প্রগ্রেস ক্লাউডে সেভ রাখতে চান?
          </h3>
          <p className="text-xs sm:text-sm text-[#626965] leading-relaxed font-medium">
            তোমার সিলেবাসের অগ্রগতি আজীবনের জন্য সুরক্ষিত রাখতে এবং যেকোনো ডিভাইস থেকে দেখতে একটি ফ্রি অ্যাকাউন্ট তৈরি বা লগইন করে নাও।
          </p>
        </div>

        {/* Key Benefits */}
        <div className="bg-[#faf8f4] border border-[#ebe6dc] p-3 rounded-2xl text-left space-y-2 text-xs text-[#454c48]">
          <div className="flex items-center gap-2">
            <Icon icon="solar:check-circle-bold" className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="font-semibold">যেকোনো ফোন বা কম্পিউটার থেকে দেখতে পাবে</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon icon="solar:check-circle-bold" className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="font-semibold">ব্রাউজার হিস্টোরি মুছে গেলেও প্রগ্রেস হারাবে না</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 space-y-2">
          <button
            onClick={onOpenAccount}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#0f6b4f] hover:bg-[#093e2e] text-white text-xs sm:text-sm font-black rounded-xl shadow-md transition cursor-pointer hover:shadow-lg active:scale-[0.99]"
          >
            <Icon icon="solar:user-bold" className="w-4 h-4" />
            <span>একাউন্টে সেভ করো / লগইন</span>
          </button>

          <button
            onClick={onDismiss}
            className="w-full py-2 text-xs font-bold text-[#8a918d] hover:text-[#17201c] transition cursor-pointer"
          >
            লোকাল ড্রাফটে রাখবো (পরে করব)
          </button>
        </div>
      </div>
    </div>
  );
}
