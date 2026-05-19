"use client";

import datalist from "@/data/aminodb.json";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { AminoRecord } from "../types";

type SearchCardProps = {
  onSelect?: (item: AminoRecord) => void;
};

export default function SearchCard({ onSelect }: SearchCardProps) {
  const [inputValue, setInputValue] = useState("");
  const [matchedList, setMatchedList] = useState<AminoRecord[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AminoRecord | null>(null);
  const [history, setHistory] = useState<AminoRecord[]>([]);
  const [inputHolder, setInputHolder] = useState<string>("");
  const [isSm, setIsSm] = useState(false);
  const HISTORY_KEY = "amino-search-history";

  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  const isValidRecord = (item: any): item is AminoRecord => {
    return (
      item &&
      typeof item.item_id === "number" &&
      typeof item.name === "string" &&
      typeof item.cas === "string" &&
      typeof item.abbr === "string" &&
      typeof item.category === "string" &&
      Array.isArray(item.conditions_details)
    );
  };

  const sequenceMatch = (pattern: string, value: string) => {
    let patternIndex = 0;
    let valueIndex = 0;
    while (patternIndex < pattern.length && valueIndex < value.length) {
      if (pattern[patternIndex] === value[valueIndex]) patternIndex++;
      valueIndex++;
    }
    return patternIndex === pattern.length;
  };

  const matchKeywords = (item: AminoRecord, input: string) => {
    const trimmed = input.trim().toLowerCase();
    if (!trimmed) return false;
    for (const value of [
      item.category,
      item.name,
      item.cas,
      item.abbr,
    ]) {
      const normalized = String(value ?? "").toLowerCase();
      if (!normalized) continue;
      if (sequenceMatch(trimmed, normalized)) return true;
    }
    return false;
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setSelectedItem(null);
    if (value.trim() === "") {
      setMatchedList([]);
      setShowDropdown(false);
      return;
    }
    const matches = (datalist as AminoRecord[]).filter((item) =>
      matchKeywords(item, value),
    );
    setMatchedList(matches);
    setShowDropdown(matches.length > 0);
  };

  const handleItemClick = (item: AminoRecord) => {
    setSelectedItem(item);
    setInputValue("");
    setInputHolder(['category','name','cas','abbr'].map(k=>item[k as keyof AminoRecord]).map(v=>v||"N/A").join(" | "));
    setShowDropdown(false);
    onSelect?.(item);
    setHistory((prev) => {
      const exists = prev.find((row) => row.item_id === item.item_id);
      if (exists) return prev;
      return [item, ...prev].slice(0, 12);
    });
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e.target.value);
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      if (!saved) return;
      let parsed: unknown;
      try {
        parsed = JSON.parse(saved);
      } catch (e) {
        localStorage.removeItem(HISTORY_KEY);
        return;
      }
      if (!Array.isArray(parsed)) {
        localStorage.removeItem(HISTORY_KEY);
        return;
      }
      const cleaned = (parsed as unknown[]).filter(isValidRecord).slice(0, 12);
      if (cleaned.length > 0) {
        setHistory(cleaned);
      } else {
        localStorage.removeItem(HISTORY_KEY);
      }
    } catch (err) {
      console.error("Failed to load history", err);
      try { localStorage.removeItem(HISTORY_KEY); } catch {}
    }
  }, []);

  useEffect(() => {
    try {
      if (history.length === 0) {
        localStorage.removeItem(HISTORY_KEY);
        return;
      }
      const cleaned = history.filter(isValidRecord).slice(0, 12);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(cleaned));
    } catch (err) {
      console.error("Failed to save history", err);
    }
  }, [history]);

  useEffect(() => {
    const check = () => setIsSm(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        inputRef.current && !inputRef.current.contains(e.target as Node) &&
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5 lg:p-6 lg:h-full flex flex-col gap-5">
      <div className="space-y-1.5">
        <label className="text-[11px] font-semibold tracking-[0.15em] uppercase text-gray-400 dark:text-gray-500">
          搜索
        </label>
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={onInputChange}
            placeholder={inputHolder || "类别、名称、CAS、缩写..."}
            className="w-full h-[42px] pl-10 pr-10 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/15"
          />
          {inputValue && (
            <button
              onClick={() => handleInputChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Clear search"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {showDropdown && (
            <ul
              ref={dropdownRef}
              className="absolute top-full left-0 z-10 w-full max-h-[320px] mt-1.5 p-0 list-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl overflow-y-auto animate-fade-slide-in"
              role="listbox"
            >
              {matchedList.map((item) => (
                <li key={item.item_id} className="m-0 p-0 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <button
                    className="block w-full px-4 py-3 text-left transition-colors hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                    role="option"
                    onClick={(e) => {
                      e.preventDefault();
                      handleItemClick(item);
                    }}
                  >
                    <div className="font-semibold text-gray-900 dark:text-white leading-snug text-sm">
                      {['category','name','cas','abbr'].map(k=>item[k as keyof AminoRecord]).map(v=>v||"N/A").join(" · ")}
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                      <span className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-mono text-[11px]">#{item.item_id}</span>
                      {item.abbr && <span className="px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium">{item.abbr}</span>}
                      {item.category && <span className="px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-medium">{item.category}</span>}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 flex-1 min-h-0 overflow-y-auto">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-gray-400 dark:text-gray-500">
            历史查询
          </span>
          {history.length > 0 && (
            <span className="text-[11px] text-gray-400 dark:text-gray-500 font-mono tabular-nums">{history.length}</span>
          )}
        </div>
        {history.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 p-5 text-center">
            <p className="text-xs text-gray-400 dark:text-gray-500">搜索并选择一条结果，历史记录将出现在这里</p>
          </div>
        ) : (
          <div className="grid gap-2.5 grid-cols-1 2xl:grid-cols-2">
            {history.slice(0, isSm ? 2 : 12).map((item, idx) => (
              <button
                key={item.item_id ?? idx}
                onClick={() => handleItemClick(item)}
                className="group w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 p-3 text-left transition-all duration-200 hover:border-emerald-200 dark:hover:border-emerald-800 hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 leading-snug text-sm line-clamp-1">
                    {item.name || item.cas || item.abbr || "N/A"}
                  </div>
                  <span className="text-[11px] text-gray-400 dark:text-gray-500 font-mono shrink-0 tabular-nums">#{item.item_id}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2 text-[11px]">
                  {item.abbr && <span className="px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium">{item.abbr}</span>}
                  {item.category && <span className="px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-medium">{item.category}</span>}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
