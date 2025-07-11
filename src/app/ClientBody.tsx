"use client";

import { useEffect } from "react";
import { setupMemoryOptimization } from "@/lib/memory-optimization";
import { initializeOptimizedFontLoading } from "@/lib/font-optimization";
import { setupNetworkBasedImageOptimization, isLowEndDevice } from "@/lib/image-optimization";

/**
 * Extended Navigator interface with connection property
 */
interface NavigatorWithConnection extends Navigator {
  connection?: {
    saveData?: boolean;
    effectiveType?: string;
    addEventListener?: (event: string, callback: () => void) => void;
  };
}

/**
 * ClientBody handles client-side functionality with enhanced accessibility and memory optimization
 * 
 * Features:
 * - Skip to content link for keyboard users
 * - Proper class toggling for JS detection
 * - ARIA live region for screen reader announcements
 * - Health check monitoring
 * - Memory optimization to reduce resource usage
 * - Font optimization for better performance
 * - Image cleanup to free memory
 * - Advanced network-based image optimization
 * - Intelligent device capability detection
 */
export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Client-side tasks
  useEffect(() => {
    // Handle JS class - use classList for more reliable updates
    document.body.classList.remove('no-js');
    document.body.classList.add('js');
    
    // Setup accessibility keyboard handlers
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        // Add .using-keyboard class to body when keyboard navigation begins
        document.body.classList.add('using-keyboard');
        
        // Remove the event listener since we only need to detect first Tab
        window.removeEventListener('keydown', handleTabKey);
        
        // Add mouse event to toggle back when mouse is used
        window.addEventListener('mousedown', () => {
          document.body.classList.remove('using-keyboard');
        }, { once: true });
      }
    };
    
    // Listen for keyboard navigation to enhance focus styles
    window.addEventListener('keydown', handleTabKey);
    
    // Create global screen reader announcer if it doesn't exist
    if (!document.getElementById('a11y-announcer')) {
      const announcer = document.createElement('div');
      announcer.id = 'a11y-announcer';
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.className = 'sr-only';
      document.body.appendChild(announcer);
    }
    
    // Apply advanced memory and image optimizations - wrapped in try/catch to prevent breakage
    try {
      if (typeof window !== 'undefined') {
        // Initialize font optimization to prevent duplicate loading
        initializeOptimizedFontLoading();
        
        // Set up memory cleanup routines for images and resources
        setupMemoryOptimization();
        
        // Set up network-based image optimizations
        setupNetworkBasedImageOptimization();
        
        // Handle device capabilities
        if (isLowEndDevice()) {
          document.documentElement.setAttribute('data-low-end-device', 'true');
          
          // For low-end devices, set a more aggressive cleanup strategy
          const imageNodes = document.querySelectorAll('[data-memory-optimized="true"]');
          imageNodes.forEach(node => {
            if (node instanceof HTMLElement) {
              node.dataset.optimizationLevel = 'high';
            }
          });
        }
        
        // Add data-saver mode if browser supports it
        if ('connection' in navigator) {
          const nav = navigator as NavigatorWithConnection;
          if (nav.connection?.saveData) {
            document.documentElement.setAttribute('data-save-data', 'true');
          }
        }
      }
    } catch (err) {
      // Silent fail - never break the site
      console.warn('Memory optimization initialization failed:', err);
    }
    
    // Simplified health check - run once when the app loads, using requestIdleCallback
    if (process.env.NODE_ENV === 'production' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        fetch('/health-check.html', { 
          method: 'GET',
          cache: 'no-store'
        }).catch(() => {
          if ('performance' in window) {
            performance.mark('failed-health-check');
          }
        });
      }, { timeout: 5000 });
    }
    
    return () => {
      window.removeEventListener('keydown', handleTabKey);
    };
  }, []);

  return (
    <>
      {/* Skip to content link - only visible on keyboard focus */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-black"
      >
        Skip to content
      </a>
      
      {/* Add main-content id to the main element */}
      <div id="main-content" tabIndex={-1}>
        {children}
      </div>
      
      {/* Aria live region for announcements */}
      <div 
        id="a11y-status"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      ></div>
    </>
  );
}