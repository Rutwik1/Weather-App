import useSWR, { KeyedMutator } from 'swr';
import { CurrentWeatherData } from '@/components/WeatherDisplay'; // Assuming path is correct
import { DailyForecastData } from '@/components/ForecastItem';   // Assuming path is correct

// Define the structure of the data returned by our API routes
export interface WeatherApiResponse {
  weather: CurrentWeatherData;
  forecast: DailyForecastData[];
}

// Define the fetcher function for SWR
// Note: SWR key can be a string or a function/array returning a string.
// If null is passed as key, SWR won't start the request.
const fetcher = async (url: string): Promise<WeatherApiResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json();
    const error = new Error(errorData.error || 'An error occurred while fetching the data.');
    // Attach extra info to the error object if needed
    // error.info = errorData;
    // error.status = res.status;
    throw error;
  }
  return res.json();
};

interface UseWeatherReturn {
  data: WeatherApiResponse | undefined;
  isLoading: boolean;
  error: Error | undefined;
  isValidating: boolean;
  mutate: KeyedMutator<WeatherApiResponse>;
  fetchWeatherByCity: (city: string) => void;
  fetchWeatherByCoords: (lat: number, lon: number) => void;
  clearWeatherData: () => void;
}

// Our custom hook
export const useWeather = (): UseWeatherReturn => {
  // The key for SWR. It can be a string or null.
  // We'll use a state to manage the actual API endpoint to call.
  // SWR will automatically re-fetch if this key changes.
  const [apiKey, setApiKey] = React.useState<string | null>(null);

  const { data, error, isLoading, isValidating, mutate } = useSWR<WeatherApiResponse>(
    apiKey, // If apiKey is null, SWR won't fetch
    fetcher,
    {
      // Optional SWR configuration
      revalidateOnFocus: false, // Example: disable revalidation on window focus
      // shouldRetryOnError: false, // Example: disable retries on error
    }
  );

  const fetchWeatherByCity = (city: string) => {
    if (city) {
      setApiKey(`/api/weather/city/${encodeURIComponent(city)}`);
    }
  };

  const fetchWeatherByCoords = (lat: number, lon: number) => {
    setApiKey(`/api/weather/location/${lat}/${lon}`);
  };

  const clearWeatherData = () => {
    setApiKey(null); // This will stop SWR from fetching and clear data if cache is not persisted
    mutate(undefined, false); // Clear data from SWR cache without revalidation
  }

  return {
    data,
    isLoading: isLoading || (!error && !data && !!apiKey), // More robust loading state
    error,
    isValidating,
    mutate,
    fetchWeatherByCity,
    fetchWeatherByCoords,
    clearWeatherData,
  };
};

// Need to import React for useState
import React from 'react';
