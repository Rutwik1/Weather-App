import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { lat: string; lon: string } }
) {
  const { lat, lon } = params;
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'OpenWeatherMap API key not configured' },
      { status: 500 }
    );
  }

  if (!lat || !lon) {
    return NextResponse.json(
      { error: 'Latitude and longitude are required' },
      { status: 400 }
    );
  }

  try {
    // Fetch current weather data
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    if (!weatherResponse.ok) {
      const errorData = await weatherResponse.json();
      return NextResponse.json(
        { error: `Failed to fetch weather data: ${errorData.message || weatherResponse.statusText}` },
        { status: weatherResponse.status }
      );
    }
    const weatherData = await weatherResponse.json();

    // Fetch forecast data using onecall API (uses the same lat/lon)
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${apiKey}`
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
    console.error('Error fetching location weather data:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
