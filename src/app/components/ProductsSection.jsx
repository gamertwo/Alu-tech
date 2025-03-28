// app/components/ProductsSection.jsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ProductsSection = () => {
  const products = [
    {
      title: "Aluminium Extrusions",
      image: "/aluminum-extrusion.png",
      description: "Custom and standard profiles for various applications with precise tolerances."
    },
    {
      title: "Aluminium Sheets & Plates",
      image: "/aluminum-sheets.png",
      description: "High-quality flat-rolled products available in various alloys, tempers, and dimensions."
    },
    {
      title: "Aluminium Castings",
      image: "/aluminum-casting.png",
      description: "Die-cast and sand-cast components with excellent surface finish and dimensional accuracy."
    },
    {
      title: "Surface Treatments",
      image: "/aluminum-surface.png",
      description: "Anodizing, powder coating, and other finishes to enhance durability and aesthetics."
    },
    {
      title: "CNC Machining",
      image: "/CNC-machine.png",
      description: "Precision machining services for complex aluminium components with tight tolerances."
    },
    {
      title: "Custom Fabrication",
      image: "/aluminium-fabrication.png",
      description: "Tailored solutions including cutting, bending, welding, and assembly services."
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

  return (
    <section id="products" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
            Our Solutions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Premium Aluminium Products</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-slate-600">
            We offer a comprehensive range of high-quality aluminium products and services tailored to meet diverse industry needs.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {products.map((product, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-lg overflow-hidden shadow-md group hover:shadow-xl transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ 
                y: -8,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div className="relative h-56 overflow-hidden">
                <Image 
                  src={product.image} 
                  alt={product.title} 
                  fill 
                  style={{objectFit: "cover"}}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-slate-800 group-hover:text-blue-600 transition-colors">
                  {product.title}
                </h3>
                <p className="text-slate-600 mb-4 h-20">
                  {product.description}
                </p>
                <div className="pt-2 border-t border-slate-100">
                  <Link 
                    href="#contact" 
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center transition-all duration-300"
                  >
                    Learn More 
                    <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
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
            href="#contact" 
            className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-md transition-colors duration-300 group"
          >
            Request Custom Solution
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="h-5 w-5" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;