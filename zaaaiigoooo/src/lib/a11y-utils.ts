/**
 * Accessibility utility functions
 * 
 * These utilities help create accessible web experiences by providing
 * standardized functions for common accessibility patterns.
 */

/**
 * Creates an ID string that's unique and stable
 * Important for ARIA relationships like aria-labelledby
 */
export function createAccessibleId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Announce message to screen readers using ARIA live regions
 * 
 * @param message Text to announce
 * @param priority 'assertive' for important messages, 'polite' for non-disruptive
 */
export function announceToScreenReader(
  message: string,
  priority: 'assertive' | 'polite' = 'polite'
): void {
  // Create or find existing announcer element
  let announcer = document.getElementById('a11y-announcer');
  
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.id = 'a11y-announcer';
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('role', 'status');
    announcer.setAttribute('aria-atomic', 'true');
    
    // Hide visually but not from screen readers
    Object.assign(announcer.style, {
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: '0',
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      border: '0'
    });
    
    document.body.appendChild(announcer);
  }
  
  // Set the priority
  announcer.setAttribute('aria-live', priority);
  
  // Update the content for announcement
  announcer.textContent = '';
  
  // Trigger a DOM mutation for screen readers
  setTimeout(() => {
    announcer!.textContent = message;
  }, 50);
}

/**
 * Keyboard event handler for activating elements with Space or Enter
 * This is important for making custom controls keyboard accessible
 */
export function handleA11yKeyDown(
  event: React.KeyboardEvent,
  callback: () => void
): void {
  if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
    event.preventDefault();
    callback();
  }
}

/**
 * Checks if the given element can receive keyboard focus
 */
export function isFocusable(element: HTMLElement): boolean {
  // Known focusable elements
  const focusableElements = [
    'a[href]',
    'button',
    'input',
    'select',
    'textarea',
    '[tabindex]:not([tabindex="-1"])',
    'audio[controls]',
    'video[controls]',
    '[contenteditable]:not([contenteditable="false"])',
  ];
  
  return focusableElements.some(selector => 
    element.matches(selector) && 
    !element.hasAttribute('disabled') && 
    getComputedStyle(element).display !== 'none'
  );
}

/**
 * Set focus to the first focusable element inside a container
 */
export function focusFirstElement(container: HTMLElement): void {
  const focusableElements = container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements.length > 0) {
    focusableElements[0].focus();
  }
}

/**
 * Handle accessibility for toast/notification auto-dismissal
 * Important for users who need more time to read notifications
 */
export function getPausableTimeout(callback: () => void, duration: number): {
  pause: () => void;
  resume: () => void;
  clear: () => void;
} {
  let remaining = duration;
  let timeoutId: number | null = null;
  let startTime: number;
  
  const pause = () => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timeoutId = null;
      remaining -= Date.now() - startTime;
    }
  };
  
  const resume = () => {
    if (!timeoutId) {
      startTime = Date.now();
      timeoutId = window.setTimeout(callback, remaining);
    }
  };
  
  const clear = () => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timeoutId = null;
    }
  };
  
  // Start the timeout
  resume();
  
  return { pause, resume, clear };
}