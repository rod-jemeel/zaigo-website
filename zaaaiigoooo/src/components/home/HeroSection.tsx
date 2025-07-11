"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SectionContainer from "@/components/ui/section-container";
import { ArrowRight } from "lucide-react";
import InfiniteLogoCarousel from "@/components/home/InfiniteLogoCarousel";
import { motion, useInView } from "motion/react";

// Faster BlurIn component
const FastBlurIn = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ filter: 'blur(20px)', opacity: 0 }}
      animate={isInView ? { filter: 'blur(0px)', opacity: 1 } : {}}
      transition={{ duration: 0.3, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Terminal-style loader component
const TerminalLoader = () => {
  const [displayText, setDisplayText] = React.useState('');
  const [showCursor, setShowCursor] = React.useState(true);
  
  const commands = [
    { text: '$ zaigo init --mode=high-velocity', delay: 0, response: `
╔══════════════════════════════════╗
║    ZAIGO AI INCUBATOR v.2024     ║
║    "Move Fast, Build Forever"    ║
╚══════════════════════════════════╝` },
    { text: '$ scanning market disruptions...', delay: 100, response: '[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 100% | 🎯 47,293 opportunities detected' },
    { text: '$ activating global talent matrix...', delay: 80, response: '✓ Elite teams across 127 countries | Response time: 0.3ms' },
    { text: '$ npm run bootstrap --no-vc', delay: 80, response: '💰 Revenue mode: ENABLED | Burn rate: $0 | Efficiency: ∞' },
    { text: '$ ./zaigo-launch --turbo', delay: 100, response: '\n🚀 >>> STARTUP VELOCITY: MAXIMUM <<<\n⚡ >>> Ready to disrupt in 3... 2... 1...' }
  ];
  
  React.useEffect(() => {
    let commandIndex = 0;
    let charIndex = 0;
    let currentPhase = 'command'; // 'command' or 'response'
    let accumulatedText = '';
    
    const typeInterval = setInterval(() => {
      if (commandIndex >= commands.length) {
        clearInterval(typeInterval);
        setShowCursor(false);
        return;
      }
      
      const currentItem = commands[commandIndex];
      const currentText = currentPhase === 'command' ? currentItem.text : currentItem.response;
      
      if (charIndex < currentText.length) {
        const char = currentText[charIndex];
        accumulatedText += char;
        setDisplayText(accumulatedText);
        charIndex++;
      } else {
        // Finished current text
        if (currentPhase === 'command' && currentItem.response) {
          // Add response after a delay
          setTimeout(() => {
            const prefix = currentItem.response.includes('╔') || currentItem.response.startsWith('\n') ? '\n' : '\n> ';
            accumulatedText += prefix;
            setDisplayText(accumulatedText);
            currentPhase = 'response';
            charIndex = 0;
          }, currentItem.delay);
          return;
        } else {
          // Move to next command
          commandIndex++;
          charIndex = 0;
          currentPhase = 'command';
          if (commandIndex < commands.length) {
            accumulatedText += '\n\n';
            setDisplayText(accumulatedText);
          }
        }
      }
    }, 25); // Slightly faster typing for better timing
    
    // Cursor blink
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => {
      clearInterval(typeInterval);
      clearInterval(cursorInterval);
    };
  }, []);
  
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-black/80 backdrop-blur-md border border-green-500/30 rounded-lg p-8 max-w-2xl w-full shadow-2xl"
        style={{
          boxShadow: '0 0 50px rgba(34, 197, 94, 0.15)',
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
          <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
          <span className="ml-4 text-gray-400 text-sm font-mono">zaigo@incubator ~ </span>
        </div>
        <pre className="text-green-400 font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
          {displayText}
          {showCursor && <span className="text-green-400 animate-pulse">▊</span>}
        </pre>
      </motion.div>
    </div>
  );
};

interface HeroSectionProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Outdated Software is Abundant, Leaving the Customer Underserved. AI Solves for this Challenge, Better Product, Lowering Pricing",
  description = "We bridge that gap by leveraging a world-class team of global AI experts, which create sustainable, profitable, customer-centric businesses",
  ctaText = "Join Our Team",
  ctaLink = "/careers",
  className = "",
}) => {
  const [videoLoaded, setVideoLoaded] = React.useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = React.useState(false);
  const [showContent, setShowContent] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const mountTimeRef = React.useRef(Date.now());
  
  // Set loading class immediately on mount
  React.useEffect(() => {
    console.log('HeroSection mounted, adding hero-loading class');
    document.body.classList.add('hero-loading');
    setShouldLoadVideo(true);
    
    // Set timer to show content
    const timer = setTimeout(() => {
      console.log('Timer fired, showing content and removing hero-loading class');
      setShowContent(true);
      document.body.classList.remove('hero-loading');
    }, 2500);
    
    return () => {
      console.log('HeroSection unmounting, cleaning up');
      clearTimeout(timer);
      document.body.classList.remove('hero-loading');
    };
  }, []); // Run only on mount

  // Optimize video playback
  React.useEffect(() => {
    if (videoLoaded && videoRef.current) {
      videoRef.current.playbackRate = 1.0;
    }
  }, [videoLoaded]);

  return (
    <SectionContainer
      className={`relative overflow-hidden min-h-screen flex items-center ${className}`}
    >
      {!showContent ? (
        // Full screen loading animation with black background
        <div className="absolute inset-0 bg-black flex items-center justify-center z-50">
          <TerminalLoader />
        </div>
      ) : (
        <>
          {/* Video Background with fallback */}
          <div className="absolute inset-0 bg-black">
            {/* Poster image for faster initial paint */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"
              style={{
                backgroundImage: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)'
              }}
            />
            
            {shouldLoadVideo && (
              <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            onCanPlayThrough={() => setVideoLoaded(true)}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              imageRendering: 'auto',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              transform: 'translate3d(0,0,0)'
            }}
          >
            <source
              src="/videos/hero-section.mp4"
              type="video/mp4"
            />
          </video>
        )}
            {/* Sophisticated overlay system matching the illustration aesthetic */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent" />
            {/* Subtle vignette effect */}
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
            }} />
          </div>

          <div className="relative w-full mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-extrabold leading-[0.9] sm:leading-[1.05] md:leading-[0.95] lg:leading-[0.9] tracking-tight mb-6 sm:mb-8 text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                <FastBlurIn delay={0} className="text-white block">
                  We Are a High Velocity AI Business Incubator
                </FastBlurIn>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed text-gray-300 font-medium">
                We transform signals into startups at breakneck speed. Real customer
                validation, lean global teams, and bootstrapped businesses that
                generate capital-efficient revenue—not VC-fueled fairy dust :)
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link href={ctaLink} className="group">
                  <Button className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:text-white hover:border-white/30 font-semibold h-12 px-6 rounded-full text-sm md:text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                    {ctaText}
                    <span className="ml-2 inline-flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </>
      )}

    </SectionContainer>
  );
};

export default HeroSection;
