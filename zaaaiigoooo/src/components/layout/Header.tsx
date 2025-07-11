"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import OptimizedImage from "@/components/ui/optimized-image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Users,
  Heart,
  Calendar,
  Briefcase,
  Mail,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  FileText,
  Phone,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

// Navigation item type definitions
interface NavLink {
  name: string;
  href?: string;
  description?: string;
  icon?: React.ReactNode;
}

interface NavSection {
  section: string;
  links: NavLink[];
}

// Desktop navigation items (without Contact)
const desktopNavLinks: NavSection[] = [
  {
    section: "Our Team",
    links: [
      {
        name: "Our Team",
        href: "/about/people",
        description: "Meet the people behind Zaigo Labs",
        icon: <Users className="h-4 w-4" />,
      },
    ],
  },
  {
    section: "About",
    links: [
      {
        name: "About",
        href: "/about/ethos",
        description: "Learn about our approach and values",
        icon: <Heart className="h-4 w-4" />,
      },
    ],
  },
  {
    section: "Case Studies",
    links: [
      {
        name: "View Case Studies",
        href: "/case-studies",
        description: "Explore our portfolio of successful ventures",
        icon: <Briefcase className="h-4 w-4" />,
      },
    ],
  },
  {
    section: "Community",
    links: [
      {
        name: "Upcoming Events",
        href: "/community/events",
        description: "Join us at our next gathering",
        icon: <Calendar className="h-4 w-4" />,
      },
    ],
  },
  {
    section: "Careers",
    links: [
      {
        name: "Open Positions",
        href: "/careers",
        description: "Explore opportunities to join our team",
        icon: <Briefcase className="h-4 w-4" />,
      },
    ],
  },
];

// Mobile navigation items (includes Contact)
const mobileNavLinks: NavSection[] = [
  ...desktopNavLinks,
  {
    section: "Contact",
    links: [
      {
        name: "Get in Touch",
        href: "/contact",
        description: "Reach out to us for inquiries",
        icon: <Mail className="h-4 w-4" />,
      },
    ],
  },
];

const Header: React.FC = () => {
  const pathname = usePathname();
  
  // SIMPLE LOGIC: Check if we're on a page with video background
  // Handle potential trailing slashes or undefined pathname
  const normalizedPath = pathname?.replace(/\/$/, ''); // Remove trailing slash if present
  const isHomePage = normalizedPath === "" || normalizedPath === "/";
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // Start with header hidden on homepage
  const [isHeroLoading, setIsHeroLoading] = useState(isHomePage);
  const isVideoPage = normalizedPath === "" || normalizedPath === "/" || normalizedPath === "/case-studies" || normalizedPath === "/community/events" || normalizedPath === "/careers" || normalizedPath === "/about/people" || normalizedPath === "/about/ethos";
  
  
  // State for dynamic background changes (only for scroll behavior)
  const [isDarkBackground, setIsDarkBackground] = useState(isVideoPage);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Update state when pathname changes
    setIsDarkBackground(isVideoPage);
  }, [isVideoPage]);

  // Watch for hero loading state
  useEffect(() => {
    const checkHeroLoading = () => {
      setIsHeroLoading(document.body.classList.contains('hero-loading'));
    };
    
    // Check initial state
    checkHeroLoading();
    
    // Watch for changes using MutationObserver
    const observer = new MutationObserver(checkHeroLoading);
    observer.observe(document.body, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);

      // Video backgrounds need white navbar until scrolled past hero
      if (isVideoPage) {
        // Both pages have min-h-screen hero sections, so use viewport height
        const heroHeight = window.innerHeight - 100;
        setIsDarkBackground(window.scrollY < heroHeight);
      } else {
        setIsDarkBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVideoPage]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section],
    );
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setExpandedSections([]);
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-700",
        isHeroLoading ? "opacity-0 pointer-events-none -translate-y-full" : "opacity-100 translate-y-0",
        (isVideoPage && (!mounted || isDarkBackground))
          ? "bg-transparent" 
          : isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent",
      )}
    >
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center gap-8">
            <div className="flex-shrink-0">
              <Link href="/" className="relative block h-10">
                <Image
                  src={(isVideoPage && (!mounted || isDarkBackground)) ? "/assets/zaigo-logo-white.png" : "/assets/zaigo-logo-black.png"}
                  alt="Zaigo logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation - Shadcn Navigation Menu */}
            {!mounted ? (
              // Server-side fallback to prevent layout shift
              <nav className="hidden lg:flex items-center space-x-1">
                {desktopNavLinks.map((section) => (
                  <div
                    key={section.section}
                    className={cn(
                      "px-4 py-2 text-sm font-medium transition-colors duration-300",
                      isVideoPage ? "text-white" : "text-gray-700",
                    )}
                  >
                    {section.section}
                  </div>
                ))}
              </nav>
            ) : (
              <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList>
                  {desktopNavLinks.map((section) => {
                    const hasMultipleLinks = section.links.length > 1;

                    if (!hasMultipleLinks) {
                      // Single link - direct navigation
                      return (
                        <NavigationMenuItem key={section.section}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={section.links[0].href || "#"}
                              className={cn(
                                "font-normal text-sm px-3 py-2 transition-colors",
                                (isVideoPage && isDarkBackground)
                                  ? "!text-white hover:!text-white/80"
                                  : "!text-gray-700 hover:!text-primary",
                              )}
                            >
                              {section.section}
                            </Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      );
                    }

                    // Multiple links - dropdown
                    return (
                      <NavigationMenuItem key={section.section}>
                        <NavigationMenuTrigger
                          className={cn(
                            "font-normal bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent transition-colors",
                            (isVideoPage && isDarkBackground)
                              ? "!text-white hover:!text-white/80 [&>svg]:!text-white"
                              : "!text-gray-700 hover:!text-primary [&>svg]:!text-gray-700",
                          )}
                        >
                          {section.section}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="w-[400px] p-4">
                            <div className="space-y-2">
                              {section.links.map((link) => (
                                <NavigationMenuLink key={link.name} asChild>
                                  <Link
                                    href={link.href || "#"}
                                    className="flex gap-3 p-3 rounded-md hover:bg-accent transition-colors cursor-pointer"
                                  >
                                    <div className="flex-shrink-0 text-muted-foreground w-8 h-8 flex items-center justify-center bg-muted/50 rounded">
                                      {link.icon}
                                    </div>
                                    <div className="flex-1">
                                      <div className="text-sm font-medium text-gray-900 mb-1">
                                        {link.name}
                                      </div>
                                      {link.description && (
                                        <p className="text-sm text-muted-foreground">
                                          {link.description}
                                        </p>
                                      )}
                                    </div>
                                  </Link>
                                </NavigationMenuLink>
                              ))}
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Contact Button - Desktop */}
            <Link href="/contact" className="hidden lg:block">
              <Button
                className={cn(
                  "rounded-full px-6 transition-all duration-300",
                  (isVideoPage && (!mounted || isDarkBackground))
                    ? "bg-[#089862] hover:bg-[#067a4f] text-white border-0 shadow-lg hover:shadow-xl hover:scale-105"
                    : "bg-[#089862] hover:bg-[#067a4f] text-white border-0",
                )}
              >
                Contact
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "lg:hidden p-2 transition-all duration-300",
                (isVideoPage && (!mounted || isDarkBackground))
                  ? "text-white hover:opacity-80"
                  : "text-gray-700 hover:text-primary",
              )}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - CSS transform slide */}
        <div
          className={cn(
            "lg:hidden fixed top-0 right-0 bottom-0 z-50 w-full sm:w-96 bg-white shadow-xl transform transition-transform duration-300 overflow-y-auto h-screen",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          {/* Mobile menu header */}
          <div className="flex items-center justify-between p-6 border-b">
            {/* Zaigo Logo */}
            <Link href="/" onClick={closeMobileMenu} className="relative block h-10">
              <Image
                src="/assets/zaigo-logo-black.png"
                alt="Zaigo logo"
                width={120}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>
            
            {/* Close button */}
            <button
              onClick={closeMobileMenu}
              className="p-2 text-gray-700 hover:text-primary hover:bg-accent rounded-md transition-colors flex items-center justify-center"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile menu content */}
          <div className="p-6">
            <nav className="space-y-4">
              {mobileNavLinks.map((section) => {
                const isExpanded = expandedSections.includes(section.section);
                const hasMultipleLinks = section.links.length > 1;

                return (
                  <div
                    key={section.section}
                    className="border-b pb-4 last:border-b-0"
                  >
                    {hasMultipleLinks ? (
                      <>
                        <button
                          onClick={() => toggleSection(section.section)}
                          className="flex items-center justify-between w-full text-left py-2 text-lg font-medium text-gray-900 hover:text-primary transition-colors"
                        >
                          {section.section}
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </button>
                        <div
                          className={cn(
                            "overflow-hidden transition-all duration-300",
                            isExpanded ? "max-h-96 mt-2" : "max-h-0",
                          )}
                        >
                          <div className="space-y-2 pl-4">
                            {section.links.map((link) => (
                              <Link
                                key={link.name}
                                href={link.href || "#"}
                                onClick={closeMobileMenu}
                                className="flex gap-3 py-3 px-2 rounded-md hover:bg-accent transition-colors"
                              >
                                <div className="flex-shrink-0 text-muted-foreground w-8 h-8 flex items-center justify-center bg-muted/50 rounded">
                                  {link.icon}
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium text-gray-900 mb-1">
                                    {link.name}
                                  </div>
                                  {link.description && (
                                    <p className="text-sm text-muted-foreground">
                                      {link.description}
                                    </p>
                                  )}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <Link
                        href={section.links[0].href || "#"}
                        onClick={closeMobileMenu}
                        className="flex items-center py-2 text-lg font-medium text-gray-900 hover:text-primary transition-colors"
                      >
                        {section.section}
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-40"
            onClick={closeMobileMenu}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
