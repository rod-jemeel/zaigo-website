"use client";

import React, { useState } from 'react';
import { MemoryOptimizedImage } from './memory-optimized-image';
import { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface InvertedImageProps extends Omit<ImageProps, 'className' | 'onError'> {
  className?: string;
  imageClassName?: string;
  invertColors?: boolean;
  fallbackSrc?: string;
  optimizationLevel?: 'low' | 'medium' | 'high';
}

/**
 * An enhanced image component with color inversion capabilities and memory optimization
 * 
 * Features:
 * - Color inversion for dark backgrounds (white logos)
 * - Smooth loading transitions
 * - Fallback image support
 * - Accessibility optimizations
 * - Memory optimization with IntersectionObserver
 * - Intelligent resource cleanup
 * 
 * @param invertColors Whether to invert the image colors (white-on-dark backgrounds)
 * @param fallbackSrc Optional fallback image source if the main one fails
 * @param optimizationLevel Controls how aggressively memory is optimized
 */
const InvertedImage: React.FC<InvertedImageProps> = ({
  src,
  alt,
  className = "",
  imageClassName = "",
  invertColors = false,
  fallbackSrc,
  optimizationLevel = 'medium',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className={cn("relative", className)}>
      <MemoryOptimizedImage
        src={src}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          invertColors && "filter invert brightness-0",
          imageClassName
        )}
        onLoad={() => setIsLoaded(true)}
        fallback={fallbackSrc}
        optimizationLevel={optimizationLevel}
        lazyUnmount={false} // Logo usually needs to stay loaded
        {...props}
      />
    </div>
  );
};

export default InvertedImage;