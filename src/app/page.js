// src/app/page.js
"use client";

import { useState, Suspense, lazy, useEffect } from "react";
import dynamic from "next/dynamic";
import Header from "@/app/components/Header";
import HeroSection from "@/app/components/HeroSection";

// Simple loading component
const SectionLoader = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="animate-pulse bg-gray-200 h-64 w-full max-w-4xl rounded-lg"></div>
  </div>
);

// Lazy load sections with control for progressive rendering
const ProductsSection = lazy(() => import("@/app/components/ProductsSection"));
const AboutSection = lazy(() => import("@/app/components/AboutSection"));
const FeaturesSection = lazy(() => import("@/app/components/FeaturesSection"));
const IndustriesSection = lazy(() => import("@/app/components/IndustriesSection"));

// Components that are well below the fold can be loaded with more delay
const SustainabilitySection = dynamic(() => import("@/app/components/SustainabilitySection"), {
  ssr: false,
  loading: () => <div className="h-96 flex items-center justify-center">Loading sustainability information...</div>
});

const ManufacturingProcess = dynamic(() => import("@/app/components/ManufacturingProcess"), {
  ssr: false,
  loading: () => <div className="h-96 flex items-center justify-center">Loading manufacturing process...</div>
});

const ContactSection = dynamic(() => import("@/app/components/ContactSection"), {
  ssr: true,
  loading: () => <div className="h-96 flex items-center justify-center">Loading contact form...</div>
});

const Footer = lazy(() => import("@/app/components/Footer"));
const ChatButton = lazy(() => import("@/app/components/ChatButton"));

export default function WhiteGoldAluminiumPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "General",
    message: ""
  });
  
  // Track loading state
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [sectionsVisible, setSectionsVisible] = useState({
    products: false,
    about: false,
    features: false,
    industries: false,
    manufacturing: false,
    sustainability: false,
    contact: false
  });

  // Progressive loading based on hero section completion and scroll position
  useEffect(() => {
    // Listen for hero section load completion
    const handleHeroLoaded = () => {
      setHeroLoaded(true);
      // Immediately show first section after hero loads
      setSectionsVisible(prev => ({
        ...prev,
        products: true
      }));
    };

    window.addEventListener('heroLoaded', handleHeroLoaded);

    // Set up intersection observers for progressive loading
    const setupObservers = () => {
      const options = {
        root: null,
        rootMargin: '200px', // Load when within 200px of viewport
        threshold: 0.1
      };

      // Create observers for each section
      const createObserver = (id, sectionName) => {
        const element = document.getElementById(id);
        if (!element) return;

        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setSectionsVisible(prev => ({
                ...prev,
                [sectionName]: true
              }));
              observer.unobserve(entry.target);
            }
          });
        }, options);

        observer.observe(element);
        return observer;
      };

      // Set up observers with slight delays to prioritize
      setTimeout(() => createObserver('about', 'about'), 100);
      setTimeout(() => createObserver('features', 'features'), 200);
      setTimeout(() => createObserver('industries', 'industries'), 300);
      setTimeout(() => createObserver('manufacturing', 'manufacturing'), 400);
      setTimeout(() => createObserver('sustainability', 'sustainability'), 500);
      setTimeout(() => createObserver('contact', 'contact'), 600);
    };

    // After hero loads, set up observers for other sections
    if (heroLoaded) {
      setupObservers();
    }

    // Prefetch key images on page load
    const prefetchImages = async () => {
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

    return () => {
      window.removeEventListener('heroLoaded', handleHeroLoaded);
    };
  }, [heroLoaded]);

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
        
        {/* Progressive loading of sections after hero is loaded */}
        <div id="products">
          {heroLoaded && sectionsVisible.products ? (
            <Suspense fallback={<SectionLoader />}>
              <ProductsSection />
            </Suspense>
          ) : (
            <SectionLoader />
          )}
        </div>
        
        <div id="about">
          {heroLoaded && sectionsVisible.about ? (
            <Suspense fallback={<SectionLoader />}>
              <AboutSection />
            </Suspense>
          ) : (
            <SectionLoader />
          )}
        </div>
        
        <div id="features">
          {heroLoaded && sectionsVisible.features ? (
            <Suspense fallback={<SectionLoader />}>
              <FeaturesSection />
            </Suspense>
          ) : (
            <SectionLoader />
          )}
        </div>
        
        <div id="manufacturing">
          {heroLoaded && sectionsVisible.manufacturing ? (
            <Suspense fallback={<SectionLoader />}>
              <ManufacturingProcess />
            </Suspense>
          ) : (
            <SectionLoader />
          )}
        </div>
        
        <div id="industries">
          {heroLoaded && sectionsVisible.industries ? (
            <Suspense fallback={<SectionLoader />}>
              <IndustriesSection />
            </Suspense>
          ) : (
            <SectionLoader />
          )}
        </div>
        
        <div id="sustainability">
          {heroLoaded && sectionsVisible.sustainability ? (
            <Suspense fallback={<SectionLoader />}>
              <SustainabilitySection />
            </Suspense>
          ) : (
            <SectionLoader />
          )}
        </div>
        
        <div id="contact">
          {heroLoaded && sectionsVisible.contact ? (
            <Suspense fallback={<SectionLoader />}>
              <ContactSection 
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
              />
            </Suspense>
          ) : (
            <SectionLoader />
          )}
        </div>
      </main>
      
      {heroLoaded ? (
        <Suspense fallback={<div className="h-20"></div>}>
          <Footer />
        </Suspense>
      ) : (
        <div className="h-20"></div>
      )}
      
      {heroLoaded ? (
        <Suspense fallback={null}>
          <ChatButton />
        </Suspense>
      ) : null}
    </div>
  );
}