// app/projects/page.jsx
"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import ProjectsHero from "./ProjectsHero";
import ProjectsGrid from "./ProjectsGrid";
import ProjectProcess from "./ProjectProcess";
import Testimonials from "./Testimonials";
import CallToAction from "./CallToAction";
import Footer from "../components/Footer";

// Import project data from a separate file for better organization
import { projectsData } from "./data/projects";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = useMemo(() => {
    // Dynamically extract unique categories from projects data
    const categories = [...new Set(projectsData.map(project => project.category))];
    return ["All", ...categories];
  }, []);
  
  // Filter projects based on active filter - memoized for performance
  const filteredProjects = useMemo(() => {
    return activeFilter === "All" 
      ? projectsData 
      : projectsData.filter(project => project.category === activeFilter);
  }, [activeFilter]);
  
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
            
            {/* Display message if no projects match the current filter */}
            {filteredProjects.length > 0 ? (
              <ProjectsGrid projects={filteredProjects} />
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500">No projects found for this category. Please try another filter.</p>
              </div>
            )}
            
            <CallToAction />
          </div>
        </section>
        
        <ProjectProcess />
        <Testimonials />
        <Footer />
      </main>
    </>
  );
}