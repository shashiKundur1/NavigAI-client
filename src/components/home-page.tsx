"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { AuthModal } from "@/components/auth-modal";
import { RocketAnimation } from "@/components/rocket-animation";
import { RoadmapGenerator } from "@/components/roadmap-generator";
import { Toaster } from "@/components/ui/sonner";

interface AuthModalState {
    isOpen: boolean;
    mode: "login" | "signup";
}

export function HomePage() {
    const [authModal, setAuthModal] = useState<AuthModalState>({
        isOpen: false,
        mode: "login",
    });

    const [isIntegrating, setIsIntegrating] = useState(false);
  const [showRoadmapGenerator, setShowRoadmapGenerator] = useState(false);

    // Optimized parallax effect for low-end devices
    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            // const rate = scrolled * -0.5;

            // Only apply parallax to elements that support it efficiently
            const parallaxElements = document.querySelectorAll("[data-parallax]");
            parallaxElements.forEach((el) => {
                const element = el as HTMLElement;
                const speed = parseFloat(element.dataset.parallax || "0.5");
                const yPos = -(scrolled * speed);
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });

            ticking = false;
        };

        // Throttled scroll listener for performance
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleAuthClick = (mode: "login" | "signup") => {
        setIsIntegrating(true);
        setAuthModal({
            isOpen: true,
            mode,
        });

        // Stop rocket animation after modal is fully open
        setTimeout(() => {
            setIsIntegrating(false);
        }, 3000);
    };

    const handleCloseAuth = () => {
        setIsIntegrating(false);
        setAuthModal((prev: AuthModalState) => ({
            ...prev,
            isOpen: false,
        }));

        // Small delay to reset the mode after closing animation
        setTimeout(() => {
            setAuthModal((prev: AuthModalState) => ({
                ...prev,
                mode: "login", // Reset to default mode when closed
            }));
        }, 300);
    };

    const handleIntegrationStart = () => {
        setIsIntegrating(true);
        // Stop rocket animation after integration process
        setTimeout(() => {
            setIsIntegrating(false);
        }, 3000);
    };

    const handleGetStarted = () => {
        setIsIntegrating(true);
        setAuthModal({
            isOpen: true,
            mode: "signup",
        });

        // Stop rocket animation after modal is fully open
        setTimeout(() => {
            setIsIntegrating(false);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
            {/* Optimized Parallax Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Primary gradient orb */}
                <div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl"
                    data-parallax="0.2"
                />
                {/* Secondary gradient orb */}
                <div
                    className="absolute top-2/3 right-1/4 w-80 h-80 bg-gradient-to-br from-accent/5 to-primary/5 rounded-full blur-3xl"
                    data-parallax="0.3"
                />
                {/* Tertiary gradient orb */}
                <div
                    className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-br from-primary/3 to-accent/3 rounded-full blur-2xl"
                    data-parallax="0.4"
                />

                {/* Animated grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.02] bg-grid-pattern animate-pulse"
                    data-parallax="0.1"
                    style={{
                        backgroundImage: `
              radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0),
              radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)
            `,
                        backgroundSize: "50px 50px",
                        backgroundPosition: "0 0, 25px 25px",
                        animationDuration: "20s",
                    }}
                />
            </div>

            {/* Navigation */}
            <Navigation onAuthClick={handleAuthClick} />

            {/* Main Content */}
            <main className="relative z-10">
                {/* Hero Section */}
                <HeroSection onGetStarted={handleGetStarted} />

                {/* Features Section */}
                <FeaturesSection onGetStarted={handleGetStarted} />

                {/* Placeholder for additional sections */}
                <section id="how-it-works" className="py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-8">How It Works</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                                Our platform guides you through every step of your career
                                journey, from skill assessment to job placement.
                            </p>
                            <button
                                onClick={() => setShowRoadmapGenerator(true)}
                                style={{
                                    backgroundColor: '#3b82f6',
                                    color: 'white',
                                    padding: '12px 24px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    cursor: 'pointer'
                                }}
                            >
                                Generate Your Roadmap
                            </button>
                        </div>
                    </div>
                </section>

                <section id="community" className="py-24 bg-muted/30">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-8">Join Our Community</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Connect with like-minded students, share experiences, and grow
                                together in our supportive community.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="support" className="py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-8">24/7 Support</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Get help when you need it with our comprehensive support system,
                                including AI assistance and human experts.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-12 border-t border-border/50 glass-card">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                                <span className="text-primary-foreground font-bold">N</span>
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                Navig AI
                            </span>
                        </div>

                        <div className="flex space-x-6 text-sm text-muted-foreground">
                            <a href="#" className="hover:text-foreground transition-colors">
                                Privacy
                            </a>
                            <a href="#" className="hover:text-foreground transition-colors">
                                Terms
                            </a>
                            <a href="#" className="hover:text-foreground transition-colors">
                                Contact
                            </a>
                            <a href="#" className="hover:text-foreground transition-colors">
                                Help
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Authentication Modal */}
            <AuthModal
                isOpen={authModal.isOpen}
                initialMode={authModal.mode}
                onClose={handleCloseAuth}
                onIntegrationStart={handleIntegrationStart}
            />

            {/* Rocket Animation */}
            <RocketAnimation
                isActive={isIntegrating}
                targetElementId="navig-logo-n"
            />

            {/* Toast Notifications */}
            <Toaster
                position="top-center"
                toastOptions={{
                    style: {
                        background: "oklch(var(--card))",
                        color: "oklch(var(--card-foreground))",
                        border: "1px solid oklch(var(--border))",
                    },
                }}
            />

            {/* Roadmap Generator Modal */}
            {showRoadmapGenerator && (
                <RoadmapGenerator onClose={() => setShowRoadmapGenerator(false)} />
            )}

            {/* Add glow effect to target when rocket is active */}
            {isIntegrating && (
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
            #navig-logo-n {
              animation: target-glow 2s ease-in-out infinite;
              box-shadow: 0 0 20px oklch(var(--primary) / 0.5);
            }
            
            @keyframes target-glow {
              0%, 100% { 
                box-shadow: 0 0 20px oklch(var(--primary) / 0.3);
                transform: scale(1);
              }
              50% { 
                box-shadow: 0 0 30px oklch(var(--primary) / 0.6);
                transform: scale(1.05);
              }
            }
          `,
                    }}
                />
            )}
        </div>
    );
}