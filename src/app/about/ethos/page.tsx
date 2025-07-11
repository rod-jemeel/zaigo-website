'use client';

import { useState, useEffect, useRef } from 'react';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { motion } from 'framer-motion';
import { 
  Lightbulb, Target, DollarSign, Globe2, TrendingUp, Users, 
  ArrowRight, Building2, Sparkles, Rocket, Heart, Zap, Shield, CheckCircle2,
  Mountain, Compass, Wind, Stars
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { GlowingStarsBackgroundCard, GlowingStarsTitle, GlowingStarsDescription } from "@/components/ui/glowing-stars-card";
import { LampContainer } from "@/components/ui/lamp";

// Types
interface Value {
  title: string;
  description: string;
  icon: any;
}

interface Objective {
  title: string;
  description: string;
  icon: any;
}

interface Principle {
  text: string;
}

interface Stat {
  label: string;
  value: string;
  icon: any;
}

// Company statistics
const companyStats: Stat[] = [
  { label: "Portfolio Companies", value: "12+", icon: Building2 },
  { label: "Countries", value: "8", icon: Globe2 },
  { label: "Total Revenue", value: "$50M+", icon: TrendingUp },
  { label: "Team Members", value: "25+", icon: Users }
];

// Values with icons
const values: Value[] = [
  {
    title: "Customer First",
    description: "Like fresh tracks, we find untouched customer problems and carve elegant solutions.",
    icon: Heart
  },
  {
    title: "Unit Economics",
    description: "Every turn counts. We obsess over making each business unit profitable from day one.",
    icon: Target
  },
  {
    title: "Capital Efficiency",
    description: "Light gear, fast descents. We build lean businesses that don't need heavy funding.",
    icon: DollarSign
  },
  {
    title: "Global Runs",
    description: "From Park City to the Alps to the Andes. We find opportunities wherever the conditions are right.",
    icon: Globe2
  },
];

// Objectives with icons
const objectives: Objective[] = [
  {
    title: "Profitable Runs",
    description: "Every business we launch must generate cash flow, not just burn through it.",
    icon: Rocket
  },
  {
    title: "Global Crew",
    description: "Assemble the best riders from every mountain to tackle any terrain.",
    icon: Users
  },
];

// Principles
const principles: Principle[] = [
  { text: "Build for customers, not investors" },
  { text: "Profitability is not an exit strategy—it's the business model" },
  { text: "Global talent combined with local expertise creates unique advantages" },
  { text: "Niche markets offer outsized opportunities for focused execution" },
  { text: "Success comes from disciplined operations, not endless fundraising" }
];

// 3D Hover Card Component
const ThreeDCard: React.FC<{ icon: any; title: string; description: string; index: number }> = ({ icon: Icon, title, description, index }) => {
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const getTransform = (cellIndex: number) => {
    const row = Math.floor(cellIndex / 5);
    const col = cellIndex % 5;
    const xRotate = (2 - row) * 10; // -20 to 20
    const yRotate = (col - 2) * 5; // -10 to 10
    return `rotateX(${xRotate}deg) rotateY(${yRotate}deg)`;
  };
  
  return (
    <div className="relative w-full h-full min-h-[350px] transition-all duration-200 hover:scale-[0.98] active:scale-[0.97] select-none">
      <div className="relative w-full h-full overflow-hidden rounded-[20px]" style={{ perspective: '800px' }}>
        {/* Grid overlay for 3D tracking effect */}
        <div className="absolute inset-0 z-[200] grid grid-cols-5 grid-rows-5 gap-0 pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <div 
              key={i} 
              className="relative w-full h-full cursor-pointer pointer-events-auto"
              onMouseEnter={() => {
                setHoveredCell(i);
                setIsHovered(true);
              }}
              onMouseLeave={() => {
                setHoveredCell(null);
                setIsHovered(false);
              }}
            />
          ))}
        </div>
        
        {/* Main card */}
        <div 
          className="relative w-full h-full flex flex-col justify-end p-8 md:p-12 bg-gray-900 transition-all duration-[300ms] transform-gpu"
          style={{
            background: isHovered ? 'linear-gradient(135deg, #0a0a0a 0%, #000000 100%)' : 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
            transformStyle: 'preserve-3d',
            transform: hoveredCell !== null ? getTransform(hoveredCell) : 'rotateX(0deg) rotateY(0deg)',
            filter: isHovered ? 'brightness(1.2)' : 'brightness(1)',
          }}
        >
          {/* Blur background effect */}
          <div 
            className={cn(
              "absolute inset-0 rounded-[20px] transition-all duration-300 -z-10",
              isHovered ? "opacity-30" : "opacity-0"
            )}
            style={{
              background: 'linear-gradient(135deg, #22c55e 0%, #10b981 50%, #059669 100%)',
              filter: 'blur(2rem)',
              transform: 'scale(1.1)'
            }}
          />
          
          {/* Icon */}
          <div className="absolute top-8 md:top-12 left-8 md:left-12 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-sm flex items-center justify-center border border-green-500/20">
            <Icon className="w-8 h-8 md:w-10 md:h-10 text-green-400" />
          </div>
          
          {/* Number */}
          <div className="absolute top-8 md:top-12 right-8 md:right-12 text-6xl md:text-8xl font-bold text-gray-800/50">
            {String(index + 1).padStart(2, '0')}
          </div>
          
          {/* Always visible content when not hovered */}
          <div className={cn(
            "transition-all duration-300 space-y-3 md:space-y-4 relative z-10",
            isHovered ? "opacity-0" : "opacity-100"
          )}>
            <div className="text-lg md:text-xl font-bold text-green-400">
              HOVER TO EXPLORE
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              {title}
            </h3>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              {description}
            </p>
          </div>
          
          {/* Hover content - shown on hover */}
          <div className={cn(
            "absolute inset-0 p-8 md:p-12 flex flex-col justify-end transition-all duration-300 space-y-3 md:space-y-4",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              {title}
            </h3>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Fade in animation component
const FadeIn: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      {children}
    </div>
  );
};

export default function EthosPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [email, setEmail] = useState('');

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Enhanced Hero Section with Video Background */}
        <section className="relative overflow-hidden min-h-screen flex items-center">
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/skiing.mp4" type="video/mp4" />
          </video>
          
          {/* Multi-layer overlay for maximum text readability - same as landing page */}
          {/* Base dark overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
          {/* Radial gradient overlay using standard Tailwind gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent"></div>
          
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          
          <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 w-full z-10">
            <FadeIn>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-white" />
                <p className="text-white font-semibold uppercase tracking-wider text-sm drop-shadow-lg">Born in Park City</p>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6 text-balance text-white drop-shadow-lg">
                High Altitude
                <span className="block">Thinking</span>
              </h1>
              <p className="text-lg md:text-xl max-w-3xl text-gray-200 leading-relaxed mb-12 drop-shadow-lg">
                Zaigo was conceived on the slopes of Park City, where Kyle and Pete realized that building great companies 
                is like skiing moguls - it requires precision, speed, and the ability to see the path others miss.
              </p>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {companyStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <FadeIn key={index} delay={index * 100}>
                      <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                          <Icon className="w-4 h-4 text-white" />
                          <span className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white drop-shadow-lg">{stat.value}</span>
                        </div>
                        <p className="text-sm text-gray-300 drop-shadow">{stat.label}</p>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link href="#story">
                  <Button 
                    size="lg" 
                    className="rounded-full font-semibold bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:text-white hover:border-white/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Learn Our Story
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button 
                    size="lg" 
                    variant="ghost"
                    className="rounded-full font-semibold bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Partner With Us
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Story Section - Clean Modern Design */}
        <section id="story" className="relative py-32 sm:py-40">
          {/* Subtle background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent" />
          
          <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <FadeIn>
              <div className="text-center mb-20">
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <Building2 className="w-4 h-4 text-primary" />
                  <p className="text-primary font-semibold uppercase tracking-wider text-xs">Our Journey</p>
                </div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
                  From Slopes to
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                    Scale
                  </span>
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-4">
                  Like expert skiers reading the mountain, we identify paths others miss.
                </p>
                <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
                  What started as an idea between runs has grown into a global venture studio.
                </p>
              </div>
            </FadeIn>
            
            {/* Modern cards grid with images */}
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Left card with image */}
              <FadeIn delay={200}>
                <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 h-full">
                  {/* Image section */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src="/images/skiier-cliff.jpg" 
                      alt="Skier jumping off cliff"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-6">
                      <h3 className="text-2xl font-bold text-white">Take the Leap</h3>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-6">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-4">Our Approach</h4>
                    <div className="space-y-4 text-muted-foreground">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-green-600">1</span>
                        </div>
                        <p>Find the fresh powder</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-green-600">2</span>
                        </div>
                        <p>Assemble the right crew</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-green-600">3</span>
                        </div>
                        <p>Execute perfect runs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
              
              {/* Middle card - black with image */}
              <FadeIn delay={300}>
                <div className="group relative bg-black rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-full">
                  {/* Image section */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src="/images/skiier-downhill.jpg" 
                      alt="Skier going downhill"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
                    <div className="absolute bottom-4 left-6">
                      <h3 className="text-2xl font-bold text-white">Mountain Rules</h3>
                    </div>
                  </div>
                  <div className="p-8">
                    <ul className="space-y-3">
                      {principles.map((principle, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{principle.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
              
              {/* Right card with image */}
              <FadeIn delay={400}>
                <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 h-full">
                  {/* Image section */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src="/images/skiier-beer.jpg" 
                      alt="Skier drinking beer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-6">
                      <h3 className="text-2xl font-bold text-white">Work Hard, Play Hard</h3>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-6">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-4">Our Culture</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      We believe in celebrating wins, learning from losses, and always pushing for the next peak. 
                      Success tastes better when shared with your crew.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>


        {/* Values Section - Clean and Simple */}
        <section className="py-32 sm:py-40 bg-black">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <FadeIn>
              <div className="text-center mb-20">
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 border border-white/20">
                  <Heart className="w-4 h-4 text-white" />
                  <p className="text-white font-semibold uppercase tracking-wider text-xs">Core Values</p>
                </div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                  The Zaigo Way
                </h2>
              </div>
            </FadeIn>
            
            {/* Enhanced Grid with new card design */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <FadeIn key={index} delay={index * 100}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <div className="relative h-full min-h-[320px] md:min-h-[320px] bg-black rounded-lg p-8 md:p-10 flex flex-col justify-end gap-4 cursor-pointer group overflow-visible">
                        {/* Animated gradient border - using pseudo elements via Tailwind */}
                        <div 
                          className="absolute -inset-[5px] rounded-[10px] -z-10 transition-all duration-[600ms] group-hover:rotate-[-90deg] group-hover:scale-x-[1.34] group-hover:scale-y-[0.77]"
                          style={{
                            background: 'linear-gradient(-45deg, #22c55e 0%, #10b981 50%, #059669 100%)',
                            transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                          }}
                        />
                        
                        {/* Blur effect */}
                        <div 
                          className="absolute inset-0 -z-[1] scale-95 blur-[20px] opacity-50 transition-all duration-300 group-hover:blur-[30px] group-hover:opacity-70"
                          style={{
                            background: 'linear-gradient(-45deg, #22c55e 0%, #10b981 100%)',
                            transform: 'translate3d(0, 0, 0) scale(0.95)'
                          }}
                        />
                        
                        {/* Icon at top */}
                        <div className="absolute top-8 md:top-10 left-8 md:left-10 w-14 h-14 md:w-16 md:h-16 rounded-xl bg-green-500/10 flex items-center justify-center transition-all duration-500 group-hover:bg-green-500/20 group-hover:scale-110">
                          <Icon className="w-7 h-7 md:w-8 md:h-8 text-green-400 transition-all duration-500 group-hover:text-green-300" />
                        </div>
                        
                        {/* Number badge */}
                        <div className="absolute top-8 md:top-10 right-8 md:right-10 text-5xl md:text-7xl font-bold text-gray-800 transition-all duration-700 group-hover:text-gray-700">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        
                        {/* Content */}
                        <div className="relative z-10 space-y-3 mt-auto">
                          <h3 className="text-2xl font-bold text-white capitalize">
                            {value.title}
                          </h3>
                          <p className="text-gray-400 leading-relaxed text-base">
                            {value.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>


        {/* Sustainable Impact Section - Lamp Effect */}
        <section className="relative overflow-hidden">
          <LampContainer className="min-h-[900px]">
            <motion.div
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                <Shield className="w-4 h-4 text-white" />
                <p className="text-white font-semibold uppercase tracking-wider text-xs">Impact</p>
              </div>
              
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-t from-gray-300 to-white bg-clip-text text-transparent mb-8">
                Leave No Trace,
                <span className="block mt-2">Except Profit</span>
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                Like responsible mountain stewards, we build businesses that enhance their environment. 
                Sustainable growth isn't just good ethics—it's good business.
              </p>
              
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="group relative rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 px-10 py-6 text-lg font-semibold overflow-hidden transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10">Hit the Slopes With Us</span>
                  <ArrowRight className="relative z-10 ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-500" />
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Button>
              </Link>
            </motion.div>
          </LampContainer>
        </section>


        {/* Enhanced CTA Section - Chairlift Video Background */}
        <section className="relative py-32 sm:py-40 overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/chairlift.mp4" type="video/mp4" />
            </video>
            
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/70" />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>
          
          <div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 text-center">
            <FadeIn>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-lg text-gray-300 mb-8">
                  The lift is running. The powder awaits.
                </p>
                <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-white">
                  Your seat is
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                    reserved.
                  </span>
                </h2>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href="/contact">
                  <Button 
                    size="lg" 
                    className="group relative rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 px-10 py-7 text-xl font-semibold transition-all duration-300 hover:scale-105 hover:border-white/30"
                  >
                    Grab Your Pass
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}