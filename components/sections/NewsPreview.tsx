"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import NewsCard from "@/components/cards/NewsCard";
import news from "@/data/news.json";
import type { NewsItem } from "@/types";

function useResponsiveCount() {
  const [count, setCount] = useState(10);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 768) setCount(4);
      else if (w < 1024) setCount(4);
      else if (w < 1280) setCount(6);
      else if (w < 1536) setCount(8);
      else setCount(10);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}

export default function NewsPreview() {
  const itemsToShow = useResponsiveCount();

  return (
    <Section id="news">
      <SectionHeader title="新闻动态" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 auto-rows-fr gap-6 w-full flex-1">
        {(news as NewsItem[]).slice().reverse().slice(0, itemsToShow).map((item, idx) => (
          <NewsCard key={idx} item={item} />
        ))}
      </div>
      <div className="w-full flex justify-end mt-8">
        <Link
          href="/news"
          className="text-green-600 hover:text-green-700 font-medium rounded-lg transition-colors duration-300"
        >
          查看更多 &gt;&gt;
        </Link>
      </div>
    </Section>
  );
}
