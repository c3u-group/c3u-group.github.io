import React from "react";
import JournalsClient from "./JournalsClient";

export const metadata = {
  title: "期刊论文 | C³U 团队",
};

export default function JournalsPage() {
  return (
    <div id="research_journals" className="flex flex-col w-full min-h-screen font-sans">
      <JournalsClient />
    </div>
  );
}
