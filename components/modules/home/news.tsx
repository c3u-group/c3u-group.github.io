"use client";
import { useState, useEffect } from "react";
import news from "@/public/res/news.json";

import NewsCard from "@/components/modules/cards/newsCard";

export default function News() {
    const [itemsToShow, setItemsToShow] = useState(10);

    useEffect(() => {
        const updateItemsToShow = () => {
            if (typeof window !== "undefined") {
                const width = window.innerWidth;
                if (width < 768) {
                    setItemsToShow(4); // base: 1 column, show 4 items
                } else if (width < 1024) {
                    setItemsToShow(4); // md: 2 columns, show 4 items = 2 rows
                } else if (width < 1280) {
                    setItemsToShow(6); // lg: 3 columns, show 6 items = 2 rows
                } else if (width < 1536) {
                    setItemsToShow(8); // xl: 4 columns, show 8 items = 2 rows
                } else {
                    setItemsToShow(10); // 2xl: 5 columns, show 10 items = 2 rows
                }
            }
        };

        updateItemsToShow();
        window.addEventListener("resize", updateItemsToShow);
        return () => window.removeEventListener("resize", updateItemsToShow);
    }, []);
    return (
        <section id="news" className="scroll-mt-24 px-4 py-16 flex flex-col">
            <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-10 text-center">
                    {/* <span className="inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-emerald-700 shadow-sm dark:bg-emerald-500/10 dark:text-emerald-300">
                        News
                    </span> */}
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                        新闻动态
                    </h2>
                    <div className="mt-4 mx-auto w-24 border-b-4 border-emerald-500 rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 auto-rows-fr gap-6 w-full flex-1">
                    {news.slice(0, itemsToShow).map((item, index) => (
                        <NewsCard key={index} item={item} />
                    ))}
                </div>
                <div className="w-full flex justify-end mt-8">
                    <a
                        href="/news"
                        className="text-green-600 hover:text-green-700 font-medium rounded-lg transition-colors duration-300"
                    >
                        查看更多 &gt;&gt;
                    </a>
                </div>
            </div>
        </section>
    );
}