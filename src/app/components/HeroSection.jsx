// app/components/HeroSection.jsx
"use client";

import { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Button hover animation
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  // Simulate image loading without using the Image constructor
  useEffect(() => {
    // Simulate image loading
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Notify parent when hero section is fully loaded
  useEffect(() => {
    if (imageLoaded) {
      // Dispatch a custom event that can be listened to by the parent component
      try {
        const event = new CustomEvent('heroLoaded');
        window.dispatchEvent(event);
      } catch (error) {
        console.error("Error dispatching heroLoaded event:", error);
      }
    }
  }, [imageLoaded]);

  return (
    <section className="relative h-[500px] md:h-[600px] text-white overflow-hidden">
      {/* Dark overlay that will ensure image remains visible on all devices */}
      <div className="absolute inset-0 bg-black opacity-70 z-[1]"></div>
      
      {/* Background image with proper opacity and z-index */}
      <div className="absolute inset-0 z-0">
        <div 
          style={{
            backgroundImage: `url('/Desktop2.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '100%',
            opacity: 0.7,  // Keep consistent opacity
          }}
          aria-hidden="true"
          onLoad={() => setImageLoaded(true)}
          className="bg-no-repeat"
        />
      </div>
      
      {/* Content positioned above the background with higher z-index */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
        <motion.div 
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mb-6 inline-block"
          />

          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Innovating Aluminum for a Stronger Tomorrow
            <motion.span 
              className="block text-blue-200 mt-2 text-xl sm:text-2xl md:text-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              Precision. Quality. Innovation.
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl mb-6 md:mb-8 text-blue-50 max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Premium Aluminum solutions for industrial and commercial needs with unmatched quality and precision.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row sm:flex-wrap items-center gap-4 sm:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="w-full sm:w-auto"
            >
              <Link 
                href="/contact" 
                className="group bg-blue-400 hover:bg-blue-500 text-white px-6 sm:px-8 py-3 rounded-md font-medium transition-all duration-300 flex items-center justify-center sm:justify-start shadow-md overflow-hidden relative w-full sm:w-auto"
              >
                <span className="relative z-10">Get a Quote</span>
                <motion.span 
                  className="relative z-10 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.span>
                <span className="absolute bottom-0 left-0 w-0 h-full bg-blue-500 transition-all duration-300 group-hover:w-full -z-0"></span>
              </Link>
            </motion.div>
            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="w-full sm:w-auto mt-4 sm:mt-0"
            >
              <Link 
                href="/services" 
                className="group bg-transparent border-2 border-blue-200 hover:border-blue-100 text-white px-6 sm:px-8 py-3 rounded-md font-medium transition-all duration-300 flex items-center justify-center sm:justify-start overflow-hidden relative w-full sm:w-auto"
              >
                <span className="relative z-10">View Services</span>
                <motion.span 
                  className="relative z-10 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </motion.span>
                <span className="absolute bottom-0 left-0 w-0 h-full bg-blue-700 opacity-30 transition-all duration-300 group-hover:w-full -z-0"></span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Additional gradient overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-30 z-[2] pointer-events-none"></div>
    </section>
  );
};

// Memoize component to prevent unnecessary re-renders
export default memo(HeroSection);