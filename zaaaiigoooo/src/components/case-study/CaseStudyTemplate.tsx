'use client';

import { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import { 
  ArrowLeft, ArrowRight, Calendar, Users, Globe, 
  CheckCircle2, TrendingUp, Sparkles, ExternalLink
} from 'lucide-react';
import type { CaseStudyData } from '@/types/case-study';

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

// Status configuration
const statusConfig = {
  'Active': { color: 'text-green-700', bgColor: 'bg-green-50 border-green-200' },
  'In Development': { color: 'text-blue-700', bgColor: 'bg-blue-50 border-blue-200' },
  'Launched': { color: 'text-blue-700', bgColor: 'bg-blue-50 border-blue-200' },
  'Planning': { color: 'text-gray-700', bgColor: 'bg-gray-50 border-gray-200' }
};

interface CaseStudyTemplateProps {
  data: CaseStudyData;
}

export default function CaseStudyTemplate({ data }: CaseStudyTemplateProps) {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20 sm:py-32">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <FadeIn>
              <Link href="/case-studies" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-8">
                <ArrowLeft className="h-4 w-4" />
                Back to Case Studies
              </Link>
              
              <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Badge className="bg-gray-900 text-white hover:bg-gray-800">
                      {data.category}
                    </Badge>
                    <Badge variant="outline" className={cn("", statusConfig[data.status].bgColor, statusConfig[data.status].color)}>
                      {data.status}
                    </Badge>
                  </div>
                  
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
                    {data.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                    {data.subtitle}
                  </p>
                  
                  <div className="flex flex-wrap gap-6 text-gray-600 mb-8">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      <span>{data.timeline} development</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      <span>{data.team}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      <span>{data.investment} investment</span>
                    </div>
                  </div>

                  {data.liveUrl && (
                    <Link href={data.liveUrl} target="_blank" rel="noopener noreferrer">
                      <Button size="lg" className="rounded-full">
                        Visit Live Site
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>

                {data.heroImage && (
                  <div className="relative">
                    <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={data.heroImage}
                        alt={`${data.title} - ${data.subtitle}`}
                        width={800}
                        height={450}
                        className="w-full h-full object-cover"
                        priority
                      />
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-6">Project Overview</h2>
                  {data.overview.content.map((paragraph, index) => (
                    <p key={index} className="text-lg text-gray-600 mb-6 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </FadeIn>
              
              {data.results && (
                <FadeIn delay={100}>
                  <div className="grid grid-cols-2 gap-6">
                    {Object.entries(data.results).map(([key, value], index) => (
                      <div key={key} className="bg-gray-50 rounded-xl p-6 text-center">
                        <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
                        <div className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              )}
            </div>
          </div>
        </section>

        {/* Problem & Solution Section (if provided) */}
        {data.problem && data.solution && (
          <section className="py-16 sm:py-20 bg-gray-50">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <div className="grid gap-12 lg:grid-cols-2">
                {/* Problem */}
                <FadeIn>
                  <Card className="p-8 border-red-200 bg-red-50/50">
                    <h3 className="text-2xl font-bold text-foreground mb-4">The Problem</h3>
                    <div className="space-y-4 text-muted-foreground">
                      <p>{data.problem.description}</p>
                      <ul className="space-y-3">
                        {data.problem.points.map((point, index) => (
                          <li key={index} className="flex gap-3">
                            <CheckCircle2 className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </FadeIn>

                {/* Solution */}
                <FadeIn delay={100}>
                  <Card className="p-8 border-green-200 bg-green-50/50">
                    <h3 className="text-2xl font-bold text-foreground mb-4">Our Solution</h3>
                    <div className="space-y-4 text-muted-foreground">
                      <p>{data.solution.description}</p>
                      <ul className="space-y-3">
                        {data.solution.points.map((point, index) => (
                          <li key={index} className="flex gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </FadeIn>
              </div>
            </div>
          </section>
        )}

        {/* Challenge Section (if provided) */}
        {data.challenges && (
          <section className="py-20 bg-gray-50">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <FadeIn>
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">The Challenge</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    {data.description}
                  </p>
                </div>
              </FadeIn>
              
              <div className="grid md:grid-cols-3 gap-8">
                {data.challenges.map((challenge, index) => {
                  const Icon = challenge.icon;
                  return (
                    <FadeIn key={index} delay={index * 100}>
                      <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{challenge.title}</h3>
                        <p className="text-gray-600">{challenge.description}</p>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Solution Section (if provided) */}
        {data.solutions && (
          <section className="py-20 bg-white">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <FadeIn>
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Solution</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Building trust through technology and exclusive membership benefits
                  </p>
                </div>
              </FadeIn>
              
              <div className="grid md:grid-cols-3 gap-8">
                {data.solutions.map((solution, index) => {
                  const Icon = solution.icon;
                  return (
                    <FadeIn key={index} delay={index * 100}>
                      <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-8">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{solution.title}</h3>
                        <p className="text-gray-600">{solution.description}</p>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Features Section (if provided) */}
        {data.features && (
          <section className="py-16 sm:py-20 bg-gray-50">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground">Key Features</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Purpose-built tools designed specifically for {data.title.toLowerCase()}
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {data.features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <FadeIn key={index} delay={index * 50}>
                      <Card className="p-6">
                        <Icon className="h-10 w-10 text-primary mb-4" />
                        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </Card>
                    </FadeIn>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Market Opportunity Section (if provided) */}
        {data.marketOpportunity && (
          <section className="py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <div className="grid gap-12 lg:grid-cols-2 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-6">Market Opportunity</h2>
                  <div className="space-y-6 text-muted-foreground">
                    <p>{data.marketOpportunity.description}</p>
                    <div className="space-y-4">
                      {data.marketOpportunity.points.map((point, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <span className="text-sm font-semibold text-primary">{index + 1}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground mb-1">{point.title}</h4>
                            <p className="text-sm">{point.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {data.marketOpportunity.stats && (
                  <div className="grid gap-4 grid-cols-2">
                    {data.marketOpportunity.stats.map((stat, index) => (
                      <Card key={index} className="p-6 text-center">
                        <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Business Model Section (if provided) */}
        {data.businessModel && (
          <section className="py-16 sm:py-20 bg-gray-50">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Business Model</h2>
                <div className="space-y-6">
                  {data.businessModel.map((model, index) => (
                    <FadeIn key={index} delay={index * 100}>
                      <Card className="p-6">
                        <h3 className="text-xl font-semibold mb-3">{model.title}</h3>
                        <p className="text-muted-foreground">{model.description}</p>
                      </Card>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Impact Section (if provided) */}
        {data.impact && (
          <section className="py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground">Expected Impact</h2>
                {data.impact.description && (
                  <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    {data.impact.description}
                  </p>
                )}
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                {data.impact.items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <FadeIn key={index} delay={index * 100}>
                      <div className="text-center">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Tech Stack Section */}
        {data.technologies && (
          <section className="py-20 bg-gray-50">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <FadeIn>
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">Technology Stack</h2>
                  <p className="text-lg text-gray-600">
                    Built with modern, scalable technologies for performance and security
                  </p>
                </div>
              </FadeIn>
              
              <FadeIn delay={100}>
                <div className="flex flex-wrap justify-center gap-4">
                  {data.technologies.map((tech) => (
                    <div
                      key={tech}
                      onMouseEnter={() => setHoveredTech(tech)}
                      onMouseLeave={() => setHoveredTech(null)}
                      className={cn(
                        "px-6 py-3 bg-white rounded-full border-2 transition-all duration-300 cursor-pointer",
                        hoveredTech === tech
                          ? "border-primary text-primary shadow-lg scale-105"
                          : "border-gray-200 text-gray-700 hover:border-gray-300"
                      )}
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </section>
        )}

        <Separator />

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-background to-primary/5">
          <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 text-center">
            <FadeIn>
              <div className="flex items-center justify-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-primary" />
                <p className="text-primary font-semibold uppercase tracking-wider text-sm">Ready to Build?</p>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-balance">
                {data.cta.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                {data.cta.description}
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href={data.cta.primaryButtonLink || "/contact"}>
                  <Button size="lg" className="rounded-full">
                    {data.cta.primaryButtonText || "Start Your Project"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/case-studies">
                  <Button size="lg" variant="outline" className="rounded-full">
                    View More Case Studies
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}