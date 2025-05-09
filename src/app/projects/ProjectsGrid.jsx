// app/projects/ProjectsGrid.jsx
"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Building, Calendar, ArrowRight, ExternalLink, Check } from "lucide-react";
import ProjectDetailsModal from "./ProjectDetailsModal";

const ProjectsGrid = ({ projects }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const toggleExpand = useCallback((id) => {
    setExpandedId(prevId => prevId === id ? null : id);
  }, []);

  const handleOpenModal = useCallback((project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    // Wait for modal close animation before clearing selected project
    setTimeout(() => setSelectedProject(null), 300);
  }, []);
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Check if we should show empty state
  if (!projects || projects.length === 0) {
    return (
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="py-16 text-center"
      >
        <p className="text-gray-500">No projects found matching your criteria.</p>
      </motion.div>
    );
  }
  
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className={`bg-white rounded-lg overflow-hidden shadow-md border border-sky-100 group hover:shadow-xl transition-all duration-300 ${
              expandedId === project.id ? 'ring-2 ring-sky-400 ring-offset-2' : ''
            }`}
            layoutId={`project-${project.id}`}
          >
            <div 
              className="relative h-64 overflow-hidden cursor-pointer"
              onClick={() => handleOpenModal(project)}
            >
              {/* Add fallback for missing images */}
              <div className="absolute inset-0 bg-gray-100 animate-pulse"></div>
              <Image 
                src={project.image || "/api/placeholder/800/600?text=Project+Image"}
                alt={project.title || "Project"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{objectFit: "cover"}}
                className="transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <span className="inline-block px-3 py-1 bg-sky-600 text-white text-xs font-medium rounded-full mb-2">
                  {project.category || "Project"}
                </span>
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-4 line-clamp-3">
                {project.description || "No description available."}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-4">
                {project.location && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Building className="h-4 w-4 mr-1" />
                    <span>{project.location}</span>
                  </div>
                )}
                {project.completionDate && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Completed: {project.completionDate}</span>
                  </div>
                )}
              </div>
              
              {/* Expandable content */}
              <AnimatePresence>
                {expandedId === project.id && project.highlights && project.highlights.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-gray-100"
                  >
                    <h4 className="font-semibold text-gray-800 mb-2">Project Highlights:</h4>
                    <ul className="space-y-2 mb-4">
                      {project.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-sky-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <div className="flex gap-4">
                  {project.highlights && project.highlights.length > 0 && (
                    <button 
                      onClick={() => toggleExpand(project.id)} 
                      className="text-sky-600 hover:text-sky-800 font-medium flex items-center transition-all duration-300"
                    >
                      {expandedId === project.id ? 'View Less' : 'Quick View'}
                      <ArrowRight className={`ml-2 h-4 w-4 transition-transform ${expandedId === project.id ? 'rotate-90' : ''}`} />
                    </button>
                  )}
                
                  <button 
                    onClick={() => handleOpenModal(project)}
                    className="text-sky-600 hover:text-sky-800 font-medium flex items-center transition-all duration-300"
                  >
                    Learn More
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Details Modal */}
      <ProjectDetailsModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        project={selectedProject} 
      />
    </>
  );
};

export default ProjectsGrid;