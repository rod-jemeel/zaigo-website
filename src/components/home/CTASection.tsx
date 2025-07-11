"use client";

import React from 'react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Rocket, Users, TrendingUp } from 'lucide-react';

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative bg-gradient-to-b from-black to-gray-900 py-32 sm:py-40 lg:py-48 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Small accent text */}
          <p className="text-sm font-medium tracking-wider text-green-400 uppercase mb-6">
            Join the Revolution
          </p>

          {/* Main headline */}
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Stop Dreaming.
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 animate-gradient">
              Start Building.
            </span>
          </h2>
          
          {/* Compelling description */}
          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            We're not just another incubator. We're builders who ship real products, 
            generate real revenue, and create real impact. Zero BS. Zero bureaucracy. 
            100% execution.
          </p>

          {/* Key differentiators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <Rocket className="w-10 h-10 text-green-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-1">Ship in Weeks</h3>
              <p className="text-gray-400 text-sm">Not months or years</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center"
            >
              <Users className="w-10 h-10 text-green-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-1">Elite Team</h3>
              <p className="text-gray-400 text-sm">Work with the best builders</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center"
            >
              <TrendingUp className="w-10 h-10 text-green-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-1">Real Revenue</h3>
              <p className="text-gray-400 text-sm">From day one</p>
            </motion.div>
          </div>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-6 text-lg font-semibold group"
            >
              <Link href="/apply" className="flex items-center gap-2">
                Apply Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="border-gray-600 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-lg"
            >
              <Link href="/portfolio">
                See Our Work
              </Link>
            </Button>
          </motion.div>

          {/* Urgency/Social proof */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-sm text-gray-400 mt-8"
          >
            <span className="text-green-400 font-semibold">Limited spots available.</span> We only work with 5 new startups per quarter.
          </motion.p>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}