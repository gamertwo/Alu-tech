"use client";

import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for lazy loading components when they enter the viewport
 * @param {string} elementId - HTML ID of the element to observe
 * @param {number} rootMargin - Distance from viewport to start loading (in pixels)
 * @param {boolean} triggerOnce - Whether to trigger only once and stop observing after
 * @returns {boolean} - Whether the element is visible/should be loaded
 */
export default function useLazyLoad(elementId, rootMargin = 200, triggerOnce = true) {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);
  
  useEffect(() => {
    // If already visible and we only trigger once, no need to observe
    if (isVisible && triggerOnce) return;
    
    const element = document.getElementById(elementId);
    
    if (!element) {
      console.warn(`Element with ID "${elementId}" not found for lazy loading`);
      return;
    }
    
    // Clean up previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    // Create new IntersectionObserver
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Stop observing if we only need to trigger once
          if (triggerOnce) {
            observerRef.current.disconnect();
          }
        } else if (!triggerOnce) {
          // If we want to toggle visibility based on intersection
          setIsVisible(false);
        }
      },
      {
        root: null,
        rootMargin: `${rootMargin}px`,
        threshold: 0.1
      }
    );
    
    // Start observing the element
    observerRef.current.observe(element);
    
    // Clean up on unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [elementId, rootMargin, triggerOnce, isVisible]);
  
  return isVisible;
}