// src/app/page.js
"use client";

import { useState, Suspense, lazy, useEffect } from "react";
import dynamic from "next/dynamic";
import Header from "@/app/components/Header";
import HeroSection from "@/app/components/HeroSection";

// Lazy load less critical components
const AboutSection = lazy(() => import("@/app/components/AboutSection"));
const ProductsSection = lazy(() => import("@/app/components/ProductsSection"));
const FeaturesSection = lazy(() => import("@/app/components/FeaturesSection"));
const IndustriesSection = lazy(() => import("@/app/components/IndustriesSection"));

// Components that are below the fold can be loaded with more delay
const SustainabilitySection = dynamic(() => import("@/app/components/SustainabilitySection"), {
  ssr: false,
  loading: () => <div className="h-96 flex items-center justify-center">Loading sustainability information...</div>
});

const ManufacturingProcess = dynamic(() => import("@/app/components/ManufacturingProcess"), {
  ssr: false,
  loading: () => <div className="h-96 flex items-center justify-center">Loading manufacturing process...</div>
});

const ContactSection = dynamic(() => import("@/app/components/ContactSection"), {
  ssr: true
});

const Footer = lazy(() => import("@/app/components/Footer"));
const ChatButton = lazy(() => import("@/app/components/ChatButton"));

// Simple loading component
const SectionLoader = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="animate-pulse bg-gray-200 h-64 w-full max-w-4xl rounded-lg"></div>
  </div>
);

export default function WhiteGoldAluminiumPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "General",
    message: ""
  });
  
  // Prefetch key images on page load
  useEffect(() => {
    const imageUrls = [
      '/Desktop.png',
      '/aluminum-extrusion.png',
      '/aluminum-sheets.png',
      '/aluminum-casting.png'
    ];
    
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your inquiry! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      inquiryType: "General",
      message: ""
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        {/* Critical above-the-fold content loads immediately */}
        <HeroSection />
        
        {/* Use suspense for content that can wait */}
        <Suspense fallback={<SectionLoader />}>
          <ProductsSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <FeaturesSection />
        </Suspense>
        
        {/* Below fold content loads when needed */}
        <Suspense fallback={<SectionLoader />}>
          <ManufacturingProcess />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <IndustriesSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <SustainabilitySection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ContactSection 
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </Suspense>
      </main>
      
      <Suspense fallback={<div className="h-20"></div>}>
        <Footer />
      </Suspense>
      

    </div>
  );
}