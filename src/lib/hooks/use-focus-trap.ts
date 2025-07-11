/**
 * A hook that manages keyboard focus trapping for modal interfaces
 * 
 * This is essential for accessibility as it ensures keyboard users
 * don't unintentionally navigate to background elements when a modal is open.
 */

import { useEffect, useRef } from 'react';

interface UseFocusTrapOptions {
  enabled?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement>;
  returnFocusRef?: React.RefObject<HTMLElement>;
}

/**
 * Hook that traps focus within a container for accessibility
 * 
 * @param options Configuration options for the focus trap
 * @returns Ref to attach to the container element
 */
export function useFocusTrap<T extends HTMLElement = HTMLDivElement>(
  options: UseFocusTrapOptions = {}
) {
  const { enabled = true, initialFocusRef, returnFocusRef } = options;
  const containerRef = useRef<T>(null);
  
  // Store the element that had focus before opening
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    
    // Store the current active element to return focus later
    previousFocusRef.current = document.activeElement as HTMLElement;
    
    const container = containerRef.current;
    if (!container) return;
    
    // Set initial focus
    if (initialFocusRef?.current) {
      initialFocusRef.current.focus();
    } else {
      const focusableElements = container.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
    
    // Handle tab key to cycle through focusable elements
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      const focusableElements = Array.from(
        container.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter(el => !el.hasAttribute('disabled'));
      
      if (focusableElements.length === 0) return;
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    // Save references that we'll need in cleanup
    const returnElement = returnFocusRef?.current;
    const previousElement = previousFocusRef.current;
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      
      // Return focus to the element that had it before
      if (returnElement) {
        returnElement.focus();
      } else if (previousElement) {
        previousElement.focus();
      }
    };
  }, [enabled, initialFocusRef, returnFocusRef]);
  
  return containerRef;
}

export default useFocusTrap;