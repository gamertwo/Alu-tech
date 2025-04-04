// app/projects/page.jsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import ProjectsHero from "./ProjectsHero";
import ProjectsGrid from "./ProjectsGrid";
import ProjectProcess from "./ProjectProcess";
import Testimonials from "./Testimonials";
import CallToAction from "./CallToAction";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  
  const filters = ["All", "Commercial", "Residential", "Solar"];
  
  const projects = [
    {
      id: 1,
      title: "Apple Green Sialkot",
      category: "Commercial",
      image: "/projects/apple-green.jpg",
      description: "Premium aluminum solutions for a modern commercial complex in Sialkot, featuring custom window profiles and door systems.",
      completionDate: "2022",
      location: "Sialkot",
      highlights: ["Custom aluminum profiles", "Floor-to-ceiling window systems", "Energy-efficient design"]
    },
    {
      id: 2,
      title: "Gulburg Empire Center",
      category: "Commercial",
      image: "/projects/gulburg-empire.jpg",
      description: "Custom aluminum profiles and façade solutions for the Empire Center in DHA Rehbar, creating a striking architectural statement.",
      completionDate: "2023",
      location: "DHA Rehbar",
      highlights: ["Aluminum curtain wall system", "Custom façade elements", "Sun shading solutions"]
    },
    {
      id: 3,
      title: "Sunlife Solar",
      category: "Solar",
      image: "/projects/sunlife-solar.jpg",
      description: "Aluminum channels and mounting systems for solar panel installations, optimized for efficiency and durability.",
      completionDate: "2021",
      location: "Multiple Locations",
      highlights: ["Solar panel framing", "Mounting rails", "Weather-resistant finishes"]
    },
    {
      id: 4,
      title: "AM Solar",
      category: "Solar",
      image: "/projects/am-solar.jpg",
      description: "Custom aluminum profiles for large-scale solar power installations across Punjab, designed for maximum durability.",
      completionDate: "2023",
      location: "Punjab",
      highlights: ["Industrial-grade aluminum channels", "Specialized connectors", "Corrosion-resistant treatment"]
    },
    {
      id: 5,
      title: "Modern Residences",
      category: "Residential",
      image: "/projects/modern-residences.jpg",
      description: "Aluminum window and door systems for luxury residential projects, combining aesthetics with functionality.",
      completionDate: "2022",
      location: "Lahore",
      highlights: ["Sliding door systems", "Casement windows", "Thermal break technology"]
    },
    {
      id: 6,
      title: "Green Energy Complex",
      category: "Solar",
      image: "/projects/green-energy.jpg",
      description: "Comprehensive aluminum framing solutions for a major solar energy development project.",
      completionDate: "2023",
      location: "Islamabad",
      highlights: ["Custom extrusions", "Load-bearing structures", "Environmental certification"]
    }
  ];
  
  // Filter projects based on active filter
  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  return (
    <>
      <Header />
      <main>
        <ProjectsHero />
        
        <section className="py-16 md:py-24 bg-sky-50">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-4">
                Our Work
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Projects</h2>
              <div className="w-24 h-1 bg-sky-500 mx-auto mb-6"></div>
              <p className="max-w-2xl mx-auto text-gray-600">
                Browse our portfolio of successful projects where our premium aluminum solutions have made a difference
              </p>
            </motion.div>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {filters.map((filter) => (
                <motion.button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === filter 
                      ? "bg-sky-600 text-white shadow-md" 
                      : "bg-white text-gray-600 hover:bg-sky-50"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {filter}
                </motion.button>
              ))}
            </div>
            
            <ProjectsGrid projects={filteredProjects} />
            
            <CallToAction />
          </div>
        </section>
        
        <ProjectProcess />
        <Testimonials />
      </main>
    </>
  );
}