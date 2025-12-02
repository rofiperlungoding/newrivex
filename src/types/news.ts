// TypeScript types for The News API
// Based on: https://www.thenewsapi.com/documentation

export interface NewsArticle {
    uuid: string;
    title: string;
    description: string;
    snippet: string;
    url: string;
    image_url: string | null;
    language: string;
    published_at: string; // ISO 8601 date string in UTC
    source: string;
    categories: string[];
    locale?: string;
    relevance_score?: number | null;
}

export interface NewsApiMeta {
    found: number;
    returned: number;
    limit: number;
    page: number;
}

export interface NewsApiResponse {
    meta: NewsApiMeta;
    data: NewsArticle[];
}

export interface NewsApiError {
    error: {
        code: string;
        message: string;
    };
}

export interface NewsApiParams {
    locale?: string;
    language?: string;
    categories?: string;
    exclude_categories?: string;
    domains?: string;
    exclude_domains?: string;
    source_ids?: string;
    exclude_source_ids?: string;
    published_before?: string;
    published_after?: string;
    published_on?: string;
    search?: string;
    search_fields?: string;
    sort?: 'published_at' | 'relevance_score';
    limit?: number;
    page?: number;
}
