// app/projects/ProjectDetailsModal.jsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Check, ArrowRight, ExternalLink, Calendar, Building, Info, ChevronLeft, ChevronRight } from "lucide-react";

const ProjectDetailsModal = ({ isOpen, onClose, project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

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

  // Use a simplified approach with placeholder images for now
  const projectGallery = [
    { src: project.image, alt: `${project.title} - Main view` },
    { src: project.image, alt: `${project.title} - Detail 1` },
    { src: project.image, alt: `${project.title} - Detail 2` },
    { src: project.image, alt: `${project.title} - Interior` },
    { src: project.image, alt: `${project.title} - Exterior` },
    { src: project.image, alt: `${project.title} - Closeup` }
  ];

  const navigateGallery = (direction) => {
    if (direction === "next") {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % projectGallery.length);
    } else {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + projectGallery.length) % projectGallery.length);
    }
  };

  const openGallery = (index) => {
    setCurrentImageIndex(index);
    setShowGallery(true);
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
            className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-6xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Gallery or Content Layout */}
            {showGallery ? (
              <div className="relative w-full h-[70vh] bg-black">
                {/* Full-screen gallery view */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={projectGallery[currentImageIndex].src}
                      alt={projectGallery[currentImageIndex].alt}
                      fill
                      style={{ objectFit: "contain" }}
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Gallery controls */}
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  <button
                    onClick={() => setShowGallery(false)}
                    className="bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full text-gray-800 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <p className="text-white text-sm mb-4">
                    {currentImageIndex + 1} / {projectGallery.length} - {projectGallery[currentImageIndex].alt}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => navigateGallery("prev")}
                      className="bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full text-gray-800 transition-colors"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    
                    {/* Thumbnail strip */}
                    <div className="flex gap-2 overflow-x-auto max-w-lg mx-auto p-1">
                      {projectGallery.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative h-12 w-12 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${
                            index === currentImageIndex ? "border-white scale-110 z-10" : "border-transparent opacity-70 hover:opacity-100"
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        >
                          <Image
                            src={image.src}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => navigateGallery("next")}
                      className="bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full text-gray-800 transition-colors"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row w-full">
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
                  <button
                    onClick={() => openGallery(0)}
                    className="absolute bottom-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-md text-sky-600 transition-colors flex items-center"
                  >
                    <span className="mr-1">View Gallery</span>
                    <ExternalLink className="h-4 w-4" />
                  </button>
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

                  {/* Image Thumbnails Gallery */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Project Gallery</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {projectGallery.map((image, index) => (
                        <div 
                          key={index} 
                          className="relative aspect-square rounded-md overflow-hidden cursor-pointer group border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                          onClick={() => openGallery(index)}
                        >
                          <div className="absolute inset-0 bg-gray-50 animate-pulse"></div>
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            style={{ objectFit: "cover" }}
                            className="transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                            <span className="text-white text-xs font-medium px-2 py-1 bg-black/60 rounded absolute bottom-2 left-2">{index + 1}</span>
                            <ExternalLink className="text-white h-6 w-6" />
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => openGallery(0)}
                      className="mt-3 text-sky-600 hover:text-sky-800 font-medium text-sm flex items-center transition-colors"
                    >
                      View Full Gallery
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
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
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailsModal;