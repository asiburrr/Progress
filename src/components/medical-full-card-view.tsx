"use client";

import React, { useState, useRef, useEffect } from "react";
import { MEDICAL_SUBJECTS, MEDICAL_WEIGHTS } from "@/data/medical-syllabus";
import { UNSEEN_THEMES, bnNum } from "@/data/map-data";
import { Icon } from "@iconify/react";
import { MedicalProgressGraph } from "./medical-progress-graph";
import { syncStudentProgressToDb } from "@/lib/student-tracker";
import { InAppDownloadModal } from "./in-app-download-modal";
import { isInAppBrowser } from "@/lib/in-app-browser";

export interface MedicalSubjectStat {
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

interface MedicalFullCardViewProps {
  completedTopics: Set<string>;
  studentName: string;
  setStudentName: (name: string) => void;
  activeThemeId: string;
  setActiveThemeId?: (themeId: string) => void;
  onSelectSubject?: (subjectId: string) => void;
}

const MEDICAL_THEMES = [UNSEEN_THEMES[0], UNSEEN_THEMES[2]];

export function MedicalFullCardView({
  completedTopics,
  studentName,
  setStudentName,
  activeThemeId,
  setActiveThemeId,
  onSelectSubject,
}: MedicalFullCardViewProps) {
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState<"png" | "jpeg" | null>(null);
  const [inAppModalOpen, setInAppModalOpen] = useState(false);
  const [pendingDownloadFormat, setPendingDownloadFormat] = useState<"png" | "jpeg" | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentTheme =
    MEDICAL_THEMES.find((t) => t.id === activeThemeId) || MEDICAL_THEMES[0];

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

  // Debounced sync of student progress & name to PostgreSQL
  useEffect(() => {
    const timer = setTimeout(() => {
      syncStudentProgressToDb({
        studentName,
        progressPercent: overallPercent,
        completedTopics: completedTopicsCount,
        totalScore: totalMedicalScore,
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [studentName, overallPercent, completedTopicsCount, totalMedicalScore]);

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

  const generatePosterImage = async (format: "png" | "jpeg"): Promise<string> => {
    const PW = 1200;
    const PH = 1600;

    const canvas = document.createElement("canvas");
    canvas.width = PW;
    canvas.height = PH;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get 2D context");

    const t = currentTheme;
    const FONT = '"Baloo Da 2", "Hind Siliguri", "Noto Sans Bengali", sans-serif';

    // 1. Full Background
    ctx.fillStyle = t.bg;
    ctx.fillRect(0, 0, PW, PH);

    let logoImg: HTMLImageElement | null = null;
    try {
      const l = new Image();
      l.crossOrigin = "anonymous";
      l.src = "/bob-logo.svg";
      await new Promise((res) => {
        l.onload = res;
        l.onerror = res;
      });
      if (l.complete && (l.naturalWidth || l.width)) {
        logoImg = l;
      }
    } catch (e) {
      console.warn("Logo load error:", e);
    }

    // 2. Header (Subject card format)
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
          rg.addColorStop(0, t.v1);
          rg.addColorStop(1, t.v2);

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

    const mainTitle = "মেডিকেল প্রস্তুতি";
    ctx.fillStyle = t.ink;
    ctx.font = `800 54px ${FONT}`;
    ctx.fillText(mainTitle, textX, 180);

    const numGrad = ctx.createLinearGradient(numX, 0, denomX, 0);
    numGrad.addColorStop(0, t.v1);
    numGrad.addColorStop(1, t.v2);
    ctx.fillStyle = numGrad;
    ctx.font = `800 84px ${FONT}`;
    ctx.fillText(numerator, numX, 180);

    ctx.fillStyle = t.muted;
    ctx.font = `700 36px ${FONT}`;
    ctx.fillText(denominator, denomX, 180);

    // Sub-header Divider
    ctx.fillStyle = t.track;
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
    ctx.fillStyle = t.track;
    ctx.fillRect(80, 1530, PW - 160, 1.5);

    if (logoImg) {
      const bobLogoSize = 36;
      ctx.drawImage(logoImg, 80, 1546, bobLogoSize, bobLogoSize);
    }
    ctx.textAlign = "left";
    ctx.font = `800 22px ${FONT}`;
    ctx.fillStyle = t.ink;
    const brandX = logoImg ? 80 + 36 + 14 : 80;
    ctx.fillText("Battles Of Biology", brandX, 1572);

    ctx.textAlign = "right";
    ctx.font = `700 18px ${FONT}`;
    ctx.fillStyle = t.muted;
    ctx.fillText("battlesofbiology.org", PW - 80, 1572);
    ctx.textAlign = "left";

    return canvas.toDataURL(format === "png" ? "image/png" : "image/jpeg", 0.95);
  };

  const handleDownload = (format: "png" | "jpeg") => {
    if (isInAppBrowser()) {
      setPendingDownloadFormat(format);
      setInAppModalOpen(true);
      return;
    }
    executeDownload(format);
  };

  const executeDownload = async (format: "png" | "jpeg") => {
    try {
      setIsDownloading(format);
      const dataUrl = await generatePosterImage(format);
      const link = document.createElement("a");
      const cleanName = studentName.trim()
        ? studentName.trim().replace(/\s+/g, "_")
        : "my";
      link.download = `${cleanName}_medical_admission_card_${totalMedicalScore}marks.${format === "png" ? "png" : "jpg"}`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setIsDownloading(null);
    }
  };


  return (
    <div className="w-full flex flex-col space-y-4">
      {/* 1. Control Bar: Themes, Photo, Name Input */}
      <div className="bg-white rounded-2xl border border-[#ebe6dc] p-3.5 sm:p-5 shadow-xs space-y-3.5 order-2 lg:order-1">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Themes */}
          {setActiveThemeId && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-[#626965]">থিম:</span>
              <div className="flex items-center gap-2">
                {MEDICAL_THEMES.map((th) => {
                  const isChecked = currentTheme.id === th.id;
                  return (
                    <button
                      key={th.id}
                      onClick={() => setActiveThemeId(th.id)}
                      aria-checked={isChecked}
                      title={th.name}
                      className={`relative w-7 h-7 rounded-full border-2 transition-transform cursor-pointer overflow-hidden ${isChecked
                        ? "outline-2 outline-[#17201c] scale-110 shadow-sm border-white"
                        : "border-transparent hover:scale-105"
                        }`}
                      style={{ backgroundColor: th.bg }}
                    >
                      <span
                        className="absolute inset-0"
                        style={{ backgroundColor: th.v1 }}
                      />
                      <span
                        className="absolute bottom-0 right-0 w-[55%] h-[55%] rounded-tl-full"
                        style={{ backgroundColor: th.v2 }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Photo & Name */}
          <div className="flex items-center gap-2 flex-wrap flex-1 sm:flex-initial sm:justify-end">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              title={userPhoto ? "ছবি পরিবর্তন করুন" : "ছবি যোগ করুন"}
              className="inline-flex items-center gap-1.5 border border-dashed border-[#cfc7b8] hover:border-[#b91c1c] bg-[#faf8f4] hover:bg-white rounded-xl px-2.5 py-1.5 text-xs font-bold text-[#17201c] transition cursor-pointer flex-shrink-0 shadow-2xs"
            >
              <span
                className="w-4 h-4 rounded-md bg-[#f3efe7] bg-cover bg-center flex items-center justify-center text-[#b91c1c]"
                style={userPhoto ? { backgroundImage: `url(${userPhoto})` } : undefined}
              >
                {!userPhoto && <Icon icon="solar:camera-bold" className="w-3 h-3" />}
              </span>
              <span>{userPhoto ? "ছবি পরিবর্তন" : "ছবি যোগ করুন"}</span>
            </button>

            {userPhoto && (
              <button
                onClick={() => setUserPhoto(null)}
                title="ছবি মুছে ফেলুন"
                className="text-xs text-[#b91c1c] hover:underline font-bold cursor-pointer"
              >
                সরান
              </button>
            )}

            <label className="text-xs font-bold text-[#626965] flex items-center gap-1 whitespace-nowrap">
              <Icon icon="solar:user-bold" className="w-3.5 h-3.5 text-[#b91c1c]" />
              <span>আপনার নাম:</span>
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="নাম লিখুন (যেমন: আরাভী)"
              maxLength={28}
              className="border border-[#ebe6dc] bg-[#faf8f4] focus:border-[#b91c1c] focus:bg-white rounded-xl px-3 py-1.5 text-xs font-semibold text-[#17201c] outline-hidden transition flex-1 sm:w-40"
            />
          </div>
        </div>
      </div>

      {/* 2. The Medical Preparation Card (Subject-card format with exact colors & theme) */}
      {/* 2. The Medical Preparation Card Preview (Decreased height, compact & perfectly proportioned) */}
      <div
        className="relative w-full rounded-2xl overflow-hidden shadow-md select-none transition-colors duration-300 order-1 lg:order-2 space-y-3.5"
        style={{ backgroundColor: currentTheme.bg, color: currentTheme.ink }}
      >
        {/* Header */}
        <div className="pt-4 sm:pt-5 px-4 sm:px-6 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {userPhoto && (
              <div
                className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl p-[2px] shadow-xs flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.v1}, ${currentTheme.v2})`
                }}
              >
                <div
                  className="w-full h-full rounded-[10px] bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${userPhoto})`,
                    backgroundColor: currentTheme.bg
                  }}
                />
              </div>
            )}

            <div className="min-w-0">
              <span
                className="text-xs sm:text-sm font-bold tracking-wide block truncate"
                style={{ color: currentTheme.muted }}
              >
                {studentName.trim()
                  ? `${studentName.trim()}-এর`
                  : `আমার`}
              </span>
              <h2
                className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight truncate"
                style={{ color: currentTheme.ink }}
              >
                মেডিকেল প্রস্তুতি
              </h2>
            </div>
          </div>

          {/* Top Right Score Display */}
          <div className="text-right flex-shrink-0">
            <div className="flex items-baseline justify-end gap-1">
              <span
                className="text-2xl sm:text-3xl font-extrabold"
                style={{ color: currentTheme.v1 }}
              >
                {bnNum(totalMedicalScore)}
              </span>
              <span
                className="text-base sm:text-lg font-bold"
                style={{ color: currentTheme.muted }}
              >
                /১০০
              </span>
            </div>
            <span
              className="text-[10px] sm:text-[11px] font-semibold block"
              style={{ color: currentTheme.muted }}
            >
              মোট নম্বর অর্জন
            </span>
          </div>
        </div>

        {/* 7 Subject Cards - Compact, Responsive 2-Column Grid on Preview */}
        <div className="px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {breakdown.map((item, idx) => {
            const isComplete = item.percent === 100;
            const isLast = idx === breakdown.length - 1;
            return (
              <div
                key={item.id}
                className={`p-2.5 sm:p-3 rounded-xl flex flex-col justify-between space-y-1.5 shadow-xs ${isLast ? "sm:col-span-2" : ""
                  }`}
                style={{
                  backgroundColor:
                    currentTheme.id === "midnight" || currentTheme.id === "flag"
                      ? "rgba(255, 255, 255, 0.05)"
                      : "#ffffff",
                }}
              >
                {/* Top Line: Name on Left, Score on Right */}
                <div className="flex items-center justify-between gap-1.5">
                  <span
                    className="text-xs sm:text-sm font-extrabold truncate"
                    style={{ color: currentTheme.ink }}
                  >
                    {item.name}
                  </span>

                  <span
                    className="text-xs font-black flex-shrink-0"
                    style={{ color: isComplete ? currentTheme.v1 : currentTheme.ink }}
                  >
                    {bnNum(item.earnedMarks)} / {bnNum(item.marksAllocated)}
                  </span>
                </div>

                {/* Middle Line: Progress Bar */}
                <div
                  className="w-full h-1.5 sm:h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: currentTheme.track }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.max(item.percent, 0)}%`,
                      background: `linear-gradient(90deg, ${currentTheme.v1}, ${currentTheme.v2})`
                    }}
                  />
                </div>

                {/* Bottom Line: Topics Count & Percent */}
                <div
                  className="flex items-center justify-between text-[10px] sm:text-[11px] font-semibold"
                  style={{ color: currentTheme.muted }}
                >
                  <span>{bnNum(item.doneTopics)} / {bnNum(item.totalTopics)} টপিক সমাপ্ত</span>
                  <span
                    className="font-bold"
                    style={{ color: isComplete ? currentTheme.v1 : currentTheme.ink }}
                  >
                    {bnNum(item.percent)}% সম্পন্ন
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Promotional Card inside the Full Card - only shown for >= 60% */}
        {overallPercent >= 60 && (
          <div className="px-4 sm:px-6">
            <div className="rounded-xl p-3 bg-gradient-to-r from-[#093e2e] via-[#0f6b4f] to-[#1a8a66] text-white shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="space-y-0.5 min-w-0">
                <div className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full bg-white/20 text-emerald-100 text-[10px] font-bold">
                  <Icon icon="solar:fire-bold" className="w-3 h-3 text-amber-300" />
                  <span>★ অসাধারণ প্রস্তুতি ★</span>
                </div>
                <h4 className="text-xs sm:text-xs font-black text-white truncate">
                  প্রস্তুতিকে ১০০% নিখুঁত করতে আমাদের &apos;Last Run Batch&apos; আসছে!
                </h4>
                <p className="text-[10px] text-emerald-100/90 line-clamp-1">
                  কোর্সে যুক্ত হতে এবং নিয়মিত আপডেট পেতে চোখ রাখুন Battles Of Biology-এর ফেসবুক পেজে।
                </p>
              </div>

              <a
                href="https://www.facebook.com/BioBattles"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-[#093e2e] font-black text-xs rounded-lg shadow-xs transition"
              >
                <span>Battles Of Biology</span>
                <Icon icon="solar:arrow-right-up-linear" className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        {/* Bottom Progress Bar & Footer */}
        <div className="pb-3.5 sm:pb-4 px-4 sm:px-6 space-y-2.5">
          <div
            className="w-full h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: currentTheme.track }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.max(overallPercent, 2)}%`,
                background: `linear-gradient(90deg, ${currentTheme.v1}, ${currentTheme.v2})`
              }}
            />
          </div>

          <div className="flex items-center justify-between gap-3 pt-0.5">
            <div>
              <p
                className="text-sm sm:text-base font-black tracking-tight"
                style={{ color: currentTheme.ink }}
              >
                {bnNum(overallPercent)}% সম্পন্ন
              </p>
              <p
                className="text-[10px] sm:text-xs font-semibold"
                style={{ color: currentTheme.muted }}
              >
                ৭টি বিষয়ের {bnNum(overallPercent)} নম্বরের পূর্ণাঙ্গ প্রস্তুতি • {bnNum(completedTopicsCount)}টি টপিক শেষ
              </p>
            </div>

            <div className="text-right">
              <span
                className="text-xs sm:text-sm font-bold block"
                style={{ color: currentTheme.v1 }}
              >
                {rankTier.title}
              </span>
              <span
                className="text-[10px] font-semibold"
                style={{ color: currentTheme.muted }}
              >
                শীর্ষ {bnNum(rankTier.percentile)}% শিক্ষার্থী
              </span>
            </div>
          </div>

          <div
            className="pt-2 border-t flex items-center justify-between text-[11px] font-bold"
            style={{
              borderColor: currentTheme.track,
              color: currentTheme.muted
            }}
          >
            <div className="flex items-center gap-1.5">
              <img
                src="/bob-logo.svg"
                alt="Battles Of Biology"
                className="w-3.5 h-3.5 object-contain inline-block"
              />
              <span style={{ color: currentTheme.ink }}>
                Battles Of Biology
              </span>
            </div>
            <a
              href="https://battlesofbiology.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] hover:underline"
              style={{ color: currentTheme.muted }}
            >
              battlesofbiology.org
            </a>
          </div>
        </div>
      </div>

      {/* 3. "ডাউনলোড করুন" Box */}
      <div className="bg-white rounded-2xl border border-[#ebe6dc] p-3.5 sm:p-4 shadow-xs space-y-3 order-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-extrabold text-[#17201c]">
            কার্ড ডাউনলোড করুন
          </h3>
        </div>

        <div>
          <button
            onClick={() => handleDownload("png")}
            disabled={isDownloading !== null}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#17201c] hover:bg-black text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition cursor-pointer shadow-xs disabled:opacity-50"
          >
            <Icon icon="solar:download-minimalistic-bold" className="w-4 h-4" />
            <span>{isDownloading !== null ? "তৈরি হচ্ছে..." : "ডাউনলোড করুন"}</span>
          </button>
        </div>
      </div>

      {/* 4. Live Student Progress Percentage Distribution Graph */}
      <div className="order-4">
        <MedicalProgressGraph
          currentPercent={overallPercent}
          totalScore={totalMedicalScore}
        />
      </div>

      {/* In-App Browser Download Modal */}
      <InAppDownloadModal
        isOpen={inAppModalOpen}
        onClose={() => setInAppModalOpen(false)}
        onProceedAnyway={() => {
          if (pendingDownloadFormat) {
            executeDownload(pendingDownloadFormat);
          }
        }}
      />
    </div>
  );
}
