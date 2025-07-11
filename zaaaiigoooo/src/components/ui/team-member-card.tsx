"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface TeamMemberProps {
  name: string;
  title: string;
  bio?: string;
  region: string;
  imageSrc?: string;
  hoverImageSrc?: string;
  className?: string;
  imageClassName?: string;
}

/**
 * TeamMemberCard component with professional image display and typography
 * 
 * Features:
 * - Perfect square aspect ratio ensures consistent visual presentation
 * - Multiple fallback strategies: SVG, static images, and UI Avatars
 * - Optimized image loading with proper sizes attributes
 * - Modern hover effects and animations
 */
export const TeamMemberCard: React.FC<TeamMemberProps> = ({
  name,
  title,
  bio,
  region,
  imageSrc,
  hoverImageSrc,
  className = "",
  imageClassName = "",
}) => {
  const [imageError, setImageError] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  
  // Generate initials for fallback
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
    
  // Create avatar fallback URL
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=300&background=random&color=fff&bold=true`;
  
  // Get image source with fallback strategy
  const getImagePath = () => {
    // If explicitly provided, use that
    if (imageSrc) return imageSrc;
    
    // Otherwise, construct from name
    const formattedName = name.toLowerCase().replace(/\s+/g, '-');
    
    // Special cases mapping
    const specialCases: Record<string, string> = {
      'kyle-richless': '/images/team/people/kyle-richless.png',
      'pete-enestrom': '/images/team/people/pete-enestrom.png', 
      'chisana-santiago': '/images/team/people/chisana-santiago.png',
      'isabella-tan': '/images/team/people/isabella-tan.png',
      'mateo-silva': '/images/team/people/mateo-silva.png',
      'charlote-davies': '/images/team/people/charlotte-davies.png',
      // Map new Pakistani names to existing image files
      'ayesha-khan': '/images/team/people/maria-santos.png',
      'zainab-ahmed': '/images/team/people/ana-lim.png',
      'imran-malik': '/images/team/people/paulo-garcia.png',
      'hassan-ali': '/images/team/people/gabriel-mendoza.png',
      'farhan-siddiqui': '/images/team/people/juan-reyes.png'
    };
    
    // Return the special case or fallback to the general PNG path
    const imagePath = specialCases[formattedName] || `/images/team/people/${formattedName}.png`;
    
    // Ensure the path starts with a slash for proper static hosting
    return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  };

  return (
    <Card 
      className={cn(
        "border-none bg-white shadow-sm overflow-hidden h-full",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Perfect square aspect ratio container */}
      <div className="relative w-full pt-[100%] overflow-hidden bg-gray-50">
        <div className="absolute inset-0 flex items-center justify-center">
          {imageError ? (
            // Fallback to avatar or initials
            <div className="w-full h-full relative">
              <Image
                src={avatarUrl}
                alt={`${name}, ${title}`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className={cn(
                  "object-cover transition-transform duration-500",
                  imageClassName
                )}
                unoptimized
              />
            </div>
          ) : (
            // Primary image with hover effect
            <div className="w-full h-full relative">
              {/* Default image */}
              <Image
                src={getImagePath()}
                alt={`${name}, ${title}`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className={cn(
                  "object-cover object-center transition-opacity duration-300",
                  isHovered && hoverImageSrc ? "opacity-0" : "opacity-100",
                  imageClassName
                )}
                style={{ objectPosition: '50% 30%' }} // Better position for faces
                onError={() => {
                  console.log(`Image failed to load for ${name}: ${getImagePath()}`);
                  setImageError(true);
                }}
                // Next.js 13+ prop for better loading behavior
                loading="lazy"
                quality={90}
                // All images should be unoptimized in static export
                unoptimized={true}
              />
              
              {/* Hover image */}
              {hoverImageSrc && (
                <Image
                  src={hoverImageSrc}
                  alt={`${name}, ${title}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className={cn(
                    "object-cover object-center transition-opacity duration-300",
                    isHovered ? "opacity-100" : "opacity-0",
                    imageClassName
                  )}
                  style={{ objectPosition: '50% 30%' }}
                  loading="lazy"
                  quality={90}
                  unoptimized={true}
                />
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Content section with refined spacing and typography */}
      <CardContent className="p-4 pt-3">
        <h3 className="font-medium text-base sm:text-lg leading-tight mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground leading-tight">{title}</p>
        {bio && <p className="text-sm my-2 leading-normal">{bio}</p>}
        <p className="text-xs text-gray-500 mt-1">{region}</p>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;