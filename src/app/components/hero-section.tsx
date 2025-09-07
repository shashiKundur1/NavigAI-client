'use client';

import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ArrowRight, Sparkles, Target, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 pb-8">
      {/* Parallax background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-primary/8 to-accent/8 rounded-full blur-3xl"
          data-parallax="0.3"
        />
        <div 
          className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-br from-accent/8 to-primary/8 rounded-full blur-3xl"
          data-parallax="0.4"
        />
        <div 
          className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-br from-primary/6 to-accent/6 rounded-full blur-2xl"
          data-parallax="0.2"
        />
        
        {/* Subtle geometric patterns */}
        <div 
          className="absolute top-10 right-10 w-8 h-8 border border-primary/20 rotate-45"
          data-parallax="0.6"
        />
        <div 
          className="absolute bottom-20 left-10 w-6 h-6 border border-accent/20 rotate-12"
          data-parallax="0.5"
        />
        <div 
          className="absolute top-1/3 left-1/2 w-4 h-4 bg-primary/10 rounded-full"
          data-parallax="0.7"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left space-y-6 lg:space-y-8">
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full px-3 py-1.5 lg:px-4 lg:py-2 border border-primary/20">
                  <Sparkles className="h-3 w-3 lg:h-4 lg:w-4 text-primary" />
                  <span className="text-xs lg:text-sm font-medium text-primary">✨ AI-Powered Career Success</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight px-2 sm:px-0">
                  Land Your{' '}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Dream Job
                  </span>{' '}
                  with AI
                </h1>
                
                <p className="text-base lg:text-lg text-muted-foreground max-w-xl lg:max-w-2xl mx-auto lg:mx-0 px-2 sm:px-0">
                  Get personalized roadmaps, AI-driven job search assistance, mock interviews, 
                  mental health support, and connect with like-minded students on your career journey.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center lg:justify-start px-2 sm:px-0">
                <Button
                  onClick={onGetStarted}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg group h-12 text-base font-medium"
                >
                  🚀 Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="backdrop-blur-sm bg-background/50 border-border/50 hover:bg-accent/10 h-12 text-base"
                >
                  🎥 Watch Demo
                </Button>
              </motion.div>

              {/* Removed achievements section as requested */}
            </div>

            {/* Right Column - Visual */}
            <motion.div
              variants={itemVariants}
              className="relative mt-8 lg:mt-0"
            >
              <div className="relative max-w-md lg:max-w-lg mx-auto">
                {/* Main illustration placeholder */}
                <div className="backdrop-blur-md bg-card/90 shadow-xl shadow-primary/5 p-4 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl shadow-2xl shadow-primary/10">
                  <div className="space-y-4 lg:space-y-6">
                    {/* Mock dashboard interface */}
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                        <Sparkles className="h-4 w-4 lg:h-5 lg:w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="text-sm lg:text-base font-semibold">AI Career Assistant</div>
                        <div className="text-xs lg:text-sm text-muted-foreground">Your personalized guide</div>
                      </div>
                    </div>
                    
                    {/* Progress bars */}
                    <div className="space-y-3 lg:space-y-4">
                      <div>
                        <div className="flex justify-between text-xs lg:text-sm mb-1.5 lg:mb-2">
                          <span>Resume Optimization</span>
                          <span className="text-accent">92%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5 lg:h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "92%" }}
                            transition={{ delay: 1, duration: 1.5 }}
                            className="bg-gradient-to-r from-primary to-accent h-1.5 lg:h-2 rounded-full"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs lg:text-sm mb-1.5 lg:mb-2">
                          <span>Interview Prep</span>
                          <span className="text-primary">87%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5 lg:h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "87%" }}
                            transition={{ delay: 1.5, duration: 1.5 }}
                            className="bg-gradient-to-r from-accent to-primary h-1.5 lg:h-2 rounded-full"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs lg:text-sm mb-1.5 lg:mb-2">
                          <span>Network Building</span>
                          <span className="text-accent">75%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5 lg:h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "75%" }}
                            transition={{ delay: 2, duration: 1.5 }}
                            className="bg-gradient-to-r from-primary to-accent h-1.5 lg:h-2 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Mock notifications */}
                    <div className="space-y-2 lg:space-y-3 pt-3 lg:pt-4 border-t border-border/50">
                      <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 2.5 }}
                        className="flex items-center space-x-2 lg:space-x-3 p-2 lg:p-3 bg-accent/10 rounded-lg"
                      >
                        <div className="text-base lg:text-lg">💼</div>
                        <div className="text-xs lg:text-sm">New job match found!</div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 3 }}
                        className="flex items-center space-x-2 lg:space-x-3 p-2 lg:p-3 bg-primary/10 rounded-lg"
                      >
                        <div className="text-base lg:text-lg">📅</div>
                        <div className="text-xs lg:text-sm">Interview scheduled for tomorrow</div>
                      </motion.div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements - Hidden on small screens for cleaner look */}
                <motion.div
                  variants={floatingVariants}
                  animate="animate"
                  className="hidden sm:flex absolute -top-4 lg:-top-6 -right-4 lg:-right-6 w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl lg:rounded-2xl backdrop-blur-md bg-card/90 shadow-xl shadow-primary/5 items-center justify-center"
                >
                  <div className="text-xl lg:text-2xl">🎯</div>
                </motion.div>
                
                <motion.div
                  variants={floatingVariants}
                  animate="animate"
                  style={{ animationDelay: "1s" }}
                  className="hidden sm:flex absolute -bottom-4 lg:-bottom-6 -left-4 lg:-left-6 w-14 h-14 lg:w-20 lg:h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl lg:rounded-2xl backdrop-blur-md bg-card/90 shadow-xl shadow-primary/5 items-center justify-center"
                >
                  <div className="text-2xl lg:text-3xl">🤝</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
