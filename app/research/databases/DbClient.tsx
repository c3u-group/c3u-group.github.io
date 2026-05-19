"use client";
import SearchCard from "./cards/searchCard";
import ResultCard from "./cards/resultCard";
import { useState } from "react";
import type { AminoRecord } from "./types";

export default function DbClient() {
  const [selectedItem, setSelectedItem] = useState<AminoRecord | null>(null);
  return (
    <main className="w-full min-h-[calc(100vh-64px)] lg:min-h-0 lg:h-full lg:overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 px-6 py-10 lg:h-full lg:overflow-hidden">
        {/* Header */}
        <section className="flex flex-col gap-2 shrink-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            数据共享
          </h1>
        </section>

        {/* Split panels: search | result */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
          <div className="lg:col-span-1 lg:h-full lg:overflow-hidden">
            <SearchCard onSelect={setSelectedItem} />
          </div>
          <div className="lg:col-span-3 lg:h-full lg:overflow-hidden">
            <ResultCard selectedItem={selectedItem} />
          </div>
        </section>
      </div>
    </main>
  );
}