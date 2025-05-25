'use client'; // Required for components with event handlers and state

import { useState } from 'react';
import { Input } from '@/components/ui/input'; // Assuming Shadcn UI input is added
import { Button } from '@/components/ui/button'; // Assuming Shadcn UI button is added
import { MapPin } from 'lucide-react'; // Icon for location

// Props type (will be expanded later for event handlers)
interface NavbarProps {
  onCitySearch: (city: string) => void;
  onLocationSearch: () => void;
}

export const Navbar = ({ onCitySearch, onLocationSearch }: NavbarProps) => {
  const [city, setCity] = useState('');

  const handleCityInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSearchClick = () => {
    if (city.trim()) {
      onCitySearch(city.trim());
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && city.trim()) {
      onCitySearch(city.trim());
    }
  };

  const handleLocationClick = () => {
    onLocationSearch();
  };

  return (
    <nav className="flex flex-col sm:flex-row items-center justify-center gap-4 p-4 bg-app-bg-light min-h-[70px]">
      {/* City Search Section */}
      <div className="flex items-center">
        <Input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={handleCityInputChange}
          onKeyPress={handleKeyPress}
          className="rounded-r-none focus:ring-0 focus:ring-offset-0" // Example styling
        />
        <Button
          onClick={handleSearchClick}
          className="rounded-l-none bg-app-primary hover:bg-app-primary-darker text-white" // Example styling
        >
          Search
        </Button>
      </div>

      {/* Location Button Section */}
      <div className="flex items-center">
        <Button
          onClick={handleLocationClick}
          variant="outline" // Example styling
          className="bg-app-primary hover:bg-app-primary-darker text-white"
        >
          <MapPin className="mr-2 h-5 w-5" />
          Your Location Weather
        </Button>
      </div>
    </nav>
  );
};
