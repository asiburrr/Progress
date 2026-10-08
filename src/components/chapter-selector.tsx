"use client";

import React, { useState } from "react";
import { Chapter, Subject } from "@/data/hsc-syllabus";
import { bnNum } from "@/data/map-data";
import { Icon } from "@iconify/react";

interface ChapterSelectorProps {
  subject: Subject;
  completedTopics: Set<string>;
  onToggleTopic: (topicId: string) => void;
  onToggleChapter: (chapter: Chapter) => void;
  onSelectAllSubject: () => void;
  onResetSubject: () => void;
  selectedChapterId: string | null;
  onFocusChapter: (chapterId: string) => void;
}

export function ChapterSelector({
  subject,
  completedTopics,
  onToggleTopic,
  onToggleChapter,
  onSelectAllSubject,
  onResetSubject,
  selectedChapterId,
  onFocusChapter
}: ChapterSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedChapterId, setExpandedChapterId] = useState<string | null>(
    selectedChapterId || subject.chapters[0]?.id || null
  );

  React.useEffect(() => {
    if (selectedChapterId) {
      setExpandedChapterId(selectedChapterId);
    }
  }, [selectedChapterId]);

  const totalTopics = subject.chapters.reduce(
    (a, c) => a + c.topics.length,
    0
  );
  const completedTopicsCount = subject.chapters.reduce(
    (a, c) => a + c.topics.filter((t) => completedTopics.has(t.id)).length,
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

  const filteredChapters = subject.chapters.filter((chapter) => {
    const q = searchQuery.toLowerCase();
    const matchesChapter =
      chapter.name.toLowerCase().includes(q) ||
      chapter.codeName.toLowerCase().includes(q) ||
      chapter.englishName.toLowerCase().includes(q);
    const matchesTopics = chapter.topics.some((t) =>
      t.name.toLowerCase().includes(q)
    );
    return matchesChapter || matchesTopics;
  });

  return (
    <aside className="w-full bg-white rounded-2xl border border-[#ebe6dc] p-4 sm:p-5 shadow-xs flex flex-col space-y-3.5">
      <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#ebe6dc]">
        <div>
          <h2 className="text-base font-extrabold text-[#17201c] tracking-tight">
            যেসব অধ্যায় পড়েছি
          </h2>
          <p className="text-[11px] text-[#626965]">
            পড়া শেষ হওয়া অধ্যায় ও টপিকে টিকচিহ্ন দাও
          </p>
        </div>

        <span className="text-xs font-bold text-[#0f6b4f] bg-[#e3f0ea] px-3 py-1 rounded-full font-mono">
          {bnNum(completedChaptersCount)} / {bnNum(totalChapters)} অধ্যায়
        </span>
      </div>

      <div className="relative">
        <Icon
          icon="solar:magnifer-linear"
          className="w-4 h-4 text-[#8a918d] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="টপিক বা অধ্যায় খুঁজুন (যেমন: ভেক্টর, গতিবিদ্যা, জেনেটিক্স)..."
          className="w-full bg-[#faf8f4] border border-[#ebe6dc] rounded-xl pl-9 pr-8 py-2 text-xs text-[#17201c] placeholder-[#8a918d] focus:outline-hidden focus:border-[#0f6b4f] focus:bg-white transition"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8a918d] hover:text-[#17201c] cursor-pointer"
          >
            <Icon icon="solar:close-circle-bold" className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between text-xs pt-0.5">
        <div className="flex items-center gap-3">
          <button
            onClick={onSelectAllSubject}
            className="text-[#626965] hover:text-[#17201c] font-semibold underline underline-offset-3 cursor-pointer"
          >
            সব বাছাই করুন
          </button>
          <span className="text-[#ebe6dc]">•</span>
          <button
            onClick={onResetSubject}
            className="text-[#626965] hover:text-[#991b1b] font-semibold underline underline-offset-3 cursor-pointer"
          >
            সব মুছুন
          </button>
        </div>

        <span className="text-[11px] font-bold text-[#0f6b4f]">
          {bnNum(completedTopicsCount)}/{bnNum(totalTopics)} টপিক ({bnNum(percentage)}%)
        </span>
      </div>

      <div className="overflow-y-auto max-h-[500px] sm:max-h-[580px] pr-1 space-y-2.5 pt-1">
        {filteredChapters.map((chapter) => {
          const isExpanded = expandedChapterId === chapter.id;
          const completedInChapter = chapter.topics.filter((t) =>
            completedTopics.has(t.id)
          ).length;
          const isChapterComplete =
            chapter.topics.length > 0 &&
            completedInChapter === chapter.topics.length;
          const isChapterPartial =
            completedInChapter > 0 && !isChapterComplete;
          const chapterPercent =
            chapter.topics.length > 0
              ? Math.round((completedInChapter / chapter.topics.length) * 100)
              : 0;

          return (
            <div
              key={chapter.id}
              className={`rounded-xl border transition-all ${isChapterComplete
                  ? "bg-[#f3faf6] border-[#cfe5da]"
                  : isExpanded
                    ? "bg-white border-[#0f6b4f]/40 shadow-xs"
                    : "bg-[#faf8f4] border-[#ebe6dc] hover:border-[#d6cfc1]"
                }`}
            >
              <div className="p-3 flex items-center justify-between gap-2">
                <div
                  onClick={() => {
                    onFocusChapter(chapter.id);
                    setExpandedChapterId(chapter.id);
                  }}
                  className="flex items-center gap-2.5 flex-1 min-w-0 cursor-pointer"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleChapter(chapter);
                      onFocusChapter(chapter.id);
                      setExpandedChapterId(chapter.id);
                    }}
                    title={
                      isChapterComplete
                        ? "অধ্যায় অসম্পূর্ণ করুন"
                        : "পুরো অধ্যায় সম্পূর্ণ করুন"
                    }
                    className={`w-6 h-6 rounded-lg flex items-center justify-center border transition flex-shrink-0 cursor-pointer ${isChapterComplete
                        ? "bg-[#0f6b4f] border-[#0f6b4f] text-white"
                        : isChapterPartial
                          ? "bg-[#e3f0ea] border-[#0f6b4f] text-[#0f6b4f]"
                          : "border-[#cfc7b8] bg-white text-transparent hover:border-[#0f6b4f]"
                      }`}
                  >
                    <Icon icon="solar:check-read-bold" className="w-3.5 h-3.5" />
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-[#0f6b4f] bg-white px-1.5 py-0.5 rounded border border-[#ebe6dc] font-mono">
                        {chapter.codeName}
                      </span>
                      <h4 className="text-xs font-bold text-[#17201c] truncate">
                        {chapter.name}
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${isChapterComplete
                        ? "bg-[#0f6b4f] text-white"
                        : isChapterPartial
                          ? "bg-[#e3f0ea] text-[#0f6b4f]"
                          : "text-[#626965] bg-white border border-[#ebe6dc]"
                      }`}
                  >
                    {bnNum(chapterPercent)}%
                  </span>
                  <button
                    onClick={() =>
                      setExpandedChapterId(isExpanded ? null : chapter.id)
                    }
                    className="p-1 text-[#8a918d] hover:text-[#17201c] cursor-pointer"
                  >
                    <Icon
                      icon={
                        isExpanded
                          ? "solar:alt-arrow-up-linear"
                          : "solar:alt-arrow-down-linear"
                      }
                      className="w-3.5 h-3.5"
                    />
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="px-3 pb-3 pt-1 border-t border-[#ebe6dc]/70 space-y-1.5">
                  {chapter.topics.map((topic) => {
                    const isDone = completedTopics.has(topic.id);
                    return (
                      <div
                        key={topic.id}
                        onClick={() => onToggleTopic(topic.id)}
                        className={`flex items-start gap-2.5 p-2 rounded-lg text-xs cursor-pointer transition ${isDone
                            ? "bg-white text-[#0f6b4f] font-semibold"
                            : "hover:bg-[#f3efe7] text-[#17201c]"
                          }`}
                      >
                        <input
                          type="checkbox"
                          checked={isDone}
                          onChange={() => { }}
                          className="w-3.5 h-3.5 accent-[#0f6b4f] rounded mt-0.5 cursor-pointer flex-shrink-0"
                        />
                        <span className="flex-1 leading-relaxed">
                          {topic.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
