import { CloudSun } from '@phosphor-icons/react';
import { WeatherWidget } from '../../components/weather/WeatherWidget';

const WeatherApp = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-mint/10 text-mint">
                    <CloudSun size={32} weight="fill" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold">Global Weather</h1>
                    <p className="text-secondary">Real-time forecast and conditions</p>
                </div>
            </div>

            <WeatherWidget />
        </div>
    );
};

export default WeatherApp;
