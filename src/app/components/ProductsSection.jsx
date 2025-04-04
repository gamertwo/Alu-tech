// app/components/ProductsSection.jsx
"use client";

import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

// Product data with front and back content
const products = [
  {
    title: "Aluminum Extrusions",
    image: "/aluminum-extrusion.png",
    description: "Custom and standard profiles for various applications with precise tolerances.",
    backContent: {
      details: [
        { label: "Material Options", value: "Alloys" },
        { label: "Applications", value: "Renewable energy, construction" },
        { label: "Key Benefits", value: "High strength, lightweight, corrosion-resistant" },
        { label: "Customization", value: "Tailored shapes, cutting, drilling, and coating" }
      ]
    }
  },
  {
    title: "Aluminum Sheets & Plates",
    image: "/aluminum-sheets.png",
    description: "High-quality flat-rolled products available in various alloys, tempers, and dimensions.",
    backContent: {
      details: [
        { label: "Thickness Range", value: "0.9mm to 1.6mm" },
        { label: "Available Alloys", value: "Alloys" },
        { label: "Surface Finishes", value: "Anodized , Wood Color Design" },
        { label: "Common Uses", value: "Construction, roofing" }
      ]
    }
  },
  {
    title: "Aluminum Castings",
    image: "/aluminum-casting.png",
    description: "Die-cast and sand-cast components with excellent surface finish and dimensional accuracy.",
    backContent: {
      details: [
        { label: "Casting Methods", value: "Die casting" },
        { label: "Key Features", value: "High precision, durable, heat-resistant" },
        { label: "Industries Served", value: "Construction, machinery"},
        { label: "Customization", value: "Complex geometries" }
      ]
    }
  },
  {
    title: "Surface Treatments",
    image: "/aluminum-surface.png",
    description: "Anodizing, powder coating, and other finishes to enhance durability and aesthetics.",
    backContent: {
      details: [
        { label: "Anodizing", value: "Improves corrosion resistance & appearance" },
        { label: "Powder Coating", value: "Durable, weather-resistant, wide color options" },
        { label: "Polishing & Brushing", value: "Enhances aesthetic appeal" },
        { label: "Applications", value: "Architectural, construction" }
      ]
    }
  },
  {
    title: "CNC Machining",
    image: "/CNC-machine.png",
    description: "Precision machining services for complex Aluminum components with tight tolerances.",
    backContent: {
      details: [
        { label: "Capabilities", value: "Milling, turning, drilling, tapping" },
        { label: "Industries", value: "Construction , machinery" },
        { label: "Customization", value: "Prototype to large-scale production" }
      ]
    }
  },
  {
    title: "Custom Fabrication",
    image: "/aluminium-fabrication.png",
    description: "Tailored solutions including cutting, bending, welding, and assembly services.",
    backContent: {
      details: [
        { label: "Processes", value: "Bending, welding, cutting, forming" },
        { label: "Tailored Solutions", value: "Design assistance for unique applications" },
        { label: "Industries", value: "Construction, transportation, solar energy" },
        { label: "Finishing Options", value: "Powder coating, anodizing, polishing" }
      ]
    }
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const ProductsSection = () => {
  // Track which cards are flipped
  const [flippedCards, setFlippedCards] = useState({});
  // Track loaded images
  const [loadedImages, setLoadedImages] = useState({});

  // Pre-load images simulated - avoid using Image constructor
  useEffect(() => {
    // Create a simulated loading effect for the first 3 images
    const timer1 = setTimeout(() => {
      setLoadedImages(prev => ({
        ...prev,
        0: true,
        1: true,
        2: true
      }));
    }, 200);
    
    // Load the rest with a delay
    const timer2 = setTimeout(() => {
      setLoadedImages(prev => ({
        ...prev,
        3: true,
        4: true,
        5: true
      }));
    }, 1000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Handle card flip
  const handleFlip = (index) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section id="products" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
            Our Solutions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Premium Aluminum Products</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-slate-600">
            We offer a comprehensive range of high-quality Aluminum products and services tailored to meet diverse industry needs.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {products.map((product, index) => (
            <motion.div 
              key={index} 
              className="h-[450px] perspective-1000"
              variants={itemVariants}
              whileHover={{ 
                y: -8,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div 
                className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                  flippedCards[index] ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front of Card */}
                <div className="absolute w-full h-full backface-hidden bg-white rounded-lg overflow-hidden shadow-md group hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-56 overflow-hidden">
                    {/* Show skeleton loader until image loads */}
                    {!loadedImages[index] && (
                      <div className="absolute inset-0 bg-slate-200 animate-pulse"></div>
                    )}
                    {/* Use div with background image instead of Next.js Image */}
                    <div 
                      className="transition-transform duration-500 group-hover:scale-105 h-full w-full"
                      style={{
                        backgroundImage: `url(${product.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: loadedImages[index] ? 1 : 0,
                        transition: "opacity 0.3s ease-in-out"
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 flex flex-col h-[calc(100%-224px)]">
                    <h3 className="text-xl font-semibold mb-3 text-slate-800 group-hover:text-blue-600 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-slate-600 mb-6">
                      {product.description}
                    </p>
                    <div className="mt-auto pt-2 border-t border-slate-100">
                      <button 
                        onClick={() => handleFlip(index)}
                        className="mt-4 text-blue-600 hover:text-blue-800 font-medium flex items-center transition-all duration-300"
                      >
                        Learn More 
                        <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Back of Card */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-blue-600 text-white rounded-lg overflow-hidden shadow-md">
                  <div className="p-6 h-full flex flex-col">
                    <h3 className="text-xl font-semibold mb-4 border-b border-blue-500 pb-2">
                      {product.title}
                    </h3>
                    
                    <div className="flex-grow">
                      <ul className="space-y-4">
                        {product.backContent.details.map((detail, idx) => (
                          <li key={idx} className="space-y-1">
                            <span className="font-semibold text-blue-200 block">{detail.label}</span>
                            <span className="block">{detail.value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto pt-4 border-t border-blue-500">
                      <button 
                        onClick={() => handleFlip(index)}
                        className="text-white hover:text-blue-200 font-medium flex items-center transition-all duration-300"
                      >
                        <span className="mr-2 inline-block transition-transform duration-300 hover:-translate-x-1">
                          <ArrowLeft className="h-4 w-4" />
                        </span>
                        Back to Product
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Link 
            href="/services" 
            className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-md transition-colors duration-300 group"
          >
            See more services
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="h-5 w-5" />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Add required CSS for 3D transforms */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};

// Memoize component to prevent unnecessary re-renders
export default memo(ProductsSection);