'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TeamMemberCard, { TeamMemberProps } from "@/components/ui/team-member-card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { 
  ArrowRight, Sparkles, Code2
} from 'lucide-react';

interface TeamMember extends Omit<TeamMemberProps, 'className' | 'imageClassName'> {
  name: string;
  title: string;
  region: string;
  bio?: string;
  hoverImageSrc?: string;
}




// Zaigo Labs leadership team
const leadership: TeamMember[] = [
  {
    name: "Kyle Richless",
    title: "Co-Founder",
    bio: "Kyle is a go-to-market obsessed entrepreneur, with a deeply held belief that [increased] revenues cure most business problems. His north star, when both identifying and building businesses, revolves around repeatable & playbooked acquisition motions, along with sticky customers and strong unit economics.",
    region: "USA",
    hoverImageSrc: "/images/kyle-breakdancing.jpg",
  },
  {
    name: "Pete Enestrom",
    title: "Co-Founder",
    bio: "Pete is a proven, exited Founder with multiple wins [exited businesses] under his belt. He is technical, and an early adopter with respect to AI and all things automations. He brings this tech-forward DNA not just to Zaigo, but to every business which we incubate or explore. He is a native of Australia and a graduate from Yale.",
    region: "USA",
    hoverImageSrc: "/images/pete-breakdancing.jpg",
  },
];

// Technology & Innovation team
const technologyTeam: TeamMember[] = [
  {
    name: "Chisana Santiago",
    title: "Chief of Staff",
    bio: "Chisana is a seasoned operator with over 8 years of experience across digital marketing, leadership, and operations in the US, Australia, and the Philippines. As Chief of Staff at Zaigo, she drives execution across the full product lifecycle—from idea to launch—bringing a sharp, cross-functional lens to every business we build.",
    region: "Philippines",
  },
  {
    name: "Dominic Nato",
    title: "Lead Software Developer",
    bio: "Dominic leads our AI-driven development initiatives, specializing in integrating cutting-edge AI tools like GitHub Copilot, Claude, and GPT-4 into our development workflows to accelerate product delivery.",
    region: "Philippines",
    imageSrc: "/images/team/dom-animated.png"
  },
  {
    name: "Rodjemel Faburada",
    title: "Software Developer",
    bio: "Rodjemel leverages AI-powered development tools to build scalable applications, focusing on automated testing, code generation, and intelligent debugging to deliver high-quality software rapidly.",
    region: "Philippines",
    imageSrc: "/images/team/rodj-animated.png"
  },
  {
    name: "Aris Antonio Co",
    title: "Software Developer & AI Marketer",
    bio: "Aris specializes in building AI-powered marketing automation systems, integrating machine learning models for customer segmentation and predictive analytics to drive efficient growth.",
    region: "Philippines",
    imageSrc: "/images/team/aris-animated.png"
  },
  {
    name: "Fitzsixto S.",
    title: "Software Developer & AI Marketer",
    bio: "Fitz combines AI-enhanced development practices with data-driven marketing strategies, using tools like OpenAI for content generation and AI analytics platforms to optimize growth campaigns.",
    region: "Philippines",
    imageSrc: "/images/team/fitz-animated.png"
  },
  {
    name: "Davis",
    title: "Advisor",
    bio: "Davis specializes in performance marketing and paid advertising strategies, leveraging AI-powered ad platforms and analytics tools to maximize ROI across Google Ads, Meta, and emerging channels for rapid, profitable growth.",
    region: "Kenya",
    imageSrc: "/images/team/davis-animated.png"
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

// Custom TeamMemberCard with scroll-based transitions
const ScrollAnimatedTeamMemberCard: React.FC<TeamMemberProps & { 
  scrollProgress?: any;
  normalOpacity?: any;
  breakdanceOpacity?: any;
  grayscale?: any;
  opacity?: any;
}> = ({ 
  scrollProgress, 
  normalOpacity, 
  breakdanceOpacity,
  grayscale,
  opacity,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // For Kyle and Pete with breakdancing images
  if (normalOpacity && breakdanceOpacity && props.hoverImageSrc) {
    return (
      <Card 
        className={cn("border-none bg-white shadow-sm overflow-hidden h-full", props.className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full pt-[100%] overflow-hidden bg-gray-50">
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0"
              style={{ opacity: normalOpacity }}
            >
              <img
                src={props.imageSrc || `/images/team/people-new/${props.name.toLowerCase().replace(/\s+/g, '-')}.png`}
                alt={props.name}
                className="w-full h-full object-cover object-center grayscale"
              />
            </motion.div>
            <motion.div
              className="absolute inset-0"
              style={{ opacity: breakdanceOpacity }}
            >
              <img
                src={props.hoverImageSrc}
                alt={props.name}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </div>
        </div>
        <CardContent className="p-4 pt-3">
          <h3 className="font-medium text-base sm:text-lg leading-tight mb-1">{props.name}</h3>
          <p className="text-sm text-muted-foreground leading-tight">{props.title}</p>
          {props.bio && <p className="text-sm my-2 leading-normal">{props.bio}</p>}
          <p className="text-xs text-gray-500 mt-1">{props.region}</p>
        </CardContent>
      </Card>
    );
  }
  
  // For Davis with grayscale transition
  if (grayscale !== undefined && opacity !== undefined) {
    return (
      <Card 
        className={cn("border-none bg-white shadow-sm overflow-hidden h-full", props.className)}
      >
        <div className="relative w-full pt-[100%] overflow-hidden bg-gray-50">
          <motion.div
            className="absolute inset-0"
            style={{ 
              filter: useTransform(grayscale, (value) => `grayscale(${value})`),
              opacity: opacity
            }}
          >
            <img
              src={props.imageSrc}
              alt={props.name}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </div>
        <CardContent className="p-4 pt-3">
          <h3 className="font-medium text-base sm:text-lg leading-tight mb-1">{props.name}</h3>
          <p className="text-sm text-muted-foreground leading-tight">{props.title}</p>
          {props.bio && <p className="text-sm my-2 leading-normal">{props.bio}</p>}
          <p className="text-xs text-gray-500 mt-1">{props.region}</p>
        </CardContent>
      </Card>
    );
  }
  
  // Default TeamMemberCard for others
  return <TeamMemberCard {...props} />;
};

export default function PeoplePage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const leadershipRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  
  // Scroll progress for leadership section
  const { scrollYProgress: leadershipScroll } = useScroll({
    target: leadershipRef,
    offset: ["start end", "end start"]
  });
  
  // Scroll progress for tech section
  const { scrollYProgress: techScroll } = useScroll({
    target: techRef,
    offset: ["start end", "end start"]
  });
  
  // Kyle's animation (25-50% of leadership scroll)
  const kyleBreakdanceOpacity = useTransform(
    leadershipScroll,
    [0.25, 0.5],
    [0, 1]
  );
  const kyleNormalOpacity = useTransform(
    leadershipScroll,
    [0.25, 0.5],
    [1, 0]
  );
  
  // Pete's animation (40-65% of leadership scroll)
  const peteBreakdanceOpacity = useTransform(
    leadershipScroll,
    [0.4, 0.65],
    [0, 1]
  );
  const peteNormalOpacity = useTransform(
    leadershipScroll,
    [0.4, 0.65],
    [1, 0]
  );
  
  // Davis's animation (30-60% of tech scroll)
  const davisGrayscale = useTransform(
    techScroll,
    [0.3, 0.6],
    [1, 0]
  );
  const davisOpacity = useTransform(
    techScroll,
    [0.3, 0.6],
    [0.8, 1]
  );

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
            <source src="/videos/breakdancing-1.mp4" type="video/mp4" />
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
                <p className="text-white font-semibold uppercase tracking-wider text-sm drop-shadow-lg">Our Team</p>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6 text-balance text-white drop-shadow-lg">
                Global Crew,
                <span className="block">Perfect Flow</span>
              </h1>
              <p className="text-lg md:text-xl max-w-3xl text-gray-200 leading-relaxed mb-12 drop-shadow-lg">
                Like a breaking crew hitting their routine, our global team moves in sync. 
                We bring different styles together to create something extraordinary.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="#leadership">
                  <Button 
                    size="lg" 
                    className="rounded-full font-semibold bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:text-white hover:border-white/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Meet Our Leaders
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/careers">
                  <Button 
                    size="lg" 
                    variant="ghost"
                    className="rounded-full font-semibold bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Join Our Team
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Leadership Section */}
        <section id="leadership" ref={leadershipRef} className="py-16 sm:py-20 bg-background">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <FadeIn>
              <div className="mb-12">
                <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-4">Leadership</p>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                  Leadership Team
                </h2>
                <p className="text-lg text-muted-foreground">
                  The ones who set the beat and keep everyone in rhythm.
                </p>
              </div>
            </FadeIn>
            
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {leadership.map((person, index) => {
                const isKyle = person.name === "Kyle Richless";
                const isPete = person.name === "Pete Enestrom";
                
                return (
                  <FadeIn key={index} delay={index * 100}>
                    <div
                      className={cn(
                        "h-full transition-all duration-300",
                        hoveredCard === `leader-${index}` && "transform -translate-y-1"
                      )}
                      onMouseEnter={() => setHoveredCard(`leader-${index}`)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <ScrollAnimatedTeamMemberCard
                        name={person.name}
                        title={person.title}
                        bio={person.bio}
                        region={person.region}
                        hoverImageSrc={person.hoverImageSrc}
                        normalOpacity={isKyle ? kyleNormalOpacity : isPete ? peteNormalOpacity : undefined}
                        breakdanceOpacity={isKyle ? kyleBreakdanceOpacity : isPete ? peteBreakdanceOpacity : undefined}
                        className="h-full"
                        imageClassName=""
                      />
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* Technology & Innovation Team Section */}
        <section ref={techRef} className="py-16 sm:py-20 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <FadeIn>
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="w-5 h-5 text-primary" />
                  <p className="text-primary font-semibold uppercase tracking-wider text-sm">Technology & Innovation</p>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                  AI-Powered Development Team
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl">
                  Our tech crew brings the power moves—spinning up solutions with AI-assisted precision. 
                  Every line of code lands clean, every deployment sticks the landing.
                </p>
              </div>
            </FadeIn>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {technologyTeam.map((person, index) => {
                const isDavis = person.name === "Davis";
                
                return (
                  <FadeIn key={index} delay={index * 100}>
                    <div
                      className={cn(
                        "h-full transition-all duration-300",
                        hoveredCard === `tech-${index}` && "transform -translate-y-1"
                      )}
                      onMouseEnter={() => setHoveredCard(`tech-${index}`)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <ScrollAnimatedTeamMemberCard
                        name={person.name}
                        title={person.title}
                        bio={person.bio}
                        region={person.region}
                        imageSrc={person.imageSrc}
                        grayscale={isDavis ? davisGrayscale : undefined}
                        opacity={isDavis ? davisOpacity : undefined}
                        className="h-full"
                        imageClassName=""
                      />
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section - Apple-style rounded design */}
        <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-3xl bg-black">
              {/* Background Video */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/videos/founders-breakdancing.mp4" type="video/mp4" />
              </video>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
              
              {/* Content */}
              <div className="relative z-10 px-12 py-20 sm:px-16 sm:py-32 lg:px-24">
                <FadeIn>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-2xl">
                    Drop In and Build With Us.
                  </h2>
                  <p className="text-lg md:text-xl text-white/80 max-w-xl mb-12 leading-relaxed">
                    Ready to break into something new? We'll help you nail the perfect routine—
                    from first move to final freeze. No wipeouts, just wins.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/contact">
                      <Button 
                        size="lg" 
                        className="rounded-full bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105"
                      >
                        Book a discovery call
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    
                    <Link href="/careers">
                      <Button 
                        size="lg" 
                        variant="outline"
                        className="rounded-full bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105"
                      >
                        Join the Team
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}