const WEATHER_BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL as string;
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY as string;

async function request<T>(path: string, params: Record<string, string | number> = {}): Promise<T> {
    // Ensure base URL doesn't have trailing slash if path has leading slash, or vice versa
    const baseUrl = WEATHER_BASE_URL?.replace(/\/$/, '') || 'https://api.weatherapi.com/v1';
    const cleanPath = path.replace(/^\//, '');
    const url = new URL(`${baseUrl}/${cleanPath}`);

    if (WEATHER_API_KEY) {
        url.searchParams.set('key', WEATHER_API_KEY);
    }

    for (const [k, v] of Object.entries(params)) {
        url.searchParams.set(k, String(v));
    }

    const res = await fetch(url.toString());
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `WeatherAPI error: ${res.status} ${res.statusText}`);
    }
    return res.json() as Promise<T>;
}

export const weatherClient = {
    getCurrent<T>(q: string, options: { aqi?: 'yes' | 'no'; lang?: string } = {}) {
        return request<T>('/current.json', { q, ...options });
    },

    getForecast<T>(
        q: string,
        options: { days?: number; aqi?: 'yes' | 'no'; alerts?: 'yes' | 'no'; lang?: string } = {}
    ) {
        const { days = 7, ...rest } = options;
        return request<T>('/forecast.json', { q, days, ...rest });
    },

    search<T>(q: string) {
        return request<T>('/search.json', { q });
    }
};
