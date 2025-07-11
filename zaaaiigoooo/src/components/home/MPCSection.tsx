'use client';

import { motion } from 'framer-motion';
import MPCDrumMachine from './mpc/MPCDrumMachine';
import SectionContainer from '@/components/ui/section-container';

export default function MPCSection() {
  return (
    <section className="relative py-20 md:py-32 bg-gray-50 overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Gradient orbs for depth */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/30 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]" />
      </div>
      
      <SectionContainer>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <div className="flex items-center gap-3 text-sm font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                How We Build
              </div>
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gray-900">Every Startup Has a</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700">
                Unique Rhythm
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Like a producer crafting the perfect beat, we help founders find their tempo. 
              Try our AI beat maker — it's how we approach every startup: listening, experimenting, 
              and building something that resonates.
            </p>
          </div>
          
          <div className="flex justify-center">
            <MPCDrumMachine />
          </div>
        </motion.div>
      </SectionContainer>
    </section>
  );
}