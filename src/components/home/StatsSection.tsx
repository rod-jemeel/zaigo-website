'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { 
  Building2, Users, Globe, ClipboardList, TrendingUp, Briefcase, Activity
} from 'lucide-react';

// Types
interface Stat {
  value: string;
  description: string;
  icon: any;
}

// Stats data with Lucide icons
const stats: Stat[] = [
  {
    value: "20+",
    description: "businesses incubated",
    icon: Building2,
  },
  {
    value: "100+",
    description: "entrepreneurs supported",
    icon: Users,
  },
  {
    value: "4",
    description: "continents represented",
    icon: Globe,
  },
  {
    value: "15+",
    description: "industries covered",
    icon: ClipboardList,
  },
  {
    value: "3",
    description: "successful exits (avg. 5x return)",
    icon: TrendingUp,
  },
  {
    value: "100s",
    description: "of jobs created",
    icon: Briefcase,
  },
];

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

export default function StatsSection() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <FadeIn>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Activity className="w-5 h-5 text-primary" />
              <p className="text-primary font-semibold uppercase tracking-wider text-sm">Our Impact</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Building Success Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From Manila to Mexico City, we've helped entrepreneurs build businesses that create jobs, solve problems, and grow sustainably. Here's our story so far:
            </p>
          </div>
        </FadeIn>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <FadeIn key={index} delay={index * 100}>
                <div className="text-center md:text-left group">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 group-hover:text-primary transition-colors">
                        {stat.value}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {stat.description}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}