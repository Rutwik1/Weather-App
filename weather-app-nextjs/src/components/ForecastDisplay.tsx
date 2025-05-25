'use client';

import { ForecastItem, DailyForecastData } from './ForecastItem'; // Import the item component and its data type

interface ForecastDisplayProps {
  forecasts: DailyForecastData[]; // Expect an array of daily forecast data
}

export const ForecastDisplay = ({ forecasts }: ForecastDisplayProps) => {
  if (!forecasts || forecasts.length === 0) {
    return <div className="p-4 text-center text-gray-500">No forecast data available.</div>;
  }

  // Typically, OpenWeatherMap provides 7-8 days of daily forecast.
  // Let's ensure we only display a certain number, e.g., 5 or 7 days.
  const displayForecasts = forecasts.slice(0, 7); // Display up to 7 days

  return (
    <div className="mt-6 md:mt-8">
      <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-center text-blue-600">
        7-Day Forecast
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 md:gap-3">
        {displayForecasts.map((dailyData) => (
          <ForecastItem key={dailyData.dt} forecast={dailyData} />
        ))}
      </div>
    </div>
  );
};
