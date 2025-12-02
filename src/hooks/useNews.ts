import { useState, useEffect, useCallback } from 'react';
import type { NewsArticle, NewsApiParams } from '../types/news';
import { getTopStories, searchNews } from '../services/newsApi';

interface UseNewsReturn {
    articles: NewsArticle[];
    loading: boolean;
    error: string | null;
    page: number;
    totalPages: number;
    totalFound: number;
    setPage: (page: number) => void;
    setCategory: (category: string) => void;
    setSearch: (query: string) => void;
    category: string;
    search: string;
    refetch: () => void;
}

/**
 * Advanced hook to fetch news with pagination, search, and filtering
 * @param limit - Number of articles per page
 */
export function useNews(limit: number = 6): UseNewsReturn {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Filter States
    const [page, setPage] = useState<number>(1);
    const [category, setCategory] = useState<string>('tech');
    const [search, setSearch] = useState<string>('');

    // Meta States
    const [totalFound, setTotalFound] = useState<number>(0);

    const fetchNews = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const params: NewsApiParams = {
                limit,
                page,
                language: 'en,id', // Default languages
            };

            let response;

            if (search.trim()) {
                // Use search endpoint if there's a query
                response = await searchNews(search, params);
            } else {
                // Use top stories endpoint otherwise
                // Only apply category if not searching (API limitation or preference)
                if (category !== 'all') {
                    params.categories = category;
                }
                response = await getTopStories(params);
            }

            setArticles(response.data);
            setTotalFound(response.meta.found);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load news';
            setError(errorMessage);
            console.error('Error fetching news:', err);
        } finally {
            setLoading(false);
        }
    }, [limit, page, category, search]);

    // Reset page when filters change
    useEffect(() => {
        setPage(1);
    }, [category, search]);

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

    // Calculate total pages (capped at API limit of usually 100 pages or based on total found)
    const totalPages = Math.min(Math.ceil(totalFound / limit), 50); // Cap at 50 pages for safety

    return {
        articles,
        loading,
        error,
        page,
        totalPages,
        totalFound,
        setPage,
        setCategory,
        setSearch,
        category,
        search,
        refetch: fetchNews,
    };
}
