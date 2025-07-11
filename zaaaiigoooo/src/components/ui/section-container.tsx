"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SectionContainerProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article";
  children: React.ReactNode;
  className?: string;
  background?: "default" | "primary" | "secondary" | "light" | "gradient";
  withBorder?: boolean;
}

/**
 * A standardized section container component with consistent spacing and styling
 */
export const SectionContainer: React.FC<SectionContainerProps> = ({
  as: Component = "section",
  children,
  className = "",
  background = "default",
  withBorder = false,
  ...props
}) => {
  // Define background classes based on the background prop
  const backgroundClasses = {
    default: "bg-background",
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    light: "bg-[#f3f3ec]",
    gradient: "gradient-bg",
  };

  return (
    <Component
      className={cn(
        "py-16 sm:py-20",
        backgroundClasses[background],
        withBorder && "border-t border-b border-gray-100",
        className
      )}
      {...props}
    >
      <div className="zaigo-container">{children}</div>
    </Component>
  );
};

export default SectionContainer;