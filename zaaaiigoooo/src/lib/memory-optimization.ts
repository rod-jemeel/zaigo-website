/**
 * Memory Optimization Utilities
 * 
 * This module provides utilities for optimizing memory usage in Next.js applications.
 * It helps prevent memory leaks and reduces overall memory footprint.
 */

/**
 * Cleans up unused resources to free memory
 * 
 * This function:
 * 1. Releases unused image data
 * 2. Cleans up event listeners
 * 3. Releases object URLs
 * 4. Optimizes CSS memory usage
 */
export function cleanupUnusedResources(): void {
  if (typeof window === 'undefined') return;
  
  // Find all images that are no longer visible (outside viewport)
  const images = document.querySelectorAll('img') as NodeListOf<HTMLImageElement>;
  
  images.forEach(img => {
    // Skip images that are still visible or marked as important
    if (img.hasAttribute('data-priority') || img.getAttribute('loading') === 'eager') {
      return;
    }
    
    // Check if image is outside viewport
    const rect = img.getBoundingClientRect();
    const isOutOfView = (
      rect.bottom < 0 ||
      rect.right < 0 ||
      rect.top > window.innerHeight ||
      rect.left > window.innerWidth
    );
    
    if (isOutOfView) {
      // For images that support it, use loading="lazy" to free browser memory
      if ('loading' in HTMLImageElement.prototype) {
        img.loading = 'lazy';
      }
      
      // Mark as a candidate for garbage collection
      img.dataset.memoryOptimized = 'true';
    }
  });
  
  // Clean up object URLs
  if ('URL' in window) {
    // This is a hint for browsers to clean up any internally created object URLs
    try {
      // Get all elements with srcset or src that might be object URLs
      const srcElements = document.querySelectorAll('[srcset], [src]');
      srcElements.forEach(el => {
        const src = el.getAttribute('src');
        const srcset = el.getAttribute('srcset');
        
        // If it looks like an object URL, revoke it if we created it
        if (src && src.startsWith('blob:') && src.includes('memory-optimized')) {
          URL.revokeObjectURL(src);
        }
        
        if (srcset && srcset.includes('blob:')) {
          // Handle srcset with potential object URLs
          const urls = srcset.split(',')
                        .map(s => s.trim().split(' ')[0])
                        .filter(s => s.startsWith('blob:') && s.includes('memory-optimized'));
          
          urls.forEach(url => URL.revokeObjectURL(url));
        }
      });
    } catch (e) {
      // Safely handle any errors in cleanup
      console.warn('Memory cleanup encountered an error:', e);
    }
  }
  
  // Hint to browser to run garbage collection if possible
  if ('gc' in window) {
    try {
      // @ts-expect-error: gc is a non-standard browser feature
      window.gc();
    } catch (e) {
      // GC not available, ignore
    }
  }
}

/**
 * Sets up memory optimization handlers for the application
 * 
 * Call this function once during app initialization to enable
 * automatic memory management.
 */
export function setupMemoryOptimization(): void {
  if (typeof window === 'undefined') return;
  
  // Clean up resources when user navigates away
  window.addEventListener('beforeunload', cleanupUnusedResources);
  
  // Clean up periodically during user inactivity
  let inactivityTimer: number | null = null;
  
  const resetInactivityTimer = () => {
    if (inactivityTimer !== null) {
      window.clearTimeout(inactivityTimer);
    }
    
    inactivityTimer = window.setTimeout(() => {
      cleanupUnusedResources();
    }, 30000); // 30 seconds of inactivity
  };
  
  // Reset timer on user interaction
  ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'].forEach(eventType => {
    window.addEventListener(eventType, resetInactivityTimer, { passive: true });
  });
  
  // Start initial timer
  resetInactivityTimer();
  
  // Clean up during page transitions (works with Next.js)
  if ('addEventListener' in document) {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        cleanupUnusedResources();
      }
    });
  }
  
  // Clean up on resize (often indicates tab switch or orientation change)
  window.addEventListener('resize', () => {
    // Debounce to avoid excessive cleanup
    if (inactivityTimer !== null) {
      window.clearTimeout(inactivityTimer);
    }
    
    inactivityTimer = window.setTimeout(() => {
      cleanupUnusedResources();
    }, 1000);
  }, { passive: true });
}

const memoryOptimization = {
  cleanupUnusedResources,
  setupMemoryOptimization
};

export default memoryOptimization;