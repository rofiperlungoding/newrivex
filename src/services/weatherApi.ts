import { weatherClient } from '../lib/weatherClient';

export type WeatherLocation = {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime: string;
};

export type WeatherCondition = {
    text: string;
    icon: string;
    code: number;
};

export type AirQuality = {
    co: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    "us-epa-index": number;
    "gb-defra-index": number;
};

export type CurrentWeather = {
    temp_c: number;
    feelslike_c: number;
    humidity: number;
    wind_kph: number;
    condition: WeatherCondition;
    uv: number;
    air_quality?: AirQuality;
};

export type ForecastDay = {
    date: string;
    day: {
        maxtemp_c: number;
        mintemp_c: number;
        avgtemp_c: number;
        daily_chance_of_rain: number;
        condition: WeatherCondition;
    };
    astro: {
        sunrise: string;
        sunset: string;
        moon_phase: string;
    };
};

export type WeatherAlert = {
    headline: string;
    msgtype: string;
    severity: string;
    urgency: string;
    areas: string;
    category: string;
    certainty: string;
    event: string;
    note: string;
    effective: string;
    expires: string;
    desc: string;
    instruction: string;
};

export type ForecastResponse = {
    location: WeatherLocation;
    current: CurrentWeather;
    forecast: {
        forecastday: ForecastDay[];
    };
    alerts?: {
        alert: WeatherAlert[];
    };
};

export type AstronomyResponse = {
    location: WeatherLocation;
    astro: {
        sunrise: string;
        sunset: string;
        moon_phase: string;
        moon_illumination: string;
    };
};

export async function getCurrentWeather(q: string, lang = 'en') {
    return weatherClient.getCurrent<{
        location: WeatherLocation;
        current: CurrentWeather;
    }>(q, { aqi: 'yes', lang });
}

export async function getForecastWeather(q: string, days = 7, lang = 'en') {
    return weatherClient.getForecast<ForecastResponse>(q, {
        days,
        aqi: 'yes',
        alerts: 'yes',
        lang
    });
}

export async function searchLocation(q: string) {
    return weatherClient.search<
        { id: number; name: string; region: string; country: string; lat: number; lon: number }[]
    >(q);
}
