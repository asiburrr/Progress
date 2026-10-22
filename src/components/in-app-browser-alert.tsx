"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { isInAppBrowser, openInExternalBrowser, isAndroid } from "@/lib/in-app-browser";

export function InAppBrowserAlert() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isInAppBrowser()) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-white px-4 py-2.5 shadow-md sticky top-0 z-50 animate-in fade-in slide-in-from-top duration-300">
      <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <Icon icon="solar:danger-triangle-bold" className="w-4 h-4 flex-shrink-0 text-white" />
          <span className="font-bold">
            আপনি ফেসবুক বা ইন-অ্যাপ ব্রাউজারে আছেন! কার্ড ডাউনলোড ও পূর্ণ সুবিধার জন্য Chrome অথবা Safari ব্রাউজারে ওপেন করুন।
          </span>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
          <button
            onClick={() => openInExternalBrowser()}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-[#b45309] font-black rounded-lg shadow-xs hover:bg-amber-50 transition cursor-pointer text-xs"
          >
            <Icon icon="solar:compass-bold" className="w-3.5 h-3.5" />
            <span>{isAndroid() ? "Chrome-এ ওপেন করুন" : "ব্রাউজারে ওপেন করুন"}</span>
          </button>

          <button
            onClick={() => setShow(false)}
            className="p-1 hover:bg-white/20 rounded-lg transition cursor-pointer text-white"
            title="বন্ধ করুন"
          >
            <Icon icon="solar:close-circle-bold" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
