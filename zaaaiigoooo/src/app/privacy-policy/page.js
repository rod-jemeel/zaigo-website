'use client';

import { useState } from 'react';
import Footer from '@/components/layout/Footer';
import { FadeIn } from '@/components/ui/fade-in';
import { 
  ArrowRight, 
  Shield, 
  Lock, 
  Eye, 
  UserCheck, 
  FileText, 
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Users,
  Globe,
  Database,
  Zap
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const keyPoints = [
    { icon: <Shield className="w-5 h-5" />, text: "We never sell your personal data" },
    { icon: <Lock className="w-5 h-5" />, text: "No tracking cookies across websites" },
    { icon: <UserCheck className="w-5 h-5" />, text: "You control your information" },
    { icon: <Globe className="w-5 h-5" />, text: "GDPR & CCPA compliant" }
  ];

  const sections = [
    {
      id: 'what-we-collect',
      title: 'What We Collect',
      icon: <Database className="w-5 h-5" />,
      summary: 'Basic contact info and usage data to improve our services',
      content: {
        personal: ['Name & email', 'Company details', 'Job applications'],
        automatic: ['IP address & browser info', 'Pages visited', 'Time spent on site']
      }
    },
    {
      id: 'how-we-use',
      title: 'How We Use It',
      icon: <Zap className="w-5 h-5" />,
      summary: 'To provide services, communicate, and improve our platform',
      content: [
        'Operate and maintain our website',
        'Respond to your inquiries',
        'Send relevant updates (with your consent)',
        'Improve user experience',
        'Prevent fraud and ensure security'
      ]
    },
    {
      id: 'who-we-share',
      title: 'Who We Share With',
      icon: <Users className="w-5 h-5" />,
      summary: 'Limited sharing with service providers and legal requirements',
      content: {
        'Service Providers': 'Companies that help us operate (hosting, analytics)',
        'Legal Requirements': 'When required by law or court order',
        'Business Transfers': 'In case of merger or acquisition',
        'Your Consent': 'Only when you explicitly agree'
      }
    },
    {
      id: 'your-rights',
      title: 'Your Rights',
      icon: <UserCheck className="w-5 h-5" />,
      summary: 'Access, update, delete, and control your data',
      content: [
        { right: 'Access', desc: 'Get a copy of your data' },
        { right: 'Update', desc: 'Correct inaccurate information' },
        { right: 'Delete', desc: 'Request data removal' },
        { right: 'Port', desc: 'Transfer data to another service' },
        { right: 'Object', desc: 'Opt-out of certain uses' }
      ]
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-background to-muted/20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
          </div>
          
          <div className="relative z-10 zaigo-section py-12 sm:py-16">
            <div className="zaigo-container max-w-5xl text-center">
              <FadeIn>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
                  Privacy Policy
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                  Your privacy matters. Here's how we protect it.
                </p>
                
                {/* Key Points Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                  {keyPoints.map((point, index) => (
                    <FadeIn key={index} delay={index * 100}>
                      <div className="flex items-center gap-3 p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors duration-300">
                        <div className="text-primary flex-shrink-0">{point.icon}</div>
                        <span className="text-base font-medium">{point.text}</span>
                      </div>
                    </FadeIn>
                  ))}
                </div>

                <div className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertCircle className="w-4 h-4" />
                  <span>Last Updated: March 24, 2025</span>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Quick Overview */}
        <section className="border-b">
          <div className="zaigo-container max-w-4xl py-8 sm:py-10">
            <FadeIn delay={200}>
              <div className="rounded-2xl bg-muted/30 p-6 sm:p-8">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  Quick Overview
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Zaigo Labs respects your privacy. We collect only what's necessary to provide our services, 
                  never sell your data, and give you full control. This policy explains our practices in simple terms.
                  For detailed information, expand the sections below.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Collapsible Sections */}
        <section className="zaigo-section">
          <div className="zaigo-container max-w-4xl">
            <div className="space-y-4">
              {sections.map((section, index) => (
                <FadeIn key={section.id} delay={300 + index * 100}>
                  <div className="border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full px-6 sm:px-8 py-6 sm:py-7 flex items-center justify-between hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-4 sm:gap-5">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <div className="text-primary">{section.icon}</div>
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-xl sm:text-2xl mb-1">{section.title}</h3>
                          <p className="text-base text-muted-foreground">{section.summary}</p>
                        </div>
                      </div>
                      <ChevronDown 
                        className={`w-6 h-6 text-muted-foreground transition-transform duration-300 flex-shrink-0 ml-4 ${
                          openSections[section.id] ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    
                    {openSections[section.id] && (
                      <div className="px-6 sm:px-8 pb-8 pt-6 border-t border-border/50 bg-muted/10">
                        {section.id === 'what-we-collect' && (
                          <div className="space-y-6">
                            <div>
                              <h4 className="font-semibold text-lg mb-3">Information You Provide:</h4>
                              <ul className="space-y-2">
                                {section.content.personal.map((item, i) => (
                                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                                    <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
                                    <span className="text-base">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg mb-3">Automatically Collected:</h4>
                              <ul className="space-y-2">
                                {section.content.automatic.map((item, i) => (
                                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                                    <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
                                    <span className="text-base">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                        
                        {section.id === 'how-we-use' && (
                          <ul className="space-y-3">
                            {section.content.map((item, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                <span className="text-base text-muted-foreground">{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        
                        {section.id === 'who-we-share' && (
                          <div className="space-y-4">
                            {Object.entries(section.content).map(([key, value], i) => (
                              <div key={i} className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                <div>
                                  <span className="font-semibold text-base">{key}:</span>
                                  <span className="text-base text-muted-foreground ml-2">{value}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {section.id === 'your-rights' && (
                          <div className="grid gap-4 sm:grid-cols-2">
                            {section.content.map((item, i) => (
                              <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-background border border-border">
                                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                <div>
                                  <div className="font-semibold text-base">{item.right}</div>
                                  <div className="text-sm text-muted-foreground mt-1">{item.desc}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Additional Info */}
            <FadeIn delay={700}>
              <div className="mt-12 space-y-8">
                {/* Children's Privacy */}
                <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-6 sm:p-8">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    Children's Privacy
                  </h3>
                  <p className="text-base text-amber-900 dark:text-amber-100">
                    Our services are not intended for children under 13. We don't knowingly collect data from children.
                  </p>
                </div>

                {/* Questions */}
                <div className="text-center">
                  <p className="text-base sm:text-lg text-muted-foreground">
                    Questions about our privacy practices? Contact us at{' '}
                    <a href="mailto:privacy@zaigolabs.com" className="text-primary hover:underline font-medium">
                      privacy@zaigolabs.com
                    </a>
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}