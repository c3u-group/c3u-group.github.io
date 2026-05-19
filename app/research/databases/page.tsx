import React from "react";
import DbClient from "./DbClient";

export const metadata = {
  title: "数据共享 | C³U 团队",
};

export default function Home() {
  return (
    <div id="research_databases" className="flex flex-col w-full min-h-screen lg:min-h-0 lg:h-[calc(100vh-64px)] lg:overflow-hidden font-sans">
      <DbClient />
    </div>
  );
}