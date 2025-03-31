// src/app/page.js
"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import HeroSection from "@/app/components/HeroSection";
import AboutSection from "@/app/components/AboutSection";
import ProductsSection from "@/app/components/ProductsSection";
import FeaturesSection from "@/app/components/FeaturesSection";
import IndustriesSection from "@/app/components/IndustriesSection";
import SustainabilitySection from "@/app/components/SustainabilitySection";
import ManufacturingProcess from "@/app/components/ManufacturingProcess";
import ContactSection from "@/app/components/ContactSection";
import Footer from "@/app/components/Footer";
import ChatButton from "@/app/components/ChatButton";

export default function WhiteGoldAluminiumPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "General",
    message: ""
  });

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
        <HeroSection />
        <ProductsSection />
        <AboutSection />
        <FeaturesSection />
        <ManufacturingProcess />
        <IndustriesSection />
        <SustainabilitySection />
        <ContactSection 
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </main>
      <Footer />
      <ChatButton />
    </div>
  );
}