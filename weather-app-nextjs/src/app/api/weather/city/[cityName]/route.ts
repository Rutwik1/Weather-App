import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { cityName: string } }
) {
  const cityName = params.cityName;
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'OpenWeatherMap API key not configured' },
      { status: 500 }
    );
  }

  if (!cityName) {
    return NextResponse.json(
      { error: 'City name is required' },
      { status: 400 }
    );
  }

  try {
    // Fetch current weather data
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    );
    if (!weatherResponse.ok) {
      const errorData = await weatherResponse.json();
      return NextResponse.json(
        { error: `Failed to fetch weather data: ${errorData.message || weatherResponse.statusText}` },
        { status: weatherResponse.status }
      );
    }
    const weatherData = await weatherResponse.json();

    // Fetch forecast data using onecall API (requires lat/lon from weatherData)
    const { coord } = weatherData;
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=hourly,minutely&units=metric&appid=${apiKey}`
    );
    if (!forecastResponse.ok) {
      const errorData = await forecastResponse.json();
      return NextResponse.json(
        { error: `Failed to fetch forecast data: ${errorData.message || forecastResponse.statusText}` },
        { status: forecastResponse.status }
      );
    }
    const forecastData = await forecastResponse.json();

    const payload = {
      weather: weatherData,
      forecast: forecastData.daily, // Original app used forecastData.daily
    };

    return NextResponse.json(payload);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
