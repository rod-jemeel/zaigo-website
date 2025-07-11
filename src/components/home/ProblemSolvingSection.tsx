"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import Link from 'next/link';

export default function ProblemSolvingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [dynamicHeight, setDynamicHeight] = useState(0);
  
  // Calculate the required scroll distance based on content width
  useEffect(() => {
    const calculateHeight = () => {
      if (!cardsContainerRef.current) return;
      
      const containerWidth = cardsContainerRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollDistance = containerWidth - viewportWidth;
      
      // Add some padding for smooth transition
      setDynamicHeight(scrollDistance + window.innerHeight);
    };
    
    calculateHeight();
    window.addEventListener('resize', calculateHeight);
    return () => window.removeEventListener('resize', calculateHeight);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });
  
  // Transform vertical scroll to horizontal movement
  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    ["0px", `-${dynamicHeight - (typeof window !== 'undefined' ? window.innerHeight : 800)}px`]
  );

  const portfolioSlides = [
    {
      title: "NZ Farm Emissions: A SaaS measurement tool",
      button: "View Case Study",
      src: "/images/case-study-1.jpg",
      link: "/case-studies/farmghg"
    },
    {
      title: "Veloce: Exclusive platform for rare collectible vehicles ($125K-$450K+)",
      button: "View Case Study",
      src: "/images/case-study-2.jpg",
      link: "/case-studies/veloce"
    },
    {
      title: "Charity Prep: A SaaS platform helping 100,000+ charities navigate new regulatory requirements",
      button: "View Case Study",
      src: "/images/case-study-3.jpg",
      link: "/case-studies/charity-prep"
    }
  ];

  // Check for mobile
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Mobile horizontal scroll transform
  const mobileScrollX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px", "-170vw"] // Scroll distance for 3 cards at 85vw each with gaps
  );
  
  if (isMobile) {
    // Mobile layout - horizontal scroll with swipe
    return (
      <section ref={sectionRef} className="relative bg-gray-50 py-20 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold tracking-tight text-gray-900 mb-4"
            >
              Complex problems,
              <span className="block mt-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                elegant solutions.
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base text-gray-600 max-w-xl mx-auto leading-relaxed"
            >
              From SaaS platforms to marketplaces, we've built products that scale.
            </motion.p>
          </div>
          
          {/* Mobile: Horizontal scroll with auto-scroll */}
          <div className="overflow-hidden -mx-6 px-6">
            <motion.div 
              className="flex gap-4 pb-4" 
              style={{ 
                width: 'max-content',
                x: mobileScrollX 
              }}
            >
              {portfolioSlides.map((slide, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-[85vw] flex-shrink-0"
                >
                  <Link href={slide.link} className="block">
                    <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg">
                      <div className="aspect-[16/10] relative">
                        <img
                          src={slide.src}
                          alt={slide.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-lg font-bold text-white mb-1">
                          {slide.title}
                        </h3>
                        <span className="inline-flex items-center text-white text-sm font-medium">
                          {slide.button}
                          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Scroll indicator */}
          <div className="flex justify-center mt-4 gap-1">
            {portfolioSlides.map((_, index) => (
              <div key={index} className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  // Desktop layout - horizontal scroll
  return (
    <section 
      ref={sectionRef} 
      className="relative bg-gray-50"
      style={{ height: dynamicHeight || 'auto' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      
      {/* Sticky container for the entire section */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Header text - part of the sticky section */}
        <div className="text-center mb-16 px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6"
          >
            Complex problems,
            <span className="block mt-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              elegant solutions.
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            From SaaS platforms to marketplaces, we've built products that scale. 
            Here's how we turn ambitious ideas into market-leading companies.
          </motion.p>
        </div>
        
        {/* Horizontal scrolling cards */}
        <motion.div
          ref={cardsContainerRef}
          style={{ x }}
          className="flex gap-8 px-6 lg:px-8"
        >
          {portfolioSlides.map((slide, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[90vw] max-w-5xl"
            >
              <Link href={slide.link} className="block group">
                <div className="relative rounded-3xl overflow-hidden bg-white shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                  <div className="aspect-[16/10] relative">
                    <img
                      src={slide.src}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                      {slide.title}
                    </h3>
                    <span className="inline-flex items-center text-white font-medium group-hover:gap-3 transition-all duration-300">
                      {slide.button}
                      <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}