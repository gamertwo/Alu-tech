// app/projects/Testimonials.jsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      text: "White Gold Aluminum provided exceptional quality products for our commercial complex. Their attention to detail and commitment to timelines made them the perfect partner for our project.",
      author: "Apple Green Management",
      position: "Sialkot Commercial Project",
      rating: 5,
      image: "/testimonials/client1.jpg"
    },
    {
      id: 2,
      text: "The custom extrusions delivered by White Gold Aluminum for our solar panel installation were of superior quality. Their technical expertise and collaborative approach significantly contributed to the success of our energy project.",
      author: "Sunlife Solar Team",
      position: "Energy Solutions Provider",
      rating: 5,
      image: "/testimonials/client2.jpg"
    },
    {
      id: 3,
      text: "Working with White Gold Aluminum on the Gulburg Empire Center was a seamless experience. Their aluminum façade solutions perfectly matched our architectural vision while meeting all technical requirements.",
      author: "Gulburg Empire Development",
      position: "DHA Rehbar Project",
      rating: 5,
      image: "/testimonials/client3.jpg"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  const handlePrev = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const slideVariants = {
    hidden: (direction) => ({
      x: direction === "left" ? 50 : -50,
      opacity: 0
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: (direction) => ({
      x: direction === "left" ? -50 : 50,
      opacity: 0,
      transition: { duration: 0.5 }
    })
  };

  return (
    <section className="py-20 bg-sky-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
          <div className="w-24 h-1 bg-sky-500 mx-auto mb-6"></div>
        </motion.div>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Large quote icon */}
          <div className="absolute top-0 left-0 text-sky-100 transform -translate-x-1/2 -translate-y-1/2 z-0">
            <Quote size={120} />
          </div>
          
          <div className="relative z-10 bg-white p-10 rounded-xl shadow-lg border border-sky-100">
            <AnimatePresence mode="wait" custom={currentIndex > (currentIndex + 1) % testimonials.length ? "left" : "right"}>
              <motion.div
                key={testimonials[currentIndex].id}
                custom={currentIndex > (currentIndex + 1) % testimonials.length ? "left" : "right"}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col md:flex-row items-center gap-8"
              >
                <div className="md:w-1/3 flex-shrink-0">
                  <div className="relative w-32 h-32 mx-auto md:mx-0 rounded-full overflow-hidden border-4 border-sky-100 shadow-md">
                    {/* Replace with actual image paths */}
                    <div className="absolute inset-0 bg-sky-200 flex items-center justify-center">
                      <span className="text-3xl font-bold text-sky-600">
                        {testimonials[currentIndex].author.charAt(0)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3 text-center md:text-left">
                  <div className="flex mb-4 justify-center md:justify-start">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} size={20} className="text-yellow-400 fill-yellow-400 mr-1" />
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-600 text-lg italic mb-6">
                    "{testimonials[currentIndex].text}"
                  </blockquote>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800">{testimonials[currentIndex].author}</h4>
                    <p className="text-sky-600">{testimonials[currentIndex].position}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setAutoplay(false);
                    setCurrentIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex ? "bg-sky-600 w-6" : "bg-sky-200"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Navigation arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-4 left-0">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrev}
                className="bg-white text-sky-600 rounded-full p-2 shadow-md focus:outline-none hover:bg-sky-50 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="bg-white text-sky-600 rounded-full p-2 shadow-md focus:outline-none hover:bg-sky-50 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;