'use client'; // May not be strictly needed if all data is passed as props and no internal state/hooks

import { RefreshCw } from 'lucide-react'; // Sync icon

// Define interfaces for the weather data based on OpenWeatherMap structure
// and what was used in the original app.
interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
}

interface WeatherCondition {
  main: string;
  description: string;
  icon: string; // For weather icon, if we add it later
}

interface WindData {
  speed: number; // m/s, convert to km/h
}

export interface CurrentWeatherData {
  name: string;
  main: WeatherMain;
  weather: WeatherCondition[];
  wind: WindData;
  visibility: number; // meters, convert to km
}

interface WeatherDisplayProps {
  data: CurrentWeatherData;
  onSync: () => void; // Placeholder for sync functionality
  isSyncing: boolean; // To control sync icon animation later
}

// Helper function to convert Kelvin to Celsius
const kelvinToCelsius = (kelvin: number): number => Math.round(kelvin - 273.15);
// Helper to convert m/s to km/h
const windSpeedToKmh = (speedMs: number): string => (speedMs * 3.6).toFixed(2);
// Helper to convert visibility from meters to km
const visibilityToKm = (visibilityM: number): string => (visibilityM / 1000).toFixed(2);

export const WeatherDisplay = ({ data, onSync, isSyncing }: WeatherDisplayProps) => {
  if (!data || !data.main || !data.weather || data.weather.length === 0) {
    // Or a more sophisticated placeholder/skeleton component
    return <div className="p-4 text-center">Weather data is unavailable.</div>;
  }

  const { name, main, weather, wind, visibility } = data;

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Section 1: Current Weather Basic */}
        <div className="md:col-span-1 lg:col-span-1 p-6 rounded-lg shadow-lg bg-blue-500 text-white text-center">
          <div className="flex justify-end">
            <RefreshCw
              className={`h-6 w-6 cursor-pointer ${isSyncing ? 'animate-spin' : ''}`}
              onClick={onSync}
            />
          </div>
          <h2 className="text-3xl font-bold">{name}</h2>
          <p className="text-7xl md:text-8xl font-thin">
            {kelvinToCelsius(main.temp)}<sup>&deg;C</sup>
          </p>
          <p className="text-2xl capitalize">{weather[0].main}</p>
          <p className="text-sm capitalize">{weather[0].description}</p>
        </div>

        {/* Section 2: Detailed Weather Stats */}
        <div className="md:col-span-1 lg:col-span-1 p-6 rounded-lg shadow-lg bg-white">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">Details</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div className="text-gray-600">Felt Temp:</div>
            <div className="font-medium text-right">{kelvinToCelsius(main.feels_like)}<sup>&deg;C</sup></div>

            <div className="text-gray-600">Humidity:</div>
            <div className="font-medium text-right">{main.humidity}%</div>

            <div className="text-gray-600">Wind:</div>
            <div className="font-medium text-right">{windSpeedToKmh(wind.speed)} km/h</div>

            <div className="text-gray-600">Visibility:</div>
            <div className="font-medium text-right">{visibilityToKm(visibility)} km</div>

            <div className="text-gray-600">Max Temp:</div>
            <div className="font-medium text-right">{kelvinToCelsius(main.temp_max)}<sup>&deg;C</sup></div>

            <div className="text-gray-600">Min Temp:</div>
            <div className="font-medium text-right">{kelvinToCelsius(main.temp_min)}<sup>&deg;C</sup></div>
          </div>
        </div>

        {/* Section 3: Map will be a separate component (MapDisplay.tsx) */}
        {/* Placeholder for where MapDisplay will go, or it can be part of the parent grid */}
        {/* For now, this component focuses on weather text details */}
      </div>
    </div>
  );
};
