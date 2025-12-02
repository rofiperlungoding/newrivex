import { motion } from 'framer-motion';
import { ArrowUpRight, CalendarBlank, Tag, WarningCircle, ArrowsClockwise } from '@phosphor-icons/react';
import { useNews } from '../hooks/useNews';
import { SearchBar } from '../components/news/SearchBar';
import { CategoryFilter } from '../components/news/CategoryFilter';
import { Pagination } from '../components/news/Pagination';
import { useEffect } from 'react';

// Helper to format date from UTC to readable format
function formatDate(utcDate: string): string {
    const date = new Date(utcDate);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

// Helper to get a nice category display name
function getCategoryDisplay(categories: string[]): string {
    if (!categories || categories.length === 0) return 'Tech';
    const category = categories[0];
    return category.charAt(0).toUpperCase() + category.slice(1);
}

const News = () => {
    const {
        articles,
        loading,
        error,
        refetch,
        page,
        totalPages,
        setPage,
        category,
        setCategory,
        setSearch
    } = useNews(12); // Increased limit for better grid

    // Scroll to top when page changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-12 space-y-8">
                <div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold mb-6"
                    >
                        News Hub
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-secondary max-w-2xl"
                    >
                        Latest updates from the tech world, curated for you.
                    </motion.p>
                </div>

                {/* Controls Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                    <CategoryFilter selected={category} onSelect={setCategory} />
                    <SearchBar onSearch={setSearch} />
                </motion.div>
            </div>

            {/* Error State */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8 mb-8"
                >
                    <div className="flex items-start gap-4">
                        <WarningCircle size={32} className="text-red-400 flex-shrink-0 mt-1" weight="duotone" />
                        <div className="flex-grow">
                            <h3 className="text-xl font-bold text-red-400 mb-2">Failed to Load News</h3>
                            <p className="text-secondary mb-4">{error}</p>
                            <button
                                onClick={refetch}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-medium transition-colors"
                            >
                                <ArrowsClockwise size={20} />
                                Try Again
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Loading State */}
            {loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-surface border border-white/10 rounded-3xl overflow-hidden"
                        >
                            <div className="aspect-video bg-white/5 animate-pulse" />
                            <div className="p-6 space-y-3">
                                <div className="h-4 bg-white/5 rounded animate-pulse w-1/3" />
                                <div className="h-6 bg-white/5 rounded animate-pulse w-full" />
                                <div className="h-4 bg-white/5 rounded animate-pulse w-2/3" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Articles Grid */}
            {!loading && !error && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article, index) => (
                            <motion.a
                                key={article.uuid}
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-surface border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-colors flex flex-col h-full"
                            >
                                <div className="aspect-video overflow-hidden bg-surface relative">
                                    {article.image_url ? (
                                        <img
                                            src={article.image_url}
                                            alt={article.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center">
                                            <Tag size={48} className="text-white/30" weight="duotone" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4">
                                        <span className="flex items-center gap-1 bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-medium text-white">
                                            <Tag size={12} weight="fill" />
                                            {getCategoryDisplay(article.categories)}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 text-xs text-secondary mb-4">
                                        <CalendarBlank size={14} weight="fill" />
                                        {formatDate(article.published_at)}
                                        <span className="mx-1">•</span>
                                        <span>{article.source}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors line-clamp-2">
                                        {article.title}
                                    </h3>
                                    <p className="text-secondary text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                                        {article.description || article.snippet}
                                    </p>
                                    <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:gap-3 transition-all mt-auto">
                                        Read Article <ArrowUpRight size={16} weight="bold" />
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>

                    {/* Pagination */}
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                        loading={loading}
                    />
                </>
            )}

            {/* Empty State */}
            {!loading && !error && articles.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-20"
                >
                    <Tag size={64} className="text-white/20 mx-auto mb-4" weight="duotone" />
                    <h3 className="text-2xl font-bold mb-2">No News Found</h3>
                    <p className="text-secondary">Try adjusting your search or filters.</p>
                </motion.div>
            )}
        </div>
    );
};

export default News;

