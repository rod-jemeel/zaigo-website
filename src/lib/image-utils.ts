/**
 * Image optimization utilities for Next.js
 * 
 * This file provides helper functions for working with images in a Next.js application.
 * It includes utilities for:
 * - Optimized image loading
 * - Lazy loading strategies
 * - Static vs. dynamic image sourcing
 * - Error handling and fallbacks
 */

import { StaticImageData } from "next/image";

/**
 * Get the appropriate image source for a team member
 * 
 * This function handles the complexity of sourcing different image formats
 * and provides fallback mechanisms for various file types.
 * 
 * @param name The person's name (used to generate the filename)
 * @param customSrc Optional custom image source to override the name-based logic
 * @returns The appropriate image source path
 */
export function getTeamMemberImageSrc(name: string, customSrc?: string): string {
  if (customSrc) return customSrc;
  
  // Format name to kebab-case for consistent filenames
  const formattedName = name.toLowerCase().replace(/\s+/g, '-');
  
  // Known team members with specific file extensions - now all using PNG from people directory
  const specialCases: Record<string, string> = {
    'kyle-richless': 'kyle-richless.png',
    'pete-enestrom': 'pete-enestrom.png',
    'chisana-santiago': 'chisana-santiago.png',
    'isabella-tan': 'isabella-tan.png',
    'mateo-silva': 'mateo-silva.png',
    'charlote-davies': 'charlote-davies.png'
  };
  
  // First check if this user has a special case file extension
  if (specialCases[formattedName]) {
    return `/images/team/people/${specialCases[formattedName]}`;
  }
    
  // Then check for common image formats in order of preference
  const possibleExtensions = ['.png', '.svg', '.jpg', '.jpeg', '.webp'];
  const formattedNameWithoutExtension = formattedName.replace(/\.[^/.]+$/, "");
  
  // For production, we'll just return the most likely path and let the image component handle fallbacks
  return `/images/team/people/${formattedNameWithoutExtension}.png`;
  
  // In development, we would check if files exist, but in production we rely on the fallback system
}

/**
 * Get image dimensions for proper aspect ratio
 * 
 * @param aspectRatio Desired aspect ratio as width/height (e.g., 1 for square, 16/9 for widescreen)
 * @param baseWidth Base width to calculate from
 * @returns An object with width and height
 */
export function getImageDimensions(aspectRatio: number = 1, baseWidth: number = 400) {
  return {
    width: baseWidth,
    height: Math.round(baseWidth / aspectRatio)
  };
}

/**
 * Generate optimal image loading sizes attribute for responsive design
 * 
 * @param breakpoints Custom breakpoints for different viewport sizes
 * @returns A sizes string for Next.js Image component
 */
export function getResponsiveSizes(
  breakpoints = {
    sm: '100vw', 
    md: '50vw', 
    lg: '33vw'
  }
): string {
  return Object.entries(breakpoints)
    .map(([breakpoint, size]) => {
      const width = breakpoint === 'sm' ? 640 : breakpoint === 'md' ? 768 : 1200;
      return `(max-width: ${width}px) ${size}`;
    })
    .join(', ') + ', 25vw';
}

const imageUtils = {
  getTeamMemberImageSrc,
  getImageDimensions,
  getResponsiveSizes
};

export default imageUtils;