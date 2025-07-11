"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";

export default function TestPage() {
  const [selectedMood, setSelectedMood] = useState<string | null>("happy");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const moods = [
    { name: "Sad", emoji: "😢", color: "gray" },
    { name: "Happy", emoji: "😊", color: "pink" },
    { name: "Angry", emoji: "😠", color: "gray" }
  ];

  return (
    <>
      <Head>
        <title>Capture Moments - Keep Your Memories Safe</title>
        <meta name="description" content="A modern app for capturing and preserving your precious moments with mood tracking, cloud sync, and voice notes." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="bg-white relative min-h-screen overflow-hidden" role="main" aria-label="Capture Moments App Landing Page">
      {/* New Features Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute bg-[#ffe6f6] h-[67px] overflow-clip rounded-[44px] top-[200px] lg:top-[287px] left-1/2 -translate-x-1/2 w-[240px] md:w-[291px] z-20"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-2 md:gap-3 px-4 md:px-6">
            <motion.svg 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              width="26" height="29" viewBox="0 0 26 29" fill="none"
            >
              <path
                d="M13 0L16.0156 10.1844L26 13L16.0156 15.8156L13 26L9.98437 15.8156L0 13L9.98437 10.1844L13 0Z"
                fill="#A0357B"
              />
            </motion.svg>
            <span className="font-sans text-[#a0357b] text-[24px] md:text-[35.5px] tracking-[-0.71px]">
              New Features
            </span>
          </div>
        </div>
      </motion.div>

      {/* Background Circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-full h-full">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-[600px] md:top-[1310px] left-1/2 -translate-x-1/2 w-[800px] md:w-[1522px] h-[800px] md:h-[1522px] rounded-full bg-gradient-to-br from-pink-100/30 to-purple-100/30" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, -3, 0]
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute top-[500px] md:top-[1162px] left-1/2 -translate-x-1/2 w-[1000px] md:w-[1908px] h-[1000px] md:h-[1908px] rounded-full bg-gradient-to-br from-blue-100/25 to-pink-100/25" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.08, 1],
              rotate: [0, 2, 0]
            }}
            transition={{ duration: 30, repeat: Infinity }}
            className="absolute top-[400px] md:top-[989px] left-1/2 -translate-x-1/2 w-[1200px] md:w-[2214px] h-[1200px] md:h-[2214px] rounded-full bg-gradient-to-br from-purple-100/20 to-blue-100/20" 
          />
        </div>
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-[1008px] h-[80px] md:h-[129px] bg-black/95 backdrop-blur-md rounded-[30px] md:rounded-[45px] z-30 transition-all duration-300 ${
          scrollY > 50 ? 'shadow-2xl' : ''
        }`}
      >
        <div className="flex items-center justify-between h-full px-4 md:px-6">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <div className="w-[60px] h-[60px] md:w-[100px] md:h-[100px] bg-[#ff68cb] rounded-[20px] md:rounded-[32px] flex items-center justify-center cursor-pointer" role="img" aria-label="App Logo">
              <svg className="w-[40px] h-[40px] md:w-[66px] md:h-[66px]" viewBox="0 0 66 66" fill="none">
                <path
                  d="M10 20L33 10L56 20L56 46L33 56L10 46L10 20Z"
                  stroke="white"
                  strokeWidth="3"
                />
                <path d="M10 20L33 30L56 20" stroke="white" strokeWidth="3" />
                <path d="M33 30L33 56" stroke="white" strokeWidth="3" />
              </svg>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-[45px] text-white text-[28px] lg:text-[33px] tracking-[-0.66px]">
            {['Feature', 'Company', 'Pricing'].map((item) => (
              <motion.button
                key={item}
                whileHover={{ scale: 1.05, color: '#ff68cb' }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
                aria-label={`Navigate to ${item} section`}
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#ff68cb] transition-all duration-300 group-hover:w-full" />
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path d="M5 7.5H25M5 15H25M5 22.5H25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Login Button */}
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: '#ff68cb', color: 'white' }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block bg-white text-black px-8 lg:px-16 py-4 lg:py-6 rounded-[20px] lg:rounded-[30px] text-[24px] lg:text-[33px] font-semibold tracking-[-0.66px] transition-all duration-300"
            aria-label="Login to your account"
          >
            Login
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 backdrop-blur-md rounded-b-[30px] overflow-hidden"
            >
              <div className="flex flex-col gap-4 p-6 text-white">
                {['Feature', 'Company', 'Pricing'].map((item) => (
                  <button key={item} className="text-left text-[24px] hover:text-[#ff68cb] transition-colors">
                    {item}
                  </button>
                ))}
                <button className="bg-white text-black px-6 py-3 rounded-[20px] text-[24px] font-semibold mt-2">
                  Login
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Heading */}
      <motion.h1 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-[250px] md:top-[350px] lg:top-[396px] left-1/2 -translate-x-1/2 w-[90%] max-w-[1008px] text-[40px] md:text-[80px] lg:text-[132px] text-center leading-tight tracking-[-2.64px] font-bold z-20"
      >
        <span className="block">
          <motion.span
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="inline-block"
          >
            Capture
          </motion.span>{' '}
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="inline-block bg-gradient-to-r from-[#ff68cb] to-[#a0357b] bg-clip-text text-transparent"
          >
            Moments,
          </motion.span>
        </span>
        <span className="block">
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="inline-block"
          >
            Keep
          </motion.span>{' '}
          <motion.span
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="inline-block"
          >
            Memories
          </motion.span>
        </span>
      </motion.h1>

      {/* Phone Mockup */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
        whileHover={{ y: -10 }}
        className="absolute top-[600px] md:top-[750px] lg:top-[913px] left-1/2 -translate-x-1/2 w-[300px] md:w-[400px] lg:w-[556.878px] h-[650px] md:h-[869px] lg:h-[1207px] bg-white rounded-[46px] md:rounded-[61px] lg:rounded-[85.4989px] border-[7.36px] md:border-[9.81px] lg:border-[13.6193px] border-black z-20 shadow-2xl"
      >
        <div className="relative h-full overflow-hidden rounded-[38.64px] md:rounded-[51.19px] lg:rounded-[71.88px]">
          {/* Phone Screen Content */}
          <motion.div 
            animate={{ 
              background: [
                "linear-gradient(135deg, #fecaca 0%, #e9d5ff 50%, #bfdbfe 100%)",
                "linear-gradient(135deg, #bfdbfe 0%, #fecaca 50%, #e9d5ff 100%)",
                "linear-gradient(135deg, #e9d5ff 0%, #bfdbfe 50%, #fecaca 100%)"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-0 left-0 right-0 h-[45%] md:h-[48%] lg:h-[49.15%] flex items-center justify-center"
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl mb-2 md:mb-4">
                <motion.span
                  animate={{ x: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-block"
                >
                  👁️
                </motion.span>
                <span className="mx-2 md:mx-4"></span>
                <motion.span
                  animate={{ x: [5, -5, 5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-block"
                >
                  👁️
                </motion.span>
              </div>
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl md:text-4xl"
              >
                {selectedMood === 'happy' ? '😊' : selectedMood === 'sad' ? '😢' : '😠'}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Mood Selection */}
          <div className="absolute top-[55%] md:top-[52.5%] lg:top-[52.45%] left-0 right-0 flex justify-center gap-2 md:gap-3 lg:gap-4 px-4 md:px-6 lg:px-8">
            {moods.map((mood) => (
              <motion.button
                key={mood.name}
                onClick={() => setSelectedMood(mood.name.toLowerCase())}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 md:px-8 lg:px-12 py-3 md:py-4 lg:py-5 rounded-full border-2 text-[18px] md:text-[24px] lg:text-[30.8888px] tracking-[-1.23555px] transition-all duration-300 ${
                  selectedMood === mood.name.toLowerCase()
                    ? 'bg-[#fdb0e3] border-[#fdb0e3] text-black font-medium shadow-lg'
                    : 'border-gray-400 text-gray-500 hover:border-gray-600'
                }`}
                aria-label={`Select ${mood.name} mood`}
                aria-pressed={selectedMood === mood.name.toLowerCase()}
              >
                {mood.name}
              </motion.button>
            ))}
          </div>

          {/* Question Text */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute top-[65%] md:top-[64.5%] lg:top-[64.47%] left-0 right-0 px-8 md:px-12 lg:px-16"
          >
            <p className="text-[22px] md:text-[32px] lg:text-[40.7094px] text-center leading-tight tracking-[-1.62838px] font-medium">
              What are you<br className="md:hidden" /> Feeling like today?
            </p>
          </motion.div>

          {/* Bottom Buttons */}
          <div className="absolute bottom-6 md:bottom-8 lg:bottom-12 left-0 right-0 flex items-center justify-between px-6 md:px-8">
            <motion.button 
              whileHover={{ opacity: 0.7 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-400 text-[18px] md:text-[24px] lg:text-[28.4966px] tracking-[-1.13986px] hover:text-gray-600 transition-colors"
              aria-label="Skip mood selection"
            >
              Skip
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: '#ff68cb' }}
              whileTap={{ scale: 0.95 }}
              className="bg-white hover:text-white px-8 md:px-12 lg:px-16 py-3 md:py-4 lg:py-5 rounded-full flex items-center gap-2 md:gap-3 text-[18px] md:text-[24px] lg:text-[28.4966px] tracking-[-1.13986px] shadow-lg transition-all duration-300 group"
              aria-label="Proceed to next step"
            >
              <span>Next</span>
              <motion.svg 
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                width="20" height="20" viewBox="0 0 20 20" fill="none"
              >
                <path d="M5 10H15M15 10L10 5M15 10L10 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Feature Bubbles */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        whileHover={{ scale: 1.05, rotate: 15 }}
        className="hidden md:block absolute top-[600px] lg:top-[814.707px] left-[10%] lg:left-[526.51px] z-10 cursor-pointer"
      >
        <div className="rotate-[12.821deg]">
          <div className="bg-[#d9dfff] h-[80px] md:h-[100px] lg:h-[122px] w-[280px] md:w-[380px] lg:w-[485px] rounded-[345px] border-2 md:border-3 lg:border-4 border-black flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300">
            <span className="text-[28px] md:text-[40px] lg:text-[52px] tracking-[-1.04px] font-bold">Quick Entries</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        whileHover={{ scale: 1.05, rotate: -17 }}
        className="hidden md:block absolute top-[700px] lg:top-[938px] right-[5%] lg:right-[200px] z-10 cursor-pointer"
      >
        <div className="rotate-[-13.93deg]">
          <div className="bg-[#dcffd9] h-[80px] md:h-[100px] lg:h-[122px] w-[240px] md:w-[320px] lg:w-[399.271px] rounded-[345px] border-2 md:border-3 lg:border-4 border-black flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300">
            <span className="text-[28px] md:text-[40px] lg:text-[52px] tracking-[-1.04px] font-bold">Cloud Sync</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        whileHover={{ scale: 1.05, rotate: -12 }}
        className="hidden lg:block absolute top-[1330.35px] left-[600.795px] z-10 cursor-pointer"
      >
        <div className="rotate-[-8.76deg]">
          <div className="bg-[#ffd9da] h-[122px] w-[460.698px] rounded-[345px] border-4 border-black flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300">
            <span className="text-[52px] tracking-[-1.04px] font-bold">Mood Tracking</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        whileHover={{ scale: 1.05, rotate: 13 }}
        className="hidden lg:block absolute top-[1506px] right-[180px] z-10 cursor-pointer"
      >
        <div className="rotate-[10.669deg]">
          <div className="bg-[#fffcd9] h-[122px] w-[383.392px] rounded-[345px] border-4 border-black flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300">
            <span className="text-[52px] tracking-[-1.04px] font-bold">Voice Notes</span>
          </div>
        </div>
      </motion.div>

      {/* Decorative Lines */}
      <motion.div 
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
        className="hidden lg:block absolute bg-black h-[100px] w-[9px] left-[942px] top-[1103px] z-10 origin-top" 
      />
      <motion.div 
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.6, delay: 2.2 }}
        className="hidden lg:block absolute bg-black h-[100px] w-[9px] left-[942px] top-[1217px] z-10 origin-top" 
      />
      <motion.div 
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.6, delay: 2.4 }}
        className="hidden lg:block absolute bg-black h-32 w-[9px] right-[400px] top-[1203px] z-10 origin-top" 
      />

      {/* Mobile CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="md:hidden absolute bottom-20 left-1/2 -translate-x-1/2 w-[90%] text-center"
      >
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {['Quick Entries', 'Cloud Sync', 'Mood Tracking', 'Voice Notes'].map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-black text-sm font-medium shadow-md"
            >
              {feature}
            </motion.div>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#ff68cb] text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg"
        >
          Get Started
        </motion.button>
      </motion.div>
      </main>
    </>
  );
}