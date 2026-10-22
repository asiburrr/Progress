"use client";

import React, { useState, useEffect, useMemo } from "react";
import { HSC_SUBJECTS, Subject, Chapter } from "@/data/hsc-syllabus";
import { MEDICAL_SUBJECTS, MEDICAL_WEIGHTS } from "@/data/medical-syllabus";
import { SyllabusMap } from "@/components/syllabus-map";
import { ChapterSelector } from "@/components/chapter-selector";
import { MedicalFullCardModal } from "@/components/medical-full-card-modal";
import { MedicalFullCardView } from "@/components/medical-full-card-view";
import { UNSEEN_THEMES } from "@/data/map-data";
import { fetchSubjects } from "@/services/api";
import { Icon } from "@iconify/react";
import { MapStyleType } from "@/data/map-geometries";
import { bnNum } from "@/data/map-data";

export type TrackMode = "hsc" | "medical";

export default function Home() {
  const [trackMode, setTrackMode] = useState<TrackMode>("hsc");
  const [hscSubjects, setHscSubjects] = useState<Subject[]>(HSC_SUBJECTS);
  const [activeSubjectId, setActiveSubjectId] = useState<string>(HSC_SUBJECTS[0].id);
  const [activeThemeId, setActiveThemeId] = useState<string>(UNSEEN_THEMES[0].id);
  const [studentName, setStudentName] = useState<string>("");
  const [mapStyle, setMapStyle] = useState<MapStyleType>("hexagon");
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [isMedicalCardModalOpen, setIsMedicalCardModalOpen] = useState(false);
  const [medicalViewType, setMedicalViewType] = useState<"card" | "map">("card");
  const chapterSectionRef = React.useRef<HTMLDivElement>(null);

  const [isMounted, setIsMounted] = useState(false);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(
    () => new Set<string>()
  );

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedTopics = localStorage.getItem("hsc_completed_topics_v3");
      if (savedTopics) {
        setCompletedTopics(new Set(JSON.parse(savedTopics)));
      }
      const savedMode = localStorage.getItem("bob_track_mode") as TrackMode | null;
      if (savedMode === "hsc" || savedMode === "medical") {
        setTrackMode(savedMode);
        if (savedMode === "medical") {
          setActiveSubjectId(MEDICAL_SUBJECTS[0].id);
        }
      }
    } catch (e) {
      console.error("Failed to load progress from localStorage", e);
    }
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const loaded = await fetchSubjects();
        if (loaded && loaded.length > 0) {
          setHscSubjects(loaded);
        }
      } catch (err) {
        console.error("API error", err);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem(
        "hsc_completed_topics_v3",
        JSON.stringify(Array.from(completedTopics))
      );
      localStorage.setItem("bob_track_mode", trackMode);
    } catch (e) {
      console.error("Failed to save progress to localStorage", e);
    }
  }, [completedTopics, trackMode, isMounted]);

  const currentSubjects = trackMode === "medical" ? MEDICAL_SUBJECTS : hscSubjects;

  const currentSubject = useMemo(() => {
    return (
      currentSubjects.find((s) => s.id === activeSubjectId) ||
      currentSubjects[0]
    );
  }, [currentSubjects, activeSubjectId]);

  const handleSwitchMode = (mode: TrackMode) => {
    setTrackMode(mode);
    setSelectedChapterId(null);
    if (mode === "medical") {
      setActiveSubjectId(MEDICAL_SUBJECTS[0].id);
      setMedicalViewType("card");
    } else {
      setActiveSubjectId(hscSubjects[0].id);
    }
  };

  const handleSelectSubject = (subjectId: string) => {
    setActiveSubjectId(subjectId);
    setSelectedChapterId(null);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setTimeout(() => {
        chapterSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  };

  const handleToggleTopic = (topicId: string) => {
    setCompletedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      return next;
    });
  };

  const handleToggleChapter = (chapter: Chapter) => {
    setCompletedTopics((prev) => {
      const next = new Set(prev);
      const isChapterComplete =
        chapter.topics.length > 0 &&
        chapter.topics.every((t) => prev.has(t.id));

      if (isChapterComplete) {
        chapter.topics.forEach((t) => next.delete(t.id));
      } else {
        chapter.topics.forEach((t) => next.add(t.id));
      }
      return next;
    });
  };

  const handleSelectAllSubject = (sub: Subject) => {
    setCompletedTopics((prev) => {
      const next = new Set(prev);
      sub.chapters.forEach((ch) => {
        ch.topics.forEach((t) => next.add(t.id));
      });
      return next;
    });
  };

  const handleResetSubject = (sub: Subject) => {
    setCompletedTopics((prev) => {
      const next = new Set(prev);
      sub.chapters.forEach((ch) => {
        ch.topics.forEach((t) => next.delete(t.id));
      });
      return next;
    });
  };

  const currentTotalTopics = currentSubject.chapters.reduce(
    (acc: number, ch: Chapter) => acc + ch.topics.length,
    0
  );
  const currentDoneTopics = currentSubject.chapters.reduce(
    (acc: number, ch: Chapter) =>
      acc + ch.topics.filter((t) => completedTopics.has(t.id)).length,
    0
  );
  const currentPercent =
    currentTotalTopics > 0
      ? Math.round((currentDoneTopics / currentTotalTopics) * 100)
      : 0;

  const medicalBreakdown = useMemo(() => {
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

  const medicalTotalScore = useMemo(() => {
    const sum = medicalBreakdown.reduce((acc, item) => acc + item.earnedMarks, 0);
    return Math.min(100, Math.round(sum * 10) / 10);
  }, [medicalBreakdown]);

  const hscOverallStats = useMemo(() => {
    let total = 0;
    let done = 0;
    hscSubjects.forEach((sub) => {
      sub.chapters.forEach((ch) => {
        total += ch.topics.length;
        done += ch.topics.filter((t) => completedTopics.has(t.id)).length;
      });
    });
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    return { total, done, percent };
  }, [hscSubjects, completedTopics]);

  const currentModeOverallPercent =
    trackMode === "medical"
      ? Math.round(medicalTotalScore)
      : hscOverallStats.percent;

  return (
    <div className="min-h-screen bg-[#faf8f4] text-[#17201c] flex flex-col font-sans">
      <header className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3 border-b border-[#ebe6dc]/70 bg-[#faf8f4]/95 sticky top-0 z-30">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-xs flex-shrink-0 transition-colors ${trackMode === "medical" ? "bg-[#b91c1c]" : "bg-[#0f6b4f]"
              }`}
          >
            {trackMode === "medical" ? "MED" : "HSC"}
          </div>
          <div className="min-w-0">
            <h1 className="text-sm sm:text-base font-extrabold text-[#17201c] tracking-tight truncate leading-tight">
              {trackMode === "medical" ? "প্রগ্রেস ট্র্যাকার" : "প্রগ্রেস ট্র্যাকার"}
            </h1>
            <p className="text-[11px] text-[#626965] font-semibold truncate">
              {trackMode === "medical"
                ? "মেডিকেল ভর্তি প্রগ্রেস ম্যাপ"
                : "বিজ্ঞান বিষয়ভিত্তিক অগ্রগতি মানচিত্র"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {trackMode === "medical" ? (
            <div className="flex items-center gap-2">
              <div
                onClick={() => setIsMedicalCardModalOpen(true)}
                className="inline-flex items-center gap-1.5 bg-[#fef2f2] border border-[#fecaca] px-3 py-1 rounded-full text-xs font-bold text-[#b91c1c] shadow-xs cursor-pointer hover:bg-[#fee2e2] transition"
                title="কার্ড দেখতে ক্লিক করুন"
              >
                <Icon icon="solar:stethoscope-bold" className="w-3.5 h-3.5 text-[#b91c1c]" />
                <span suppressHydrationWarning>
                  {bnNum(Math.round(medicalTotalScore))}/১০০
                </span>
              </div>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 bg-[#e3f0ea] border border-[#cce4d8] px-3 py-1 rounded-full text-xs font-bold text-[#0f6b4f] shadow-xs">
              <Icon icon="solar:check-circle-bold" className="w-3.5 h-3.5 text-[#0f6b4f]" />
              <span suppressHydrationWarning>{bnNum(currentPercent)}% সম্পন্ন</span>
            </div>
          )}
        </div>
      </header>

      <section className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 pt-6 pb-4 text-center space-y-3">
        <div className="inline-flex items-center p-1 bg-[#ede8df] rounded-2xl border border-[#ded8cc] shadow-inner max-w-md mx-auto w-full">
          <button
            onClick={() => handleSwitchMode("hsc")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer ${trackMode === "hsc"
              ? "bg-[#0f6b4f] text-white shadow-sm"
              : "text-[#626965] hover:text-[#17201c]"
              }`}
          >
            <Icon icon="solar:graduation-cap-bold-duotone" className="w-4 h-4 flex-shrink-0" />
            <span>এইচএসসি একাডেমি</span>
          </button>
          <button
            onClick={() => handleSwitchMode("medical")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer ${trackMode === "medical"
              ? "bg-[#b91c1c] text-white shadow-sm"
              : "text-[#626965] hover:text-[#17201c]"
              }`}
          >
            <Icon icon="solar:stethoscope-bold-duotone" className="w-4 h-4 flex-shrink-0" />
            <span>মেডিকেল প্রস্তুতি</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#17201c] max-w-3xl mx-auto leading-tight">
          {trackMode === "medical" ? (
            <>
              মেডিকেল ভর্তি পরীক্ষার{" "}
              <span className="bg-gradient-to-r from-[#b91c1c] via-[#dc2626] to-[#0f6b4f] bg-clip-text text-transparent">
                সিলেবাস কতটুকু সম্পন্ন হয়েছে?
              </span>
            </>
          ) : (
            <>
              এইচএসসি সিলেবাসের{" "}
              <span className="bg-gradient-to-r from-[#0f6b4f] via-[#1f9a70] to-[#b91c1c] bg-clip-text text-transparent">
                কতটুকু সম্পূর্ণ করেছেন?
              </span>
            </>
          )}
        </h1>

        <p className="text-[#626965] text-xs sm:text-sm max-w-xl mx-auto">
          {trackMode === "medical"
            ? "সম্পন্ন করা অধ্যায়গুলো চিহ্নিত করুন এবং নিজের প্রস্তুতি কার্ড ডাউনলোড করুন।"
            : "ম্যাপে সরাসরি ট্যাপ করে সম্পন্ন করা অধ্যায়গুলো চিহ্নিত করুন এবং নিজের প্রস্তুতি কার্ড ডাউনলোড করুন।"}
        </p>
      </section>

      <main className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 pb-16 flex-1 space-y-6">

        {/* Medical Exam Weightage Scorecard (Active in Medical Mode) */}
        {trackMode === "medical" && (
          <div className="bg-white rounded-2xl border border-[#ebe6dc] p-4 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-[#ebe6dc] pb-2.5">
              <div className="flex items-center gap-2">
                <Icon icon="solar:stethoscope-bold" className="w-4 h-4 text-[#b91c1c]" />
                <span className="text-xs sm:text-sm font-extrabold text-[#17201c]">
                  বিষয় নির্বাচন করুন
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                <span className="px-2.5 py-0.5 rounded-full bg-[#fef2f2] text-[#b91c1c] font-black border border-[#fecaca]">
                  {bnNum(medicalTotalScore)} / ১০০
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {medicalBreakdown.map((item) => {
                const isSelected = item.id === activeSubjectId;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectSubject(item.id)}
                    className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${isSelected
                      ? "bg-[#fef2f2] border-[#b91c1c] shadow-xs"
                      : "bg-[#faf8f4] border-[#ebe6dc] hover:bg-[#f3efe7]"
                      }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[11px] font-bold text-[#17201c] truncate">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-md bg-[#ebe6dc] text-[#454c48]">
                        {bnNum(item.marksAllocated)}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="w-full bg-[#e8e2d5] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#b91c1c] h-full rounded-full transition-all duration-300"
                          style={{ width: `${item.percent}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-[#626965] font-semibold">
                        <span>{bnNum(item.earnedMarks)} নম্বর</span>
                        <span className="font-bold text-[#b91c1c]">{bnNum(item.percent)}%</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Subject Selector (Active in HSC Mode; Medical mode uses the upper 100-mark Scoreboard) */}
        {trackMode !== "medical" && (
          <div className="bg-white rounded-2xl border border-[#ebe6dc] p-3.5 sm:p-4 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between border-b border-[#ebe6dc] pb-2 px-1">
              <span className="text-xs font-bold text-[#17201c] flex items-center gap-1.5">
                <Icon
                  icon="solar:book-bookmark-bold"
                  className="w-4 h-4 text-[#0f6b4f]"
                />
                <span>বিষয় নির্বাচন করুন</span>
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full text-[#0f6b4f] bg-[#e3f0ea]">
                ৯টি বিষয়
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {currentSubjects.map((sub) => {
                const isActive = sub.id === activeSubjectId;

                return (
                  <button
                    key={sub.id}
                    onClick={() => handleSelectSubject(sub.id)}
                    className={`flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer text-left ${isActive
                      ? "bg-[#0f6b4f] text-white shadow-xs scale-[1.01]"
                      : "bg-[#f3efe7] text-[#17201c] hover:bg-[#e8e2d5] border border-[#e4ded3]"
                      }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Icon
                        icon={sub.icon}
                        className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-white" : "text-[#0f6b4f]"}`}
                      />
                      <span className="truncate">{sub.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Chapter Checklist & Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div ref={chapterSectionRef} className="lg:col-span-5 order-1 scroll-mt-20">
            <ChapterSelector
              subject={currentSubject}
              completedTopics={completedTopics}
              onToggleTopic={handleToggleTopic}
              onToggleChapter={handleToggleChapter}
              onSelectAllSubject={() => handleSelectAllSubject(currentSubject)}
              onResetSubject={() => handleResetSubject(currentSubject)}
              selectedChapterId={selectedChapterId}
              onFocusChapter={(id) => setSelectedChapterId(id)}
            />
          </div>

          <div className="lg:col-span-7 order-2 space-y-4">
            {trackMode === "medical" && (
              <div className="flex items-center justify-between p-1 bg-[#ede8df] rounded-2xl border border-[#ded8cc]">
                <button
                  onClick={() => setMedicalViewType("card")}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer ${medicalViewType === "card"
                    ? "bg-[#b91c1c] text-white shadow-xs"
                    : "text-[#626965] hover:text-[#17201c]"
                    }`}
                >
                  <Icon icon="solar:card-2-bold" className="w-4 h-4 flex-shrink-0" />
                  <span>পূর্ণাঙ্গ মেডিকেল কার্ড (৭টি বিষয়)</span>
                </button>
                <button
                  onClick={() => setMedicalViewType("map")}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer ${medicalViewType === "map"
                    ? "bg-white text-[#17201c] shadow-xs"
                    : "text-[#626965] hover:text-[#17201c]"
                    }`}
                >
                  <Icon icon="solar:map-point-wave-bold" className="w-4 h-4 flex-shrink-0 text-[#b91c1c]" />
                  <span>বিষয়ভিত্তিক মানচিত্র ({currentSubject.shortName})</span>
                </button>
              </div>
            )}

            {trackMode === "medical" && medicalViewType === "card" ? (
              <MedicalFullCardView
                completedTopics={completedTopics}
                studentName={studentName}
                setStudentName={setStudentName}
                activeThemeId={activeThemeId}
                setActiveThemeId={setActiveThemeId}
                onSelectSubject={(id) => {
                  handleSelectSubject(id);
                  setMedicalViewType("map");
                }}
              />
            ) : (
              <SyllabusMap
                subject={currentSubject}
                completedTopics={completedTopics}
                onToggleChapter={handleToggleChapter}
                onToggleTopic={handleToggleTopic}
                activeThemeId={activeThemeId}
                setActiveThemeId={setActiveThemeId}
                studentName={studentName}
                setStudentName={setStudentName}
                selectedChapterId={selectedChapterId}
                onSelectChapter={(id) => setSelectedChapterId(id)}
                mapStyle={mapStyle}
                setMapStyle={setMapStyle}
              />
            )}
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-[#ebe6dc] max-w-[1240px] w-full mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-center text-xs text-[#626965] gap-3">
        <div className="flex items-center">
          <img
            src="/bob-logo.svg"
            alt="Battles Of Biology"
            className="h-6 w-6 object-contain"
          />
          <p>
            &nbsp; Battles Of Biology • HSC Academic to Admission
          </p>
        </div>
      </footer>

      {/* Full Medical Admission Progress Card Modal */}
      <MedicalFullCardModal
        isOpen={isMedicalCardModalOpen}
        onClose={() => setIsMedicalCardModalOpen(false)}
        completedTopics={completedTopics}
        studentName={studentName}
        setStudentName={setStudentName}
        activeThemeId={activeThemeId}
      />
    </div>
  );
}
