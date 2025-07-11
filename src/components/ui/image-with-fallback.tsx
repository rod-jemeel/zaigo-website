"use client";

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallback?: string;
  fallbackComponent?: React.ReactNode;
  showInitials?: boolean;
}

/**
 * Enhanced image component with robust fallback handling
 * 
 * This component provides several layers of fallback strategies:
 * 1. First tries to load the specified image
 * 2. If that fails, tries a specified fallback image URL
 * 3. If that fails or isn't provided, shows initials for people
 * 4. Lastly, shows a generic "Image not available" message
 */
export const ImageWithFallback = ({
  src,
  alt = '',
  fallback,
  fallbackComponent,
  showInitials = false,
  className = '',
  ...props
}: ImageWithFallbackProps) => {
  const [error, setError] = useState(false);

  // Generate initials from the alt text if showInitials is true
  const initials = showInitials && typeof alt === 'string' 
    ? alt.split(' ')
        .map(word => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : null;

  // If there's an error loading the image, show fallback or initials
  if (error) {
    if (fallback) {
      return (
        <Image
          {...props}
          src={fallback}
          alt={alt}
          className={className}
          // Only use unoptimized for incompatible external URLs
          unoptimized={typeof fallback === 'string' && (
            fallback.startsWith('data:') || 
            (fallback.startsWith('http') && 
             !fallback.includes('ui-avatars.com') && 
             !fallback.includes('placehold.co'))
          )}
        />
      );
    } else if (fallbackComponent) {
      return <>{fallbackComponent}</>;
    } else if (showInitials) {
      return (
        <div className={`flex items-center justify-center bg-muted ${className}`}>
          <span className="text-2xl font-light text-muted-foreground">{initials}</span>
        </div>
      );
    }
    // Default fallback
    return (
      <div className={`flex items-center justify-center bg-muted ${className}`}>
        <span className="text-sm text-muted-foreground">Image not available</span>
      </div>
    );
  }

  // Check if this is an SVG, which may need special handling
  const isSvg = typeof src === 'string' && src.toLowerCase().endsWith('.svg');
  
  // For SVGs, which sometimes have issues with Next.js Image component
  if (isSvg) {
    return (
      <Image
        {...props}
        src={src}
        alt={alt}
        className={className}
        onError={() => setError(true)}
        unoptimized={true} // SVGs are already optimized
      />
    );
  }
  
  // For all other images
  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
};

/**
 * Profile image component specifically for user avatars with smart fallbacks
 * 
 * This component is optimized for displaying profile photos with:
 * - Smart object positioning for headshots (focusing on faces)
 * - Multiple fallback strategies (avatar service, initials)
 * - Proper handling of SVG and other image formats 
 */
export const ProfileImage = ({ 
  src, 
  alt,
  className,
  ...props 
}: Omit<ImageWithFallbackProps, 'fallback' | 'showInitials'>) => {
  // Generate UI Avatars URL as fallback
  const name = typeof alt === 'string' ? alt.split(',')[0] : alt;
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(String(name))}&background=random&size=300&bold=true&format=svg`;

  // Verify the image path exists or provide an SVG placeholder
  // By checking both the src path and alt text format
  const isTeamMember = typeof src === 'string' && 
    (src.includes('/team/people/') || src.includes('/team/')) ||
    (typeof alt === 'string' && alt.includes(','));
    
  // Adjust object positioning for better face framing
  const baseStyle = isTeamMember 
    ? { objectPosition: '50% 30%' } // Better position for faces
    : {};
    
  return (
    <div className="relative w-full h-full overflow-hidden">
      <ImageWithFallback
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        className={cn(
          "object-cover object-center",
          isTeamMember && "rounded-t-lg", // Rounded top for team members
          className
        )}
        style={baseStyle}
        showInitials={true}
        fallback={avatarUrl}
        {...props}
      />
    </div>
  );
};

export default ImageWithFallback;