"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface VideoHeroProps {
  className?: string;
  fallbackImageSrc?: string;
  videoSrc?: string;
}

interface Dimensions {
  width: number;
  height: number;
}

export default function VideoHero({
  className = "",
  fallbackImageSrc = "/assets/zaigo-brand.png",
  videoSrc = "/assets/zaigo-labs.mp4"
}: VideoHeroProps) {
  // Ensure video plays properly
  console.log("Loading video from", videoSrc);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  
  useEffect(() => {
    const handleLoad = () => {
      setIsLoaded(true);
      if (videoRef.current) {
        setDimensions({
          width: videoRef.current.videoWidth,
          height: videoRef.current.videoHeight
        });
      }
    };
    
    const video = videoRef.current;
    if (video) {
      video.addEventListener('loadeddata', handleLoad);
      
      return () => {
        video.removeEventListener('loadeddata', handleLoad);
      };
    }
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (videoRef.current && sectionRef.current) {
        sectionRef.current.style.height = 'auto';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section 
      ref={sectionRef} 
      className={`relative w-full bg-background ${className}`}
    >
      {/* Container with padding following 8pt grid */}
      <div className="zaigo-container py-8 sm:py-16">
        {/* Video wrapper with interactive hover effects */}
        <div 
          className="relative w-full group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Animated border container with iOS-style rounded corners */}
          <div className={`
            relative w-full overflow-hidden rounded-2xl sm:rounded-3xl
            transition-all duration-300 ease-out
            ${isHovered ? 'ring-8 ring-primary shadow-2xl shadow-primary/30' : 'ring-2 ring-border'}
          `}>
            {/* Optional gradient overlay on hover */}
            <div className={`
              absolute inset-0 z-10 pointer-events-none
              bg-gradient-to-t from-primary/10 via-transparent to-transparent
              transition-opacity duration-300
              ${isHovered ? 'opacity-100' : 'opacity-0'}
            `} />
            
            {/* Fallback image shown until video loads */}
            {!isLoaded && (
              <div className="absolute inset-0 bg-black rounded-2xl sm:rounded-3xl">
                <Image
                  src={fallbackImageSrc}
                  alt="Zaigo Labs"
                  fill
                  className="w-full h-auto object-cover rounded-2xl sm:rounded-3xl"
                  priority
                  quality={75}
                />
              </div>
            )}
            
            {/* Video with scale effect on hover */}
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className={`
                w-full h-auto 
                transition-all duration-700 ease-out
                ${isLoaded ? 'opacity-100' : 'opacity-0'}
                ${isHovered ? 'scale-[1.02]' : 'scale-100'}
              `}
              poster={fallbackImageSrc}
              aria-hidden="true"
              // @ts-expect-error fetchPriority is a valid HTML attribute but not yet in the TS definitions
              fetchPriority="high"
              preload="auto"
              src={videoSrc}
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          {/* Enhanced scroll indicator with hover sync */}
          <div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
            onClick={handleScrollDown}
          >
            <div className={`
              rounded-full p-3 transition-all duration-300
              ${isHovered 
                ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110' 
                : 'bg-white/10 backdrop-blur-sm text-white/80 hover:bg-white/20'
              }
            `}>
              <svg 
                className="w-5 h-5" 
                fill="none" 
                strokeWidth="2.5" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5" 
                />
              </svg>
            </div>
          </div>
          
          {/* Play/Pause overlay on hover */}
          <div className={`
            absolute inset-0 flex items-center justify-center z-10
            transition-opacity duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}>
            <button
              onClick={() => {
                if (videoRef.current) {
                  if (videoRef.current.paused) {
                    videoRef.current.play();
                    setIsPlaying(true);
                  } else {
                    videoRef.current.pause();
                    setIsPlaying(false);
                  }
                }
              }}
              className="bg-white/90 backdrop-blur-sm text-primary rounded-full p-4 shadow-xl hover:bg-white transition-all duration-200 hover:scale-110"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <svg 
                  className="w-8 h-8" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg 
                  className="w-8 h-8" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}