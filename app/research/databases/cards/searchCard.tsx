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
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 lg:p-8 lg:h-full flex flex-col gap-6">
      <div className="text-center space-y-1">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">查询数据库</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">输入类别、名称、CAS、缩写，快速查找氨基吸收剂信息</p>
      </div>

      <div className="relative w-full">
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-400"
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
            placeholder={inputHolder || "输入类别、名称、CAS、缩写进行搜索..."}
            className="w-full h-[44px] pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700/50 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:placeholder-gray-400"
          />

          <ul
            ref={dropdownRef}
            className={`absolute top-full left-0 z-10 w-full max-h-[400px] mt-1 p-0 list-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-y-auto transition-all ${showDropdown ? 'block' : 'hidden'}`}
            role="listbox"
          >
            {matchedList.map((item) => (
              <li key={item.item_id} className="m-0 p-0 border-b border-gray-100 dark:border-gray-700 last:border-0">
                <button
                  className="block w-full px-4 py-3 text-sm transition-colors hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-700 dark:hover:text-emerald-300 text-left"
                  role="option"
                  onClick={(e) => {
                    e.preventDefault();
                    handleItemClick(item);
                  }}
                >
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold text-gray-900 dark:text-white leading-snug break-words">
                      {['category','name','cas','abbr'].map(k=>item[k as keyof AminoRecord]).map(v=>v||"N/A").join(" | ")}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">ID {item.item_id}</span>
                      {item.abbr && <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">{item.abbr}</span>}
                      {item.category && <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800">{item.category}</span>}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-3 flex-1 min-h-0 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white">历史查询</h4>
        </div>
        {history.length === 0 ? (
          <div className="w-full rounded-lg border border-dashed border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-700/30 p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
            暂无历史记录，选择一条结果后会出现在这里
          </div>
        ) : (
          <div className="grid gap-3 grid-cols-1 2xl:grid-cols-2">
            {history.slice(0, isSm ? 2 : 12).map((item, idx) => (
              <button
                key={item.item_id ?? idx}
                onClick={() => handleItemClick(item)}
                className="group w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-700/30 p-3.5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="font-semibold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 leading-snug line-clamp-2 text-sm">
                    {item.name || item.cas || item.abbr || "N/A"}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0">ID {item.item_id}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                  {item.abbr && <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">{item.abbr}</span>}
                  {item.category && <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800">{item.category}</span>}
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">CAS: {item.cas || "-"}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}