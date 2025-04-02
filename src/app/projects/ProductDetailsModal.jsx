// app/components/ProductDetailsModal.jsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Check, ArrowRight, ExternalLink } from "lucide-react";

const ProductDetailsModal = ({ isOpen, onClose, product }) => {
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

  // If no product or modal is closed, don't render
  if (!isOpen || !product) return null;

  // Mock additional product details that would come from a database
  const additionalDetails = {
    features: [
      "Premium grade aluminum alloy",
      "Custom dimensions available",
      "Advanced surface treatment",
      "Industry-leading durability",
      "Weather and corrosion resistant"
    ],
    applications: [
      "Commercial buildings",
      "Residential projects",
      "Industrial facilities",
      "Solar installations",
      "Infrastructure development"
    ],
    technicalSpecs: {
      material: "6063-T5/T6 Aluminum Alloy",
      finishOptions: ["Anodized", "Powder Coated", "Mill Finish"],
      standardLengths: ["3.6m", "6m", "Custom"],
      certifications: ["ISO 9001:2015", "ISO 14001:2015"]
    }
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
                src={product.image}
                alt={product.title}
                fill
                style={{ objectFit: "cover" }}
                className="h-full"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-block px-3 py-1 bg-sky-600 text-white text-xs font-medium rounded-full">
                  {product.title.split(' ')[0]}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="md:w-3/5 p-6 overflow-y-auto max-h-[90vh] md:max-h-[80vh]">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <p className="text-gray-600 mb-6">{product.description}</p>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {additionalDetails.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-sky-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Applications */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Applications</h3>
                <div className="flex flex-wrap gap-2">
                  {additionalDetails.applications.map((app, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-sky-50 text-sky-600 rounded-full text-sm"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Technical Specifications</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-700">Material:</p>
                      <p className="text-gray-600">{additionalDetails.technicalSpecs.material}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Standard Lengths:</p>
                      <p className="text-gray-600">{additionalDetails.technicalSpecs.standardLengths.join(", ")}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Finish Options:</p>
                      <p className="text-gray-600">{additionalDetails.technicalSpecs.finishOptions.join(", ")}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Certifications:</p>
                      <p className="text-gray-600">{additionalDetails.technicalSpecs.certifications.join(", ")}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-2 bg-sky-600 text-white font-medium rounded-md shadow-sm hover:bg-sky-700 flex items-center"
                >
                  Request Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-2 border border-sky-600 text-sky-600 font-medium rounded-md hover:bg-sky-50 flex items-center"
                >
                  Download Specifications
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

export default ProductDetailsModal;