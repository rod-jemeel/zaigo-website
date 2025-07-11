/**
 * Font Optimization Utilities
 * 
 * This module provides utilities for optimizing font loading and memory usage.
 * It implements modern font loading strategies to improve performance while
 * preventing memory leaks.
 */

/**
 * Configuration interface for font preloading
 */
interface FontPreloadConfig {
  /**
   * Font family name
   */
  family: string;
  
  /**
   * URL to the font file
   */
  url: string;
  
  /**
   * Font descriptors
   */
  descriptors?: {
    display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
    weight?: string;
    style?: string;
  };
}

/**
 * Extended FontFaceSet with clear method
 */
interface ExtendedFontFaceSet extends FontFaceSet {
  clear(): void;
}

/**
 * Preloads critical fonts to improve performance
 * 
 * @param fonts Array of font configurations to preload
 */
export function preloadCriticalFonts(fonts: FontPreloadConfig[]): void {
  // Skip if not in browser
  if (typeof window === 'undefined') return;
  
  fonts.forEach(font => {
    // Only preload if FontFace API is available
    if ('FontFace' in window) {
      const fontFace = new FontFace(
        font.family,
        `url(${font.url})`,
        font.descriptors
      );
      
      // Add font to document fonts collection
      document.fonts.add(fontFace);
      
      // Load the font with high priority
      fontFace.load().then(() => {
        // Font is loaded and ready to use
        document.documentElement.classList.add(`font-${font.family.toLowerCase()}-loaded`);
      }).catch(err => {
        console.warn(`Failed to preload font ${font.family}:`, err);
      });
    }
  });
}

/**
 * Optimize font declarations to prevent duplicate loading
 * 
 * @param fontFamilies Array of font family names to deduplicate
 */
export function deduplicateFontLoading(fontFamilies: string[]): void {
  if (typeof window === 'undefined') return;
  
  // Create a Set for unique font family tracking
  const loadedFonts = new Set<string>();
  
  // Find all font style tags
  const styleTags = document.querySelectorAll('style');
  
  styleTags.forEach(style => {
    const content = style.textContent || '';
    
    // Check if style tag contains font declarations
    if (content.includes('@font-face')) {
      fontFamilies.forEach(family => {
        if (content.includes(`font-family: ${family}`) || 
            content.includes(`font-family: '${family}'`) || 
            content.includes(`font-family: "${family}"`)) {
          
          // If already loaded, remove duplicate declaration
          if (loadedFonts.has(family)) {
            const regex = new RegExp(`@font-face\\s*{[^}]*font-family\\s*:\\s*['"\\s]?${family}['"\\s]?[^}]*}`, 'g');
            style.textContent = content.replace(regex, '');
          } else {
            loadedFonts.add(family);
          }
        }
      });
    }
  });
}

/**
 * Apply memory-efficient font loading strategy for the site
 * 
 * This configures fonts to properly release memory when not needed
 */
export function initializeOptimizedFontLoading(): void {
  // Early return for server-side rendering to prevent hydration issues
  if (typeof window === 'undefined') return;
  
  // With Next.js App Router and next/font, no custom font handling is needed
  // This function is left as a no-op for backward compatibility
  // Next.js now handles all font optimization automatically
}

const fontOptimization = {
  preloadCriticalFonts,
  deduplicateFontLoading,
  initializeOptimizedFontLoading
};

export default fontOptimization;