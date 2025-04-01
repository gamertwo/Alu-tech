// app/components/HeroSection.jsx
"use client";

import { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  // Typing animation state
  const [text, setText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const fullText = "Innovating Aluminium for a Stronger Tomorrow";
  
  // Typing animation effect with optimized performance
  useEffect(() => {
    if (text.length < fullText.length) {
      const typing = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 40);
      
      return () => clearTimeout(typing);
    } else {
      setIsTypingComplete(true);
    }
  }, [text]);
  
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
    if (isTypingComplete && imageLoaded) {
      // Dispatch a custom event that can be listened to by the parent component
      try {
        const event = new CustomEvent('heroLoaded');
        window.dispatchEvent(event);
      } catch (error) {
        console.error("Error dispatching heroLoaded event:", error);
      }
    }
  }, [isTypingComplete, imageLoaded]);

  return (
    <section className="relative h-[600px] text-white">
      <div className="absolute inset-0 opacity-30 bg-pattern">
        {/* Use a div with background image instead of Next.js Image */}
        <div 
          style={{
            backgroundImage: `url('/Desktop2.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '100%',
          }}
          aria-hidden="true"
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      
      {/* Subtle animated overlay */}
      <div className="absolute inset-0 opacity-60"></div>
      
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

          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight min-h-[3em] md:min-h-[2em]">
            {/* Text with cursor */}
            <span>{text}</span>
            <span className={`inline-block w-1 h-8 ml-1 bg-blue-200 ${isTypingComplete ? 'animate-pulse' : ''}`}></span>
            {/* Show the static highlighted text only after typing is complete */}
            {isTypingComplete && (
              <motion.span 
                className="block text-blue-200 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Precision. Quality. Innovation.
              </motion.span>
            )}
          </h1>
          
          <motion.p 
            className="text-xl mb-8 text-blue-50 max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: isTypingComplete ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Premium aluminium solutions for industrial and commercial needs with unmatched quality and precision.
          </motion.p>
          
          <motion.div
            className="flex flex-wrap items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: isTypingComplete ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="w-auto"
            >
              <Link 
                href="#contact" 
                className="group bg-blue-400 hover:bg-blue-500 text-white px-8 py-3 rounded-md font-medium transition-all duration-300 flex items-center shadow-md overflow-hidden relative"
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
              className="w-auto"
            >
              <Link 
                href="#products" 
                className="group bg-transparent border-2 border-blue-200 hover:border-blue-100 text-white px-8 py-3 rounded-md font-medium transition-all duration-300 flex items-center overflow-hidden relative"
              >
                <span className="relative z-10">View Products</span>
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
    </section>
  );
};

// Memoize component to prevent unnecessary re-renders
export default memo(HeroSection);