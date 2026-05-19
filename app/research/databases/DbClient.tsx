"use client";
import SearchCard from "./cards/searchCard";
import ResultCard from "./cards/resultCard";
import { useState } from "react";
import type { AminoRecord } from "./types";

export default function DbClient() {
  const [selectedItem, setSelectedItem] = useState<AminoRecord | null>(null);
  return (
    <main className="w-full min-h-[calc(100vh-64px)] lg:min-h-0 lg:h-full lg:overflow-hidden bg-zinc-50 dark:bg-black text-gray-700 dark:text-gray-300">
      <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-5 px-5 py-6 lg:h-full lg:overflow-hidden md:px-8 md:py-8">
        <section className="shrink-0 flex items-end justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              数据共享
            </h1>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-5 flex-1 min-h-0">
          <div className="lg:h-full lg:overflow-hidden">
            <SearchCard onSelect={setSelectedItem} />
          </div>
          <div className="lg:h-full lg:overflow-hidden">
            <ResultCard selectedItem={selectedItem} />
          </div>
        </section>
      </div>
    </main>
  );
}
