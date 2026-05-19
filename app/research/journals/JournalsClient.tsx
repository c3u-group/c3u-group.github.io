"use client";

import { useMemo, useState } from "react";
import journalsData from "@/data/journal.json";
import type { JournalItem } from "@/types";

const ALLOWED_TAGS = new Set([
  "b",
  "strong",
  "em",
  "i",
  "u",
  "br",
  "p",
  "ul",
  "ol",
  "li",
  "sub",
  "sup",
  "code",
]);
const TAG_PATTERN = /<\/?([a-zA-Z0-9]+)(\s[^>]*?)?>/g;

const rawJournals: unknown[] = Array.isArray(journalsData) ? journalsData : [];
const journals = rawJournals.filter((item): item is JournalItem => {
  if (!item || typeof item !== "object") return false;
  const record = item as Record<string, unknown>;
  return (
    typeof record.title === "string" &&
    typeof record.author === "string" &&
    typeof record.journal === "string" &&
    typeof record.abstract === "string" &&
    typeof record.type === "string"
  );
});

const typeOptions = Array.from(
  new Set(journals.map((item) => item.type).filter((type) => type.trim().length > 0)),
).sort();

const getDoiLink = (item: JournalItem) => item.doi_link || item.doi || item.link || "";
const sanitizeAbstract = (value: string) =>
  value.replace(TAG_PATTERN, (match, rawTag) => {
    const tag = String(rawTag || "").toLowerCase();
    if (!ALLOWED_TAGS.has(tag)) return "";
    if (tag === "br") return "<br />";
    const isClosing = match.startsWith("</");
    return `<${isClosing ? "/" : ""}${tag}>`;
  });

function JournalCard({ item }: { item: JournalItem }) {
  const doiLink = getDoiLink(item);
  const typeLabel = item.type?.trim();

  return (
    <article className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{item.title}</h3>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="flex items-center gap-2">
              <i className="fas fa-user-edit text-gray-400" />
              {item.author}
            </span>
            <span className="flex items-center gap-2">
              <i className="fas fa-book-open text-gray-400" />
              {item.journal}
            </span>
          </div>
        </div>
        {typeLabel ? (
          <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
            {typeLabel}
          </span>
        ) : null}
      </div>

      {item.abstract ? (
        <div
          className="mt-4 text-sm leading-relaxed text-gray-600 line-clamp-4 dark:text-gray-300"
          dangerouslySetInnerHTML={{ __html: sanitizeAbstract(item.abstract) }}
        />
      ) : null}

      {doiLink ? (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <a
            href={doiLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-emerald-600 transition-colors hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            <i className="fas fa-external-link-alt text-xs" />
            DOI 链接
          </a>
          <span className="text-xs text-gray-400 break-all">{doiLink}</span>
        </div>
      ) : null}
    </article>
  );
}

export default function JournalsClient() {
  const [selectedType, setSelectedType] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredJournals = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return journals.filter((item) => {
      if (selectedType && item.type !== selectedType) return false;
      if (!query) return true;

      const haystack = [
        item.title,
        item.author,
        item.journal,
        item.abstract,
        item.type,
        getDoiLink(item),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [searchQuery, selectedType]);

  const resetFilters = () => {
    setSelectedType("");
    setSearchQuery("");
  };

  return (
    <main className="w-full min-h-[calc(100vh-80px)] bg-gray-50 p-6 dark:bg-gray-900">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8">
        <section className="flex flex-col gap-3 border-b border-gray-200 pb-6 dark:border-gray-800">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            期刊论文
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            汇总团队发表的期刊论文与摘要信息，可按类型或关键词快速查找。
          </p>
        </section>

        <div className="flex flex-col items-start gap-8 lg:flex-row">
          <aside className="w-full shrink-0 rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:w-80 lg:sticky lg:top-8">
            <div className="space-y-6">
              <div>
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
                  <i className="fas fa-filter text-emerald-600" /> 筛选
                </h2>
                <div className="relative">
                  <i className="fas fa-search absolute left-3 top-3 text-sm text-gray-400" />
                  <input
                    type="text"
                    placeholder="搜索标题、作者、期刊..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-700/50"
                  />
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    论文类型
                  </label>
                  {selectedType ? (
                    <button
                      onClick={() => setSelectedType("")}
                      className="text-xs text-emerald-600 hover:text-emerald-700"
                    >
                      清除
                    </button>
                  ) : null}
                </div>
                <div className="flex flex-wrap gap-2">
                  {typeOptions.length > 0 ? (
                    typeOptions.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`rounded-md border px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                          selectedType === type
                            ? "border-emerald-600 bg-emerald-600 text-white shadow-sm"
                            : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        {type}
                      </button>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400">暂无可筛选类型</span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={resetFilters}
              className="mt-6 w-full rounded-lg bg-gray-100 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              展示全部内容
            </button>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mb-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              找到 <strong>{filteredJournals.length}</strong> 条结果
            </div>

            {filteredJournals.length > 0 ? (
              <div className="space-y-6">
                {filteredJournals.map((item, index) => (
                  <JournalCard key={`${item.title}-${index}`} item={item} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-20 text-center dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-4 text-5xl text-gray-300 dark:text-gray-600">
                  <i className="fas fa-book-open" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  暂无匹配结果
                </h3>
                <p className="mt-4 max-w-xs text-sm text-gray-500 dark:text-gray-400">
                  请调整筛选条件或搜索关键词。
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                >
                  展示全部
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
