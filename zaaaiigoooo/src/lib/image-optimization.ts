/**
 * Advanced Image Optimization Utilities
 * 
 * This module provides advanced utilities for optimizing images throughout the application.
 * It extends the basic memory optimization functionality with image-specific optimizations.
 */

import { cleanupUnusedResources } from './memory-optimization';

/**
 * Standard image sizes for different viewport breakpoints
 */
export const standardImageSizes = {
  thumbnail: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  content: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  hero: '(max-width: 768px) 100vw, 50vw',
  fullWidth: '100vw',
  icon: '24px',
};

/**
 * Pre-defined blur data URLs for common background colors
 */
export const blurDataUrls = {
  transparent: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
  light: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  dark: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M/wBAAEGgHjYmCcJAAAAABJRU5ErkJggg==',
};

/**
 * Extended Navigator interface with connection and memory properties
 */
interface NavigatorWithConnectionAndMemory extends Navigator {
  deviceMemory?: number;
  connection?: {
    saveData?: boolean;
    effectiveType?: string;
    addEventListener?: (event: string, callback: () => void) => void;
  };
}

/**
 * Detects if a device is low-end or has limited memory
 */
export function isLowEndDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Use extended navigator type
  const extendedNavigator = navigator as NavigatorWithConnectionAndMemory;
  
  // Check for memory constraints
  const hasLimitedMemory = 'deviceMemory' in navigator && 
    extendedNavigator.deviceMemory !== undefined && 
    extendedNavigator.deviceMemory < 4;
  
  // Check for CPU constraints
  const hasLimitedCPU = 'hardwareConcurrency' in navigator && 
    navigator.hardwareConcurrency < 4;
  
  // Check for data-saver mode
  const isDataSaverEnabled = 'connection' in navigator && 
    extendedNavigator.connection?.saveData === true;
  
  // Check for slow connection
  const hasSlowConnection = 'connection' in navigator && 
    extendedNavigator.connection?.effectiveType !== undefined && 
    (extendedNavigator.connection.effectiveType === 'slow-2g' || 
     extendedNavigator.connection.effectiveType === '2g');
  
  return hasLimitedMemory || hasLimitedCPU || isDataSaverEnabled || hasSlowConnection;
}

/**
 * Optimizes image loading based on network conditions
 */
export function setupNetworkBasedImageOptimization() {
  if (typeof window === 'undefined') return;
  
  try {
    // Set up optimization based on network change
    if ('connection' in navigator) {
      const nav = navigator as NavigatorWithConnectionAndMemory;
      
      // Type-safe event listener
      const connectionHandler = () => {
        const isSlow = nav.connection?.effectiveType === 'slow-2g' || 
                        nav.connection?.effectiveType === '2g';
        
        const isSaveData = nav.connection?.saveData === true;
        
        if (isSlow || isSaveData) {
          // Add a data-attribute to document for CSS to target for low-quality images
          document.documentElement.setAttribute('data-network-limited', 'true');
          
          // Aggressive cleanup of images not in viewport
          cleanupUnusedResources();
        } else {
          document.documentElement.removeAttribute('data-network-limited');
        }
      };
      
      // Add event listener if available
      nav.connection?.addEventListener?.('change', connectionHandler);
    }
  } catch (e) {
    // Safely handle any errors in setup
    console.warn('Network-based image optimization setup failed:', e);
  }
}

/**
 * Creates an optimized object URL from an image URL with reduced quality for preview
 * 
 * @param src The original image URL
 * @param quality The quality level (0-1)
 * @returns Promise that resolves to the optimized object URL
 */
export async function createOptimizedImageUrl(
  src: string, 
  quality: number = 0.6
): Promise<string | null> {
  if (typeof window === 'undefined') return null;
  
  try {
    // Fetch the image
    const response = await fetch(src);
    const blob = await response.blob();
    
    // Create an image element
    const img = new Image();
    img.src = URL.createObjectURL(blob);
    
    // Wait for the image to load
    await new Promise(resolve => {
      img.onload = resolve;
    });
    
    // Create a canvas to resize and compress the image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return null;
    
    // Set dimensions (maintain aspect ratio)
    const maxDimension = Math.min(img.width, img.height, 800);
    const scale = maxDimension / Math.max(img.width, img.height);
    
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;
    
    // Draw and compress
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    // Convert to blob with reduced quality
    const blob2 = await new Promise<Blob | null>(resolve => {
      canvas.toBlob(resolve, 'image/jpeg', quality);
    });
    
    // Clean up original object URL
    URL.revokeObjectURL(img.src);
    
    // Return null if blob creation failed
    if (!blob2) return null;
    
    // Create and return new optimized object URL
    return URL.createObjectURL(blob2);
  } catch (e) {
    console.warn('Image optimization failed:', e);
    return null;
  }
}

const imageOptimization = {
  standardImageSizes,
  blurDataUrls,
  isLowEndDevice,
  setupNetworkBasedImageOptimization,
  createOptimizedImageUrl
};

export default imageOptimization;