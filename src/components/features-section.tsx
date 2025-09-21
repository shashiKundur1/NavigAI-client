'use client';

import { motion } from 'motion/react';
import { 
  Brain, 
  Search, 
  Heart, 
  MessageSquare, 
  Users, 
  Target,
  Zap,
  BookOpen
} from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface FeaturesSectionProps {
  onGetStarted: () => void;
}

export function FeaturesSection({ onGetStarted }: FeaturesSectionProps) {
  const features = [
    {
      icon: Brain,
      emoji: "🧠",
      title: "AI-Powered Roadmaps",
      description: "Get personalized career paths tailored to your skills, interests, and market demands.",
      gradient: "from-primary to-accent"
    },
    {
      icon: Search,
      emoji: "🔍",
      title: "Smart Job Search",
      description: "AI-driven job matching that finds opportunities perfectly suited to your profile.",
      gradient: "from-accent to-primary"
    },
    {
      icon: MessageSquare,
      emoji: "🎤",
      title: "Mock Interviews",
      description: "Practice with AI-powered interview simulations and get real-time feedback.",
      gradient: "from-primary to-accent"
    },
    {
      icon: Heart,
      emoji: "💝",
      title: "Mental Health Support",
      description: "Access wellness resources and stress management tools throughout your journey.",
      gradient: "from-accent to-primary"
    },
    {
      icon: Users,
      emoji: "👥",
      title: "Community Groups",
      description: "Connect with peers, share experiences, and build meaningful professional networks.",
      gradient: "from-primary to-accent"
    },
    {
      icon: Target,
      emoji: "🎯",
      title: "Goal Tracking",
      description: "Set milestones and track your progress with detailed analytics and insights.",
      gradient: "from-accent to-primary"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
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

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Parallax background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-primary/4 to-accent/4 rounded-full blur-3xl"
          data-parallax="0.2"
        />
        <div 
          className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-gradient-to-br from-accent/4 to-primary/4 rounded-full blur-2xl"
          data-parallax="0.3"
        />
        
        {/* Floating particles */}
        <div 
          className="absolute top-16 left-16 w-2 h-2 bg-primary/30 rounded-full animate-pulse"
          data-parallax="0.8"
          style={{ animationDuration: '3s' }}
        />
        <div 
          className="absolute top-1/2 right-20 w-1.5 h-1.5 bg-accent/30 rounded-full animate-pulse"
          data-parallax="0.6"
          style={{ animationDuration: '4s', animationDelay: '1s' }}
        />
        <div 
          className="absolute bottom-16 right-1/3 w-1 h-1 bg-primary/40 rounded-full animate-pulse"
          data-parallax="0.7"
          style={{ animationDuration: '5s', animationDelay: '2s' }}
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full px-4 py-2 border border-primary/20">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Powerful Features</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                Everything You Need to{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Succeed
                </span>
              </h2>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From AI-powered insights to community support, we provide comprehensive tools 
                to accelerate your career journey and land your dream job.
              </p>
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="group"
                style={{
                  '--delay': `${index * 0.5}s`
                } as React.CSSProperties}
              >
                <Card className="backdrop-blur-md bg-card/90 shadow-xl shadow-primary/5 border-border/50 h-full hover:border-primary/30 transition-all duration-300 animate-float" 
                      style={{ animationDelay: `var(--delay)`, animationDuration: `${6 + index}s` }}>
                  <CardContent className="p-6 space-y-4">
                    {/* Icon */}
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient}/10 rounded-2xl flex flex-col items-center justify-center group-hover:scale-110 transition-transform duration-300 relative`}>
                      <div className="text-3xl mb-1">
                        {feature.emoji}
                      </div>
                      <feature.icon className={`h-5 w-5 bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent`} />
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <div className="backdrop-blur-md bg-card/90 shadow-xl shadow-primary/5 p-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 max-w-2xl mx-auto">
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl mb-4 relative">
                  <BookOpen className="h-8 w-8 text-primary" />
                  <div className="absolute -top-2 -right-2 text-2xl">🎓</div>
                </div>
                
                <h3 className="text-2xl font-bold">
                  Ready to Transform Your Career?
                </h3>
                
                <p className="text-muted-foreground">
                  Join thousands of students who have already accelerated their career 
                  journey with our AI-powered platform.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                  >
                    <button 
                      onClick={onGetStarted}
                      className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      🚀 Start Your Journey
                    </button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                  >
                    <button className="px-8 py-3 backdrop-blur-sm bg-card/90 border border-border/50 hover:border-primary/30 font-medium rounded-lg transition-all duration-300">
                      📖 Learn More
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
