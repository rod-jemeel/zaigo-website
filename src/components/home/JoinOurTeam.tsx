"use client";

import React from 'react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Zap, Target, Rocket } from 'lucide-react';

export default function JoinOurTeam() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/fighter-jet.mp4" type="video/mp4" />
        </video>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Gradient overlay for dramatic effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          {/* Main headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8"
          >
            Build at the speed of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#089862] to-[#0ab876]">
              sound.
            </span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl sm:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto"
          >
            Elite builders. Real equity. Zero bureaucracy.
          </motion.p>

          {/* Three quick points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-12 text-white"
          >
            <div className="flex items-center gap-2">
              <Rocket className="w-5 h-5 text-[#089862]" />
              <span className="text-lg">Ship in weeks</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-[#089862]" />
              <span className="text-lg">Own what you build</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#089862]" />
              <span className="text-lg">10x your impact</span>
            </div>
          </motion.div>

          {/* Epic CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            <div className="relative inline-flex items-center justify-center gap-4 group">
              <div className="absolute inset-0 duration-1000 opacity-60 transition-all bg-gradient-to-r from-[#089862] via-[#0ab876] to-[#0cc78a] rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200" />
              <Link 
                href="/careers" 
                className="group relative inline-flex items-center justify-center text-base rounded-xl bg-gray-900 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
              >
                Get Started For Free
                <svg aria-hidden="true" viewBox="0 0 10 10" height={10} width={10} fill="none" className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2">
                  <path d="M0 5h7" className="transition opacity-0 group-hover:opacity-100" />
                  <path d="M1 1l4 4-4 4" className="transition group-hover:translate-x-[3px]" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}