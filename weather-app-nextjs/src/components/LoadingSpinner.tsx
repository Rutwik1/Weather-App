'use client';

import { Loader2 } from 'lucide-react'; // A common loader icon

interface LoadingSpinnerProps {
  size?: number; // Optional size for the icon
  text?: string; // Optional text to display below spinner
}

export const LoadingSpinner = ({ size = 48, text }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Loader2 className="animate-spin text-blue-500" size={size} />
      {text && <p className="mt-2 text-gray-600">{text}</p>}
    </div>
  );
};
