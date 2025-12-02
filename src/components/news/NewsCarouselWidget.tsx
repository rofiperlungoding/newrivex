import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNews } from '../../hooks/useNews';
import { ArrowRight, Article } from '@phosphor-icons/react';

export const NewsCarouselWidget = () => {
    const { articles, loading, error } = useNews(5);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (articles.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % articles.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [articles]);

    // Header Component
    const WidgetHeader = () => (
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-400">
                <Article size={24} weight="duotone" />
            </div>
            {/* Arrow is handled by the parent Link group-hover */}
        </div>
    );

    // Loading State
    if (loading) {
        return (
            <div className="h-full flex flex-col">
                <WidgetHeader />
                <div className="mt-auto bg-white/5 rounded-3xl p-4 h-48 animate-pulse relative overflow-hidden">
                    <div className="absolute bottom-4 left-4 right-4 space-y-3">
                        <div className="h-3 w-20 bg-white/10 rounded" />
                        <div className="h-4 w-full bg-white/10 rounded" />
                        <div className="h-4 w-2/3 bg-white/10 rounded" />
                    </div>
                </div>
            </div>
        );
    }

    // Error State
    if (error || articles.length === 0) {
        return (
            <div className="h-full flex flex-col">
                <WidgetHeader />
                <div className="mt-auto">
                    <h3 className="text-xl font-bold text-white mb-2">News Hub</h3>
                    <p className="text-secondary text-sm">Latest tech updates & insights.</p>
                </div>
            </div>
        );
    }

    const currentArticle = articles[currentIndex];

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-start mb-2">
                <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-400">
                    <Article size={24} weight="duotone" />
                </div>
                <div className="mt-2 text-right">
                    <h3 className="text-lg font-bold text-white">News Hub</h3>
                    <p className="text-secondary text-xs">Latest tech updates.</p>
                </div>
            </div>

            {/* Compact Carousel Card */}
            <div className="mt-4 relative rounded-3xl overflow-hidden flex-grow border border-white/10 group/card">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentArticle.uuid}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                    >
                        {/* Background Image */}
                        {currentArticle.image_url ? (
                            <img
                                src={currentArticle.image_url}
                                alt={currentArticle.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-900/40 to-purple-900/40" />
                        )}

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                    </motion.div>
                </AnimatePresence>

                {/* Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-end z-10">
                    <motion.div
                        key={currentArticle.uuid}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider bg-orange-500/10 px-2 py-0.5 rounded-full backdrop-blur-sm border border-orange-500/20">
                                {currentArticle.source}
                            </span>
                            <span className="text-[10px] text-gray-300">
                                • {new Date(currentArticle.published_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>

                        <h4 className="text-base font-bold text-white leading-snug mb-2 line-clamp-2">
                            {currentArticle.title}
                        </h4>

                        <div className="flex items-center gap-1 text-xs font-medium text-white/70 group-hover/card:text-white transition-colors">
                            Read Article <ArrowRight size={12} />
                        </div>
                    </motion.div>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
                    <motion.div
                        key={currentIndex}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 5, ease: "linear" }}
                        className="h-full bg-orange-500"
                    />
                </div>
            </div>
        </div>
    );
};
