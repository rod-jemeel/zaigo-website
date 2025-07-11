import { notFound } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, CheckCircle2, Users, Globe, Calendar, TrendingUp, Shield, FileText, Target, ExternalLink, Car, CreditCard, Sparkles, Building2, Code, Activity, Brain, Clock, DollarSign, AlertTriangle, BarChart3, Leaf } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/Footer";
import { getCaseStudyBySlug, getAllCaseStudies } from '@/data/case-studies';

// Icon mapping
const iconMap: Record<string, any> = {
  Shield,
  Globe,
  TrendingUp,
  FileText,
  Calendar,
  CheckCircle2,
  Users,
  Target,
  Car,
  CreditCard,
  Building2,
  Code,
  Activity,
  Brain,
  Clock,
  DollarSign,
  AlertTriangle,
  BarChart3,
  Leaf
};

// Generate static params for all case studies
export async function generateStaticParams() {
  const caseStudies = getAllCaseStudies();
  return caseStudies.map((study) => ({
    slug: study.id,
  }));
}

// Status configuration
const statusConfig = {
  'Active': { color: 'text-green-700', bgColor: 'bg-green-50 border-green-200' },
  'In Development': { color: 'text-blue-700', bgColor: 'bg-blue-50 border-blue-200' },
  'Launched': { color: 'text-blue-700', bgColor: 'bg-blue-50 border-blue-200' },
  'Planning': { color: 'text-gray-700', bgColor: 'bg-gray-50 border-gray-200' }
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const isDetailedCaseStudy = caseStudy.sections && caseStudy.sections.length > 0;

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-16">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-blue-500/5 blur-[150px]" />
            <div className="absolute right-0 bottom-0 h-[600px] w-[600px] rounded-full bg-purple-500/5 blur-[120px]" />
          </div>

          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            {/* Back Navigation */}
            <Link 
              href="/case-studies" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300 mb-12 text-sm font-medium hover:gap-3 group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>All Case Studies</span>
            </Link>

            {/* Header Content - Centered */}
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <div className="flex items-center justify-center gap-3">
                <Badge variant="secondary" className="font-medium bg-gray-900 text-white hover:bg-gray-800 px-4 py-1.5">{caseStudy.category}</Badge>
                <Badge variant="outline" className={statusConfig[caseStudy.status].bgColor + ' ' + statusConfig[caseStudy.status].color + ' px-4 py-1.5 font-medium'}>
                  {caseStudy.status}
                </Badge>
              </div>
              
              <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9]">
                {caseStudy.title}
              </h1>
              
              <p className="text-xl sm:text-2xl md:text-3xl leading-relaxed text-muted-foreground max-w-4xl mx-auto font-light">
                {caseStudy.subtitle}
              </p>

              {isDetailedCaseStudy && (
                <div className="space-y-10">
                  <div className="flex flex-wrap gap-8 text-base justify-center">
                    {caseStudy.timeline && (
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-primary/10 rounded-lg">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Timeline</p>
                          <p className="font-semibold text-foreground">{caseStudy.timeline}</p>
                        </div>
                      </div>
                    )}
                    {caseStudy.team && (
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-primary/10 rounded-lg">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Team Size</p>
                          <p className="font-semibold text-foreground">{caseStudy.team}</p>
                        </div>
                      </div>
                    )}
                    {caseStudy.investment && (
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-primary/10 rounded-lg">
                          <TrendingUp className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Investment</p>
                          <p className="font-semibold text-foreground">{caseStudy.investment}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {caseStudy.liveUrl && (
                    <div>
                      <Link 
                        href={caseStudy.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                          <span>Experience Live Demo</span>
                          <ExternalLink className="ml-3 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Large Image/Video Section */}
        {(caseStudy.heroImage || caseStudy.heroVideo) && (
          <section className="pb-24 sm:pb-32">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-900 group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                  {caseStudy.heroVideo ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src={caseStudy.heroVideo} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : caseStudy.heroImage ? (
                    <Image
                      src={caseStudy.heroImage}
                      alt={`${caseStudy.title} - ${caseStudy.subtitle}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                      priority
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        )}

        {isDetailedCaseStudy ? (
          <>
            {/* Detailed Case Study Content */}
            {caseStudy.sections?.map((section, index) => {
              if (section.type === 'overview') {
                return (
                  <section key={index} className="py-24 sm:py-32 bg-gray-50">
                    <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
                      <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start">
                        {/* Content Section */}
                        <div>
                          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-8 leading-tight">{section.title}</h2>
                          <div className="prose prose-lg text-muted-foreground max-w-none">
                            {section.content.split('\n\n').map((paragraph, pIndex) => (
                              <p key={pIndex} className={pIndex > 0 ? "mt-6 leading-relaxed" : "leading-relaxed"}>
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </div>
                        
                        {/* Metrics Bento Grid - Simplified */}
                        {caseStudy.results && (
                          <div className="grid grid-cols-2 gap-4">
                            {Object.entries(caseStudy.results).map(([key, value], rIndex) => {
                              // Extract number and text parts for better styling
                              const parts = value.match(/^([\d,.$]+\+?%?)(.*)$/);
                              const number = parts ? parts[1] : value;
                              const suffix = parts ? parts[2] : '';
                              
                              // Icons for metrics
                              const icons = [TrendingUp, Users, DollarSign, BarChart3];
                              const Icon = icons[rIndex % icons.length];
                              
                              // Simple bento sizes - first item larger
                              const isFeature = rIndex === 0;
                              const cardClass = isFeature ? 'col-span-2' : '';
                              
                              return (
                                <div key={rIndex} className={`group ${cardClass}`}>
                                  <div className={`relative h-full overflow-hidden rounded-2xl bg-white border border-gray-200 p-6 ${isFeature ? 'lg:p-8' : ''} transition-all duration-300 hover:shadow-lg hover:border-primary/20`}>
                                    {/* Subtle gradient background on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    
                                    {/* Content */}
                                    <div className="relative">
                                      {/* Icon */}
                                      <div className="inline-flex p-2 rounded-lg bg-primary/10 mb-4">
                                        <Icon className={`${isFeature ? 'h-6 w-6' : 'h-5 w-5'} text-primary`} />
                                      </div>
                                      
                                      {/* Metric Value */}
                                      <div className="mb-2">
                                        <div className="flex items-baseline gap-1 flex-wrap">
                                          <span className={`${isFeature ? 'text-4xl lg:text-5xl' : 'text-3xl lg:text-4xl'} font-bold text-gray-900`}>
                                            {number}
                                          </span>
                                          {suffix && (
                                            <span className={`${isFeature ? 'text-lg' : 'text-base'} font-medium text-gray-600`}>
                                              {suffix}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                      
                                      {/* Label */}
                                      <p className={`${isFeature ? 'text-base' : 'text-sm'} font-medium text-gray-600 capitalize`}>
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                );
              }
              
              if (section.type === 'problem' || section.type === 'solution') {
                return null; // These will be handled in the Problem & Solution section
              }
              
              return null;
            })}

            {/* Problem & Solution Section */}
            {caseStudy.sections?.some(s => s.type === 'problem' || s.type === 'solution') && (
              <section className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Challenge & Solution</h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Understanding the problem space and delivering innovative solutions</p>
                  </div>
                  <div className="grid gap-8 lg:grid-cols-2">
                    {caseStudy.sections?.find(s => s.type === 'problem') && (
                      <Card className="p-10 border-2 border-red-100 bg-gradient-to-br from-red-50/50 to-red-50/20 hover:shadow-xl transition-all duration-300">
                        <div className="mb-8">
                          <div className="h-14 w-14 rounded-xl bg-red-100 flex items-center justify-center shadow-sm">
                            <Target className="h-7 w-7 text-red-600" />
                          </div>
                        </div>
                        
                        <h3 className="text-3xl font-bold text-foreground mb-6">
                          {caseStudy.sections.find(s => s.type === 'problem')?.title}
                        </h3>
                        
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                          <p className="text-lg">{caseStudy.sections.find(s => s.type === 'problem')?.content}</p>
                        </div>
                      </Card>
                    )}

                    {caseStudy.sections?.find(s => s.type === 'solution') && (
                      <Card className="p-10 border-2 border-green-100 bg-gradient-to-br from-green-50/50 to-green-50/20 hover:shadow-xl transition-all duration-300">
                        <div className="mb-8">
                          <div className="h-14 w-14 rounded-xl bg-green-100 flex items-center justify-center shadow-sm">
                            <CheckCircle2 className="h-7 w-7 text-green-600" />
                          </div>
                        </div>
                        
                        <h3 className="text-3xl font-bold text-foreground mb-6">
                          {caseStudy.sections.find(s => s.type === 'solution')?.title}
                        </h3>
                        
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                          <p className="text-lg">{caseStudy.sections.find(s => s.type === 'solution')?.content}</p>
                        </div>
                      </Card>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Features Section */}
            {caseStudy.features && caseStudy.features.length > 0 && (
              <section className="py-24 sm:py-32 bg-gray-50">
                <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Key Features & Capabilities</h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                      Purpose-built functionality that drives real business value
                    </p>
                  </div>

                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {caseStudy.features.map((feature, index) => {
                      const Icon = iconMap[feature.icon] || CheckCircle2;
                      return (
                        <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 border-gray-100 group">
                          <div className="mb-6">
                            <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                              <Icon className="h-7 w-7 text-primary" />
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}

            {/* Technologies Section */}
            {caseStudy.technologies && caseStudy.technologies.length > 0 && (
              <section className="py-24 sm:py-32 bg-white">
                <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Technology Stack</h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                      Enterprise-grade technologies chosen for scalability, security, and performance
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-4">
                    {caseStudy.technologies.map((tech) => (
                      <div
                        key={tech}
                        className="px-8 py-4 bg-gray-50 rounded-full border-2 border-gray-100 text-gray-700 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 font-medium text-lg"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        ) : (
          /* Simple Case Study */
          <section className="py-24 sm:py-32 bg-gray-50">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <div className="mx-auto max-w-3xl text-center">
                <div className="mb-8">
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Full Case Study Coming Soon</h2>
                  <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                    We're currently documenting the complete journey of {caseStudy.title}. 
                    Soon you'll discover the detailed insights, challenges overcome, and innovative solutions delivered.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 justify-center mb-12">
                  {caseStudy.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="px-5 py-2 text-base">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Stay tuned for the complete story</p>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-24 sm:py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="text-center max-w-4xl mx-auto">
              <div className="mb-8">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
                  Ready to Transform Your Industry?
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Let's build something extraordinary together. We're here to turn your vision into a market-leading solution that drives real business value.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 text-lg font-medium text-white shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  Start Your Success Story
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center justify-center rounded-full border-2 border-primary px-10 py-4 text-lg font-medium text-primary hover:bg-primary/5 transition-all duration-300"
                >
                  Explore More Projects
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}