"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, TrendingUp, Globe } from "lucide-react";
import Link from "next/link";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Founder, TechFlow",
    content: "Zaigo helped us validate our idea in 6 weeks and launch with paying customers. Their pressure-testing approach saved us from building features nobody wanted.",
    metric: "5x ROI in 8 months"
  },
  {
    name: "Marcus Rodriguez",
    role: "CEO, HealthBridge",
    content: "The lean global team approach cut our burn rate by 70% while accelerating our time to market. We're now profitable and growing.",
    metric: "Profitable in 4 months"
  },
  {
    name: "Priya Sharma",
    role: "Co-founder, EduLeap",
    content: "Instead of chasing VCs, we built a business that generates cash from day one. Zaigo's methodology completely changed our trajectory.",
    metric: "100+ paying customers"
  }
];

const trustIndicators = [
  { icon: Users, label: "Limited to 12 founders per cohort" },
  { icon: TrendingUp, label: "Average 5x return on exits" },
  { icon: Globe, label: "Global talent network" }
];

export default function SocialProofSection() {
  return (
    <section className="relative bg-gradient-to-b from-background to-muted/30 py-16 sm:py-24">
      {/* Floating CTA for mobile */}
      <div className="fixed bottom-6 left-0 right-0 z-50 px-6 sm:hidden">
        <Link href="/contact" className="block">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-14 rounded-full shadow-xl">
            Apply Now - 3 Spots Left
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {trustIndicators.map((indicator, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium"
            >
              <indicator.icon className="h-4 w-4" />
              {indicator.label}
            </Badge>
          ))}
        </div>

        {/* Section heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Real Founders. Real Results.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our founders build capital-efficient businesses that generate cash flow, not pitch decks.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 sm:p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <Badge variant="default" className="bg-blue-600/10 text-blue-600 border-blue-600/20">
                  {testimonial.metric}
                </Badge>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="border-t pt-4">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA section */}
        <div className="bg-primary/5 rounded-3xl p-8 sm:p-12 text-center border border-primary/10">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Build a Real Business?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our next cohort and validate your idea in 6 weeks. Limited to 12 founders who are serious about building profitable businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-14 px-8 rounded-full text-lg shadow-lg hover:shadow-xl">
                Apply Now - Only 3 Spots Left
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground">
              No equity taken • Pay only when you're profitable
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}