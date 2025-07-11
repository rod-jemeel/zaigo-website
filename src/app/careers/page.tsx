"use client"

import { useState, useEffect, useRef } from 'react';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { 
  ArrowRight, MapPin, Clock, Briefcase, Users, DollarSign, Heart, 
  Plane, GraduationCap, Home, Calendar, Activity, TrendingUp, Globe,
  Sparkles, Rocket, Shield, Coffee, BookOpen, Zap, Code, Megaphone,
  Timer, Star
} from "lucide-react";


// Current job openings
const jobOpenings = [
  {
    id: 2,
    title: "AI-Powered Software Developer",
    department: "Engineering",
    location: "Remote (Philippines)",
    type: "Full-time",
    closingDate: "Applications close in 3 weeks",
    description: "Build scalable web applications using AI tools to accelerate development and solve complex problems.",
    requirements: [
      "3+ years building full-stack applications",
      "Expert with AI coding tools (Copilot, Cursor)",
      "React, Next.js, Node.js experience",
      "Strong problem-solving skills"
    ],
    isNew: true,
    isHot: false,
    teamSize: "3-5",
    href: "mailto:kyle@zaigo.ai?subject=AI-Powered Software Developer Application"
  },
  {
    id: 3,
    title: "AI-Powered Growth Marketing Specialist",
    department: "Marketing",
    location: "Remote (Philippines)",
    type: "Full-time",
    closingDate: "Applications close in 2 weeks",
    description: "Scale customer acquisition for SaaS products using AI-enhanced marketing strategies and automation.",
    requirements: [
      "2+ years scaling SaaS products",
      "Advanced AI tools for content and ads",
      "Paid ads, SEO, conversion optimization",
      "Data-driven with analytical skills"
    ],
    isNew: false,
    isHot: true,
    teamSize: "4-6",
    href: "mailto:kyle@zaigo.ai?subject=AI-Powered Growth Marketing Specialist Application"
  },
  {
    id: 4,
    title: "Sales Specialist",
    department: "Sales",
    location: "Remote (Global)",
    type: "Full-time",
    closingDate: "Applications close in 4 weeks",
    description: "Drive revenue growth by closing deals with high-value clients using AI-powered sales tools and data-driven strategies.",
    requirements: [
      "3+ years B2B SaaS sales experience",
      "Proven track record of exceeding quotas",
      "Expert with AI sales tools (Apollo, Clay, Outreach)",
      "Strong communication and negotiation skills"
    ],
    isNew: true,
    isHot: true,
    teamSize: "2-4",
    href: "mailto:kyle@zaigo.ai?subject=Sales Specialist Application"
  },
  {
    id: 1,
    title: "Digital Growth Generalist",
    department: "Marketing",
    location: "Remote (Philippines)",
    type: "Full-time",
    closingDate: "Applications close in 2 weeks",
    description: "Drive growth for profitable online businesses using AI and modern marketing tools.",
    requirements: [
      "Experience growing digital products",
      "Daily user of AI tools (ChatGPT, Claude)",
      "Data-driven decision maker",
      "Based in Philippines with excellent English"
    ],
    isNew: true,
    isHot: true,
    teamSize: "5-10",
    href: "mailto:kyle@zaigo.ai?subject=Digital Growth Generalist Application"
  }
];

// Department configuration with icons and colors
const departmentConfig: Record<string, { icon: any; color: string; bgColor: string }> = {
  'Marketing': { icon: Megaphone, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  'Engineering': { icon: Code, color: 'text-green-600', bgColor: 'bg-green-100' },
  'Sales': { icon: TrendingUp, color: 'text-purple-600', bgColor: 'bg-purple-100' },
};

const primaryBenefits = [
  { 
    icon: DollarSign, 
    title: "Real Equity",
    description: "Competitive salary + meaningful ownership"
  },
  { 
    icon: Home, 
    title: "Work From Anywhere",
    description: "100% remote with flexible hours"
  },
  { 
    icon: Zap, 
    title: "Ship Fast, Learn Faster",
    description: "Move quickly with minimal bureaucracy"
  },
  { 
    icon: Users, 
    title: "Small Team, Big Impact",
    description: "Your work directly shapes our success"
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

export default function CareersPage() {
  const [hoveredJob, setHoveredJob] = useState<number | null>(null);

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
            <source src="/videos/concert.mp4" type="video/mp4" />
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
                <p className="text-white font-semibold uppercase tracking-wider text-sm">Now Playing: Your Future</p>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6 text-balance">
                Your Best Work
                <span className="block">Deserves an Audience</span>
              </h1>
              <p className="text-lg md:text-xl max-w-3xl text-gray-200 leading-relaxed mb-12">
                Join a crew that turns ideas into profitable realities. We're building businesses that 
                matter, and we need performers who can deliver.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="#openings">
                  <Button 
                    size="lg" 
                    className="rounded-full font-semibold bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:text-white hover:border-white/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    View Open Roles
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#culture">
                  <Button 
                    size="lg" 
                    variant="ghost"
                    className="rounded-full font-semibold bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Learn About Our Culture
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Life at Zaigo Section */}
        <section id="culture" className="py-16 sm:py-20 bg-background">
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
            <FadeIn>
              <div className="text-center mb-16">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Heart className="w-5 h-5 text-primary" />
                  <p className="text-primary font-semibold uppercase tracking-wider text-sm">Our Culture</p>
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-6">
                  Life at Zaigo Labs
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  We're building a different kind of company that values freedom, creativity, and real impact over busy work.
                </p>
              </div>
            </FadeIn>

            {/* What makes us different */}
            <FadeIn delay={200}>
              <div className="max-w-5xl mx-auto">
                <h3 className="text-2xl font-semibold mb-10 text-center">What makes us different</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {primaryBenefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <FadeIn key={index} delay={300 + index * 100}>
                        <div className="flex gap-6 items-start p-6 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors duration-300">
                          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-7 h-7 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold mb-3">{benefit.title}</h4>
                            <p className="text-base text-muted-foreground leading-relaxed">{benefit.description}</p>
                          </div>
                        </div>
                      </FadeIn>
                    );
                  })}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <Separator />

        {/* Open Positions Section */}
        <section id="openings" className="py-16 sm:py-20 bg-gray-50/50">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <FadeIn>
              <div className="mb-12 text-center">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Rocket className="w-5 h-5 text-primary" />
                  <p className="text-primary font-semibold uppercase tracking-wider text-sm">Career Opportunities</p>
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-4 text-balance">
                  Open Positions
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Click on any role to learn more and apply. Find your spot in our crew.
                </p>
              </div>
            </FadeIn>
            
            <div className="space-y-6">
              {jobOpenings.map((job) => (
                <FadeIn key={job.id}>
                  <Card 
                    className={cn(
                      "border-2 transition-all duration-300 relative overflow-hidden group",
                      hoveredJob === job.id ? "border-primary/30 shadow-2xl transform -translate-y-1" : "border-gray-200"
                    )}
                    onMouseEnter={() => setHoveredJob(job.id)}
                    onMouseLeave={() => setHoveredJob(null)}
                  >
                    {/* Gradient overlay on hover */}
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 transition-opacity duration-300",
                      hoveredJob === job.id && "opacity-100"
                    )} />
                    
                    <CardContent className="p-6 relative">
                      {/* Header Section */}
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                        <div className="flex-1">
                          <h3 className="text-2xl font-semibold group-hover:text-primary transition-colors mb-2">
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {job.type}
                            </span>
                          </div>
                        </div>
                        
                        <Link href={job.href} className="w-full sm:w-auto">
                          <Button className="w-full sm:w-auto rounded-full bg-primary hover:bg-primary/90 text-white group/btn">
                            Apply Now
                            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                      
                      {/* Description */}
                      <p className="text-base text-muted-foreground leading-relaxed mb-6">
                        {job.description}
                      </p>
                      
                      {/* Requirements */}
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3">Requirements</h4>
                        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                          {job.requirements.map((req, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="text-primary mt-1.5 text-xs">•</span>
                              <span className="leading-relaxed">{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Footer */}
                      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-muted-foreground">
                        <span>{job.closingDate}</span>
                        <span>Direct reports to CTO</span>
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-background to-primary/5">
          <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 text-center">
            <FadeIn>
              <div className="flex items-center justify-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-primary" />
                <p className="text-primary font-semibold uppercase tracking-wider text-sm">Join Our Team</p>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-4 text-balance">
                Don't See Your Perfect Role?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                We're always on the lookout for exceptional talent. Send us your story and let's explore how you can contribute to our mission.
              </p>
              
              <Link href="mailto:kyle@zaigo.ai?subject=General Application">
                <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white">
                  Send Us Your Story
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