"use client";

import { useMemo, useState, useCallback } from "react";
import journalsData from "@/data/journal.json";
import type { JournalItem } from "@/types";

const rawJournals: unknown[] = Array.isArray(journalsData) ? journalsData : [];
const journals = rawJournals.filter((item): item is JournalItem => {
  if (!item || typeof item !== "object") return false;
  const record = item as Record<string, unknown>;
  return (
    typeof record.title === "string" &&
    typeof record.author === "string" &&
    typeof record.publication_title === "string" &&
    typeof record.abstract_note === "string" &&
    typeof record.item_type === "string"
  );
});

const yearOptions = Array.from(
  new Set(journals.map((item) => item.publication_year).filter((y) => y.trim().length > 0)),
).sort((a, b) => parseInt(b, 10) - parseInt(a, 10));

const typeLabels: Record<string, string> = {
  journalArticle: "期刊论文",
  conferencePaper: "会议论文",
};

const ABSTRACT_TRUNCATE = 280;

function TruncatedAbstract({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const needsTruncation = text.length > ABSTRACT_TRUNCATE;

  const display =
    !needsTruncation || expanded ? text : text.slice(0, ABSTRACT_TRUNCATE) + "…";

  return (
    <div>
      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {display}
      </p>
      {needsTruncation ? (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
        >
          {expanded ? "收起摘要" : "阅读全文"}
        </button>
      ) : null}
    </div>
  );
}

function JournalCard({ item, index }: { item: JournalItem; index: number }) {
  const doi = item.doi || "";
  const keywords = item.keywords
    ? item.keywords.split(";").map((k) => k.trim()).filter(Boolean)
    : [];
  const typeLabel = typeLabels[item.item_type] || item.item_type;

  return (
    <article
      className="group relative rounded-lg border-l-[3px] border-emerald-500 bg-white pl-5 pr-6 py-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-emerald-600 dark:bg-gray-800/80"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="flex flex-col gap-3">
        {/* top row: year badge + type + metadata */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {item.publication_year ? (
            <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold tracking-wide text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
              {item.publication_year}
            </span>
          ) : null}
          {typeLabel ? (
            <span className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
              {typeLabel}
            </span>
          ) : null}
        </div>

        {/* title */}
        <h3 className="text-lg font-bold leading-snug text-gray-900 dark:text-gray-100">
          {item.title}
        </h3>

        {/* author + journal */}
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
          <span>{item.author}</span>
          {item.publication_title ? (
            <span className="italic">{item.publication_title}</span>
          ) : null}
        </div>

        {/* abstract */}
        {item.abstract_note ? (
          <TruncatedAbstract text={item.abstract_note} />
        ) : null}

        {/* keywords */}
        {keywords.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {keywords.map((kw) => (
              <span
                key={kw}
                className="inline-block rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs text-gray-500 dark:border-gray-600 dark:bg-gray-700/50 dark:text-gray-400"
              >
                {kw}
              </span>
            ))}
          </div>
        ) : null}

        {/* doi link */}
        {doi ? (
          <a
            href={`https://doi.org/${doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
          >
            <span>DOI</span>
            <span className="text-gray-400 dark:text-gray-500">{doi}</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default function JournalsClient() {
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredJournals = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return journals.filter((item) => {
      if (selectedYear && item.publication_year !== selectedYear) return false;
      if (!query) return true;

      const haystack = [
        item.title,
        item.author,
        item.publication_title,
        item.abstract_note,
        item.keywords,
        item.doi,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [searchQuery, selectedYear]);

  const resetFilters = useCallback(() => {
    setSelectedYear("");
    setSearchQuery("");
  }, []);

  const hasActiveFilters = selectedYear !== "" || searchQuery.trim() !== "";

  return (
    <main className="w-full min-h-[calc(100vh-80px)] bg-gray-50 dark:bg-gray-900">
      {/* subtle graph-paper texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-6 py-10">
        {/* header */}
        <section className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            期刊论文
          </h1>
        </section>

        {/* filter bar */}
        <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800/80 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="搜索标题、作者、期刊、关键词…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700/50 dark:text-gray-100 dark:placeholder-gray-400"
            />
            <svg
              className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="rounded-md border border-gray-200 bg-white py-2 pl-3 pr-8 text-sm outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
            >
              <option value="">全部年份</option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            {hasActiveFilters ? (
              <button
                onClick={resetFilters}
                className="rounded-md px-2 py-1.5 text-xs font-medium text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                清除筛选
              </button>
            ) : null}
          </div>
        </div>

        {/* results */}
        <div className="space-y-1">
          <div className="mb-4 text-xs font-medium text-gray-400 dark:text-gray-500">
            {hasActiveFilters ? `找到 ${filteredJournals.length} 条结果` : ""}
          </div>

          {filteredJournals.length > 0 ? (
            <div className="space-y-4">
              {filteredJournals.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="animate-card-pop"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <JournalCard item={item} index={index} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white py-20 dark:border-gray-700 dark:bg-gray-800/80">
              <div className="mb-4 text-4xl text-gray-300 dark:text-gray-600">
                <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                暂无匹配结果
              </h3>
              <p className="mt-2 max-w-xs text-sm text-gray-500 dark:text-gray-400">
                请调整筛选条件或搜索关键词
              </p>
              <button
                onClick={resetFilters}
                className="mt-5 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
              >
                展示全部
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
