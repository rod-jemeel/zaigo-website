"use client";

import { useState, useEffect, useRef } from 'react';
import Image, { ImageProps } from 'next/image';
import { cleanupUnusedResources } from '@/lib/memory-optimization';

interface MemoryOptimizedImageProps extends Omit<ImageProps, 'onError'> {
  fallback?: string | React.ReactNode;
  showInitials?: boolean;
  lazyUnmount?: boolean; // Whether to completely unmount when out of viewport
  optimizationLevel?: 'low' | 'medium' | 'high'; // Controls aggressiveness of optimization
}

export const MemoryOptimizedImage = ({
  src,
  alt = '',
  fallback,
  showInitials = false,
  lazyUnmount = false,
  optimizationLevel = 'medium',
  className = '',
  priority = false,
  loading,
  ...props
}: MemoryOptimizedImageProps) => {
  const [error, setError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  // Generate initials from the alt text if showInitials is true
  const initials = showInitials && typeof alt === 'string' 
    ? alt.split(' ')
        .map(word => word?.[0] || '')
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : null;

  useEffect(() => {
    if (priority) {
      // If image is priority, always consider it in view
      setIsInView(true);
      setHasBeenInView(true);
      return;
    }

    // Set up intersection observer to detect when image is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
          if (entry.isIntersecting && !hasBeenInView) {
            setHasBeenInView(true);
          }
        });
      },
      {
        rootMargin: '200px', // Load images 200px before they come into view
        threshold: 0.01,
      }
    );

    const currentRef = imageRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [priority, hasBeenInView]);

  // Optimize memory when image goes out of view
  useEffect(() => {
    if (!isInView && hasBeenInView && optimizationLevel !== 'low') {
      // Schedule cleanup when image goes out of view
      const timer = setTimeout(() => {
        cleanupUnusedResources();
      }, optimizationLevel === 'high' ? 500 : 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, hasBeenInView, optimizationLevel]);

  // Prepare loading strategy
  const loadingStrategy = priority ? 'eager' : loading || 'lazy';
  
  // Determine if we should show this image based on visibility and optimization level
  const shouldRenderImage = priority || isInView || hasBeenInView || !lazyUnmount || optimizationLevel === 'low';

  // If there's an error loading the image, show fallback or initials
  if (error) {
    // Special handling for team member photos
    const isPersonImage = typeof alt === 'string' && (
      alt.includes(',') || // Format: "Name, Title"
      (typeof src === 'string' && 
        (src.includes('/team/people/') || 
         src.includes('team/')))
    );
    
    // Create a professional avatar fallback for team members
    const uiAvatarFallback = isPersonImage ? 
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        alt.includes(',') ? alt.split(',')[0] : alt
      )}&background=random&size=300&bold=true&format=svg&rounded=true` :
      undefined;
      
    if (uiAvatarFallback) {
      return (
        <div ref={imageRef} className={className}>
          {shouldRenderImage && (
            <Image
              {...props}
              src={uiAvatarFallback}
              alt={alt}
              className={className}
              loading={loadingStrategy}
              unoptimized={false}
              data-memory-optimized="true"
            />
          )}
        </div>
      );
    } else if (fallback && typeof fallback === 'string') {
      return (
        <div ref={imageRef} className={className}>
          {shouldRenderImage && (
            <Image
              {...props}
              src={fallback}
              alt={alt}
              className={className}
              loading={loadingStrategy}
              // Only use unoptimized for incompatible external URLs
              unoptimized={typeof fallback === 'string' && (
                fallback.startsWith('data:') || 
                (fallback.startsWith('http') && 
                !fallback.includes('ui-avatars.com') && 
                !fallback.includes('placehold.co'))
              )}
              data-memory-optimized="true"
            />
          )}
        </div>
      );
    } else if (fallback) {
      return <div ref={imageRef} className={className}>{fallback}</div>;
    } else if (showInitials) {
      return (
        <div ref={imageRef} className={`flex items-center justify-center bg-muted ${className}`}>
          <span className="text-2xl font-light text-muted-foreground">{initials}</span>
        </div>
      );
    }
    // Default fallback
    return (
      <div ref={imageRef} className={`flex items-center justify-center bg-muted ${className}`}>
        <span className="text-sm text-muted-foreground">Image not available</span>
      </div>
    );
  }

  // If no error, render the image with proper optimization
  // Check if this is likely a team member photo for special handling
  const isTeamMemberPhoto = typeof src === 'string' && 
    (src.includes('/team/people/') || src.includes('/team/'));
  
  // Special object position for team member photos to focus on faces
  const objectPosition = isTeamMemberPhoto && !props.style?.objectPosition 
    ? { objectPosition: '50% 30%' } // Focus more on the face area
    : {};
    
  return (
    <div ref={imageRef} className={className} data-memory-container="true">
      {shouldRenderImage && (
        <Image
          {...props}
          src={src}
          alt={alt}
          className={className}
          style={{
            ...props.style,
            ...objectPosition
          }}
          onError={() => setError(true)}
          loading={loadingStrategy}
          // Only use unoptimized as a last resort for incompatible external URLs
          unoptimized={typeof src === 'string' && (
            src.startsWith('data:') || 
            (src.startsWith('http') && 
            !src.includes('ui-avatars.com') && 
            !src.includes('placehold.co'))
          )}
          data-memory-optimized="true"
        />
      )}
    </div>
  );
};

// Profile image component specifically for user avatars
export const MemoryOptimizedProfileImage = ({ 
  src, 
  alt,
  ...props 
}: Omit<MemoryOptimizedImageProps, 'fallback' | 'showInitials'>) => {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <MemoryOptimizedImage
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        className="object-cover"
        showInitials={true}
        {...props}
      />
    </div>
  );
};

export default MemoryOptimizedImage;