import type { NewsApiResponse, NewsApiError, NewsApiParams } from '../types/news';

const BASE_URL = 'https://api.thenewsapi.com/v1/news';
const API_TOKEN = import.meta.env.VITE_NEWS_API_TOKEN;

if (!API_TOKEN) {
    console.error('⚠️ VITE_NEWS_API_TOKEN is not defined in .env file');
}

/**
 * Build query string from parameters object
 */
function buildQueryString(params: Record<string, string | number>): string {
    const encoded = Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
        .join('&');
    return encoded;
}

/**
 * Handle API errors based on error code
 */
function handleApiError(errorData: NewsApiError): Error {
    const { code, message } = errorData.error;

    switch (code) {
        case 'invalid_api_token':
            return new Error('Invalid API token. Please check your .env file.');
        case 'usage_limit_reached':
            return new Error('API usage limit reached. Please try again later.');
        case 'rate_limit_reached':
            return new Error('Too many requests. Please wait a moment.');
        case 'malformed_parameters':
            return new Error(`Invalid parameters: ${message}`);
        case 'endpoint_access_restricted':
            return new Error('This endpoint requires a higher plan.');
        case 'server_error':
        case 'maintenance_mode':
            return new Error('Service temporarily unavailable. Please try again later.');
        default:
            return new Error(message || 'An unknown error occurred');
    }
}

/**
 * Fetch top stories from The News API
 * Defaults to tech news from Indonesia and US
 */
export async function getTopStories(params: NewsApiParams = {}): Promise<NewsApiResponse> {
    const defaultParams: NewsApiParams = {
        locale: 'id,us',
        categories: 'tech',
        language: 'en,id',
        limit: 6,
        sort: 'published_at',
        ...params,
    };

    // Build query string with API token
    const queryParams: Record<string, string | number> = {
        api_token: API_TOKEN,
        ...Object.entries(defaultParams).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null) {
                acc[key] = String(value);
            }
            return acc;
        }, {} as Record<string, string>),
    };

    const queryString = buildQueryString(queryParams);
    const url = `${BASE_URL}/top?${queryString}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            // Try to parse error response
            const errorData: NewsApiError = await response.json().catch(() => ({
                error: { code: 'unknown', message: `HTTP ${response.status}` }
            }));
            throw handleApiError(errorData);
        }

        const data: NewsApiResponse = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Failed to fetch news. Please check your internet connection.');
    }
}

/**
 * Search all news (for future use)
 */
export async function searchNews(query: string, params: NewsApiParams = {}): Promise<NewsApiResponse> {
    const searchParams: NewsApiParams = {
        search: query,
        search_fields: 'title,description',
        limit: 10,
        ...params,
    };

    const queryParamsObj: Record<string, string | number> = {
        api_token: API_TOKEN,
        ...Object.entries(searchParams).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null) {
                acc[key] = String(value);
            }
            return acc;
        }, {} as Record<string, string>),
    };

    const queryString = buildQueryString(queryParamsObj);
    const url = `${BASE_URL}/all?${queryString}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            const errorData: NewsApiError = await response.json().catch(() => ({
                error: { code: 'unknown', message: `HTTP ${response.status}` }
            }));
            throw handleApiError(errorData);
        }

        const data: NewsApiResponse = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Failed to search news. Please check your internet connection.');
    }
}
