import React from "react";
import NewsClient from "./newsClient";

export const metadata = {
  title: "新闻动态 | C³U 团队",
};

export default function Home() {
  return (
    <div id="news_page" className="flex flex-col w-full min-h-screen font-sans">
      <NewsClient />
    </div>
  );
}