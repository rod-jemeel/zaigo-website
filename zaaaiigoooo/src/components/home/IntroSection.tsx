"use client";

import React from 'react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

export default function IntroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section ref={ref} className="relative bg-white py-32 sm:py-40 lg:py-48 overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-4xl flex flex-col items-center text-center"
          >
            {/* Small accent text */}
            <p className="text-sm font-medium tracking-wider text-gray-500 uppercase mb-8">
              About Zaigo
            </p>
            
            {/* Main headline - Apple-style large text */}
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-8 text-center">
              We build the future,
              <span className="block mt-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                one startup at a time.
              </span>
            </h2>
            
            {/* Clean, readable body text */}
            <p className="text-xl sm:text-2xl leading-relaxed text-gray-600 mb-12 max-w-3xl mx-auto text-center">
              Zaigo is where world-class AI engineers, proven entrepreneurs, and industry veterans 
              converge to transform nascent ideas into thriving businesses.
            </p>
          </motion.div>
          
          {/* Vision to Reality section with card-3 background */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl overflow-hidden mt-16 max-w-6xl w-full"
          >
            {/* Background with video */}
            <div className="absolute inset-0">
              <video 
                src="/videos/meditating.mp4" 
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/80 to-gray-900/70" />
            </div>
            
            {/* Content */}
            <div className="relative z-10 px-12 py-20 md:py-24 lg:py-28">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  From Vision to Reality
                </h3>
                <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
                  We transform ambitious ideas into scalable businesses. Our proven methodology 
                  combines cutting-edge AI technology with battle-tested entrepreneurial expertise 
                  to rapidly validate, build, and launch ventures that solve real-world problems.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">10+</div>
                    <div className="text-sm font-medium text-gray-300 uppercase tracking-wider">
                      Startups Launched
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">$5M+</div>
                    <div className="text-sm font-medium text-gray-300 uppercase tracking-wider">
                      Revenue Generated
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">3 Months</div>
                    <div className="text-sm font-medium text-gray-300 uppercase tracking-wider">
                      Average Time to Market
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Optional: Floating accent elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-50 rounded-full blur-3xl opacity-50" />
      </div>
    </section>
  );
}