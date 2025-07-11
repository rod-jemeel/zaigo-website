'use client';

import { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MemoryOptimizedImage } from "@/components/ui/memory-optimized-image";
import { cn } from "@/lib/utils";
import { 
  Calendar, MapPin, Users, Coffee, Utensils, 
  ArrowRight, Activity, Clock, Globe
} from 'lucide-react';

// Event type matching the events page structure
type EventCategory = 'DINNER' | 'BREAKFAST' | 'NETWORKING' | 'WORKSHOP' | 'MEETUP';

interface Event {
  id: string;
  category: EventCategory;
  title: string;
  description: string;
  date: string;
  location: string;
  href: string;
  imageSrc?: string;
  isVirtual?: boolean;
  attendeeLimit?: number;
}

// Category configuration with icons
const categoryConfig: Record<EventCategory, { icon: any; color: string }> = {
  'DINNER': { icon: Utensils, color: 'text-orange-600' },
  'BREAKFAST': { icon: Coffee, color: 'text-yellow-600' },
  'NETWORKING': { icon: Users, color: 'text-blue-600' },
  'WORKSHOP': { icon: Activity, color: 'text-green-600' },
  'MEETUP': { icon: Coffee, color: 'text-gray-600' }
};

const events: Event[] = [
  {
    id: '1',
    category: "DINNER",
    title: "The Founders' Roundtable",
    description: "An intimate dinner where 12 founders share what's really working (and what isn't)",
    date: "March 14, 2025",
    location: "Boston",
    href: "/contact",
    attendeeLimit: 12
  },
  {
    id: '2',
    category: "BREAKFAST",
    title: "Rise & Pitch: Investor Breakfast",
    description: "Start your day with direct access to active investors looking for their next opportunity",
    date: "April 10, 2025",
    location: "Tel Aviv",
    href: "/contact",
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

export default function UpcomingEvents() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <FadeIn>
          <div className="mb-10 sm:mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-primary" />
              <p className="text-primary font-semibold uppercase tracking-wider text-sm">Upcoming Events</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                  Join Our Next Event
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl">
                  Connect with fellow entrepreneurs and industry leaders at our exclusive events.
                </p>
              </div>
              <Link href="/community/events">
                <Button className="rounded-full bg-primary hover:bg-primary/90 text-white">
                  View All Events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {events.map((event, index) => {
            const CategoryIcon = categoryConfig[event.category].icon;
            
            return (
              <FadeIn key={event.id} delay={100 + index * 100}>
                <Link href={event.href} className="group block h-full">
                  <Card 
                    className={cn(
                      "h-full border-2 transition-all duration-300 relative overflow-hidden flex flex-col group",
                      hoveredCard === event.id ? "border-primary/30 shadow-2xl transform -translate-y-1" : "border-gray-200"
                    )}
                    onMouseEnter={() => setHoveredCard(event.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Gradient overlay on hover */}
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 transition-opacity duration-300",
                      hoveredCard === event.id && "opacity-100"
                    )} />
                    
                    {event.imageSrc && (
                      <div className="relative w-full h-48 overflow-hidden">
                        <MemoryOptimizedImage
                          src={event.imageSrc}
                          alt={`${event.title} event`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          optimizationLevel="medium"
                          lazyUnmount={true}
                        />
                      </div>
                    )}
                    
                    <CardHeader className="pb-4 relative">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100">
                          <CategoryIcon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                          {event.category}
                        </span>
                      </div>
                      <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                        {event.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="flex-grow relative">
                      <p className="text-base text-muted-foreground leading-relaxed mb-4">
                        {event.description}
                      </p>
                      <div className="text-sm text-muted-foreground space-y-2">
                        <p className="flex items-center gap-2">
                          <Clock className="h-4 w-4 flex-shrink-0" />
                          <span>{event.date}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          {event.isVirtual ? <Globe className="h-4 w-4 flex-shrink-0" /> : <MapPin className="h-4 w-4 flex-shrink-0" />}
                          <span>{event.location}</span>
                        </p>
                        {event.attendeeLimit && (
                          <p className="flex items-center gap-2">
                            <Users className="h-4 w-4 flex-shrink-0" />
                            <span>Limited to {event.attendeeLimit} attendees</span>
                          </p>
                        )}
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-4 relative">
                      <Button 
                        className="w-full rounded-full bg-primary hover:bg-primary/90 text-white group/btn"
                        aria-label={`Learn more about ${event.title}`}
                      >
                        Register Now
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