// app/projects/ProjectDetailsModal.jsx
"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Check, ArrowRight, ExternalLink, Calendar, Building, Info } from "lucide-react";

const ProjectDetailsModal = ({ isOpen, onClose, project }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // If no project or modal is closed, don't render
  if (!isOpen || !project) return null;

  // Mock additional project details that would come from a database
  const additionalDetails = {
    clientName: "Premium Properties Ltd.",
    projectValue: "$1.2M - $1.5M",
    projectDuration: "8 months",
    services: [
      "Custom aluminum extrusion design",
      "Fabrication and finishing",
      "On-site installation support",
      "Quality assurance and testing",
      "Project management"
    ],
    challenges: [
      "Complex architectural requirements",
      "Tight timeline constraints",
      "Custom color matching specifications",
      "Integration with existing structures"
    ],
    results: [
      "Completed on-time and within budget",
      "Exceeded client quality expectations",
      "Innovative solutions for complex requirements",
      "Long-term durability with minimal maintenance"
    ]
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-6xl max-h-[90vh] flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Section */}
            <div className="md:w-2/5 relative h-64 md:h-auto bg-sky-50">
              <Image
                src={project.image}
                alt={project.title}
                fill
                style={{ objectFit: "cover" }}
                className="h-full"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-block px-3 py-1 bg-sky-600 text-white text-xs font-medium rounded-full">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="md:w-3/5 p-6 overflow-y-auto max-h-[90vh] md:max-h-[80vh]">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{project.title}</h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <p className="text-gray-600 mb-6">{project.description}</p>

              {/* Project Info */}
              <div className="flex flex-wrap gap-4 mb-6 bg-sky-50 p-4 rounded-lg">
                <div className="flex items-center text-sm text-gray-700">
                  <Building className="h-4 w-4 mr-2 text-sky-600" />
                  <span><strong>Location:</strong> {project.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Calendar className="h-4 w-4 mr-2 text-sky-600" />
                  <span><strong>Completed:</strong> {project.completionDate}</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Info className="h-4 w-4 mr-2 text-sky-600" />
                  <span><strong>Client:</strong> {additionalDetails.clientName}</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Calendar className="h-4 w-4 mr-2 text-sky-600" />
                  <span><strong>Duration:</strong> {additionalDetails.projectDuration}</span>
                </div>
              </div>

              {/* Project Highlights */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Project Highlights</h3>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-sky-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services Provided */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Services Provided</h3>
                <ul className="space-y-2">
                  {additionalDetails.services.map((service, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-sky-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges & Solutions */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Challenges & Solutions</h3>
                <ul className="space-y-2">
                  {additionalDetails.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-sky-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Results */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Project Results</h3>
                <ul className="space-y-2">
                  {additionalDetails.results.map((result, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-sky-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call to Action */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-2 bg-sky-600 text-white font-medium rounded-md shadow-sm hover:bg-sky-700 flex items-center"
                >
                  Similar Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-2 border border-sky-600 text-sky-600 font-medium rounded-md hover:bg-sky-50 flex items-center"
                >
                  Project Case Study
                  <ExternalLink className="ml-2 h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailsModal;