import React from "react";
import DbClient from "./DbClient";

export const metadata = {
  title: "数据共享 | C³U 团队",
};

export default function Home() {
  return (
    <div id="research_databases" className="flex flex-col h-full items-center justify-center font-sans w-full">
      <DbClient />
    </div>
  );
}