// Case Study Type Definitions
import { LucideIcon } from 'lucide-react';

export interface CaseStudyMetrics {
  users: string;
  market: string;
  launched: string;
  transactions?: string;
  satisfaction?: string;
  growth?: string;
  income?: string;
  deadline?: string;
}

export interface CaseStudyChallenge {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface CaseStudySolution {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface CaseStudyFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface CaseStudyMarketPoint {
  title: string;
  description: string;
}

export interface CaseStudyBusinessModel {
  title: string;
  description: string;
}

export interface CaseStudyImpactItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface CaseStudyData {
  // Basic Information
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'RegTech' | 'HR Tech' | 'FinTech' | 'EdTech' | 'HealthTech';
  status: 'Active' | 'In Development' | 'Launched' | 'Planning';
  
  // Hero Section
  heroImage?: string;
  liveUrl?: string;
  
  // Project Details
  timeline: string;
  team: string;
  investment: string;
  technologies: string[];
  services: string[];
  
  // Metrics
  metrics: CaseStudyMetrics;
  
  // Content Sections
  overview: {
    content: string[];
  };
  
  // Problem & Solution (optional - for certain layouts)
  problem?: {
    description: string;
    points: string[];
  };
  
  solution?: {
    description: string;
    points: string[];
  };
  
  // Challenges & Solutions (optional - for certain layouts)
  challenges?: CaseStudyChallenge[];
  solutions?: CaseStudySolution[];
  
  // Features (optional)
  features?: CaseStudyFeature[];
  
  // Market Opportunity (optional)
  marketOpportunity?: {
    description: string;
    points: CaseStudyMarketPoint[];
    stats?: Array<{
      value: string;
      label: string;
    }>;
  };
  
  // Business Model (optional)
  businessModel?: CaseStudyBusinessModel[];
  
  // Impact Section (optional)
  impact?: {
    description?: string;
    items: CaseStudyImpactItem[];
  };
  
  // Results (optional - for certain layouts)
  results?: {
    [key: string]: string;
  };
  
  // CTA Section
  cta: {
    title: string;
    description: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
  };
}