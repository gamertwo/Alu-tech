"use client";

import { useState, lazy, useEffect } from "react";
import Header from "@/app/components/Header";
import HeroSection from "@/app/components/HeroSection";
import LazyComponent from "@/app/components/LazyComponent";
import useLazyLoad from "@/app/hooks/useLazyLoad";

// Lazy load all sections
const ProductsSection = lazy(() => import("@/app/components/ProductsSection"));
const AboutSection = lazy(() => import("@/app/components/AboutSection"));
const FeaturesSection = lazy(() => import("@/app/components/FeaturesSection"));
const IndustriesSection = lazy(() => import("@/app/components/IndustriesSection"));
const SustainabilitySection = lazy(() => import("@/app/components/SustainabilitySection"));
const ManufacturingProcess = lazy(() => import("@/app/components/ManufacturingProcess"));
const ContactSection = lazy(() => import("@/app/components/ContactSection"));
const Footer = lazy(() => import("@/app/components/Footer"));
const ChatButton = lazy(() => import("@/app/components/ChatButton"));

export default function WhiteGoldAluminiumPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "General",
    message: ""
  });
  
  // Specifically for Chat Button which follows scroll
  const shouldLoadChat = useLazyLoad('chat-trigger', 100);
  
  // Prefetch critical images
  useEffect(() => {
    const prefetchImages = () => {
      const imageUrls = [
        '/Desktop2.jpg',
        '/aluminum-extrusion.png',
        '/aluminum-sheets.png'
      ];
      
      imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
      });
    };

    prefetchImages();
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
    console.log("Form submitted:", formData);
    alert("Thank you for your inquiry! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      inquiryType: "General",
      message: ""
    });
  };

  // Contact form props
  const contactProps = {
    formData,
    handleInputChange,
    handleSubmit
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        {/* Hero loads immediately */}
        <HeroSection />
        
        {/* Each section loads completely independently */}
        <LazyComponent
          id="products"
          component={ProductsSection}
          margin={300}
          priority={true} // Load immediately after hero
        />
        
        <LazyComponent
          id="about"
          component={AboutSection}
        />
        
        <LazyComponent
          id="features"
          component={FeaturesSection}
        />
        
        <LazyComponent
          id="manufacturing"
          component={ManufacturingProcess}
        />
        
        <LazyComponent
          id="industries"
          component={IndustriesSection}
        />
        
        <LazyComponent
          id="sustainability"
          component={SustainabilitySection}
        />
        
        <LazyComponent
          id="contact"
          component={ContactSection}
          componentProps={contactProps}
        />
      </main>
      
      <LazyComponent
        id="footer"
        component={Footer}
        loadingComponent={() => <div className="h-20"></div>}
      />
      
      {/* Invisible element for chat button trigger */}
      <div id="chat-trigger" className="h-0 w-0"></div>
      
      {/* Chat button appears after scrolling */}
      {shouldLoadChat && (
        <LazyComponent
          id="chat-button"
          component={ChatButton}
          priority={true} // Always load once the chat-trigger is in view
          loadingComponent={() => null}
        />
      )}
    </div>
  );
}