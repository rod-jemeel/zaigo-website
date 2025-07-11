'use client';

import { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import { 
  ArrowRight, Calendar, Users, Globe, Building2, Briefcase, 
  Code, TrendingUp, Activity, Sparkles, Clock, CheckCircle2, Search
} from 'lucide-react';
import { getAllCaseStudies } from '@/data/case-studies';

// Category configuration with icons
const categoryConfig = {
  'RegTech': { icon: Building2, color: 'text-blue-600' },
  'HR Tech': { icon: Users, color: 'text-blue-600' },
  'FinTech': { icon: TrendingUp, color: 'text-green-600' },
  'EdTech': { icon: Activity, color: 'text-purple-600' },
  'HealthTech': { icon: CheckCircle2, color: 'text-red-600' }
};

// Status configuration
const statusConfig = {
  'Active': { color: 'text-green-700', bgColor: 'bg-green-50 border-green-200' },
  'In Development': { color: 'text-blue-700', bgColor: 'bg-blue-50 border-blue-200' },
  'Launched': { color: 'text-blue-700', bgColor: 'bg-blue-50 border-blue-200' },
  'Planning': { color: 'text-gray-700', bgColor: 'bg-gray-50 border-gray-200' }
};

// Case studies statistics
const caseStudyStats = [
  { label: "Active Projects", value: "12+", icon: Building2 },
  { label: "Markets Served", value: "8", icon: Globe },
  { label: "Total Users", value: "500K+", icon: Users },
  { label: "Industries", value: "15+", icon: Briefcase }
];


// Image Container Component with Loading State
const ImageContainer: React.FC<{ src?: string; alt: string; priority?: boolean }> = ({ src, alt, priority = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="w-full h-80 relative rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100">
      {/* Loading Skeleton */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
          </div>
        </div>
      )}
      
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={75}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          className={cn(
            "object-cover transition-opacity duration-500",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
      )}
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

export default function CaseStudiesPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(3);
  
  // Get case studies from centralized data
  const caseStudies = getAllCaseStudies();

  // Filter case studies based on search term
  const filteredCaseStudies = caseStudies.filter((study) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      study.title.toLowerCase().includes(searchLower) ||
      study.subtitle.toLowerCase().includes(searchLower) ||
      study.category.toLowerCase().includes(searchLower) ||
      study.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });

  // Get displayed case studies based on visible count
  const displayedCaseStudies = filteredCaseStudies.slice(0, visibleCount);

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
            <source src="/videos/paper-planes.mp4" type="video/mp4" />
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
                <p className="text-white font-semibold uppercase tracking-wider text-sm drop-shadow-lg">Success Stories</p>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6 text-balance text-white drop-shadow-lg">
                Case Studies
              </h1>
              <p className="text-lg md:text-xl max-w-3xl text-gray-200 leading-relaxed mb-12 drop-shadow-lg">
                Explore how we've partnered with entrepreneurs worldwide to build capital-efficient, 
                cash-flowing businesses that solve real problems for niche audiences.
              </p>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {caseStudyStats.map((stat, index) => {
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
                <Link href="#case-studies">
                  <Button 
                    size="lg" 
                    className="rounded-full font-semibold bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:text-white hover:border-white/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Explore Case Studies
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button 
                    size="lg" 
                    variant="ghost"
                    className="rounded-full font-semibold bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Work With Us
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Case Studies Section - New Testimonial Style */}
        <section id="case-studies" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="w-5 h-5 text-primary" />
                    <p className="text-primary font-semibold uppercase tracking-wider text-sm">Portfolio</p>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                    Our Success Stories
                  </h2>
                  <p className="text-lg text-gray-600">
                    Real businesses solving real problems with measurable impact.
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-lg w-full md:w-auto mt-6 md:mt-0">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search by case study"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 h-10 w-full md:w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-sm"
                  />
                </div>
              </div>
            </FadeIn>

            {/* Testimonial-style Cards Grid */}
            <div className="grid grid-cols-1 gap-8">
              {displayedCaseStudies.map((caseStudy, index) => (
                <FadeIn key={caseStudy.id} delay={index * 100}>
                  <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                    <div className="flex flex-col lg:flex-row gap-8">
                      {/* Left Content */}
                      <div className="flex-1">
                        <div className="mb-6">
                          <h3 className="font-bold text-2xl text-gray-900 mb-3">{caseStudy.title}</h3>
                          <div className="flex items-center gap-3">
                            <Badge className="bg-primary text-white hover:bg-primary/90 px-3 py-1">
                              {caseStudy.category}
                            </Badge>
                            <Badge variant="outline" className={cn("px-3 py-1", statusConfig[caseStudy.status].bgColor, statusConfig[caseStudy.status].color)}>
                              {caseStudy.status}
                            </Badge>
                          </div>
                        </div>

                        {/* Project Overview */}
                        <div className="mb-8">
                          <h4 className="font-semibold text-gray-900 mb-2">Project Overview</h4>
                          <p className="text-gray-700 leading-relaxed text-base">
                            {caseStudy.description}
                          </p>
                        </div>

                        {/* Key Metrics */}
                        <div className="space-y-6">
                          <div>
                            <div className="text-5xl font-bold text-gray-900 mb-1">
                              {caseStudy.metrics.users}
                            </div>
                            <p className="text-gray-600">Target users reached</p>
                          </div>

                          <div>
                            <div className="text-4xl font-bold text-gray-900 mb-1">{caseStudy.metrics.market}</div>
                            <p className="text-gray-600">Market location</p>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mt-4">
                            {caseStudy.tags.map((tag) => (
                              <span 
                                key={tag}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Side - Image and CTA */}
                      <div className="lg:w-96 flex flex-col gap-4">
                        {/* Image Container */}
                        <ImageContainer 
                          src={caseStudy.image}
                          alt={caseStudy.title}
                          priority={index < 3}
                        />

                        {/* CTA Button */}
                        <Link href={`/case-studies/${caseStudy.id}`}>
                          <Button
                            variant="default"
                            className="w-full bg-black hover:bg-gray-800 text-white h-auto py-4 px-6 rounded-lg group"
                          >
                            <div className="flex items-center justify-center gap-2">
                              <span className="font-semibold">View Full Case Study</span>
                              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {visibleCount < filteredCaseStudies.length && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 3)}
                  className="text-gray-600 hover:text-primary font-bold text-lg transition-colors duration-200 cursor-pointer"
                >
                  Load More Case Studies
                </button>
              </div>
            )}

            {filteredCaseStudies.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No case studies found matching your search.</p>
              </div>
            )}
          </div>
        </section>

        <Separator />

        {/* Enhanced CTA Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-background to-primary/5">
          <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 text-center">
            <FadeIn>
              <div className="flex items-center justify-center gap-2 mb-6">
                <Building2 className="w-5 h-5 text-primary" />
                <p className="text-primary font-semibold uppercase tracking-wider text-sm">Partner With Us</p>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-balance">
                Ready to Build Your Success Story?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                Join our portfolio of successful businesses. Let's work together to build something that matters.
              </p>
              
              <Link href="/contact">
                <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white">
                  Start Your Journey
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