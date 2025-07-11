"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ValueProposition() {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-6 sm:mb-8">
              Innovation thrives everywhere.
              <br />
              Support and resources do not.
            </h2>
            <p className="text-lg sm:text-xl mb-8 sm:mb-10 leading-relaxed">
              We incubate businesses and empower entrepreneurs with global resources across various 
              sectors and geographies, leveraging our expertise, networks, and resources to help them 
              achieve sustainable growth and solve real-world problems.
            </p>
            <div>
              <Link href="/about/ethos">
                <Button className="rounded-full bg-black hover:bg-black/90 text-white">
                  Learn about our ethos
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            {/* World Map with optimized display and proper error handling */}
            <div className="rounded-lg overflow-hidden shadow-sm w-full h-full flex items-center justify-center">
              <div className="relative w-full h-full aspect-[4/3]">
                {imageError ? (
                  // Placeholder shown if image fails to load
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                    <div className="text-center p-8">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="48" 
                        height="48" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="mx-auto mb-4 text-gray-400"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      </svg>
                      <p className="text-sm text-gray-500">World Map Visualization</p>
                    </div>
                  </div>
                ) : (
                  // Primary image
                  <Image
                    src="/images/team/sustainable-world.png"
                    alt="Sustainable world map showing global connection points"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={true}
                    className="object-contain"
                    quality={90}
                    onError={() => setImageError(true)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}