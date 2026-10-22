"use client";

import React, { useState, useRef } from "react";
import { MEDICAL_SUBJECTS, MEDICAL_WEIGHTS } from "@/data/medical-syllabus";
import { UNSEEN_THEMES, bnNum } from "@/data/map-data";
import { Icon } from "@iconify/react";
import { InAppDownloadModal } from "./in-app-download-modal";
import { isInAppBrowser } from "@/lib/in-app-browser";

interface MedicalSubjectStat {
  id: string;
  name: string;
  icon: string;
  totalTopics: number;
  doneTopics: number;
  marksAllocated: number;
  weightPercent: number;
  earnedMarks: number;
  percent: number;
}

interface MedicalFullCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedTopics: Set<string>;
  studentName: string;
  setStudentName: (name: string) => void;
  activeThemeId: string;
}

const MEDICAL_THEMES = [UNSEEN_THEMES[0], UNSEEN_THEMES[2]];

export function MedicalFullCardModal({
  isOpen,
  onClose,
  completedTopics,
  studentName,
  setStudentName,
  activeThemeId,
}: MedicalFullCardModalProps) {
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<"png" | "jpeg">("png");
  const [inAppModalOpen, setInAppModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentTheme =
    MEDICAL_THEMES.find((t) => t.id === activeThemeId) || MEDICAL_THEMES[0];
  const isDark = currentTheme.id === "flag";

  const breakdown: MedicalSubjectStat[] = React.useMemo(() => {
    return MEDICAL_SUBJECTS.map((sub) => {
      const meta = MEDICAL_WEIGHTS[sub.id] || { marks: 0, weightPercent: 0, badge: "" };
      const total = sub.chapters.reduce((acc, ch) => acc + ch.topics.length, 0);
      const done = sub.chapters.reduce(
        (acc, ch) => acc + ch.topics.filter((t) => completedTopics.has(t.id)).length,
        0
      );
      const ratio = total > 0 ? done / total : 0;
      const earned = ratio * meta.marks;
      return {
        id: sub.id,
        name: sub.shortName,
        icon: sub.icon,
        totalTopics: total,
        doneTopics: done,
        marksAllocated: meta.marks,
        weightPercent: meta.weightPercent,
        earnedMarks: Number(earned.toFixed(1)),
        percent: Math.round(ratio * 100),
      };
    });
  }, [completedTopics]);

  const totalMedicalScore = React.useMemo(() => {
    const sum = breakdown.reduce((acc, item) => acc + item.earnedMarks, 0);
    return Math.min(100, Math.round(sum * 10) / 10);
  }, [breakdown]);

  const overallPercent = Math.round(totalMedicalScore);

  const totalTopicsCount = React.useMemo(() => {
    return breakdown.reduce((acc, item) => acc + item.totalTopics, 0);
  }, [breakdown]);

  const completedTopicsCount = React.useMemo(() => {
    return breakdown.reduce((acc, item) => acc + item.doneTopics, 0);
  }, [breakdown]);

  const rankTier = React.useMemo(() => {
    if (totalMedicalScore >= 90) return { title: "ডিএমসি ড্রিমার", percentile: "৫" };
    if (totalMedicalScore >= 75) return { title: "মেডিকেল দিগ্বিজয়ী", percentile: "১০" };
    if (totalMedicalScore >= 60) return { title: "অগ্রগামী যোদ্ধা", percentile: "২৫" };
    if (totalMedicalScore >= 40) return { title: "চলমান প্রস্তুতি", percentile: "৫০" };
    return { title: "প্রস্তুতি শুরু হয়েছে", percentile: "৯০" };
  }, [totalMedicalScore]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const subjectConfig: Record<string, { bar: string; badge: string; bg: string; border: string; hex: string }> = {
    "med-bio": { bar: "bg-[#0f6b4f]", badge: "text-[#0f6b4f] bg-[#e3f0ea]", bg: "bg-[#f8fbf9]", border: "border-[#d1e7dc]", hex: "#0f6b4f" },
    "med-chem": { bar: "bg-[#b91c1c]", badge: "text-[#b91c1c] bg-[#fef2f2]", bg: "bg-[#fdf9f9]", border: "border-[#fed7d7]", hex: "#b91c1c" },
    "med-phy": { bar: "bg-[#1d4ed8]", badge: "text-[#1d4ed8] bg-[#eff6ff]", bg: "bg-[#f8faff]", border: "border-[#dbeafe]", hex: "#1d4ed8" },
    "med-eng": { bar: "bg-[#d97706]", badge: "text-[#d97706] bg-[#fef3c7]", bg: "bg-[#fffdfa]", border: "border-[#fde68a]", hex: "#d97706" },
    "med-gk-bd": { bar: "bg-[#059669]", badge: "text-[#059669] bg-[#ecfdf5]", bg: "bg-[#f9fefb]", border: "border-[#a7f3d0]", hex: "#059669" },
    "med-gk-int": { bar: "bg-[#7c3aed]", badge: "text-[#7c3aed] bg-[#f5f3ff]", bg: "bg-[#fcfaff]", border: "border-[#ddd6fe]", hex: "#7c3aed" },
    "med-ethics": { bar: "bg-[#e11d48]", badge: "text-[#e11d48] bg-[#fff1f2]", bg: "bg-[#fffafb]", border: "border-[#fecdd3]", hex: "#e11d48" },
  };

  const generateFullCardCanvas = async (format: "png" | "jpeg"): Promise<string> => {
    const PW = 1200;
    const PH = 1600;

    const canvas = document.createElement("canvas");
    canvas.width = PW;
    canvas.height = PH;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get 2D context");

    const t = currentTheme;
    const FONT = '"Baloo Da 2", "Hind Siliguri", "Noto Sans Bengali", sans-serif';

    // 1. Background
    ctx.fillStyle = t.bg;
    ctx.fillRect(0, 0, PW, PH);

    // Decorative ambient circles
    ctx.save();
    ctx.beginPath();
    ctx.arc(PW - 120, 120, 360, 0, Math.PI * 2);
    ctx.fillStyle = isDark ? "rgba(185, 28, 28, 0.08)" : "rgba(185, 28, 28, 0.04)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(100, PH - 220, 300, 0, Math.PI * 2);
    ctx.fillStyle = isDark ? "rgba(15, 107, 79, 0.08)" : "rgba(15, 107, 79, 0.04)";
    ctx.fill();
    ctx.restore();

    // 2. Header Layout (Subject card format)
    let textX = 80;
    if (userPhoto) {
      try {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = userPhoto;
        await new Promise((res) => {
          img.onload = res;
          img.onerror = res;
        });
        if (img.complete && img.naturalWidth) {
          const size = 150;
          const x = 80;
          const y = 52;
          const rad = 28;

          ctx.save();
          const rg = ctx.createLinearGradient(x, y, x + size, y + size);
          rg.addColorStop(0, "#b91c1c");
          rg.addColorStop(1, "#dc2626");

          ctx.beginPath();
          ctx.roundRect(x - 5, y - 5, size + 10, size + 10, rad + 5);
          ctx.fillStyle = rg;
          ctx.fill();

          ctx.beginPath();
          ctx.roundRect(x - 2, y - 2, size + 4, size + 4, rad + 2);
          ctx.fillStyle = t.bg;
          ctx.fill();

          ctx.beginPath();
          ctx.roundRect(x, y, size, size, rad);
          ctx.clip();
          const k = Math.max(size / img.naturalWidth, size / img.naturalHeight);
          ctx.drawImage(
            img,
            x + size / 2 - (img.naturalWidth * k) / 2,
            y + size / 2 - (img.naturalHeight * k) / 2,
            img.naturalWidth * k,
            img.naturalHeight * k
          );
          ctx.restore();
          textX = x + size + 35;
        }
      } catch (err) {
        console.error("Photo render error:", err);
      }
    }

    const numerator = bnNum(totalMedicalScore);
    const denominator = "/১০০";

    ctx.font = `700 36px ${FONT}`;
    const denomWidth = ctx.measureText(denominator).width;
    ctx.font = `800 84px ${FONT}`;
    const numWidth = ctx.measureText(numerator).width;

    const countRightX = PW - 80;
    const denomX = countRightX - denomWidth;
    const numX = denomX - numWidth - 10;

    const studentTitle = studentName.trim()
      ? `${studentName.trim()}-এর`
      : `আমার`;
    ctx.fillStyle = t.muted;
    ctx.font = `750 45px ${FONT}`;
    ctx.fillText(studentTitle, textX, userPhoto ? 106 : 109);

    const mainHeaderTitle = "মেডিকেল প্রস্তুতি";
    ctx.fillStyle = t.ink;
    ctx.font = `800 54px ${FONT}`;
    ctx.fillText(mainHeaderTitle, textX, 180);

    const numGrad = ctx.createLinearGradient(numX, 0, denomX, 0);
    numGrad.addColorStop(0, "#b91c1c");
    numGrad.addColorStop(1, "#dc2626");
    ctx.fillStyle = numGrad;
    ctx.font = `800 84px ${FONT}`;
    ctx.fillText(numerator, numX, 180);

    ctx.fillStyle = t.muted;
    ctx.font = `700 36px ${FONT}`;
    ctx.fillText(denominator, denomX, 180);

    // Sub-header Divider
    ctx.fillStyle = t.track || "#ebe6dc";
    ctx.fillRect(80, 230, PW - 160, 2);

    // 3. Exactly 7 Subject Cards - Full Width, Perfectly Proportioned, Flawless Surface
    const isDarkTheme = t.id === "midnight" || t.id === "flag";
    const isHigh = totalMedicalScore >= 60;
    const cardYStart = isHigh ? 248 : 256;
    const cardH = isHigh ? 118 : 138;
    const cardGap = isHigh ? 18 : 22;
    const cardW = PW - 160; // 1040px

    breakdown.forEach((item, idx) => {
      const cy = cardYStart + idx * (cardH + cardGap);
      const isComplete = item.percent === 100;

      ctx.save();
      // Crisp Card Surface - No Border as requested
      ctx.fillStyle = isDarkTheme ? "#1e222b" : "#ffffff";
      ctx.beginPath();
      ctx.roundRect(80, cy, cardW, cardH, 20);
      ctx.fill();

      // Row 1: Left -> Subject Name
      ctx.fillStyle = isDarkTheme ? "#ffffff" : "#17201c";
      ctx.font = `800 ${isHigh ? 26 : 28}px ${FONT}`;
      const nameText = item.name;
      ctx.fillText(nameText, 115, cy + (isHigh ? 38 : 42));

      // Row 1: Right -> Score
      ctx.textAlign = "right";
      ctx.fillStyle = isComplete ? t.v1 : isDarkTheme ? "#ffffff" : "#17201c";
      ctx.font = `900 ${isHigh ? 28 : 30}px ${FONT}`;
      ctx.fillText(`${bnNum(item.earnedMarks)} / ${bnNum(item.marksAllocated)}`, PW - 115, cy + (isHigh ? 38 : 42));
      ctx.textAlign = "left";

      // Row 2: Isolated Progress Track Bar (35px inner margin from card edges)
      const barX = 115;
      const barY = cy + (isHigh ? 56 : 64);
      const barW = cardW - 70; // 970px
      const barH = isHigh ? 10 : 12;

      ctx.fillStyle = isDarkTheme ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.06)";
      ctx.beginPath();
      ctx.roundRect(barX, barY, barW, barH, barH / 2);
      ctx.fill();

      if (item.percent > 0) {
        const fillW = Math.max(barH, (barW * item.percent) / 100);
        const pGrad = ctx.createLinearGradient(barX, 0, barX + fillW, 0);
        pGrad.addColorStop(0, t.v1);
        pGrad.addColorStop(1, t.v2);
        ctx.fillStyle = pGrad;
        ctx.beginPath();
        ctx.roundRect(barX, barY, fillW, barH, barH / 2);
        ctx.fill();
      }

      // Row 3: Bottom -> Completed Topics (Left) & Percentage (Right)
      ctx.fillStyle = t.muted;
      ctx.font = `600 ${isHigh ? 18 : 19}px ${FONT}`;
      ctx.fillText(`${bnNum(item.doneTopics)} / ${bnNum(item.totalTopics)} টপিক সমাপ্ত`, 115, cy + (isHigh ? 96 : 110));

      ctx.textAlign = "right";
      ctx.fillStyle = isComplete ? t.v1 : isDarkTheme ? "#ffffff" : "#17201c";
      ctx.font = `800 ${isHigh ? 20 : 21}px ${FONT}`;
      ctx.fillText(`${bnNum(item.percent)}% সম্পন্ন`, PW - 115, cy + (isHigh ? 96 : 110));
      ctx.textAlign = "left";

      ctx.restore();
    });

    // 4. Overall Progress Bar & Summary
    const progY = isHigh ? 1210 : 1385;
    ctx.fillStyle = isDarkTheme ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.06)";
    ctx.beginPath();
    ctx.roundRect(80, progY, PW - 160, 14, 7);
    ctx.fill();

    if (overallPercent > 0) {
      const fillW = Math.max(14, ((PW - 160) * overallPercent) / 100);
      const bGrad = ctx.createLinearGradient(80, 0, 80 + fillW, 0);
      bGrad.addColorStop(0, t.v1);
      bGrad.addColorStop(1, t.v2);
      ctx.fillStyle = bGrad;
      ctx.beginPath();
      ctx.roundRect(80, progY, fillW, 14, 7);
      ctx.fill();
    }

    ctx.textAlign = "left";
    ctx.font = `800 34px ${FONT}`;
    ctx.fillStyle = t.ink;
    ctx.fillText(`${bnNum(overallPercent)}% সম্পন্ন`, 80, progY + 52);

    ctx.font = `600 19px ${FONT}`;
    ctx.fillStyle = t.muted;
    ctx.fillText(`৭টি বিষয়ের ${bnNum(overallPercent)} নম্বরের পূর্ণাঙ্গ প্রস্তুতি • ${bnNum(completedTopicsCount)}টি টপিক শেষ`, 80, progY + 86);

    ctx.textAlign = "right";
    ctx.font = `800 26px ${FONT}`;
    ctx.fillStyle = t.v1;
    ctx.fillText(rankTier.title, PW - 80, progY + 52);

    ctx.font = `600 18px ${FONT}`;
    ctx.fillStyle = t.muted;
    ctx.fillText(`শীর্ষ ${bnNum(rankTier.percentile)}% শিক্ষার্থী`, PW - 80, progY + 86);
    ctx.textAlign = "left";

    // 5. Last Run Batch Promotional Banner - ONLY for >= 60%
    if (isHigh) {
      const bannerY = 1330;
      const bannerH = 155;
      const bannerW = PW - 160;

      ctx.save();
      const bGrad = ctx.createLinearGradient(80, bannerY, PW - 80, bannerY + bannerH);
      bGrad.addColorStop(0, "#093e2e");
      bGrad.addColorStop(1, "#0f6b4f");
      ctx.fillStyle = bGrad;
      ctx.beginPath();
      ctx.roundRect(80, bannerY, bannerW, bannerH, 22);
      ctx.fill();

      ctx.strokeStyle = "#1f9a70";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = "#fef08a";
      ctx.font = `800 20px ${FONT}`;
      ctx.fillText("★ অসাধারণ প্রস্তুতি ★", 115, bannerY + 44);

      ctx.fillStyle = "#ffffff";
      ctx.font = `900 30px ${FONT}`;
      ctx.fillText("প্রস্তুতিকে ১০০% নিখুঁত করতে আমাদের 'Last Run Batch' আসছে!", 115, bannerY + 86);

      ctx.fillStyle = "#d1fae5";
      ctx.font = `700 19px ${FONT}`;
      ctx.fillText("কোর্সে যুক্ত হতে এবং নিয়মিত আপডেট পেতে চোখ রাখুন Battles Of Biology-এর ফেসবুক পেজে।", 115, bannerY + 126);
      ctx.restore();
    }

    // 6. Footer (Y: 1530 to 1575)
    ctx.fillStyle = t.track || "#ebe6dc";
    ctx.fillRect(80, 1530, PW - 160, 1.5);

    let logoImgFooter: HTMLImageElement | null = null;
    try {
      const l = new Image();
      l.crossOrigin = "anonymous";
      l.src = "/bob-logo.svg";
      await new Promise((res) => {
        l.onload = res;
        l.onerror = res;
      });
      if (l.complete && (l.naturalWidth || l.width)) {
        logoImgFooter = l;
      }
    } catch (e) {
      console.warn("Logo error:", e);
    }

    if (logoImgFooter) {
      const bobLogoSize = 36;
      ctx.drawImage(logoImgFooter, 80, 1546, bobLogoSize, bobLogoSize);
    }

    ctx.textAlign = "left";
    ctx.font = `800 22px ${FONT}`;
    ctx.fillStyle = t.ink;
    const brandX = logoImgFooter ? 80 + 36 + 14 : 80;
    ctx.fillText("Battles Of Biology", brandX, 1572);

    ctx.textAlign = "right";
    ctx.font = `700 18px ${FONT}`;
    ctx.fillStyle = t.muted;
    ctx.fillText("battlesofbiology.org", PW - 80, 1572);
    ctx.textAlign = "left";

    return canvas.toDataURL(format === "png" ? "image/png" : "image/jpeg", 0.95);
  };

  const handleDownload = () => {
    if (isInAppBrowser()) {
      setInAppModalOpen(true);
      return;
    }
    executeDownload();
  };

  const executeDownload = async () => {
    try {
      setIsGenerating(true);
      const dataUrl = await generateFullCardCanvas(downloadFormat);
      const link = document.createElement("a");
      const safeName = studentName.trim()
        ? studentName.trim().replace(/\s+/g, "_")
        : "my";
      link.download = `${safeName}_medical_admission_card_${totalMedicalScore}marks.${downloadFormat === "png" ? "png" : "jpg"}`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error("Card generation failed", e);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#faf8f4] border border-[#ebe6dc] rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 sm:p-5 border-b border-[#ebe6dc] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#b91c1c] text-white flex items-center justify-center shadow-xs">
              <Icon icon="solar:stethoscope-bold" className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-[#17201c] leading-tight">
                পূর্ণাঙ্গ মেডিকেল ভর্তি কার্ড ডাউনলোড
              </h2>
              <p className="text-xs text-[#626965] font-semibold">
                ১২০০×১৬০০ রেজোলিউশনের ফুল-এইচডি প্রিন্ট কার্ড
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#f3efe7] flex items-center justify-center text-[#626965] transition cursor-pointer"
          >
            <Icon icon="solar:close-circle-bold" className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-3.5 rounded-2xl border border-[#ebe6dc]">
            <div>
              <label className="text-xs font-bold text-[#454c48] block mb-1">
                তোমার নাম লিখুন (কার্ডে প্রিন্ট হবে):
              </label>
              <input
                type="text"
                placeholder="যেমন: সাকিব আল হাসান"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-[#ded8cc] focus:outline-hidden focus:border-[#b91c1c] bg-[#faf8f4]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#454c48] block mb-1">
                ছবি যুক্ত করুন (ঐচ্ছিক):
              </label>
              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-[#f3efe7] hover:bg-[#e8e2d5] text-[#17201c] border border-[#ded8cc] transition cursor-pointer truncate"
                >
                  <Icon icon="solar:camera-bold" className="w-4 h-4 text-[#b91c1c]" />
                  <span>{userPhoto ? "ছবি পরিবর্তন" : "ছবি আপলোড"}</span>
                </button>
                {userPhoto && (
                  <button
                    onClick={() => setUserPhoto(null)}
                    className="p-2 text-xs text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
                    title="ছবি মুছুন"
                  >
                    <Icon icon="solar:trash-bin-trash-bold" className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Format selection */}
          <div className="flex items-center justify-between text-xs font-bold text-[#454c48] px-1">
            <span>ডাউনলোড ফরম্যাট:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDownloadFormat("png")}
                className={`px-3 py-1 rounded-lg transition cursor-pointer ${downloadFormat === "png"
                  ? "bg-[#b91c1c] text-white shadow-xs"
                  : "bg-[#f3efe7] text-[#626965]"
                  }`}
              >
                PNG (উচ্চ রেজোলিউশন)
              </button>
              <button
                onClick={() => setDownloadFormat("jpeg")}
                className={`px-3 py-1 rounded-lg transition cursor-pointer ${downloadFormat === "jpeg"
                  ? "bg-[#b91c1c] text-white shadow-xs"
                  : "bg-[#f3efe7] text-[#626965]"
                  }`}
              >
                JPEG
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5 border-t border-[#ebe6dc] bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[#626965] font-semibold text-center sm:text-left">
            ১২০০×১৬০০ রেজোলিউশনে সাবজেক্ট কার্ড ফরম্যাটে ডাউনলোড হবে
          </p>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-[#ded8cc] text-xs font-bold text-[#626965] hover:bg-[#f3efe7] transition cursor-pointer"
            >
              বাতিল
            </button>
            <button
              disabled={isGenerating}
              onClick={handleDownload}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs sm:text-sm font-black shadow-md transition cursor-pointer disabled:opacity-60"
            >
              {isGenerating ? (
                <>
                  <Icon icon="solar:restart-bold" className="w-4 h-4 animate-spin" />
                  <span>কার্ড তৈরি হচ্ছে...</span>
                </>
              ) : (
                <>
                  <Icon icon="solar:download-square-bold" className="w-4 h-4" />
                  <span>ডাউনলোড করুন</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <InAppDownloadModal
        isOpen={inAppModalOpen}
        onClose={() => setInAppModalOpen(false)}
        onProceedAnyway={executeDownload}
      />
    </div>
  );
}
