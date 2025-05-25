'use client'; // This component will use environment variables on the client side

interface MapDisplayProps {
  city: string; // The city name to display on the map
  // Alternatively, you could use latitude and longitude if preferred for the q parameter.
  // For example: query?: string; // e.g., "latitude,longitude" or "CityName"
}

export const MapDisplay = ({ city }: MapDisplayProps) => {
  const googleMapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

  if (!googleMapApiKey) {
    return (
      <div className="p-4 text-center text-red-500">
        Google Maps API key is not configured. Map cannot be displayed.
      </div>
    );
  }

  if (!city) {
    return (
      <div className="p-4 text-center text-gray-500">
        City information is not available for the map.
      </div>
    );
  }

  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${googleMapApiKey}&q=${encodeURIComponent(city)}`;

  return (
    <div className="mt-6 md:mt-8 rounded-lg shadow-lg overflow-hidden">
      <iframe
        width="100%"
        height="350" // Adjusted height slightly, can be customized
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={mapSrc}
        title={`Map of ${city}`}
        style={{ border: 0 }} // Remove iframe border
      ></iframe>
    </div>
  );
};
