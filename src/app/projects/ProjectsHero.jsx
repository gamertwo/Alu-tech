// app/projects/ProjectsHero.jsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ProjectsHero = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="relative h-[500px] bg-gradient-to-r from-sky-700 to-sky-500 text-white">
      <div className="absolute inset-0 opacity-30">
        <Image 
          src="/projects/hero-background.jpg" 
          alt="White Gold Aluminum Projects" 
          fill 
          style={{objectFit: "cover"}}
          priority
        />
      </div>
      
      {/* Overlay pattern */}
      <div className="absolute inset-0 bg-sky-900 opacity-40" 
           style={{
             backgroundImage: "url('/patterns/grid.svg')",
             backgroundSize: "30px",
             mixBlendMode: "overlay"
           }}>
      </div>
      
      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-3xl"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm">
            Excellence in Aluminum
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Projects</h1>
          <p className="text-xl text-sky-100 max-w-2xl mb-8">
            Discover how White Gold Aluminum has contributed to innovative construction and solar projects across Pakistan with premium aluminum solutions
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.button 
              className="px-6 py-3 bg-white text-sky-700 font-medium rounded-md shadow-md hover:bg-sky-50 transition-all"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              View All Projects
            </motion.button>
            <motion.button 
              className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-all"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              Contact Sales Team
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg className="relative block w-full h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" className="fill-white opacity-10"></path>
        </svg>
      </div>
    </section>
  );
};

export default ProjectsHero;