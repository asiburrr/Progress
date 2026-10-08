"use client";

import React, { useState, useRef, useMemo } from "react";
import { Chapter, Subject } from "@/data/hsc-syllabus";
import {
  UNSEEN_THEMES,
  bnNum
} from "@/data/map-data";
import {
  getMapGeometries,
  MapStyleType,
  TerritoryGeometry
} from "@/data/map-geometries";
import { calculateStudentRank } from "@/services/api";
import { Icon } from "@iconify/react";

interface SyllabusMapProps {
  subject: Subject;
  completedTopics: Set<string>;
  onToggleChapter: (chapter: Chapter) => void;
  onToggleTopic?: (topicId: string) => void;
  activeThemeId: string;
  setActiveThemeId: (themeId: string) => void;
  studentName: string;
  setStudentName: (name: string) => void;
  selectedChapterId?: string | null;
  onSelectChapter?: (chapterId: string) => void;
  mapStyle?: MapStyleType;
  setMapStyle?: (style: MapStyleType) => void;
}

export function SyllabusMap({
  subject,
  completedTopics,
  onToggleChapter,
  onToggleTopic,
  activeThemeId,
  setActiveThemeId,
  studentName,
  setStudentName,
  onSelectChapter,
  mapStyle = "hexagon",
  setMapStyle
}: SyllabusMapProps) {
  const currentTheme =
    UNSEEN_THEMES.find((t) => t.id === activeThemeId) || UNSEEN_THEMES[0];
  const showLabels = true;
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const [hoveredChapter, setHoveredChapter] = useState<Chapter | null>(null);
  const [activeChapterModal, setActiveChapterModal] = useState<Chapter | null>(
    null
  );
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(
    null
  );
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const mapSvgContainerRef = useRef<HTMLDivElement>(null);

  const totalTopics = subject.chapters.reduce(
    (acc, ch) => acc + ch.topics.length,
    0
  );
  const completedTopicsCount = subject.chapters.reduce(
    (acc, ch) =>
      acc + ch.topics.filter((t) => completedTopics.has(t.id)).length,
    0
  );
  const totalChapters = subject.chapters.length;
  const completedChaptersCount = subject.chapters.filter(
    (ch) =>
      ch.topics.length > 0 &&
      ch.topics.every((t) => completedTopics.has(t.id))
  ).length;

  const percentage =
    totalTopics > 0 ? Math.round((completedTopicsCount / totalTopics) * 100) : 0;

  const rank = calculateStudentRank(completedTopicsCount, totalTopics);

  const MAP_W = 840;
  const MAP_H = 540;

  const geometries: TerritoryGeometry[] = useMemo(() => {
    return getMapGeometries(mapStyle, subject.chapters.length, MAP_W, MAP_H);
  }, [mapStyle, subject.chapters.length]);

  const journeyTrailPath = useMemo(() => {
    if (geometries.length < 2) return "";
    let d = `M ${geometries[0].center.x},${geometries[0].center.y}`;
    for (let i = 1; i < geometries.length; i++) {
      const prev = geometries[i - 1].center;
      const curr = geometries[i].center;
      const midX = (prev.x + curr.x) / 2;
      d += ` C ${midX},${prev.y} ${midX},${curr.y} ${curr.x},${curr.y}`;
    }
    return d;
  }, [geometries]);

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

    const numerator = bnNum(completedChaptersCount);
    const denominator = "/" + bnNum(totalChapters);

    ctx.font = `700 36px ${FONT}`;
    const denomWidth = ctx.measureText(denominator).width;
    ctx.font = `800 84px ${FONT}`;
    const numWidth = ctx.measureText(numerator).width;

    const countRightX = PW - 80;
    const denomX = countRightX - denomWidth;
    const numX = denomX - numWidth - 10;

    const studentTitle = studentName.trim()
      ? `${studentName.trim()}-এর প্রস্তুতি`
      : `আমার প্রস্তুতি`;
    ctx.fillStyle = t.muted;
    ctx.font = `700 30px ${FONT}`;
    ctx.fillText(studentTitle, textX, 106);

    const subjectTitle = subject.name;
    const maxTitleW = numX - textX - 40;
    let titleFontSize = 54;
    ctx.font = `800 ${titleFontSize}px ${FONT}`;
    while (ctx.measureText(subjectTitle).width > maxTitleW && titleFontSize > 24) {
      titleFontSize -= 2;
      ctx.font = `800 ${titleFontSize}px ${FONT}`;
    }
    ctx.fillStyle = t.ink;
    ctx.fillText(subjectTitle, textX, 180);

    const numGrad = ctx.createLinearGradient(numX, 0, denomX, 0);
    numGrad.addColorStop(0, t.v1);
    numGrad.addColorStop(1, t.v2);
    ctx.fillStyle = numGrad;
    ctx.font = `800 84px ${FONT}`;
    ctx.fillText(numerator, numX, 180);

    ctx.fillStyle = t.muted;
    ctx.font = `700 36px ${FONT}`;
    ctx.fillText(denominator, denomX, 180);

    const scaleFactor = 1.30;
    const STUDY_MAP_X = (PW - MAP_W * scaleFactor) / 2;
    const STUDY_MAP_Y = 460;

    ctx.save();
    ctx.translate(STUDY_MAP_X, STUDY_MAP_Y);
    ctx.scale(scaleFactor, scaleFactor);

    if (journeyTrailPath) {
      ctx.save();
      ctx.strokeStyle = t.track;
      ctx.lineWidth = 4;
      ctx.setLineDash([8, 8]);
      const trail = new Path2D(journeyTrailPath);
      ctx.stroke(trail);
      ctx.restore();
    }

    subject.chapters.forEach((chapter, idx) => {
      const geo = geometries[idx];
      if (!geo) return;

      const path2d = new Path2D(geo.path);
      const chTopics = chapter.topics;
      const doneCount = chTopics.filter((tp) => completedTopics.has(tp.id)).length;
      const ratio = chTopics.length > 0 ? doneCount / chTopics.length : 0;
      const isComplete = chTopics.length > 0 && doneCount === chTopics.length;

      if (isComplete) {
        const grad = ctx.createLinearGradient(0, 0, MAP_W, MAP_H);
        grad.addColorStop(0, t.v1);
        grad.addColorStop(1, t.v2);

        if (t.glow) {
          ctx.save();
          ctx.shadowColor = t.glow;
          ctx.shadowBlur = 24;
          ctx.fillStyle = grad;
          ctx.fill(path2d);
          ctx.restore();
        }

        ctx.fillStyle = grad;
        ctx.fill(path2d);
        ctx.strokeStyle = t.vStroke || "#ffffff";
        ctx.lineWidth = 2.5;
        ctx.stroke(path2d);

        if (geo.innerContour) {
          ctx.save();
          ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
          ctx.lineWidth = 1.2;
          ctx.stroke(new Path2D(geo.innerContour));
          ctx.restore();
        }
      } else if (ratio > 0) {
        ctx.fillStyle = t.land;
        ctx.fill(path2d);

        ctx.save();
        ctx.globalAlpha = Math.min(0.88, 0.20 + ratio * 0.68);
        ctx.fillStyle = t.v1;
        ctx.fill(path2d);
        ctx.restore();

        ctx.save();
        ctx.globalAlpha = Math.min(1, 0.45 + ratio * 0.55);
        ctx.strokeStyle = t.v1;
        ctx.lineWidth = 2;
        ctx.stroke(path2d);
        ctx.restore();
      } else {
        ctx.fillStyle = t.land;
        ctx.fill(path2d);
        ctx.strokeStyle = t.stroke;
        ctx.lineWidth = 1.6;
        ctx.stroke(path2d);

        if (geo.innerContour) {
          ctx.save();
          ctx.strokeStyle = "rgba(0, 0, 0, 0.05)";
          ctx.lineWidth = 1;
          ctx.stroke(new Path2D(geo.innerContour));
          ctx.restore();
        }
      }

      if (showLabels) {
        const { x: cx, y: cy } = geo.center;
        const chLabel = chapter.codeName || chapter.name;

        ctx.font = `800 15px ${FONT}`;
        ctx.textAlign = "center";

        const chPercent = chTopics.length > 0 ? Math.round((doneCount / chTopics.length) * 100) : 0;

        if (isComplete) {
          ctx.fillStyle = "#ffffff";
          ctx.fillText(chLabel, cx, cy - 4);

          ctx.font = `700 12.5px ${FONT}`;
          ctx.fillStyle = "#ffffff";
          ctx.fillText("✓ শেষ", cx, cy + 16);
        } else if (ratio >= 0.5) {
          ctx.fillStyle = "#ffffff";
          ctx.fillText(chLabel, cx, cy - 4);

          ctx.font = `700 12.5px ${FONT}`;
          ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
          ctx.fillText(`${bnNum(chPercent)}%`, cx, cy + 16);
        } else {
          ctx.fillStyle = t.ink;
          ctx.fillText(chLabel, cx, cy - 4);

          ctx.font = `700 12.5px ${FONT}`;
          ctx.fillStyle = ratio > 0 ? t.v1 : t.muted;
          ctx.fillText(`${bnNum(chPercent)}%`, cx, cy + 16);
        }
      }
    });

    ctx.restore();

    const footerY = PH - 200;
    const barW = PW - 160;

    ctx.fillStyle = t.track;
    ctx.beginPath();
    ctx.roundRect(80, footerY, barW, 12, 6);
    ctx.fill();

    if (percentage > 0) {
      const fillW = Math.max(12, (barW * percentage) / 100);
      const progGrad = ctx.createLinearGradient(80, 0, 80 + fillW, 0);
      progGrad.addColorStop(0, t.v1);
      progGrad.addColorStop(1, t.v2);
      ctx.fillStyle = progGrad;
      ctx.beginPath();
      ctx.roundRect(80, footerY, fillW, 12, 6);
      ctx.fill();
    }

    ctx.textAlign = "left";
    ctx.font = `800 34px ${FONT}`;
    ctx.fillStyle = t.ink;
    ctx.fillText(`${bnNum(percentage)}% সম্পন্ন`, 80, footerY + 52);

    ctx.font = `600 20px ${FONT}`;
    ctx.fillStyle = t.muted;
    ctx.fillText(
      `${bnNum(completedChaptersCount)}/${bnNum(totalChapters)} অধ্যায় সম্পন্ন • ${bnNum(completedTopicsCount)}টি টপিক শেষ`,
      80,
      footerY + 86
    );

    ctx.textAlign = "right";
    ctx.font = `700 22px ${FONT}`;
    ctx.fillStyle = t.v1;
    ctx.fillText(rank.title, PW - 80, footerY + 52);

    ctx.font = `600 17px ${FONT}`;
    ctx.fillStyle = t.muted;
    ctx.fillText(`শীর্ষ ${bnNum(rank.percentile)}% শিক্ষার্থী`, PW - 80, footerY + 86);

    ctx.fillStyle = t.track;
    ctx.fillRect(80, PH - 76, PW - 160, 1.5);

    if (logoImg) {
      const bobLogoSize = 38;
      ctx.drawImage(logoImg, 80, PH - 58, bobLogoSize, bobLogoSize);
    }
    ctx.textAlign = "left";
    ctx.font = `800 22px ${FONT}`;
    ctx.fillStyle = t.ink;
    const brandX = logoImg ? 80 + 38 + 14 : 80;
    ctx.fillText("Battles Of Biology", brandX, PH - 32);

    ctx.textAlign = "right";
    ctx.font = `700 18px ${FONT}`;
    ctx.fillStyle = t.muted;
    ctx.fillText("battlesofbiology.org", PW - 80, PH - 32);

    return canvas.toDataURL(format === "png" ? "image/png" : "image/jpeg", 0.95);
  };

  const handleDownload = async (format: "png" | "jpeg") => {
    try {
      setIsDownloading(format);
      const dataUrl = await generatePosterImage(format);
      const link = document.createElement("a");
      const cleanName = studentName.trim()
        ? studentName.trim().replace(/\s+/g, "_")
        : "my";
      link.download = `${cleanName}_${subject.shortName}_syllabus_map.${format === "png" ? "png" : "jpg"}`;
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
      <div className="bg-white rounded-2xl border border-[#ebe6dc] p-3.5 sm:p-5 shadow-xs space-y-3.5 order-2 lg:order-1">
        {setMapStyle && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 w-full bg-[#f3efe7] p-1 rounded-xl border border-[#ebe6dc]">
            <button
              onClick={() => setMapStyle("hexagon")}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${mapStyle === "hexagon"
                ? "bg-white text-[#0f6b4f] shadow-xs"
                : "text-[#626965] hover:text-[#17201c]"
                }`}
            >
              <Icon icon="solar:box-minimalistic-bold" className="w-3.5 h-3.5 flex-shrink-0" />
              <span>হেক্সাগন</span>
            </button>

            <button
              onClick={() => setMapStyle("atlas")}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${mapStyle === "atlas"
                ? "bg-white text-[#0f6b4f] shadow-xs"
                : "text-[#626965] hover:text-[#17201c]"
                }`}
            >
              <Icon icon="solar:map-bold" className="w-3.5 h-3.5 flex-shrink-0" />
              <span>জ্ঞান মানচিত্র</span>
            </button>

            <button
              onClick={() => setMapStyle("organic")}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${mapStyle === "organic"
                ? "bg-white text-[#0f6b4f] shadow-xs"
                : "text-[#626965] hover:text-[#17201c]"
                }`}
            >
              <Icon icon="solar:planet-bold" className="w-3.5 h-3.5 flex-shrink-0" />
              <span>দ্বীপপুঞ্জ</span>
            </button>

            <button
              onClick={() => setMapStyle("metro")}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${mapStyle === "metro"
                ? "bg-white text-[#0f6b4f] shadow-xs"
                : "text-[#626965] hover:text-[#17201c]"
                }`}
            >
              <Icon icon="solar:routing-2-bold" className="w-3.5 h-3.5 flex-shrink-0" />
              <span>জার্নি রুট</span>
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1 border-t border-[#ebe6dc]/60">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-[#626965]">থিম:</span>
            <div className="flex items-center gap-2">
              {UNSEEN_THEMES.map((th) => {
                const isChecked = activeThemeId === th.id;
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
              className="inline-flex items-center gap-1.5 border border-dashed border-[#cfc7b8] hover:border-[#0f6b4f] bg-[#faf8f4] hover:bg-white rounded-xl px-2.5 py-1.5 text-xs font-bold text-[#17201c] transition cursor-pointer flex-shrink-0 shadow-2xs"
            >
              <span
                className="w-4 h-4 rounded-md bg-[#f3efe7] bg-cover bg-center flex items-center justify-center text-[#0f6b4f]"
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
              <Icon icon="solar:user-bold" className="w-3.5 h-3.5 text-[#0f6b4f]" />
              <span>আপনার নাম:</span>
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="নাম লিখুন (যেমন: আরাভী)"
              maxLength={28}
              className="border border-[#ebe6dc] bg-[#faf8f4] focus:border-[#0f6b4f] focus:bg-white rounded-xl px-3 py-1.5 text-xs font-semibold text-[#17201c] outline-hidden transition flex-1 sm:w-40"
            />
          </div>
        </div>
      </div>

      <div
        ref={mapSvgContainerRef}
        className="relative w-full rounded-2xl overflow-hidden shadow-md select-none transition-colors duration-300 order-1 lg:order-2"
        style={{ backgroundColor: currentTheme.bg, color: currentTheme.ink }}
      >
        <div className="pt-8 sm:pt-10 px-6 sm:px-10 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            {userPhoto && (
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl p-[2.5px] shadow-xs flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.v1}, ${currentTheme.v2})`
                }}
              >
                <div
                  className="w-full h-full rounded-[13px] bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${userPhoto})`,
                    backgroundColor: currentTheme.bg
                  }}
                />
              </div>
            )}

            <div className="min-w-0">
              <span
                className="text-sm sm:text-base md:text-xl font-bold tracking-wide block truncate"
                style={{ color: currentTheme.muted }}
              >
                {studentName.trim()
                  ? `${studentName.trim()}-এর প্রস্তুতি`
                  : `আমার প্রস্তুতি`}
              </span>
              <h2
                className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight mt-0.5 truncate"
                style={{ color: currentTheme.ink }}
              >
                {subject.name}
              </h2>
            </div>
          </div>

          <div className="text-right flex-shrink-0">
            <div className="flex items-baseline justify-end gap-1">
              <span
                className="text-3xl sm:text-4xl font-extrabold"
                style={{
                  color: currentTheme.v1
                }}
              >
                {bnNum(completedChaptersCount)}
              </span>
              <span
                className="text-lg sm:text-xl font-bold"
                style={{ color: currentTheme.muted }}
              >
                /{bnNum(totalChapters)}
              </span>
            </div>
            <span
              className="text-[11px] font-semibold block"
              style={{ color: currentTheme.muted }}
            >
              অধ্যায় সম্পূর্ণ
            </span>
          </div>
        </div>

        <div className="relative w-full aspect-[840/540] px-3 sm:px-8 py-3 flex items-center justify-center">
          <svg
            viewBox={`0 0 ${MAP_W} ${MAP_H}`}
            className="w-full h-full drop-shadow-xs"
            style={{ overflow: "visible" }}
            onMouseLeave={() => {
              setHoveredChapter(null);
              setTooltipPos(null);
            }}
          >
            <defs>
              <linearGradient
                id={`studyGrad-${currentTheme.id}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor={currentTheme.v1} />
                <stop offset="100%" stopColor={currentTheme.v2} />
              </linearGradient>

              {currentTheme.glow && (
                <filter
                  id={`studyGlow-${currentTheme.id}`}
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feDropShadow
                    dx="0"
                    dy="0"
                    stdDeviation="8"
                    floodColor={currentTheme.glow}
                    floodOpacity="0.85"
                  />
                </filter>
              )}
            </defs>

            {journeyTrailPath && (
              <path
                d={journeyTrailPath}
                fill="none"
                stroke={currentTheme.track}
                strokeWidth={3}
                strokeDasharray="6 6"
                className="pointer-events-none opacity-50"
              />
            )}

            {subject.chapters.map((chapter, idx) => {
              const geo = geometries[idx];
              if (!geo) return null;

              const chTopics = chapter.topics;
              const doneCount = chTopics.filter((t) =>
                completedTopics.has(t.id)
              ).length;
              const ratio = chTopics.length > 0 ? doneCount / chTopics.length : 0;
              const isComplete =
                chTopics.length > 0 && doneCount === chTopics.length;
              const isHovered = hoveredChapter?.id === chapter.id;

              return (
                <g key={chapter.id} className="transition-transform duration-200">
                  <path
                    d={geo.path}
                    onClick={() => {
                      setActiveChapterModal(chapter);
                      if (onSelectChapter) onSelectChapter(chapter.id);
                    }}
                    onDoubleClick={() => {
                      onToggleChapter(chapter);
                    }}
                    onMouseEnter={(e) => {
                      setHoveredChapter(chapter);
                      if (mapSvgContainerRef.current) {
                        const rect =
                          mapSvgContainerRef.current.getBoundingClientRect();
                        setTooltipPos({
                          x: e.clientX - rect.left,
                          y: e.clientY - rect.top
                        });
                      }
                    }}
                    onMouseMove={(e) => {
                      if (mapSvgContainerRef.current) {
                        const rect =
                          mapSvgContainerRef.current.getBoundingClientRect();
                        setTooltipPos({
                          x: e.clientX - rect.left,
                          y: e.clientY - rect.top
                        });
                      }
                    }}
                    className="cursor-pointer transition-all duration-200 hover:opacity-90"
                    style={{
                      fill: isComplete
                        ? `url(#studyGrad-${currentTheme.id})`
                        : currentTheme.land,
                      stroke: isComplete
                        ? (currentTheme.vStroke || "#ffffff")
                        : ratio > 0
                          ? currentTheme.v1
                          : currentTheme.stroke,
                      strokeWidth: isComplete ? 2.5 : ratio > 0 ? 2 : 1.5,
                      filter:
                        isComplete && currentTheme.glow
                          ? `url(#studyGlow-${currentTheme.id})`
                          : undefined,
                      transformOrigin: `${geo.center.x}px ${geo.center.y}px`,
                      transform: isHovered ? "scale(1.025)" : "scale(1)"
                    }}
                  />

                  {ratio > 0 && !isComplete && (
                    <path
                      d={geo.path}
                      className="pointer-events-none transition-opacity duration-300"
                      style={{
                        fill: currentTheme.v1,
                        opacity: Math.min(0.88, 0.20 + ratio * 0.68),
                        transformOrigin: `${geo.center.x}px ${geo.center.y}px`,
                        transform: isHovered ? "scale(1.025)" : "scale(1)"
                      }}
                    />
                  )}

                  {geo.innerContour && (
                    <path
                      d={geo.innerContour}
                      fill="none"
                      stroke={
                        isComplete
                          ? "rgba(255, 255, 255, 0.4)"
                          : "rgba(0, 0, 0, 0.08)"
                      }
                      strokeWidth={1.2}
                      className="pointer-events-none"
                    />
                  )}

                  {showLabels && (
                    <g className="pointer-events-none select-none">
                      <text
                        x={geo.center.x}
                        y={geo.center.y - 4}
                        textAnchor="middle"
                        style={{
                          fontFamily:
                            '"Baloo Da 2", "Hind Siliguri", "Noto Sans Bengali", sans-serif',
                          fontSize: "14.5px",
                          fontWeight: 800,
                          fill: isComplete
                            ? "#ffffff"
                            : ratio >= 0.5
                              ? "#ffffff"
                              : currentTheme.ink
                        }}
                      >
                        {chapter.codeName || chapter.name}
                      </text>

                      <text
                        x={geo.center.x}
                        y={geo.center.y + 16}
                        textAnchor="middle"
                        style={{
                          fontFamily:
                            '"Baloo Da 2", "Hind Siliguri", "Noto Sans Bengali", sans-serif',
                          fontSize: "12px",
                          fontWeight: 700,
                          fill: isComplete
                            ? "#ffffff"
                            : ratio >= 0.5
                              ? "rgba(255, 255, 255, 0.95)"
                              : ratio > 0
                                ? currentTheme.v1
                                : currentTheme.muted
                        }}
                      >
                        {isComplete
                          ? "✓ শেষ"
                          : `${bnNum(Math.round(ratio * 100))}%`}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {hoveredChapter && tooltipPos && !activeChapterModal && (
            <div
              className="absolute pointer-events-none px-3.5 py-2 rounded-xl text-xs font-bold shadow-xl z-20 transform -translate-x-1/2 -translate-y-full transition-all duration-75 space-y-0.5"
              style={{
                left: tooltipPos.x,
                top: tooltipPos.y - 14,
                backgroundColor: currentTheme.ink,
                color: currentTheme.bg
              }}
            >
              <div className="flex items-center gap-1.5">
                <span>
                  {hoveredChapter.codeName}: {hoveredChapter.name}
                </span>
                {hoveredChapter.topics.every((t) => completedTopics.has(t.id)) && (
                  <span className="text-[#3ddc97]">✓ সম্পূর্ণ</span>
                )}
              </div>
              {(() => {
                const done = hoveredChapter.topics.filter((t) => completedTopics.has(t.id)).length;
                const total = hoveredChapter.topics.length;
                const pct = total > 0 ? Math.round((done / total) * 100) : 0;
                return (
                  <p className="text-[10px] opacity-80">
                    {bnNum(pct)}% সম্পন্ন ({bnNum(done)}/{bnNum(total)} টপিক) • ট্যাপ করে বিস্তারিত দেখুন
                  </p>
                );
              })()}
            </div>
          )}
        </div>

        {activeChapterModal && (
          <div className="absolute inset-0 z-30 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div
              className="w-full max-w-sm rounded-2xl p-5 shadow-2xl border space-y-4 animate-in fade-in zoom-in-95 duration-150"
              style={{
                backgroundColor: currentTheme.bg,
                color: currentTheme.ink,
                borderColor: currentTheme.vStroke || currentTheme.stroke
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span
                    className="text-xs font-bold uppercase tracking-wider block"
                    style={{ color: currentTheme.muted }}
                  >
                    {activeChapterModal.codeName} • {subject.shortName}
                  </span>
                  <h3
                    className="text-lg font-extrabold mt-0.5 leading-snug"
                    style={{ color: currentTheme.ink }}
                  >
                    {activeChapterModal.name}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveChapterModal(null)}
                  className="w-7 h-7 rounded-full flex items-center justify-center hover:opacity-75 transition cursor-pointer"
                  style={{
                    backgroundColor: currentTheme.track,
                    color: currentTheme.ink
                  }}
                >
                  ✕
                </button>
              </div>

              {(() => {
                const isAllDone = activeChapterModal.topics.every((t) =>
                  completedTopics.has(t.id)
                );
                return (
                  <button
                    onClick={() => {
                      onToggleChapter(activeChapterModal);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                    style={{
                      background: isAllDone
                        ? currentTheme.track
                        : `linear-gradient(135deg, ${currentTheme.v1}, ${currentTheme.v2})`,
                      color: isAllDone ? currentTheme.ink : "#ffffff"
                    }}
                  >
                    <Icon
                      icon={isAllDone ? "solar:close-circle-bold" : "solar:check-circle-bold"}
                      className="w-4 h-4"
                    />
                    <span>
                      {isAllDone
                        ? "অধ্যায় অসম্পূর্ণ করুন"
                        : "পুরো অধ্যায় একসাথে সম্পন্ন করুন ✓"}
                    </span>
                  </button>
                );
              })()}

              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                <span
                  className="text-[11px] font-bold block mb-1"
                  style={{ color: currentTheme.muted }}
                >
                  টপিকভিত্তিক অগ্রগতি:
                </span>
                {activeChapterModal.topics.map((tp) => {
                  const isDone = completedTopics.has(tp.id);
                  return (
                    <div
                      key={tp.id}
                      onClick={() => onToggleTopic && onToggleTopic(tp.id)}
                      className="flex items-center gap-2 p-2 rounded-lg text-xs cursor-pointer transition hover:opacity-90"
                      style={{
                        backgroundColor: isDone
                          ? currentTheme.track
                          : "rgba(0, 0, 0, 0.04)"
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={() => { }}
                        className="w-3.5 h-3.5 accent-[#0f6b4f] rounded cursor-pointer"
                      />
                      <span
                        className="flex-1 font-semibold"
                        style={{
                          color: isDone ? currentTheme.ink : currentTheme.muted
                        }}
                      >
                        {tp.name}
                      </span>
                      {isDone && <span className="text-[#3ddc97] text-xs font-bold">✓</span>}
                    </div>
                  );
                })}
              </div>

              <div className="pt-1 flex justify-end">
                <button
                  onClick={() => setActiveChapterModal(null)}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg underline cursor-pointer"
                  style={{ color: currentTheme.muted }}
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="pb-6 sm:pb-8 px-6 sm:px-10 space-y-4">
          <div
            className="w-full h-2.5 rounded-full overflow-hidden"
            style={{ backgroundColor: currentTheme.track }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.max(percentage, 2)}%`,
                background: `linear-gradient(90deg, ${currentTheme.v1}, ${currentTheme.v2})`
              }}
            />
          </div>

          <div className="flex items-center justify-between gap-3 pt-0.5">
            <div>
              <p
                className="text-base sm:text-lg font-black tracking-tight"
                style={{ color: currentTheme.ink }}
              >
                {bnNum(percentage)}% সম্পন্ন
              </p>
              <p
                className="text-xs font-semibold"
                style={{ color: currentTheme.muted }}
              >
                {bnNum(completedChaptersCount)}/{bnNum(totalChapters)} অধ্যায় সম্পন্ন • {bnNum(completedTopicsCount)}টি টপিক শেষ
              </p>
            </div>

            <div className="text-right">
              <span
                className="text-xs sm:text-sm font-bold block"
                style={{ color: currentTheme.v1 }}
              >
                {rank.title}
              </span>
              <span
                className="text-[11px] font-semibold"
                style={{ color: currentTheme.muted }}
              >
                শীর্ষ {bnNum(rank.percentile)}% শিক্ষার্থী
              </span>
            </div>
          </div>

          <div
            className="pt-3 border-t flex items-center justify-between text-xs font-bold"
            style={{
              borderColor: currentTheme.track,
              color: currentTheme.muted
            }}
          >
            <div className="flex items-center gap-2">
              <img
                src="/bob-logo.svg"
                alt="Battles Of Biology"
                className="w-4 h-4 object-contain inline-block"
              />
              <span style={{ color: currentTheme.ink }}>
                Battles Of Biology
              </span>
            </div>
            <a
              href="https://www.battlesofbiology.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] hover:underline"
              style={{ color: currentTheme.muted }}
            >
              battlesofbiology.org
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#ebe6dc] p-4 sm:p-5 shadow-xs space-y-3 order-3">
        <h3 className="text-sm font-extrabold text-[#17201c]">
          ডাউনলোড করুন
        </h3>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => handleDownload("png")}
            disabled={isDownloading !== null}
            className="flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 bg-[#17201c] hover:bg-black text-white text-xs sm:text-sm font-bold px-4 py-3 rounded-xl transition cursor-pointer shadow-xs disabled:opacity-50"
          >
            <Icon icon="solar:download-minimalistic-bold" className="w-4 h-4" />
            <span>{isDownloading === "png" ? "তৈরি হচ্ছে..." : "↓ PNG"}</span>
          </button>

          <button
            onClick={() => handleDownload("jpeg")}
            disabled={isDownloading !== null}
            className="flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 bg-white hover:bg-[#faf8f4] border border-[#ebe6dc] text-[#17201c] text-xs sm:text-sm font-bold px-4 py-3 rounded-xl transition cursor-pointer shadow-xs disabled:opacity-50"
          >
            <Icon icon="solar:gallery-download-bold" className="w-4 h-4" />
            <span>{isDownloading === "jpeg" ? "তৈরি হচ্ছে..." : "↓ JPG"}</span>
          </button>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-[#e3f0ea] to-[#f6f1e4] border border-[#cfe3d9] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/80 border border-[#cfe3d9] flex items-center justify-center text-[#0f6b4f]">
              <Icon icon="solar:cup-star-bold" className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-[#626965] font-semibold">
                আপনার বর্তমান সিলেবাস অগ্রগতি
              </p>
              <p className="text-sm font-extrabold text-[#0f6b4f]">
                {rank.title} • {rank.tier} (শীর্ষ {bnNum(rank.percentile)}%)
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-lg font-black text-[#0f6b4f]">
              {bnNum(percentage)}%
            </span>
            <span className="text-xs text-[#626965] block font-bold">
              সম্পন্ন
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
