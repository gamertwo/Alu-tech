// app/components/ClientProvider.jsx
'use client';

import { useState, useEffect } from 'react';

export default function ClientProvider({ children }) {
  const [mounted, setMounted] = useState(false);

  // Only show children after component has mounted on the client
  useEffect(() => {
    // Ensure any browser globals are defined
    if (typeof window !== 'undefined') {
      if (typeof self === 'undefined') {
        window.self = window;
      }
    }
    setMounted(true);
  }, []);

  // During initial client load, return minimal markup
  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gray-700">Loading White Gold Aluminum...</p>
        </div>
      </div>
    );
  }

  // Once mounted on client, render the actual children
  return <>{children}</>;
}