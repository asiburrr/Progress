"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { openInExternalBrowser, isAndroid, copyCurrentUrlToClipboard } from "@/lib/in-app-browser";

interface InAppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedAnyway: () => void;
}

export function InAppDownloadModal({
  isOpen,
  onClose,
  onProceedAnyway,
}: InAppDownloadModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    const success = await copyCurrentUrlToClipboard();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-[#ebe6dc] space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#ebe6dc]">
          <div className="flex items-center gap-2 text-amber-600">
            <Icon icon="solar:danger-triangle-bold" className="w-5 h-5 flex-shrink-0" />
            <h3 className="text-sm sm:text-base font-black text-[#17201c]">
              Chrome ব্রাউজারে খুলুন
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#8a918d] hover:text-[#17201c] rounded-full hover:bg-[#f3efe7] transition"
          >
            <Icon icon="solar:close-circle-bold" className="w-5 h-5" />
          </button>
        </div>

        {/* Body Description */}
        <div className="space-y-3 text-xs text-[#626965] leading-relaxed">
          <p className="font-semibold text-[#17201c]">
            আপনি ফেসবুক বা ইন-অ্যাপ ব্রাউজারে আছেন। ইন-অ্যাপ ব্রাউজারগুলোতে ইমেজ বা প্রগ্রেস কার্ড সরাসরি ডাউনলোড হওয়া ব্লক থাকে।
          </p>

          <div className="bg-[#faf8f4] border border-[#ebe6dc] p-3 rounded-2xl space-y-2">
            <span className="font-bold text-[#17201c] block">
              ডাউনলোড করার সবচেয়ে সহজ উপায়:
            </span>
            <ul className="list-disc pl-4 space-y-1">
              <li>নিচের বোতামে ক্লিক করে সরাসরি <strong>Chrome ব্রাউজারে</strong> খুলুন।</li>
              <li>অথবা ওপরের বা নিচের ডানদিকের <strong>তিনটি ডট (•••)</strong> ট্যাপ করে <em>&apos;Open in external browser / Chrome&apos;</em> নির্বাচন করুন।</li>
            </ul>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={() => {
              openInExternalBrowser();
            }}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#0f6b4f] hover:bg-[#093e2e] text-white text-xs sm:text-sm font-black rounded-xl shadow-md transition cursor-pointer"
          >
            <Icon icon="solar:compass-bold" className="w-4 h-4" />
            <span>{isAndroid() ? "Chrome-এ ওপেন করুন" : "সরাসরি ব্রাউজারে খুলুন"}</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#f3efe7] hover:bg-[#e8e2d5] text-[#17201c] text-xs font-bold rounded-xl border border-[#ded8cc] transition cursor-pointer"
            >
              <Icon icon={copied ? "solar:check-circle-bold" : "solar:copy-bold"} className="w-4 h-4 text-[#0f6b4f]" />
              <span>{copied ? "কপি হয়েছে!" : "লিংক কপি করুন"}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onProceedAnyway();
              }}
              className="flex-1 inline-flex items-center justify-center py-2.5 px-3 bg-white hover:bg-slate-50 text-[#8a918d] hover:text-[#17201c] text-xs font-bold rounded-xl border border-[#ded8cc] transition cursor-pointer"
            >
              তবুও চেষ্টা করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
