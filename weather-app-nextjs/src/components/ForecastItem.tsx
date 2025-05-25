'use client';

import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  // CloudHail, // Unused
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Cloudy,
  Sun,
  // Thermometer, // Unused
  // Wind, // Unused
  // Sunrise, // Unused
  // Sunset, // Unused
  // Gauge, // Unused
  // Droplets // Unused
} from 'lucide-react'; // Import a range of icons

// Define interface for individual forecast item data (subset of onecall daily data)
export interface DailyForecastData {
  dt: number;
  temp: {
    min: number;
    max: number;
    day?: number; // Optional: day temp if needed
    night?: number; // Optional: night temp if needed
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  humidity?: number;
  wind_speed?: number;
  pressure?: number;
  sunrise?: number;
  sunset?: number;
}

interface ForecastItemProps {
  forecast: DailyForecastData;
}

// Helper to convert Kelvin to Celsius
const kelvinToCelsius = (kelvin: number): number => Math.round(kelvin - 273.15);

// Helper to get day of the week
const getDayOfWeek = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

// Helper to get formatted date
const getFormattedDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// Simple mapping for weather condition to Lucide icon
const getWeatherIcon = (condition: string, iconCode: string) => {
  const genericCondition = condition.toLowerCase();
  // Check for night icons first if available
  if (iconCode.endsWith('n')) {
    if (genericCondition.includes('clear')) return <Cloud size={32} />; // Or Moon icon if available and preferred
    if (genericCondition.includes('clouds')) return <Cloudy size={32} />;
  }
  // Day icons
  if (genericCondition.includes('clear')) return <Sun size={32} />;
  if (genericCondition.includes('clouds')) return <CloudSun size={32} />; // Or just Cloud/Cloudy
  if (genericCondition.includes('rain')) return <CloudRain size={32} />;
  if (genericCondition.includes('drizzle')) return <CloudDrizzle size={32} />;
  if (genericCondition.includes('thunderstorm')) return <CloudLightning size={32} />;
  if (genericCondition.includes('snow')) return <CloudSnow size={32} />;
  if (genericCondition.includes('mist') || genericCondition.includes('fog') || genericCondition.includes('haze')) return <CloudFog size={32} />;
  return <Cloud size={32} />; // Default icon
};


export const ForecastItem = ({ forecast }: ForecastItemProps) => {
  if (!forecast || !forecast.temp || !forecast.weather || forecast.weather.length === 0) {
    return null; // Or a placeholder
  }

  const { dt, temp, weather } = forecast;
  const weatherCondition = weather[0];

  return (
    <div className="flex flex-col items-center p-3 md:p-4 bg-gray-100 rounded-lg shadow hover:shadow-md transition-shadow">
      <p className="text-sm font-medium text-gray-700">{getDayOfWeek(dt)}</p>
      <p className="text-xs text-gray-500 mb-1">{getFormattedDate(dt)}</p>
      <div className="my-1 text-blue-500">
        {getWeatherIcon(weatherCondition.main, weatherCondition.icon)}
      </div>
      <p className="text-sm font-semibold text-gray-800">
        {kelvinToCelsius(temp.max)}<sup>&deg;C</sup> Max
      </p>
      <p className="text-xs text-gray-600">
        {kelvinToCelsius(temp.min)}<sup>&deg;C</sup> Min
      </p>
      <p className="text-xs text-center text-gray-500 mt-1 capitalize">
        {weatherCondition.description}
      </p>
    </div>
  );
};
