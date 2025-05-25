'use client';

import { AlertTriangle } from 'lucide-react'; // Icon for error messages

interface ErrorMessageProps {
  message: string;
  details?: string; // Optional more detailed error information
}

export const ErrorMessage = ({ message, details }: ErrorMessageProps) => {
  return (
    <div 
      className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow" 
      role="alert"
    >
      <div className="flex items-center">
        <AlertTriangle className="h-6 w-6 mr-3 text-red-500" />
        <div>
          <p className="font-bold">{message}</p>
          {details && <p className="text-sm">{details}</p>}
        </div>
      </div>
    </div>
  );
};
