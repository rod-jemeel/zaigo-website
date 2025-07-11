"use client";

import React, { useRef, useEffect, useState } from "react";
import { 
  Users, 
  TrendingUp, 
  Sparkles, 
  Globe, 
  Leaf, 
  Target, 
  Rocket, 
  Calculator 
} from "lucide-react";

interface Value {
  text: string;
  icon: React.ReactNode;
}

const values: Value[] = [
  { text: "Build for customers, not investors", icon: <Users className="w-4 h-4" /> },
  { text: "Profitability at Growth at all costs", icon: <TrendingUp className="w-4 h-4" /> },
  { text: "Do more with less", icon: <Sparkles className="w-4 h-4" /> },
  { text: "Global Talent, local impact", icon: <Globe className="w-4 h-4" /> },
  { text: "Engineer for Sustainability", icon: <Leaf className="w-4 h-4" /> },
  { text: "Real problems, real solutions", icon: <Target className="w-4 h-4" /> },
  { text: "Bootstrap mindset", icon: <Rocket className="w-4 h-4" /> },
  { text: "Unit economics first", icon: <Calculator className="w-4 h-4" /> },
];

export default function InfiniteLogoCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [centerIndex, setCenterIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateCenterItem = () => {
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      
      const items = container.querySelectorAll('[data-value-item]');
      let closestIndex = 0;
      let closestDistance = Infinity;

      items.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.left + itemRect.width / 2;
        const distance = Math.abs(containerCenter - itemCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index % values.length;
        }
      });

      setCenterIndex(closestIndex);
    };

    // Update on animation frame for smooth tracking
    let animationId: number;
    const animate = () => {
      updateCenterItem();
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section className="py-8 sm:py-10 bg-background">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Fixed width container with visible overflow for scaling */}
        <div className="relative mx-auto max-w-6xl h-20" ref={containerRef}>
          {/* Enhanced gradient masks for stronger fade effect */}
          <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          
          {/* Scrolling container */}
          <div className="flex items-center h-full overflow-hidden">
            <div className="flex animate-scroll gap-6 py-4">
              {/* First set of values */}
              {values.map((value, index) => (
                <div
                  key={`value-1-${index}`}
                  data-value-item
                  data-index={index}
                  className={`flex items-center justify-center px-8 py-4 rounded-full border min-w-fit whitespace-nowrap transition-all duration-300 ${
                    centerIndex === index
                      ? "bg-primary/10 text-primary border-primary/20 scale-110 shadow-sm font-normal"
                      : "bg-background/50 border-border scale-100 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {value.icon}
                    <span className="text-sm">{value.text}</span>
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {values.map((value, index) => (
                <div
                  key={`value-2-${index}`}
                  data-value-item
                  data-index={index}
                  className={`flex items-center justify-center px-8 py-4 rounded-full border min-w-fit whitespace-nowrap transition-all duration-300 ${
                    centerIndex === index
                      ? "bg-primary/10 text-primary border-primary/20 scale-110 shadow-sm font-semibold"
                      : "bg-background/50 border-border scale-100 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {value.icon}
                    <span className="text-sm">{value.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}