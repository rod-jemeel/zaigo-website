"use client";

import React, { useState } from "react";
import Link from "next/link";
import OptimizedImage from "@/components/ui/optimized-image";
import InvertedImage from "@/components/ui/inverted-image";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface FooterLink {
  name: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink extends FooterLink {
  icon: React.ReactNode;
}

const footerLinks: FooterSection[] = [
  {
    title: "CONTACT",
    links: [
      { name: "GET IN TOUCH", href: "/contact" },
    ],
  },
  {
    title: "CAREERS",
    links: [
      { name: "JOIN OUR TEAM", href: "/careers" },
    ],
  },
  {
    title: "COMMUNITY",
    links: [
      { name: "EVENTS", href: "/community/events" },
    ],
  },
  {
    title: "ABOUT",
    links: [
      { name: "PEOPLE", href: "/about/people" },
      { name: "ETHOS", href: "/about/ethos" },
    ],
  },
];

const legalLinks: FooterLink[] = [
  { name: "PRIVACY POLICY", href: "/privacy-policy" },
];

// Only keeping X and LinkedIn active, Facebook and Instagram are hidden for now
const socialLinks: SocialLink[] = [
  { 
    name: "X", 
    href: "https://x.com/KyleRichless", 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <title>X (Twitter)</title>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
      </svg>
    ) 
  },
  { 
    name: "LinkedIn", 
    href: "https://www.linkedin.com/in/kylerichless", 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <title>LinkedIn</title>
        <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ) 
  },
  
  // Facebook and Instagram are temporarily hidden
  /* 
  { 
    name: "Facebook", 
    href: "https://www.facebook.com/ZaigoLabs", 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <title>Facebook</title>
        <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 011-1h3v-4h-3a5 5 0 00-5 5v2.01h-2l-.396 3.98h2.396v8.01z" />
      </svg>
    ) 
  },
  { 
    name: "Instagram", 
    href: "https://www.instagram.com/zaigolabs", 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <title>Instagram</title>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ) 
  },
  */
];

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setEmail("");
    setIsSubmitting(false);
  };
  
  return (
    <footer className={`relative bg-black text-white overflow-hidden min-h-[600px] ${className}`}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-bottom bg-no-repeat"
        style={{ backgroundImage: 'url(/images/footer-3.png)' }}
      />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-transparent" />
      {/* Extra darkness at top for better morphing effect */}
      <div className="absolute inset-x-0 top-0 h-1/6 bg-gradient-to-b from-black via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-grid-white/[0.01]" />
      
      {/* Floating orbs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute top-20 left-20 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"
      />
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="zaigo-container py-24 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Company Info - Left */}
            <div className="lg:col-span-5">
              <Link href="/" className="inline-block mb-8">
                <InvertedImage
                  src="/assets/zaigo-logo.png"
                  alt="Zaigo logo"
                  width={200}
                  height={65}
                  className="h-14 w-auto"
                  imageClassName="h-full w-auto"
                  priority
                  invertColors={true}
                  fallbackSrc="/assets/zaigo-logo.png"
                />
              </Link>
              
              <p className="text-lg text-white/90 max-w-md mb-12">
                High Velocity AI Business Incubator
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    aria-label={`Visit Zaigo Labs on ${social.name}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links - Middle */}
            <div className="lg:col-span-4">
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {footerLinks.map((section) => (
                  <div key={section.title}>
                    <h4 className="text-sm font-semibold text-white mb-3">{section.title}</h4>
                    {section.links.length > 0 && (
                      <ul className="space-y-2">
                        {section.links.map((link) => (
                          <li key={link.name}>
                            <Link
                              href={link.href}
                              className="text-sm text-white/80 hover:text-green-400 transition-colors inline-flex items-center group"
                            >
                              <span className="group-hover:translate-x-1 transition-transform duration-300">
                                {link.name}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info - Right */}
            <div className="lg:col-span-3">
              <h3 className="text-lg font-semibold mb-6">
                The Peak
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm text-white/80">Currently building in stealth</span>
                </div>
                <Link href="/contact" className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors group">
                  <span className="text-sm font-medium">Get in touch</span>
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-20 pt-12 border-t border-white/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-sm text-white/80">
                © {currentYear} Zaigo Labs. Built with determination in the mountains.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                {legalLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/terms"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  TERMS OF SERVICE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
