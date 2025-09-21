"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Moon, Sun, Rocket } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface NavigationProps {
  onAuthClick: (mode: "login" | "signup") => void;
}

export function Navigation({ onAuthClick }: NavigationProps) {
  const [activeSection, setActiveSection] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Easter egg state
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [isEasterEggActive, setIsEasterEggActive] = useState(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navItems = useMemo(
    () => [
      { name: "🏠 Features", href: "#features" },
      { name: "⚡ How it Works", href: "#how-it-works" },
      { name: "👥 Community", href: "#community" },
      { name: "🛟 Support", href: "#support" },
    ],
    []
  );

  // Theme detection
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    setIsDark(theme === "dark");
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  // Active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1));
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(current || "");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleParallaxScroll = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const targetPosition = targetElement.offsetTop - 80;
      smoothScrollToWithParallax(targetPosition, 800);
    }
  };

  const smoothScrollToWithParallax = (
    targetPosition: number,
    duration: number
  ) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const ease = easeInOutCubic(progress);
      const currentPosition = startPosition + distance * ease;

      window.scrollTo(0, currentPosition);

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  // Easter egg click handler
  const handleLogoClick = () => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);

    // Clear existing timeout
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    if (newCount === 21) {
      // Activate Easter egg!
      setIsEasterEggActive(true);
      setLogoClickCount(0);

      // Show the discovery message
      toast("🎉 Wow you discovered me!", {
        description: "You found the secret Easter egg! ✨",
        duration: 4000,
        className: "easter-egg-toast",
        style: {
          background:
            "linear-gradient(135deg, oklch(var(--primary) / 0.9), oklch(var(--accent) / 0.9))",
          color: "oklch(var(--primary-foreground))",
          border: "1px solid oklch(var(--primary) / 0.3)",
          boxShadow:
            "0 0 30px oklch(var(--primary) / 0.4), 0 0 60px oklch(var(--accent) / 0.2)",
        },
      });

      // Deactivate after 5 seconds
      setTimeout(() => {
        setIsEasterEggActive(false);
      }, 5000);
    } else {
      // Reset click count after 3 seconds of inactivity
      clickTimeoutRef.current = setTimeout(() => {
        setLogoClickCount(0);
      }, 3000);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer select-none"
            onClick={handleLogoClick}
          >
            <div
              id="navig-logo-n"
              className={`w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center transition-all duration-300 ${
                isEasterEggActive ? "easter-egg-glow" : "hover:scale-105"
              }`}
            >
              <span className="text-primary-foreground font-bold text-lg">
                N
              </span>
            </div>
            <span
              className={`text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent transition-all duration-300 ${
                isEasterEggActive ? "animate-pulse" : ""
              }`}
            >
              Navig AI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleParallaxScroll(e, item.href)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "text-primary bg-muted shadow-sm border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-10 h-10 p-0 hover:bg-muted hover:text-primary transition-all duration-300"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onAuthClick("login")}
              className="border-border/50 hover:border-primary/50 hover:bg-muted transition-all duration-300"
            >
              🔐 Login
            </Button>

            <Button
              size="sm"
              onClick={() => onAuthClick("signup")}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Rocket className="w-4 h-4 mr-2" />
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(true)}
              className="w-10 h-10 p-0 hover:bg-muted hover:text-primary transition-all duration-300"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Sliding Menu from Right */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Sliding Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.4,
              }}
              className="fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] shadow-2xl z-50 md:hidden"
              style={{
                backgroundColor: "var(--background)",
                borderLeft: "1px solid var(--border)",
              }}
            >
              {/* Menu Header */}
              <div
                className="flex items-center justify-between p-6 border-b border-border"
                style={{ backgroundColor: "var(--background)" }}
              >
                <div
                  className="flex items-center space-x-2 cursor-pointer select-none"
                  onClick={handleLogoClick}
                >
                  <div
                    className={`w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center transition-all duration-300 ${
                      isEasterEggActive ? "easter-egg-glow" : "hover:scale-105"
                    }`}
                  >
                    <span className="text-primary-foreground font-bold">N</span>
                  </div>
                  <span
                    className={`text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent transition-all duration-300 ${
                      isEasterEggActive ? "animate-pulse" : ""
                    }`}
                  >
                    Navig AI
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 p-0 hover:bg-muted hover:text-primary rounded-full transition-all duration-300"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Menu Content */}
              <div
                className="p-6 space-y-8"
                style={{ backgroundColor: "var(--background)" }}
              >
                {/* Navigation Links */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Navigation
                  </h3>
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.href.substring(1);
                    return (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={(e) => {
                          handleParallaxScroll(e, item.href);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`block text-lg font-medium transition-all duration-300 px-4 py-3 rounded-xl cursor-pointer ${
                          isActive
                            ? "text-primary bg-muted border-l-4 border-primary shadow-sm"
                            : "text-foreground hover:text-primary hover:bg-muted/50"
                        }`}
                      >
                        {item.name}
                      </motion.a>
                    );
                  })}
                </div>

                {/* Appearance */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Appearance
                  </h3>
                  <Button
                    variant="outline"
                    onClick={toggleTheme}
                    className="w-full justify-start text-left h-12 border-border/50 hover:border-primary/50 hover:bg-muted transition-all duration-300"
                  >
                    {isDark ? (
                      <Sun className="w-5 h-5 mr-3" />
                    ) : (
                      <Moon className="w-5 h-5 mr-3" />
                    )}
                    {isDark ? "Light Mode" : "Dark Mode"}
                  </Button>
                </div>

                {/* Account */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Account
                  </h3>
                  <Button
                    variant="outline"
                    onClick={() => {
                      onAuthClick("login");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start text-left h-12 border-border/50 hover:border-primary/50 hover:bg-muted transition-all duration-300"
                  >
                    🔐 Login
                  </Button>
                  <Button
                    onClick={() => {
                      onAuthClick("signup");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Rocket className="w-4 h-4 mr-2" />
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
