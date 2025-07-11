'use client';

import { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Rocket, Users, Globe, ArrowRight, Sparkles, Activity, BookOpen
} from 'lucide-react';

// Types
interface Program {
  region: string;
  audience: string;
  title: string;
  description: string;
  subAudience: string;
  href: string;
  icon: any;
}

// Programs data with icons instead of emojis
const programs: Program[] = [
  {
    region: "Global",
    audience: "PROGRAM",
    title: "Core Incubation Program",
    description: "6-month intensive program turning ideas into revenue",
    subAudience: "For Global Entrepreneurs",
    href: "/about/ethos",
    icon: Rocket,
  },
  {
    region: "Global",
    audience: "PROGRAM",
    title: "Mentorship Network",
    description: "Connect with 100+ global experts in your industry",
    subAudience: "For Startups • Global",
    href: "/community/events",
    icon: Users,
  },
  {
    region: "Global",
    audience: "PROGRAM",
    title: "Geographical Expansion Expertise",
    description: "Scale beyond borders with proven market entry strategies",
    subAudience: "For Businesses • Global",
    href: "/about/people",
    icon: Globe,
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

export default function ProgramsSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <FadeIn>
          <div className="mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <p className="text-primary font-semibold uppercase tracking-wider text-sm">Our Programs</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center leading-tight mb-4">
              Build Your Business With Proven Support
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto">
              Join our comprehensive programs designed to help entrepreneurs build, scale, and succeed globally.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <FadeIn key={index} delay={index * 100}>
                <Link href={program.href} className="group block h-full">
                  <Card 
                    className={cn(
                      "h-full border-2 transition-all duration-300 relative overflow-hidden flex flex-col group",
                      hoveredCard === index ? "border-primary/30 shadow-2xl transform -translate-y-1" : "border-gray-200"
                    )}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Gradient overlay on hover */}
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 transition-opacity duration-300",
                      hoveredCard === index && "opacity-100"
                    )} />
                    
                    <CardHeader className="pb-4 relative">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gray-100 group-hover:bg-primary/10 transition-colors">
                          <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                          {program.audience}
                        </span>
                      </div>
                      <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                        {program.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="flex-grow relative">
                      <p className="text-base text-muted-foreground leading-relaxed mb-4">
                        {program.description}
                      </p>
                      {program.subAudience && (
                        <p className="text-sm font-medium text-primary/70">
                          {program.subAudience}
                        </p>
                      )}
                    </CardContent>
                    
                    <CardFooter className="pt-4 relative">
                      <Button 
                        className="w-full rounded-full bg-primary hover:bg-primary/90 text-white group/btn"
                        aria-label={`Learn more about ${program.title}`}
                      >
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}