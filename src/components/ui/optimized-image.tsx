"use client";

import React from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

type OptimizedImageProps = Omit<ImageProps, 'loader'> & {
  fallbackSrc?: string;
};

/**
 * A wrapper around Next.js Image component that works seamlessly in both 
 * development and production (static export) environments.
 */
const OptimizedImage = ({
  src,
  alt,
  className,
  fallbackSrc,
  ...props
}: OptimizedImageProps) => {
  const [isError, setIsError] = React.useState(false);

  // Handle image load errors
  const handleError = () => {
    if (fallbackSrc) {
      setIsError(true);
    }
  };

  return (
    <Image
      src={isError && fallbackSrc ? fallbackSrc : src}
      alt={alt}
      className={cn('transition-opacity duration-300', className)}
      onError={handleError}
      {...props}
    />
  );
};

export default OptimizedImage;