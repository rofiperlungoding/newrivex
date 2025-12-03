import { useEffect, useState } from 'react';
import { MagnifyingGlass, Wind, Drop, Thermometer, CaretRight, CloudSun, Warning, MoonStars, Sun, Moon } from '@phosphor-icons/react';
import { getForecastWeather, searchLocation, type ForecastResponse } from '../../services/weatherApi';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { WeatherMap } from './WeatherMap';

export function WeatherWidget() {
    const [query, setQuery] = useState('Jakarta');
    const [selected, setSelected] = useState('Jakarta');
    const [suggestions, setSuggestions] = useState<{ name: string; country: string }[]>([]);
    const [data, setData] = useState<ForecastResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Initial load
    useEffect(() => {
        fetchWeather(selected);
    }, []);

    async function fetchWeather(q: string) {
        try {
            setLoading(true);
            setError(null);
            const result = await getForecastWeather(q, 5, 'en');
            setData(result);
            setSelected(result.location.name);
        } catch (err: any) {
            setError(err.message ?? 'Failed to load weather');
        } finally {
            setLoading(false);
        }
    }

    async function handleSearchChange(value: string) {
        setQuery(value);
        if (value.length < 3) {
            setSuggestions([]);
            return;
        }
        try {
            const result = await searchLocation(value);
            setSuggestions(result.slice(0, 5));
        } catch {
            // ignore autocomplete error
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Search Section */}
            <div className="relative mb-8">
                <div className="flex gap-2">
                    <div className="relative flex-grow">
                        <Input
                            value={query}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            placeholder="Search city..."
                            className="pl-10 bg-white/5 border-white/10 focus:border-mint/50"
                        />
                        <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
                    </div>
                    <Button
                        onClick={() => {
                            setSuggestions([]);
                            fetchWeather(query);
                        }}
                        variant="mint"
                    >
                        Search
                    </Button>
                </div>

                {suggestions.length > 0 && (
                    <ul className="absolute top-full left-0 right-0 mt-2 bg-[#1A1A1A] border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl">
                        {suggestions.map((s, i) => (
                            <li
                                key={`${s.name}-${s.country}-${i}`}
                                className="px-4 py-3 cursor-pointer hover:bg-white/5 text-sm text-secondary hover:text-white transition-colors border-b border-white/5 last:border-none"
                                onClick={() => {
                                    setQuery(`${s.name}, ${s.country}`);
                                    setSuggestions([]);
                                    fetchWeather(`${s.name},${s.country}`);
                                }}
                            >
                                <span className="font-medium text-white">{s.name}</span>, {s.country}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Error State */}
            {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-center mb-8">
                    {error}
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-mint"></div>
                </div>
            )}

            {/* Weather Data */}
            {data && !loading && !error && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Main Card */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-mint/20 to-blue-500/20 rounded-3xl p-8 border border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-20">
                                <CloudSun size={120} weight="duotone" />
                            </div>

                            <div className="relative z-10">
                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold text-white mb-1">{data.location.name}</h2>
                                    <p className="text-secondary">{data.location.country}</p>
                                    <p className="text-xs text-secondary/70 mt-1">{data.location.localtime}</p>
                                </div>

                                <div className="flex items-end gap-4">
                                    <span className="text-6xl font-bold text-white tracking-tighter">
                                        {Math.round(data.current.temp_c)}°
                                    </span>
                                    <div className="mb-2">
                                        <p className="text-lg font-medium text-white">{data.current.condition.text}</p>
                                        <p className="text-sm text-secondary">Feels like {Math.round(data.current.feelslike_c)}°</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
                                <div className="p-2 bg-blue-500/20 w-fit rounded-lg text-blue-400 mb-4">
                                    <Drop size={24} weight="fill" />
                                </div>
                                <div>
                                    <p className="text-secondary text-sm font-medium uppercase tracking-wider">Humidity</p>
                                    <p className="text-2xl font-bold text-white">{data.current.humidity}%</p>
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
                                <div className="p-2 bg-green-500/20 w-fit rounded-lg text-green-400 mb-4">
                                    <Wind size={24} weight="fill" />
                                </div>
                                <div>
                                    <p className="text-secondary text-sm font-medium uppercase tracking-wider">Wind</p>
                                    <p className="text-2xl font-bold text-white">{data.current.wind_kph} <span className="text-sm font-normal text-secondary">km/h</span></p>
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
                                <div className="p-2 bg-orange-500/20 w-fit rounded-lg text-orange-400 mb-4">
                                    <Thermometer size={24} weight="fill" />
                                </div>
                                <div>
                                    <p className="text-secondary text-sm font-medium uppercase tracking-wider">UV Index</p>
                                    <p className="text-2xl font-bold text-white">{data.current.uv}</p>
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col justify-center items-center text-center">
                                <img
                                    src={`https:${data.current.condition.icon}`}
                                    alt={data.current.condition.text}
                                    className="w-16 h-16"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Alerts */}
                    {data.alerts?.alert && data.alerts.alert.length > 0 && (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-start gap-4">
                            <div className="p-2 bg-red-500/20 rounded-lg text-red-400 shrink-0">
                                <Warning size={24} weight="fill" />
                            </div>
                            <div>
                                <h4 className="text-red-400 font-semibold mb-1">Weather Alert</h4>
                                {data.alerts.alert.map((alert, idx) => (
                                    <div key={idx} className="mb-2 last:mb-0">
                                        <p className="text-white font-medium text-sm">{alert.headline}</p>
                                        <p className="text-secondary text-xs mt-1 line-clamp-2">{alert.desc}</p>
                                        <p className="text-red-400/70 text-[10px] mt-1">Effective: {new Date(alert.effective).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Astronomy & AQI */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Astronomy */}
                        <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                <MoonStars className="text-purple-400" size={24} />
                                Astronomy
                            </h3>
                            <div className="flex justify-between items-center px-4">
                                <div className="text-center">
                                    <div className="mb-2 flex justify-center text-orange-400">
                                        <Sun size={32} weight="fill" />
                                    </div>
                                    <p className="text-xs text-secondary mb-1">Sunrise</p>
                                    <p className="text-white font-medium">{data.forecast.forecastday[0].astro.sunrise}</p>
                                </div>
                                <div className="text-center">
                                    <div className="mb-2 flex justify-center text-orange-500">
                                        <Sun size={32} weight="duotone" />
                                    </div>
                                    <p className="text-xs text-secondary mb-1">Sunset</p>
                                    <p className="text-white font-medium">{data.forecast.forecastday[0].astro.sunset}</p>
                                </div>
                                <div className="text-center">
                                    <div className="mb-2 flex justify-center text-purple-300">
                                        <Moon size={32} weight="fill" />
                                    </div>
                                    <p className="text-xs text-secondary mb-1">Moon Phase</p>
                                    <p className="text-white font-medium">{data.forecast.forecastday[0].astro.moon_phase}</p>
                                </div>
                            </div>
                        </div>

                        {/* Air Quality */}
                        <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                <Wind className="text-green-400" size={24} />
                                Air Quality
                            </h3>
                            {data.current.air_quality ? (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-secondary">US EPA Index</span>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${data.current.air_quality['us-epa-index'] <= 2 ? 'bg-green-500/20 text-green-400' :
                                                data.current.air_quality['us-epa-index'] <= 4 ? 'bg-orange-500/20 text-orange-400' :
                                                    'bg-red-500/20 text-red-400'
                                            }`}>
                                            {data.current.air_quality['us-epa-index'] <= 2 ? 'Good' :
                                                data.current.air_quality['us-epa-index'] <= 4 ? 'Moderate' : 'Unhealthy'}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 text-center">
                                        <div className="bg-white/5 rounded-xl p-2">
                                            <p className="text-[10px] text-secondary">PM2.5</p>
                                            <p className="text-white font-medium">{Math.round(data.current.air_quality.pm2_5)}</p>
                                        </div>
                                        <div className="bg-white/5 rounded-xl p-2">
                                            <p className="text-[10px] text-secondary">PM10</p>
                                            <p className="text-white font-medium">{Math.round(data.current.air_quality.pm10)}</p>
                                        </div>
                                        <div className="bg-white/5 rounded-xl p-2">
                                            <p className="text-[10px] text-secondary">NO2</p>
                                            <p className="text-white font-medium">{Math.round(data.current.air_quality.no2)}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-secondary text-center py-4">Air quality data unavailable</p>
                            )}
                        </div>
                    </div>

                    {/* Forecast */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <CaretRight className="text-mint" />
                            5-Day Forecast
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {data.forecast.forecastday.map((d) => (
                                <div key={d.date} className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center hover:bg-white/10 transition-colors group">
                                    <p className="text-sm font-medium text-white mb-2">
                                        {new Date(d.date).toLocaleDateString(undefined, { weekday: 'short' })}
                                    </p>
                                    <div className="my-3 flex justify-center">
                                        <img
                                            src={`https:${d.day.condition.icon}`}
                                            alt={d.day.condition.text}
                                            className="w-10 h-10 group-hover:scale-110 transition-transform"
                                        />
                                    </div>
                                    <div className="flex justify-center gap-3 text-sm">
                                        <span className="font-bold text-white">{Math.round(d.day.maxtemp_c)}°</span>
                                        <span className="text-secondary">{Math.round(d.day.mintemp_c)}°</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Weather Map */}
                    <div className="bg-white/5 rounded-3xl p-1 border border-white/10">
                        <WeatherMap lat={data.location.lat} lon={data.location.lon} locationName={data.location.name} />
                    </div>

                    <div className="text-center pt-8">
                        <a
                            href="https://www.weatherapi.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-secondary hover:text-white transition-colors"
                        >
                            Powered by WeatherAPI.com
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
