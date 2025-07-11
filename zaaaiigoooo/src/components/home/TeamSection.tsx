"use client";

import React, { useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { GridBeam } from '@/components/ui/grid-beam';

export default function TeamSection() {
  const ref = useRef(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Kyle's animation: transitions first (25-50% of scroll)
  const kyleBreakdanceOpacity = useTransform(
    scrollYProgress,
    [0.25, 0.5],
    [0, 1]
  );
  const kyleNormalOpacity = useTransform(
    scrollYProgress,
    [0.25, 0.5],
    [1, 0]
  );
  
  // Pete's animation: transitions second (40-65% of scroll)
  const peteBreakdanceOpacity = useTransform(
    scrollYProgress,
    [0.4, 0.65],
    [0, 1]
  );
  const peteNormalOpacity = useTransform(
    scrollYProgress,
    [0.4, 0.65],
    [1, 0]
  );
  
  // Davis's animation: color transition (55-80% of scroll)
  const davisGrayscale = useTransform(
    scrollYProgress,
    [0.55, 0.8],
    [1, 0]
  );
  const davisOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.8],
    [0.8, 1]
  );
  
  // Mobile horizontal scroll transform
  const mobileScrollX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px", "-160vw"] // Scroll distance for 3 cards at 80vw each with gaps
  );

  const team = [
    {
      name: "Kyle Richless",
      role: "Founder, Zaigo Labs",
      image: "/images/team/people-new/kyle-richless.png",
      hoverImage: "/images/kyle-breakdancing.jpg"
    },
    {
      name: "Pete Enestrom", 
      role: "Co-Founder & CTO",
      image: "/images/team/people-new/pete-enestrom.png",
      hoverImage: "/images/pete-breakdancing.jpg"
    },
    {
      name: "Davis Campbell",
      role: "Head of Engineering",
      image: "/images/team/davis-animated.png"
    },
    {
      name: "Aris Theodorou",
      role: "Product Lead",
      image: "/images/team/aris-animated.png"
    },
    {
      name: "Dominic Magnifico",
      role: "Head of Growth",
      image: "/images/team/dom-animated.png"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (team.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + (team.length - 2)) % (team.length - 2));
  };

  return (
    <section ref={ref} className="relative bg-black py-32 sm:py-40 lg:py-48 overflow-hidden">
      {/* Grid background with animated beam */}
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
      <GridBeam className="absolute inset-0" />
      
      {/* Subtle gradient orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-16"
        >
          <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            Our team
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            Builders need more than just capital. Which is why Zaigo gets involved in 
            the building process from the ground floor.
          </p>
        </motion.div>

        {/* Team carousel - Mobile horizontal scroll */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Mobile: Horizontal scroll with auto-scroll */}
          <div className="md:hidden">
            <div className="overflow-hidden -mx-6 px-6">
              <motion.div 
                ref={mobileScrollRef}
                className="flex gap-4 pb-4" 
                style={{ 
                  width: 'max-content',
                  x: mobileScrollX 
                }}
              >
                {team.slice(0, 3).map((member, index) => {
                  const isKyle = member.name === "Kyle Richless";
                  const isPete = member.name === "Pete Enestrom";
                  const isDavis = member.name === "Davis Campbell";
                  
                  return (
                    <div
                      key={member.name}
                      className="w-[80vw] flex-shrink-0"
                    >
                      <div className="group relative">
                        <div className="relative h-96 bg-gradient-to-b from-gray-900 to-gray-950 rounded-2xl overflow-hidden">
                          <div className="absolute inset-0">
                            {/* Special handling for Kyle and Pete with scroll-based transitions */}
                            {(isKyle || isPete) ? (
                              <>
                                <motion.div
                                  className="absolute inset-0"
                                  style={{ opacity: isKyle ? kyleNormalOpacity : peteNormalOpacity }}
                                >
                                  <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover object-center grayscale"
                                  />
                                </motion.div>
                                <motion.div
                                  className="absolute inset-0"
                                  style={{ opacity: isKyle ? kyleBreakdanceOpacity : peteBreakdanceOpacity }}
                                >
                                  <Image
                                    src={member.hoverImage!}
                                    alt={member.name}
                                    fill
                                    className="object-cover object-center"
                                  />
                                </motion.div>
                              </>
                            ) : isDavis ? (
                              /* Davis gets scroll-based color transition */
                              <motion.div
                                className="absolute inset-0"
                                style={{ 
                                  filter: useTransform(davisGrayscale, (value) => `grayscale(${value})`),
                                  opacity: davisOpacity
                                }}
                              >
                                <Image
                                  src={member.image}
                                  alt={member.name}
                                  fill
                                  className="object-cover object-center"
                                />
                              </motion.div>
                            ) : (
                              <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                className="object-cover object-center grayscale opacity-80"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
                          </div>
                          
                          <div className="absolute bottom-0 left-0 right-0 p-8">
                            <h3 className="text-2xl font-bold text-white mb-1">
                              {member.name}
                            </h3>
                            <p className="text-gray-300">{member.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
            
            {/* Scroll indicator dots */}
            <div className="flex justify-center mt-4 gap-1.5">
              {team.slice(0, 3).map((_, index) => (
                <div key={index} className="w-2 h-2 rounded-full bg-gray-600" />
              ))}
            </div>
          </div>
          
          {/* Desktop: Original carousel */}
          <div className="hidden md:block overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 33.333}%)` }}
            >
              {team.map((member, index) => (
                <div
                  key={member.name}
                  className="w-full md:w-1/3 flex-shrink-0 px-4"
                >
                  <div 
                    className="group relative"
                    onMouseEnter={() => setHoveredMember(member.name)}
                    onMouseLeave={() => setHoveredMember(null)}
                  >
                    <div className="relative h-96 bg-gradient-to-b from-gray-900 to-gray-950 rounded-2xl overflow-hidden">
                      {/* Image with gradient overlay */}
                      <div className="absolute inset-0">
                        {/* Special handling for Kyle and Pete with scroll-based transitions */}
                        {member.name === "Kyle Richless" ? (
                          <>
                            <motion.div
                              className="absolute inset-0"
                              style={{ opacity: kyleNormalOpacity }}
                            >
                              <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                className="object-cover object-center grayscale"
                              />
                            </motion.div>
                            <motion.div
                              className="absolute inset-0"
                              style={{ opacity: kyleBreakdanceOpacity }}
                            >
                              <Image
                                src={member.hoverImage!}
                                alt={member.name}
                                fill
                                className="object-cover object-center"
                              />
                            </motion.div>
                          </>
                        ) : member.name === "Pete Enestrom" ? (
                          <>
                            <motion.div
                              className="absolute inset-0"
                              style={{ opacity: peteNormalOpacity }}
                            >
                              <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                className="object-cover object-center grayscale"
                              />
                            </motion.div>
                            <motion.div
                              className="absolute inset-0"
                              style={{ opacity: peteBreakdanceOpacity }}
                            >
                              <Image
                                src={member.hoverImage!}
                                alt={member.name}
                                fill
                                className="object-cover object-center"
                              />
                            </motion.div>
                          </>
                        ) : member.name === "Davis Campbell" ? (
                          /* Davis gets scroll-based color transition */
                          <motion.div
                            className="absolute inset-0"
                            style={{ 
                              filter: useTransform(davisGrayscale, (value) => `grayscale(${value})`),
                              opacity: davisOpacity
                            }}
                          >
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover object-center"
                            />
                          </motion.div>
                        ) : (
                          /* Other team members keep hover effect */
                          <>
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className={`object-cover object-center grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ${
                                hoveredMember === member.name && member.hoverImage ? 'opacity-0' : ''
                              }`}
                            />
                            {member.hoverImage && (
                              <Image
                                src={member.hoverImage}
                                alt={member.name}
                                fill
                                className={`object-cover object-center transition-all duration-700 ${
                                  hoveredMember === member.name ? 'opacity-100' : 'opacity-0'
                                }`}
                              />
                            )}
                          </>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
                      </div>
                      
                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {member.name}
                        </h3>
                        <p className="text-gray-300">{member.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows - Desktop only */}
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Previous team member"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Next team member"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Interested in joining with us ?
          </h3>
          <p className="text-lg text-gray-400 mb-8">
            Please send us your details along with your resume.
          </p>
          <Link 
            href="/careers"
            className="inline-flex items-center gap-2 text-white hover:text-green-400 transition-colors group"
          >
            <span className="text-lg font-medium">Write us</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}