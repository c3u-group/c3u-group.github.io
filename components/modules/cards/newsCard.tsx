"use client";

type NewsItem = {
    title: string;
    description: string;
    image: string;
    extern_url: string;
    categories: string[];
    date: string;
    author: string;
};

// Component for a single News Card
export default function NewsCard({ item, showAll=false }: { item: NewsItem; showAll?: boolean }) {
    return (
        <a
            href={item.extern_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 border border-transparent dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 shadow-sm"
        >
            {/* Image Container */}
            <div className="relative w-full aspect-video overflow-hidden">
                <img
                    src={`/res/news_img/${item.image}`}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    loading="lazy"
                />
                
                {/* Date Badge (overlay) */}
                <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700">
                    {new Date(item.date).toLocaleDateString('zh-CN')}
                </div>
            </div>

            {/* Content Container */}
            <div className="flex flex-col grow p-6">
                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {(showAll ? item.categories : item.categories.slice(0, 3)).map((tag, idx) => (
                        <span key={item.date+idx} className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 rounded-full border border-green-100 dark:border-green-800 shadow-sm">
                            {tag}
                        </span>
                    ))}
                     {!showAll && item.categories.length > 3 && (
                        <span className="px-2 py-0.5 text-xs font-semibold text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-md">
                            +{item.categories.length - 3}
                        </span>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 leading-tight ">
                    {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed grow">
                    {item.description}
                </p>

                {/* Footer: Author & Read More */}
                <div className="pt-4 mt-auto flex items-center justify-between border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center space-x-2 text-sm">
                        <i className="fas fa-user-circle text-gray-400"></i>
                        <span className="text-md font-semibold">{item.author}</span>
                    </div>
                    <span className="text-gray-400 text-xs font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        查看详情 <i className="fas fa-arrow-right"></i>
                    </span>
                </div>
            </div>
        </a>
    );
}