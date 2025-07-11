export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudyFeature {
  icon: string;
  title: string;
  description: string;
}

export interface CaseStudySection {
  title: string;
  content: string;
  type?: "problem" | "solution" | "overview";
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: "RegTech" | "HR Tech" | "FinTech" | "EdTech" | "HealthTech";
  status: "Active" | "In Development" | "Launched" | "Planning";
  image?: string;
  heroImage?: string;
  heroVideo?: string;
  liveUrl?: string;
  metrics: {
    users: string;
    market: string;
    launched: string;
    [key: string]: string;
  };
  tags: string[];
  timeline?: string;
  team?: string;
  investment?: string;
  technologies?: string[];
  services?: string[];
  sections?: CaseStudySection[];
  features?: CaseStudyFeature[];
  results?: Record<string, string>;
}

export const caseStudiesData: CaseStudy[] = [
  {
    id: "veloce",
    title: "Veloce",
    subtitle: "Premium marketplace for investment-grade automobiles",
    description:
      "Built an exclusive online platform connecting discerning collectors with authenticated, rare, and collectible vehicles worth $125K-$450K+",
    category: "FinTech",
    status: "Active",
    image: "/assets/Screenshot 2025-06-28 023740.png",
    heroVideo: "/assets/Veloce_Automotive_Video_Concept_Ready.mp4",
    liveUrl: "https://v0-roame-inspired-biz-6v.vercel.app/",
    metrics: {
      users: "1,000+",
      market: "Global",
      launched: "2024",
    },
    tags: ["Marketplace", "Luxury", "E-commerce", "Authentication"],
    timeline: "3 months",
    team: "6 specialists",
    investment: "$250K",
    technologies: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Stripe",
      "Vercel",
      "Tailwind CSS",
      "PostgreSQL",
      "Redis",
    ],
    services: [
      "Platform Development",
      "Payment Integration",
      "Authentication System",
      "Admin Dashboard",
      "Mobile Optimization",
    ],
    results: {
      users: "1,000+ verified members",
      transactions: "$15M+ in vehicle sales",
      satisfaction: "98% member satisfaction",
      growth: "40% MoM growth",
    },
    sections: [
      {
        title: "Project Overview",
        type: "overview",
        content:
          "Veloce represents a paradigm shift in how high-value automobiles are bought and sold online. We created an exclusive marketplace that brings the trust and expertise of traditional luxury car dealerships to the digital realm. The platform caters to serious collectors and investors, offering authenticated vehicles ranging from $125,000 to over $450,000, with a unique feature allowing members to leverage their credit card rewards for transactions.",
      },
      {
        title: "The Challenge",
        type: "problem",
        content:
          "Creating a trusted online marketplace for vehicles worth hundreds of thousands of dollars requires addressing multiple complex challenges: building trust in high-value online transactions, enabling flexible payment options including credit card rewards, and maintaining exclusivity while ensuring sufficient quality inventory.",
      },
      {
        title: "Our Solution",
        type: "solution",
        content:
          "We implemented a rigorous multi-step authentication process including VIN verification, ownership history, and expert inspection. Our platform features a first-of-its-kind integration allowing members to use credit card points for transaction fees, and maintains exclusivity through a member-only access model that ensures serious buyers and platform prestige.",
      },
    ],
    features: [
      {
        icon: "Shield",
        title: "Rigorous Vetting Process",
        description:
          "Multi-step authentication including VIN verification, ownership history, and expert inspection",
      },
      {
        icon: "TrendingUp",
        title: "Points Integration",
        description:
          "First-of-its-kind integration allowing members to use credit card points for transaction fees",
      },
      {
        icon: "Users",
        title: "Member-Only Access",
        description:
          "Exclusive membership model ensuring serious buyers and maintaining platform prestige",
      },
    ],
  },
  {
    id: "vibe-mentorship",
    title: "Vibe Coding Mentorship",
    subtitle: "Build Your App in Hours, Not in Months, or Years!",
    description:
      "4-week intensive AI coding bootcamp empowering non-technical entrepreneurs to build and launch their MVPs using AI-powered development",
    category: "EdTech",
    status: "Active",
    image: "/assets/Vibe Mentorship.png",
    heroImage: "/assets/Vibe Mentorship.png",
    liveUrl: "https://learn-to-ai-code-adults.vercel.app",
    metrics: {
      users: "500+",
      market: "Global",
      launched: "2025",
      rating: "4.8",
      reviews: "500+",
    },
    tags: ["AI Coding", "Bootcamp", "Non-Technical Founders", "MVP Development"],
    timeline: "4 weeks",
    team: "Expert mentors",
    investment: "$399-$4,999",
    technologies: [
      "AI Tools (Cursor, Claude, GPT-4)",
      "Next.js",
      "React",
      "TypeScript",
      "Database Integration",
      "Authentication Systems",
      "Payment Processing",
    ],
    services: [
      "1:1 Expert Mentorship",
      "AI-Powered App Development",
      "MVP Launch Support",
      "Lifetime Course Access",
      "Community Support",
    ],
    sections: [
      {
        title: "Project Overview",
        type: "overview",
        content:
          "Learn to AI Code is a 4-week intensive bootcamp that transforms non-technical entrepreneurs into AI-powered app builders. Our program combines expert mentorship with cutting-edge AI tools to help founders launch their MVPs without traditional coding skills. With over 500 successful graduates and a 4.8 rating, we've proven that anyone can build professional applications using AI. Our launch-focused curriculum ensures students build real apps with databases, authentication, and payment systems - not theoretical projects.",
      },
      {
        title: "The Problem",
        type: "problem",
        content:
          "Non-technical founders face massive barriers when trying to build their app ideas. Traditional development takes months or years and costs tens of thousands of dollars. Learning to code the traditional way requires years of study before building anything meaningful. Existing AI tools are powerful but lack guidance, leaving founders stuck with half-finished projects. The result: brilliant ideas die because founders can't afford developers or spend years learning to code.",
      },
      {
        title: "Our Solution",
        type: "solution",
        content:
          "Learn to AI Code offers three pathways to match different needs and budgets. Our Self-Paced Fundamentals ($399) provides video lessons and community access for independent learners. The Cohort-based Bootcamp ($1,499) delivers 4 weeks of intensive mentorship and hands-on MVP development. Premium 1:1 Mentorship ($4,999) extends to 8-12 weeks with unlimited support and post-launch guidance. All programs include lifetime access, practical curriculum, and our 30-day money-back guarantee.",
      },
    ],
    features: [
      {
        icon: "Brain",
        title: "AI-Powered Development",
        description:
          "Learn to build apps using Cursor, Claude, and GPT-4 - no coding experience required",
      },
      {
        icon: "Clock",
        title: "4-Week Intensive Program",
        description: "From zero to launched MVP in just 4 weeks with expert guidance",
      },
      {
        icon: "DollarSign",
        title: "Flexible Pricing Tiers",
        description: "Options from $399 self-paced to $4,999 premium mentorship",
      },
      {
        icon: "Users",
        title: "1:1 Expert Mentorship",
        description: "Dedicated mentors guide you through building your specific app idea",
      },
      {
        icon: "Zap",
        title: "Launch-Focused Curriculum",
        description: "Build real apps with databases, auth, and payments - no theoretical fluff",
      },
      {
        icon: "CheckCircle2",
        title: "30-Day Money Back Guarantee",
        description:
          "Risk-free enrollment with full refund if not satisfied",
      },
    ],
    results: {
      students: "500+ successful graduates",
      rating: "4.8/5 with 500+ reviews",
      success: "In just 6 weeks, I went from zero technical skills to launching my MVP",
      access: "Lifetime course access included",
    },
  },
  {
    id: "charity-prep",
    title: "Charity Prep",
    subtitle: "Simplifying compliance for UK charities",
    description:
      "How we built a SaaS platform helping 100,000+ charities navigate new regulatory requirements",
    category: "RegTech",
    status: "Active",
    image: "/projects/charity-prep-hero-clean.png",
    heroImage: "/projects/charity-prep-hero-clean.png",
    liveUrl: "https://charity-prep-app.vercel.app",
    metrics: {
      users: "100,000+",
      market: "UK",
      launched: "2025",
    },
    tags: ["SaaS", "Compliance", "Non-profit"],
    timeline: "4 months",
    team: "5 specialists",
    investment: "$150K",
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Vercel",
      "Tailwind CSS",
      "Redis",
      "Stripe",
    ],
    services: [
      "SaaS Platform Development",
      "Compliance Tracking",
      "Automated Reminders",
      "Report Generation",
    ],
    sections: [
      {
        title: "Project Overview",
        type: "overview",
        content:
          "Charity Prep is a purpose-built SaaS platform designed to help registered charities in England and Wales navigate the new compliance requirements introduced by the Charities (Annual Return) Regulations 2024. With over 100,000 charities potentially affected by these changes, we identified a significant opportunity to create a capital-efficient solution that addresses a mandatory regulatory need. Starting from financial years ending on or after January 1, 2025, charities must provide significantly more detailed information in their Annual Returns, including comprehensive data about safeguarding procedures, overseas spending, and fundraising activities.",
      },
      {
        title: "The Problem",
        type: "problem",
        content:
          "The new Charities (Annual Return) Regulations 2024 require charities to track and report significantly more data than ever before: detailed safeguarding information including DBS check tracking and expiry dates, comprehensive overseas spending data with partner organization details, and granular fundraising activity information and compliance records. Using spreadsheets or paper records for this level of detail is error-prone and time-consuming. Non-compliance could result in regulatory action from the Charity Commission.",
      },
      {
        title: "Our Solution",
        type: "solution",
        content:
          "Charity Prep provides a streamlined, purpose-built platform that makes compliance simple. We offer intuitive forms and checklists focused only on new regulatory requirements, year-round data tracking in one secure, organized location, automated reminders for expiring documents and upcoming deadlines, and one-click report generation for Annual Return submission. By focusing exclusively on the new compliance requirements, we've created a tool that's both powerful and simple to use, perfect for resource-constrained charities.",
      },
    ],
    features: [
      {
        icon: "Shield",
        title: "Safeguarding Tracker",
        description:
          "Track DBS checks, training records, and policy updates with automatic expiry alerts",
      },
      {
        icon: "Globe",
        title: "Overseas Spending",
        description:
          "Record partner organizations, project details, and fund transfers for complete transparency",
      },
      {
        icon: "TrendingUp",
        title: "Fundraising Activities",
        description:
          "Log all fundraising events, methods, and compliance checks in one organized system",
      },
      {
        icon: "FileText",
        title: "Smart Forms",
        description:
          "Guided data entry with validation ensures accurate information capture year-round",
      },
      {
        icon: "Calendar",
        title: "Deadline Management",
        description:
          "Never miss a deadline with automated reminders and compliance calendar",
      },
      {
        icon: "CheckCircle2",
        title: "One-Click Reports",
        description:
          "Generate Annual Return data instantly, formatted exactly as the Commission requires",
      },
    ],
  },
  {
    id: "qld-compliance",
    title: "QldCompliance",
    subtitle: "Sexual harassment prevention planning for Queensland businesses",
    description:
      "Building a targeted SaaS solution for 485,000 Queensland businesses facing new workplace safety regulations",
    category: "HR Tech",
    status: "In Development",
    image: "/projects/qld-portfolio.png",
    heroImage: "/projects/qld-portfolio.png",
    metrics: {
      users: "485,000",
      market: "Australia",
      launched: "2025",
      penalty: "A$9,679",
      sam: "105,000",
    },
    tags: ["SaaS", "Compliance", "Workplace Safety"],
    timeline: "6 months",
    team: "4 specialists",
    investment: "$120K",
    technologies: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Stripe",
      "Vercel",
      "PostgreSQL",
    ],
    services: [
      "SaaS Development",
      "Compliance Tools",
      "Risk Assessment",
      "Document Generation",
    ],
    sections: [
      {
        title: "Business Opportunity",
        type: "overview",
        content:
          "QldCompliance is a targeted SaaS platform designed to help Queensland businesses comply with the Work Health and Safety (Sexual Harassment) Amendment Regulation 2024. Starting March 1, 2025, all Queensland businesses must have a documented sexual harassment prevention plan or face penalties up to A$9,679 per breach. With 485,000 affected businesses and a serviceable addressable market of 105,000, we're positioning ourselves to capture this mandatory compliance market with an automated solution priced at A$49-199/month - 90% cheaper than consultants.",
      },
      {
        title: "The Problem",
        type: "problem",
        content:
          "Queensland businesses face a complex new regulatory requirement with severe penalties. The amendment requires comprehensive documentation including risk assessments, prevention measures, complaint procedures, and worker consultation evidence. Current solutions are inadequate: workplace consultants charge A$5,000-15,000 for one-time plans, free government templates lack guidance and automation, and most businesses lack internal expertise to ensure compliance.",
      },
      {
        title: "Our Solution",
        type: "solution",
        content:
          "QldCompliance provides an affordable, automated platform that guides businesses through creating compliant sexual harassment prevention plans. Our smart plan generator uses business-specific inputs to create tailored documentation, the risk assessment engine identifies and addresses workplace-specific hazards, and our compliance calendar ensures ongoing requirements are met. At 90% less cost than consultants, we make compliance accessible to all Queensland businesses.",
      },
    ],
    features: [
      {
        icon: "FileText",
        title: "Smart Plan Generator",
        description:
          "AI-powered wizard creates compliant prevention plans tailored to your business",
      },
      {
        icon: "Shield",
        title: "Risk Assessment Engine",
        description:
          "Identify and document workplace-specific sexual harassment risks",
      },
      {
        icon: "Users",
        title: "Worker Consultation Portal",
        description:
          "Digital evidence of required worker consultation and feedback",
      },
      {
        icon: "AlertTriangle",
        title: "Incident Management",
        description: "Track and manage complaints with compliant procedures",
      },
      {
        icon: "Calendar",
        title: "Compliance Calendar",
        description: "Automated reminders for reviews and updates",
      },
      {
        icon: "BarChart3",
        title: "Analytics Dashboard",
        description:
          "Track compliance status and generate reports for regulators",
      },
    ],
    results: {
      tam: "485K businesses",
      sam: "105K target market",
      arpu: "A$888/year",
      target: "A$10.9M by Year 5",
    },
  },
  {
    id: "farmghg",
    title: "FarmGHG",
    subtitle: "Greenhouse gas emissions tracking for New Zealand farms",
    description:
      "Simple SaaS platform helping 23,000+ NZ farms comply with 2025 emissions reporting requirements under the Climate Change Response Act",
    category: "RegTech",
    status: "In Development",
    image: "/projects/farmghg-portfolio.png",
    heroImage: "/projects/farmghg-portfolio.png",
    liveUrl: "https://thefarmghg.com",
    metrics: {
      users: "23,000+",
      market: "New Zealand",
      launched: "2025",
      subscription: "$1,000+/year",
      target: "$1M+ ARR",
    },
    tags: ["SaaS", "Compliance", "Agriculture", "Climate"],
    timeline: "5 months",
    team: "4 specialists",
    investment: "$180K",
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Stripe",
      "Vercel",
      "Redis",
    ],
    services: [
      "SaaS Development",
      "Emissions Calculation",
      "Compliance Reporting",
      "Data Management",
    ],
    sections: [
      {
        title: "Project Overview",
        type: "overview",
        content:
          "FarmGHG is a purpose-built SaaS platform designed to help New Zealand farmers track and report greenhouse gas emissions in compliance with the Climate Change Response Act. Starting in 2025, approximately 23,000 farms must report their methane and nitrous oxide emissions annually or face significant penalties. Our platform simplifies this complex requirement into an intuitive tool that farmers can use year-round, with automated calculations and compliant reporting at a fraction of the cost of consultants.",
      },
      {
        title: "The Problem",
        type: "problem",
        content:
          "New Zealand farmers face mandatory greenhouse gas reporting starting in 2025, with complex requirements for tracking livestock numbers, fertilizer use, and calculating emissions using government-approved methodologies. The calculations involve multiple factors including animal types, feed systems, and nitrogen applications. Existing solutions are either expensive consultancy services or complex spreadsheets prone to errors. Non-compliance risks penalties and potential loss of operating licenses, creating significant stress for farming operations already managing thin margins.",
      },
      {
        title: "Our Solution",
        type: "solution",
        content:
          "FarmGHG provides a simple, affordable platform that automates emissions tracking and reporting for New Zealand farms. Farmers input their livestock numbers and fertilizer usage throughout the year, and our system automatically calculates emissions using approved methodologies. The platform generates compliant reports ready for submission, tracks payment obligations, and sends reminders for key deadlines. At $1,000+ per year, we're 80% cheaper than consultants while providing year-round support and guaranteed compliance.",
      },
    ],
    features: [
      {
        icon: "Activity",
        title: "Emissions Calculator",
        description:
          "Automated calculations using government-approved methodologies for methane and nitrous oxide",
      },
      {
        icon: "Users",
        title: "Livestock Tracking",
        description:
          "Year-round tracking of animal numbers by type with historical records",
      },
      {
        icon: "Leaf",
        title: "Fertilizer Management",
        description:
          "Track nitrogen fertilizer applications with automatic emissions calculations",
      },
      {
        icon: "FileText",
        title: "Compliance Reports",
        description:
          "Generate submission-ready reports in the exact format required by regulators",
      },
      {
        icon: "Calendar",
        title: "Deadline Reminders",
        description:
          "Automated alerts for reporting deadlines and payment obligations",
      },
      {
        icon: "Shield",
        title: "Data Security",
        description:
          "Bank-level encryption and secure storage of sensitive farm data",
      },
    ],
    results: {
      farms: "23,000 target farms",
      compliance: "100% regulatory compliance",
      savings: "80% cost reduction",
      revenue: "$1M+ projected ARR",
    },
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudiesData.find((study) => study.id === slug);
}

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudiesData;
}
