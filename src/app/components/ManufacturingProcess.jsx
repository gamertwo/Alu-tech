// app/components/ManufacturingProcess.jsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle, Factory, BarChart2, Clock } from "lucide-react";

const ManufacturingProcess = () => {
  const [activeStep, setActiveStep] = useState(null);
  
  const processSteps = [
    {
      id: 1,
      title: "Billet Preparation",
      description: "Raw material selection (6061, 6063, 7075 alloys) and billet preheating (400–500°C) to prepare the aluminium for extrusion.",
      icon: "/billet-icon.jpg",
      animation: "fadeInLeft"
    },
    {
      id: 2,
      title: "Extrusion Process",
      description: "Custom steel die placement and high-pressure extrusion (15,000–20,000 tons) for continuous profile formation.",
      icon: "/extrusion-icon.jpg",
      animation: "fadeInUp"
    },
    {
      id: 3,
      title: "Cooling & Hardening",
      description: "Rapid cooling through water/air systems followed by stretching to remove twists and align profiles for optimal strength.",
      icon: "/cooling-icon.jpg",
      animation: "fadeIn"
    },
    {
      id: 4,
      title: "Cutting & Aging",
      description: "Precise cutting of profiles to length using industrial saws, followed by artificial aging (heat treatment at 175–200°C).",
      icon: "/cutting-icon.jpg",
      animation: "fadeInUp"
    },
    {
      id: 5,
      title: "Surface Finishing & Packaging",
      description: "Anodizing, powder coating, or brushing, followed by final quality inspection, packaging, and shipping preparation.",
      icon: "/finishing-icon.jpg",
      animation: "fadeInRight"
    },
  ];

  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 20
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      y: -15,
      scale: 1.03,
      boxShadow: "0 20px 40px rgba(14, 165, 233, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <section id="manufacturing" className="py-28 bg-gradient-to-b from-sky-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-4">
            Advanced Manufacturing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Manufacturing Process</h2>
          <div className="w-24 h-1 bg-sky-500 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Discover how we transform raw aluminium into premium quality products through our innovative and precision-driven manufacturing process.
          </p>
        </motion.div>

        {/* Process Flow Chart with Enhanced Animation */}
        <div className="relative py-16">
          {/* Animated Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-1.5 bg-gradient-to-r from-sky-200 via-sky-400 to-sky-200 transform -translate-y-1/2 hidden md:block rounded-full">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-sky-600 rounded-full"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              viewport={{ once: true }}
            />
          </div>
          
          <div className="grid md:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className="relative z-10"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                onMouseEnter={() => setActiveStep(step.id)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <motion.div 
                  className="bg-white rounded-xl shadow-lg p-6 h-full border border-sky-100"
                  variants={cardVariants}
                  initial="initial"
                  whileInView="animate"
                  whileHover="hover"
                  viewport={{ once: true }}
                >
                  <div className="flex flex-col items-center mb-6">
                    <motion.div 
                      className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 
                                  ${activeStep === step.id ? 'bg-sky-600' : 'bg-sky-100'} 
                                  transition-colors duration-300`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <span className={`text-2xl font-bold ${activeStep === step.id ? 'text-white' : 'text-sky-600'}`}>
                        {step.id}
                      </span>
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 text-center">{step.description}</p>
                </motion.div>
                <div className="hidden md:block absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8">
                  <motion.div 
                    className="w-8 h-8 bg-sky-500 rotate-45 rounded-sm shadow-md"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.2 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

       
      </div>
    </section>
  );
};

export default ManufacturingProcess;