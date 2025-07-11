# Accessibility Guidelines

This document outlines accessibility guidelines and implementations for the Zaigo Labs website components.

## Visually Hidden Content

The `VisuallyHidden` component (`/src/components/ui/visually-hidden.tsx`) follows best practices for making content available to screen readers while hiding it visually:

```tsx
<VisuallyHidden>This text is only for screen readers</VisuallyHidden>
```

## Dialog/Sheet Components

All dialog-based components (including our Sheet component) require:

1. A title for screen reader users (WCAG 2.1 compliance)
2. Keyboard navigation support
3. Proper focus management
4. ARIA attributes

```tsx
// Example usage
<Sheet>
  <SheetTrigger>Open Menu</SheetTrigger>
  <SheetContent
    title="Main Navigation"
    description="Access all website sections"
  >
    {/* Content */}
  </SheetContent>
</Sheet>
```

## Image Accessibility

All images should use the `OptimizedImage` component which includes:

1. Required alt text
2. Optional fallback images
3. Optimized loading

```tsx
<OptimizedImage
  src="/path/to/image.jpg"
  alt="Descriptive text"
  fallbackSrc="/path/to/fallback.jpg"
/>
```

## Color Contrast

Our design system ensures:

- Text meets WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
- Interactive elements have sufficient contrast
- Focus states are clearly visible

## Keyboard Navigation

- All interactive elements are focusable
- Logical tab order is maintained
- Focus trapping in modals
- Skip links for keyboard users

## Testing

Test components with:
- VoiceOver (Mac)
- NVDA or JAWS (Windows)
- Keyboard-only navigation
- Lighthouse accessibility audits