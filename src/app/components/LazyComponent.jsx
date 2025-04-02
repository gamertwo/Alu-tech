"use client";

import { Suspense, useState, useEffect } from 'react';
import useLazyLoad from '@/app/hooks/useLazyLoad';

// Default loading placeholder
const DefaultLoader = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="animate-pulse bg-gray-200 h-64 w-full max-w-4xl rounded-lg"></div>
  </div>
);

/**
 * LazyComponent - Wraps components for lazy loading when scrolled into view
 * 
 * @param {Object} props
 * @param {string} props.id - HTML ID for the section wrapper
 * @param {React.Component} props.component - Component to lazy load
 * @param {Object} props.componentProps - Props to pass to the component
 * @param {React.Component} props.loadingComponent - Custom loading component (optional)
 * @param {number} props.margin - Distance from viewport to load (in pixels, optional)
 * @param {boolean} props.priority - Whether to load without IntersectionObserver (optional)
 * @returns {JSX.Element}
 */
export default function LazyComponent({
  id,
  component: Component,
  componentProps = {},
  loadingComponent: LoadingComponent = DefaultLoader,
  margin = 200,
  priority = false
}) {
  // If priority is true, load immediately without intersection observer
  const [shouldLoad, setShouldLoad] = useState(priority);
  
  // Use the custom hook for intersection detection if not priority
  const isVisible = useLazyLoad(id, margin);
  
  // Load the component when it becomes visible
  useEffect(() => {
    if (isVisible) {
      setShouldLoad(true);
    }
  }, [isVisible]);
  
  return (
    <div id={id} className="relative">
      <Suspense fallback={<LoadingComponent />}>
        {shouldLoad ? <Component {...componentProps} /> : <LoadingComponent />}
      </Suspense>
    </div>
  );
}