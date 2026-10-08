"use client";

import React, { useState, useEffect } from "react";
import { HSC_SUBJECTS, Subject, Chapter } from "@/data/hsc-syllabus";
import { SyllabusMap } from "@/components/syllabus-map";
import { ChapterSelector } from "@/components/chapter-selector";
import { UNSEEN_THEMES } from "@/data/map-data";
import { fetchSubjects } from "@/services/api";
import { Icon } from "@iconify/react";
import { MapStyleType } from "@/data/map-geometries";
import { bnNum } from "@/data/map-data";

export default function Home() {
  const [subjects, setSubjects] = useState<Subject[]>(HSC_SUBJECTS);
  const [activeSubjectId, setActiveSubjectId] = useState<string>(
    HSC_SUBJECTS[0].id
  );
  const [activeThemeId, setActiveThemeId] = useState<string>(
    UNSEEN_THEMES[0].id
  );
  const [studentName, setStudentName] = useState<string>("");
  const [mapStyle, setMapStyle] = useState<MapStyleType>("hexagon");
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const chapterSectionRef = React.useRef<HTMLDivElement>(null);

  const handleSelectSubject = (subjectId: string) => {
    setActiveSubjectId(subjectId);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setTimeout(() => {
        chapterSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  };

  const [isMounted, setIsMounted] = useState(false);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(
    () => new Set<string>()
  );

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem("hsc_completed_topics_v3");
      if (saved) {
        setCompletedTopics(new Set(JSON.parse(saved)));
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
          setSubjects(loaded);
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
    } catch (e) {
      console.error("Failed to save progress to localStorage", e);
    }
  }, [completedTopics, isMounted]);

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

  const currentSubject =
    subjects.find((s) => s.id === activeSubjectId) || subjects[0];

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

  return (
    <div className="min-h-screen bg-[#faf8f4] text-[#17201c] flex flex-col font-sans">
      <header className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3 border-b border-[#ebe6dc]/70 bg-[#faf8f4]/95 sticky top-0 z-30">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#0f6b4f] flex items-center justify-center text-white font-black text-xs shadow-xs flex-shrink-0">
            HSC
          </div>
          <div className="min-w-0">
            <h1 className="text-sm sm:text-base font-extrabold text-[#17201c] tracking-tight truncate leading-tight">
              প্রগ্রেস ট্র্যাকার
            </h1>
            <p className="text-[11px] text-[#626965] font-semibold truncate">
              বিজ্ঞান বিষয়ভিত্তিক অগ্রগতি মানচিত্র
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 bg-[#e3f0ea] border border-[#cce4d8] px-3 py-1 rounded-full text-xs font-bold text-[#0f6b4f] flex-shrink-0 shadow-xs">
          <Icon icon="solar:check-circle-bold" className="w-3.5 h-3.5 text-[#0f6b4f]" />
          <span suppressHydrationWarning>{bnNum(currentPercent)}% সম্পন্ন</span>
        </div>
      </header>

      <section className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 pt-6 pb-4 text-center">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#17201c] max-w-3xl mx-auto leading-tight">
          এইচএসসি সিলেবাসের{" "}
          <span className="bg-gradient-to-r from-[#0f6b4f] via-[#1f9a70] to-[#b91c1c] bg-clip-text text-transparent">
            কতটুকু সম্পূর্ণ করেছেন?
          </span>
        </h1>

        <p className="text-[#626965] text-xs sm:text-sm max-w-xl mx-auto mt-2">
          ম্যাপে সরাসরি ট্যাপ করে সম্পন্ন করা অধ্যায়গুলো চিহ্নিত করুন এবং নিজের প্রস্তুতি কার্ড ডাউনলোড করুন।
        </p>
      </section>

      <main className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 pb-16 flex-1 space-y-6">
        <div className="bg-white rounded-2xl border border-[#ebe6dc] p-3.5 sm:p-4 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between border-b border-[#ebe6dc] pb-2 px-1">
            <span className="text-xs font-bold text-[#17201c] flex items-center gap-1.5">
              <Icon icon="solar:book-bookmark-bold" className="w-4 h-4 text-[#0f6b4f]" />
              <span>বিষয় নির্বাচন করুন</span>
            </span>
            <span className="text-[11px] font-bold text-[#0f6b4f] bg-[#e3f0ea] px-2.5 py-0.5 rounded-full">
              ৯টি বিষয়
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {subjects.map((sub) => {
              const isActive = sub.id === activeSubjectId;
              return (
                <button
                  key={sub.id}
                  onClick={() => handleSelectSubject(sub.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer text-left ${isActive
                    ? "bg-[#0f6b4f] text-white shadow-xs scale-[1.01]"
                    : "bg-[#f3efe7] text-[#17201c] hover:bg-[#e8e2d5] border border-[#e4ded3]"
                    }`}
                >
                  <Icon
                    icon={sub.icon}
                    className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-white" : "text-[#0f6b4f]"
                      }`}
                  />
                  <span className="truncate">{sub.name}</span>
                </button>
              );
            })}
          </div>
        </div>

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
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-[#ebe6dc] max-w-[1240px] w-full mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-center text-xs text-[#626965] gap-3">
        <div className="flex items-center gap-2.5">
          <img
            src="/bob-logo.svg"
            alt="Battles Of Biology"
            className="h-6 w-6 object-contain"
          />
          <p>
            Battles Of Biology • HSC Academic to Admission
          </p>
        </div>
      </footer>
    </div>
  );
}
