# Weather App Next.js

A modern weather application built with Next.js, TypeScript, Tailwind CSS, Shadcn UI, SWR for data fetching, and Framer Motion for animations. This project is a migration of an earlier React/Vite application.

## Features

*   Search for weather by city name.
*   Get weather updates for your current location.
*   View current weather conditions (temperature, humidity, wind, etc.).
*   See a 7-day weather forecast.
*   View the city location on Google Maps.
*   Responsive design for various screen sizes.
*   Loading and error states for a smooth user experience.
*   Animations for data synchronization and content loading.
*   Initial data load from URL query parameter (e.g., `/?city=London`).

## Tech Stack

*   **Framework:** Next.js (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **UI Components:** Shadcn UI
*   **Client-Side Data Fetching:** SWR
*   **Animations:** Framer Motion
*   **API Proxy:** Next.js API Routes (for OpenWeatherMap)

## Prerequisites

*   Node.js (v18.x or later recommended)
*   npm or yarn

## Setup

1.  **Clone the repository (if applicable):**
    ```bash
    # git clone <repository-url>
    # cd weather-app-nextjs
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **Set up Environment Variables:**
    Create a file named `.env.local` in the root of the project and add your API keys:
    ```env
    OPENWEATHERMAP_API_KEY="your_openweathermap_api_key"
    NEXT_PUBLIC_GOOGLE_MAP_API_KEY="your_google_maps_embed_api_key"
    ```
    *   `OPENWEATHERMAP_API_KEY`: Get this from [OpenWeatherMap](https://openweathermap.org/api).
    *   `NEXT_PUBLIC_GOOGLE_MAP_API_KEY`: Get this from [Google Cloud Console](https://console.cloud.google.com/apis/credentials) (ensure Maps Embed API is enabled).

## Running the Development Server

```bash
npm run dev
# or
# yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

```bash
npm run build
# or
# yarn build
```
This will create an optimized production build in the `.next` folder.

## Linting and Formatting

*   To lint the code: `npm run lint`
*   (If Prettier is set up) To format the code: `npm run format` (or similar)

## Project Structure

*   `src/app/`: Main application pages, layouts, and API routes.
*   `src/components/`: Reusable React components (including Shadcn UI).
*   `src/hooks/`: Custom React hooks (e.g., `useWeather.ts`).
*   `src/lib/`: Utility functions.
*   `public/`: Static assets like favicons and images.
