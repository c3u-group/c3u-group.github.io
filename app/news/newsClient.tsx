"use client";
import { useState, useMemo } from "react";
import news from "@/public/res/news.json";
import NewsCard from "@/components/modules/cards/newsCard";


export default function NewsClient() {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Memoize tags extraction
    const allTags = useMemo(() => Array.from(new Set(news.flatMap((n) => n.categories))).sort(), []);

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
    };

    const clearFilters = () => {
        setSelectedTags([]);
        setStartDate("");
        setEndDate("");
        setSearchQuery("");
    };

    const filteredNews = useMemo(() => {
        return news.filter((item) => {
            // Tag Filter
            if (selectedTags.length > 0 && !item.categories.some((c) => selectedTags.includes(c))) {
                return false;
            }

            // Date Filters
            const itemDate = new Date(item.date);
            if (startDate) {
                const s = new Date(startDate);
                s.setHours(0, 0, 0, 0);
                if (itemDate < s) return false;
            }
            if (endDate) {
                const e = new Date(endDate);
                e.setHours(23, 59, 59, 999);
                if (itemDate > e) return false;
            }

            // Search Query
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                if (!item.title.toLowerCase().includes(q) && !item.description.toLowerCase().includes(q)) {
                    return false;
                }
            }

            return true;
        });
    }, [selectedTags, startDate, endDate, searchQuery]);


    return (
        <main className="w-full flex justify-center min-h-[calc(100vh-80px)] p-6 bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-[1600px] flex flex-col gap-8">
                
                {/* Header Section */}
                <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            新闻动态
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                            来自 C³U 团队的最新研究、活动和公告。
                        </p>
                    </div>
                </section>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    
                    {/* Filters Sidebar */}
                    <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-8">
                        <div>
                             <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                                <i className="fas fa-filter text-green-600"></i> 筛选
                             </h2>
                            
                             {/* Search */}
                            <div className="relative mb-6">
                                <i className="fas fa-search absolute left-3 top-3 text-gray-400 text-sm"></i>
                                <input 
                                    type="text" 
                                    placeholder="查找结果..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                />
                            </div>

                             {/* Date Range */}
                             <div className="space-y-4 mb-6">
                                <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">日期范围</label>
                                <div className="space-y-2">
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-gray-400 text-xs">从</span>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="w-full pl-12 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                        />
                                    </div>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-gray-400 text-xs">到</span>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="w-full pl-12 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                        />
                                    </div>
                                </div>
                             </div>

                             {/* Tags */}
                             <div>
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">标签</label>
                                    {selectedTags.length > 0 && (
                                        <button onClick={() => setSelectedTags([])} className="text-xs text-green-600 hover:text-green-700">
                                            清除
                                        </button>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {allTags.map((tag) => (
                                        <button
                                            key={tag}
                                            onClick={() => toggleTag(tag)}
                                            className={`
                                                text-xs px-2.5 py-1.5 rounded-md transition-colors border
                                                ${selectedTags.includes(tag) 
                                                    ? 'bg-green-600 text-white border-green-600 shadow-sm' 
                                                    : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'}
                                            `}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                             </div>
                        </div>

                        {/* Reset All */}
                        <button 
                            onClick={clearFilters}
                            className="w-full py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            <i className="fas fa-undo-alt text-xs"></i> 展示所有内容
                        </button>
                    </aside>

                    {/* News Grid */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                找到 <strong>{filteredNews.length}</strong> 条结果
                            </span>
                        </div>
                        
                        {filteredNews.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredNews.map((item, index) => (
                                    <NewsCard key={index} item={item} showAll={true} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 text-center">
                                <div className="text-5xl text-gray-300 dark:text-gray-600 mb-4">
                                     <i className="fas fa-newspaper"></i>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">没有找到内容</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mt-4 max-w-xs">
                                    请调整您的筛选条件或搜索关键词。
                                </p>
                                <button 
                                    onClick={clearFilters}
                                    className="mt-6 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                                >
                                    展示全部
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
}