'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  Calendar, MapPin, Users, Search, Clock, Globe, Coffee, Sparkles, 
  ArrowRight, TrendingUp, Activity, Rocket, Star
} from 'lucide-react';
import { cn } from "@/lib/utils";

// Event interface with enhanced properties
interface Event {
  id: string;
  category: EventCategory;
  title: string;
  date: string;
  dateObj: Date;
  location: string;
  description: string;
  href: string;
  isVirtual?: boolean;
  attendeeLimit?: number;
  isPremium?: boolean;
}

// Event categories
type EventCategory = 'CONFERENCE' | 'WORKSHOP' | 'DEMO DAY' | 'NETWORKING' | 'MEETUP';

const categories: ('ALL' | EventCategory)[] = ['ALL', 'CONFERENCE', 'WORKSHOP', 'DEMO DAY', 'NETWORKING', 'MEETUP'];

// Category configuration with icons and colors
const categoryConfig: Record<EventCategory, { icon: any; color: string }> = {
  'CONFERENCE': { icon: Globe, color: 'text-blue-600' },
  'WORKSHOP': { icon: Coffee, color: 'text-green-600' },
  'DEMO DAY': { icon: Sparkles, color: 'text-purple-600' },
  'NETWORKING': { icon: Users, color: 'text-orange-600' },
  'MEETUP': { icon: Coffee, color: 'text-gray-600' }
};

// Event statistics
const eventStats = [
  { label: "Events Hosted", value: "100+", icon: Calendar },
  { label: "Countries", value: "25", icon: Globe },
  { label: "Attendees", value: "10K+", icon: Users },
  { label: "Startups Launched", value: "50+", icon: Rocket }
];

// Sample upcoming events
const upcomingEvents: Event[] = [
  {
    id: '1',
    category: 'CONFERENCE',
    title: "Zaigo Labs Annual Conference 2024",
    date: "April 15-17, 2024",
    dateObj: new Date("2024-04-15"),
    location: "New York City, USA",
    description: "Our flagship three-day conference bringing together entrepreneurs, investors, and mentors from around the world.",
    href: "/contact",
    attendeeLimit: 500,
    isPremium: true
  },
  {
    id: '2',
    category: 'WORKSHOP',
    title: "Building Capital-Efficient SaaS",
    date: "March 25, 2024",
    dateObj: new Date("2024-03-25"),
    location: "Virtual",
    description: "Learn strategies for building profitable SaaS businesses without venture capital.",
    href: "/contact",
    isVirtual: true
  },
  {
    id: '3',
    category: 'DEMO DAY',
    title: "Spring 2024 Demo Day",
    date: "May 10, 2024",
    dateObj: new Date("2024-05-10"),
    location: "Singapore",
    description: "Watch our latest cohort of startups present their innovative solutions to investors and industry leaders.",
    href: "/contact",
    attendeeLimit: 200
  },
  {
    id: '4',
    category: 'NETWORKING',
    title: "Founders Coffee Chat - London",
    date: "March 30, 2024",
    dateObj: new Date("2024-03-30"),
    location: "London, UK",
    description: "Casual morning meetup for founders to share experiences and build connections.",
    href: "/contact"
  },
  {
    id: '5',
    category: 'WORKSHOP',
    title: "AI Tools for Bootstrapped Startups",
    date: "April 5, 2024",
    dateObj: new Date("2024-04-05"),
    location: "Virtual",
    description: "Discover how to leverage AI and automation to compete with well-funded competitors.",
    href: "/contact",
    isVirtual: true
  },
  {
    id: '6',
    category: 'MEETUP',
    title: "Manila Startup Ecosystem Mixer",
    date: "April 20, 2024",
    dateObj: new Date("2024-04-20"),
    location: "Manila, Philippines",
    description: "Connect with the vibrant startup community in the Philippines.",
    href: "/contact"
  }
];

// Sample past events
const pastEvents: Event[] = [
  {
    id: '7',
    category: 'CONFERENCE',
    title: "Zaigo Labs Annual Conference 2023",
    date: "October 12-14, 2023",
    dateObj: new Date("2023-10-12"),
    location: "San Francisco, USA",
    description: "Our 2023 conference focused on building sustainable businesses in emerging markets.",
    href: "/contact",
    isPremium: true
  },
  {
    id: '8',
    category: 'DEMO DAY',
    title: "Fall 2023 Demo Day",
    date: "November 15, 2023",
    dateObj: new Date("2023-11-15"),
    location: "Virtual",
    description: "12 startups from our fall cohort presented to a global audience of investors.",
    href: "/contact",
    isVirtual: true
  },
  {
    id: '9',
    category: 'WORKSHOP',
    title: "Customer Development Masterclass",
    date: "September 8, 2023",
    dateObj: new Date("2023-09-08"),
    location: "Toronto, Canada",
    description: "A deep dive into finding and validating customer pain points.",
    href: "/contact"
  }
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

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | EventCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  // Filter events based on category, search query, and time
  const filteredEvents = useMemo(() => {
    const eventsToFilter = showPastEvents ? pastEvents : upcomingEvents;
    
    return eventsToFilter.filter(event => {
      const matchesCategory = selectedCategory === 'ALL' || event.category === selectedCategory;
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, showPastEvents]);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section with Video Background */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/community.mp4" type="video/mp4" />
          </video>

          {/* Multi-layer overlay system */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 w-full text-white">
            <FadeIn>
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-5 h-5 text-white" />
                <p className="text-white font-semibold uppercase tracking-wider text-sm">Global Community</p>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6 text-balance">
                Connect, Learn, and
                <span className="block">Build Together</span>
              </h1>
              <p className="text-lg md:text-xl max-w-3xl text-gray-200 leading-relaxed mb-12">
                Join our global community of entrepreneurs through conferences, workshops, and networking events. 
                Learn from industry leaders, share your journey, and forge partnerships that last.
              </p>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {eventStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <FadeIn key={index} delay={index * 100}>
                      <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                          <Icon className="w-4 h-4 text-white" />
                          <span className="text-3xl sm:text-4xl md:text-5xl font-semibold">{stat.value}</span>
                        </div>
                        <p className="text-sm text-gray-300">{stat.label}</p>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link href="#events">
                  <Button 
                    size="lg" 
                    className="rounded-full font-semibold bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:text-white hover:border-white/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Explore Events
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#host">
                  <Button 
                    size="lg" 
                    variant="ghost"
                    className="rounded-full font-semibold bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Host an Event
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Events Section */}
        <section id="events" className="py-16 sm:py-20 bg-background">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            {/* Filters Section */}
            <FadeIn>
              <div className="mb-10 sm:mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <Activity className="w-5 h-5 text-primary" />
                  <p className="text-primary font-semibold uppercase tracking-wider text-sm">Find Events</p>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 mb-6">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search events..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-11 h-11 rounded-full border-gray-200 focus:border-primary/30 transition-colors"
                      aria-label="Search events"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={!showPastEvents ? "default" : "outline"}
                      onClick={() => setShowPastEvents(false)}
                      className={cn(
                        "rounded-full transition-all",
                        !showPastEvents && "bg-primary hover:bg-primary/90 text-white"
                      )}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Upcoming
                    </Button>
                    <Button
                      variant={showPastEvents ? "default" : "outline"}
                      onClick={() => setShowPastEvents(true)}
                      className={cn(
                        "rounded-full transition-all",
                        showPastEvents && "bg-primary hover:bg-primary/90 text-white"
                      )}
                    >
                      Past Events
                    </Button>
                  </div>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={cn(
                        "rounded-full text-xs transition-all",
                        selectedCategory === category && "bg-primary hover:bg-primary/90 text-white"
                      )}
                    >
                      {category === 'ALL' ? 'All Events' : category}
                    </Button>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <h2 className="text-3xl md:text-4xl font-semibold mb-8">
                {showPastEvents ? 'Past Events' : 'Upcoming Events'}
                <span className="text-muted-foreground text-lg ml-2">({filteredEvents.length})</span>
              </h2>
            </FadeIn>
            
            {filteredEvents.length === 0 ? (
              <FadeIn delay={300}>
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No events found matching your criteria.</p>
                </div>
              </FadeIn>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredEvents.map((event, index) => {
                  const CategoryIcon = categoryConfig[event.category].icon;
                  const categoryColor = categoryConfig[event.category].color;
                  
                  return (
                    <FadeIn key={event.id} delay={300 + index * 100}>
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
                          
                          {event.isPremium && (
                            <div className="absolute top-4 right-4 z-10">
                              <Badge className="bg-yellow-100 text-yellow-800">Premium</Badge>
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
                            <div className="text-sm text-muted-foreground mb-4 space-y-2">
                              <p className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 flex-shrink-0" />
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
                            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                              {event.description}
                            </p>
                          </CardContent>
                          <CardFooter className="pt-4 relative">
                            <Button 
                              className="w-full rounded-full bg-primary hover:bg-primary/90 text-white group/btn"
                              aria-label={`Register for ${event.title}`}
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
            )}
          </div>
        </section>

        <Separator />

        {/* Enhanced CTA Section */}
        <section id="host" className="py-16 sm:py-20 bg-gradient-to-b from-background to-primary/5">
          <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 text-center">
            <FadeIn>
              <div className="flex items-center justify-center gap-2 mb-6">
                <Rocket className="w-5 h-5 text-primary" />
                <p className="text-primary font-semibold uppercase tracking-wider text-sm">Join Our Community</p>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-4 text-balance">
                Never Miss an Event
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                Be the first to know about upcoming conferences, workshops, and networking opportunities. 
                Join our event community and connect with entrepreneurs worldwide.
              </p>
              
              {/* Email signup form */}
              <div className="max-w-md mx-auto mb-8">
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 h-10 px-4 text-sm rounded-full border border-gray-200 focus:outline-none focus:border-primary transition-colors"
                  />
                  <Button className="rounded-full bg-primary hover:bg-primary/90 text-white px-6">
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Get event updates, early-bird tickets, and exclusive content
                </p>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <span>or</span>
              </div>
              
              <Link href="/contact" className="inline-block mt-4">
                <Button variant="outline" className="rounded-full">
                  Host an Event
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}