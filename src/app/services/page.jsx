'use client';

import { useState, useEffect } from 'react';
import { Metadata } from 'next';
import ProductOverview from './ProductOverview';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from './Loading';

// This will be used by Next.js static generation

export default function Products() {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if this is a soft reload
    const hasVisited = sessionStorage.getItem('visited_products');
    
    if (hasVisited) {
      // If already visited, show content immediately
      setIsLoading(false);
      setIsReady(true);
    } else {
      // First visit - set flag and show loading state
      sessionStorage.setItem('visited_products', 'true');
      
      // Short timeout to ensure DOM is ready
      const timer = setTimeout(() => {
        setIsLoading(false);
        
        // Additional delay before showing content to ensure smooth rendering
        setTimeout(() => {
          setIsReady(true);
        }, 100);
      }, 800);
      
      return () => clearTimeout(timer);
    }
    
    // Clean up function for when component unmounts
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, []);

  // Lock scroll when loading
  useEffect(() => {
    if (isLoading) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
    }
  }, [isLoading]);

  return (
    <main>
      {isLoading && <Loading />}
      <Header />
      {isReady && <ProductOverview />}
      <Footer />
    </main>
  );
}