'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; // Import useSearchParams
import { Navbar } from '@/components/Navbar';
import { WeatherDisplay } from '@/components/WeatherDisplay';
import { ForecastDisplay } from '@/components/ForecastDisplay';
import { MapDisplay } from '@/components/MapDisplay';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { useWeather } from '@/hooks/useWeather';
import { motion } from 'framer-motion';

export default function HomePage() {
  const {
    data: weatherData,
    isLoading,
    error,
    isValidating,
    fetchWeatherByCity,
    fetchWeatherByCoords,
  } = useWeather();
  
  // Get search params
  const searchParams = useSearchParams();

  useEffect(() => {
    const cityFromQuery = searchParams.get('city');
    if (cityFromQuery && !weatherData && !isLoading && !error) { // Only fetch if no data/loading/error
      fetchWeatherByCity(cityFromQuery);
    }
    // We only want this to run once on mount if a query param exists,
    // or if searchParams changes and contains a new city.
    // Adding weatherData, isLoading, error to dependency array to avoid stale closures
    // and re-triggering if those states change significantly before fetch.
  }, [searchParams, fetchWeatherByCity, weatherData, isLoading, error]);

  const handleCitySearch = (city: string) => {
    // Optionally, update URL as well, though not strictly necessary for functionality
    // window.history.pushState({}, '', `/?city=${encodeURIComponent(city)}`);
    fetchWeatherByCity(city);
  };

  const handleLocationSearch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        (geoError) => {
          console.error('Geolocation error:', geoError);
          alert(`Error getting location: ${geoError.message}`);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    // ... (rest of the JSX remains the same as before)
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-sky-100 dark:from-slate-900 dark:to-sky-900">
      <Navbar 
        onCitySearch={handleCitySearch} 
        onLocationSearch={handleLocationSearch} 
      />

      <div className="container mx-auto p-4">
        {isLoading && <LoadingSpinner text="Fetching weather data..." />}
        
        {error && (
          <ErrorMessage 
            message="Failed to fetch weather data" 
            details={error.message} 
          />
        )}

        {!isLoading && !error && weatherData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <WeatherDisplay 
              data={weatherData.weather} 
              onSync={() => {
                if (weatherData.weather.name) {
                   fetchWeatherByCity(weatherData.weather.name);
                }
              }}
              isSyncing={isValidating}
            />
            <ForecastDisplay forecasts={weatherData.forecast} />
            <MapDisplay city={weatherData.weather.name} /> 
          </motion.div>
        )}

        {!isLoading && !error && !weatherData && (
            <div className="text-center p-8 text-gray-500">
                <h2 className="text-2xl font-semibold mb-2">Welcome to the Weather App!</h2>
                <p>Search for a city or use your current location to get the latest weather updates.</p>
                <p className="mt-2 text-sm">Try appending `?city=YourCityName` to the URL!</p>
            </div>
        )}
      </div>
      
      <footer className="text-center p-4 mt-8 text-xs text-gray-600 dark:text-gray-400">
        Weather data powered by OpenWeatherMap. App by Jules.
      </footer>
    </main>
  );
}
