// app/projects/ProjectProcess.jsx
"use client";

import { motion } from "framer-motion";
import { MessageSquare, PenTool, Factory, Truck } from "lucide-react";

const ProjectProcess = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const processSteps = [
    {
      step: "01",
      title: "Consultation",
      description: "We discuss your needs and specifications to understand your project requirements in detail.",
      icon: <MessageSquare className="h-6 w-6" />,
      color: "bg-blue-50",
      iconColor: "text-blue-500"
    },
    {
      step: "02",
      title: "Custom Design",
      description: "Our team creates customized aluminum solutions tailored specifically to your project specifications.",
      icon: <PenTool className="h-6 w-6" />,
      color: "bg-indigo-50",
      iconColor: "text-indigo-500"
    },
    {
      step: "03",
      title: "Manufacturing",
      description: "Using our advanced manufacturing process to create high-quality aluminum products with precision.",
      icon: <Factory className="h-6 w-6" />,
      color: "bg-sky-50",
      iconColor: "text-sky-500"
    },
    {
      step: "04",
      title: "Installation",
      description: "Professional delivery and support to ensure proper implementation and complete satisfaction.",
      icon: <Truck className="h-6 w-6" />,
      color: "bg-teal-50",
      iconColor: "text-teal-500"
    }
  ];
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-4">
            Our Approach
          </span>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">How We Execute Projects</h2>
          <div className="w-24 h-1 bg-sky-500 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            Our systematic approach ensures quality, timeliness, and customer satisfaction in every project
          </p>
        </motion.div>
        
        {/* Process Steps with Connection Line */}
        <div className="relative mt-20">
          {/* Horizontal connecting line for desktop */}
          <div className="hidden md:block absolute top-24 left-0 w-full h-1 bg-gray-200 z-0"></div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div 
                key={step.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { 
                      duration: 0.6,
                      delay: index * 0.1
                    } 
                  }
                }}
                className="relative z-10 flex flex-col items-center"
              >
                {/* Step Number Circle */}
                <motion.div 
                  className="w-16 h-16 bg-sky-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-8 relative"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {step.step}
                  
                  {/* Pulsing animation */}
                  <span className="absolute w-full h-full rounded-full bg-sky-400 opacity-30 animate-ping" style={{ animationDuration: '3s' }}></span>
                </motion.div>
                
                {/* Step Content Card */}
                <div className={`${step.color} p-6 rounded-lg border border-gray-100 shadow-sm h-full w-full`}>
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 rounded-full ${step.color} ${step.iconColor} flex items-center justify-center mr-3`}>
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Additional Info */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mt-16 bg-sky-50 p-8 rounded-lg border border-sky-100"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="md:max-w-xl mb-6 md:mb-0">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Need a Custom Solution?</h3>
              <p className="text-gray-600">
                Our experienced team can design and manufacture custom aluminum solutions to meet your specific requirements.
              </p>
            </div>
            <motion.button 
              className="px-6 py-3 bg-sky-600 text-white font-medium rounded-md shadow-md hover:bg-sky-700 transition-colors self-start"
              whileHover={{ y: -2, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ y: 0 }}
            >
              Request Consultation
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectProcess;