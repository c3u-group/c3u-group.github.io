"use client";
import SearchCard from "./cards/searchCard";
import ResultCard from "./cards/resultCard";
import { useState } from "react";
import type { AminoRecord } from "./types";

export default function DbClient() {
  const [selectedItem, setSelectedItem] = useState<AminoRecord | null>(null);
  return (
      <main className="w-full px-2 md:px-6 space-y-6 h-full flex flex-col min-h-[calc(100vh-10rem)]">

        <section className={`grid grid-cols-1 md:grid-cols-4 gap-6 flex-1 overflow-hidden min-h-0`}>
            <div className="md:col-span-1 py-6 w-full">
                <SearchCard onSelect={setSelectedItem} />
            </div>
            <div className="md:col-span-3 py-6 w-full  ">
                <ResultCard selectedItem={selectedItem} />
            </div>
        </section>

      </main> 
  );
}