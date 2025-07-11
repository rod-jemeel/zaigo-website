"use client";

import React from "react";

interface VisuallyHiddenProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
}

/**
 * Accessibility component that hides content visually but keeps it accessible to screen readers
 * 
 * This component follows best practices for visually hidden content:
 * 1. Uses proper positioning to remove from visual flow
 * 2. Maintains proper focus handling for keyboard users
 * 3. Avoids 'display: none' which would hide from all users including screen readers
 * 4. Supports custom elements through the 'as' prop
 */
const VisuallyHidden: React.FC<VisuallyHiddenProps> = ({
  children,
  as: Component = "span",
  className = "",
  ...props
}) => {
  const ElementComponent = Component as any;
  return (
    <ElementComponent
      className={`absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0 ${className}`}
      style={{
        clip: "rect(0, 0, 0, 0)",
        clipPath: "inset(50%)",
        whiteSpace: "nowrap",
      }}
      {...props}
    >
      {children}
    </ElementComponent>
  );
};

export { VisuallyHidden };