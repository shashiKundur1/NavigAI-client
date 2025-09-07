'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { X, Mail, Lock, User, Eye, EyeOff, Sparkles, UserPlus } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'signup';
  onClose: () => void;
  onIntegrationStart?: () => void;
}

export function AuthModal({ isOpen, initialMode, onClose, onIntegrationStart }: AuthModalProps) {
  const [currentMode, setCurrentMode] = useState<'login' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Update mode when modal opens with new mode
  useEffect(() => {
    if (isOpen) {
      setIsAnimatingIn(true);
      setCurrentMode(initialMode);
      // Reset form states
      setShowPassword(false);
      setShowConfirmPassword(false);
      setIsLoading(false);
      setErrorMessage(''); // Clear error message when modal opens
    } else {
      setIsAnimatingIn(false);
      setErrorMessage(''); // Clear error message when modal closes
    }
  }, [isOpen, initialMode]);

  // Simple validation function
  const validateForm = (formData: FormData, mode: 'login' | 'signup'): string => {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    
    // Signup validation
    if (mode === 'signup') {
      if (!name?.trim()) return 'Full name is required';
      if (!email?.trim() && !password?.trim()) return 'Email and password required';
      if (!email?.trim()) return 'Email is required';
      if (!password?.trim()) return 'Password is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address';
      if (password.length < 6) return 'Password must be at least 6 characters';
      if (!confirmPassword?.trim()) return 'Please confirm your password';
      if (password !== confirmPassword) return 'Passwords do not match';
    }
    
    // Login validation
    if (mode === 'login') {
      if (!email?.trim() && !password?.trim()) return 'Email and password required';
      if (!email?.trim()) return 'Email is required';
      if (!password?.trim()) return 'Password is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address';
    }
    
    return '';
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent, mode: 'login' | 'signup') => {
    e.preventDefault();
    
    // Clear previous errors
    setErrorMessage('');
    
    const formData = new FormData(e.target as HTMLFormElement);
    const validationError = validateForm(formData, mode);
    
    // If there are validation errors, show them
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }
    
    setIsLoading(true);
    
    // Trigger rocket animation for integration
    if (onIntegrationStart) {
      onIntegrationStart();
    }
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
      console.log(`${mode} successful`);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(mode === 'login' ? 'Login failed' : 'Signup failed');
    }
  };

  // Handle mode switching with animation
  const switchMode = (newMode: 'login' | 'signup') => {
    setCurrentMode(newMode);
    setErrorMessage(''); // Clear errors when switching modes
  };

  // Simple error message component with fixed height
  const ErrorMessage = ({ message }: { message: string }) => {
    return (
      <div className="h-12 flex items-center"> {/* Fixed height container */}
        <AnimatePresence mode="wait">
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              transition={{ duration: 0.15 }}
              className="w-full bg-destructive/15 border border-destructive/30 rounded-lg p-2 flex items-center space-x-2"
            >
              <span className="text-destructive text-sm">⚠️</span>
              <span className="text-destructive text-sm">{message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Prevent body scroll and handle keyboard events when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      // Handle escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Modal Container with Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ 
                scale: 0.8, 
                opacity: 0,
                y: 50,
                rotateX: -15
              }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                y: 0,
                rotateX: 0
              }}
              exit={{ 
                scale: 0.8, 
                opacity: 0,
                y: 30,
                rotateX: 10
              }}
              transition={{ 
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              className="w-full max-w-4xl md:max-w-4xl max-w-[95vw] relative"
              style={{ perspective: "1000px" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="absolute -top-12 right-0 text-muted-foreground hover:text-foreground z-10 w-10 h-10 p-0 hover:bg-accent/20"
              >
                <X className="h-5 w-5" />
              </Button>

              {/* Desktop Auth Container with Sliding Blocker */}
              <Card className="hidden md:block bg-card shadow-xl shadow-primary/10 border-border/30 overflow-hidden modal-glow">
                <motion.div 
                  className="relative flex min-h-[600px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ 
                    delay: 0.1, 
                    duration: 0.3 
                  }}
                >
                  {/* Login Section (Left Side) */}
                  <motion.div 
                    className="w-1/2 p-8 flex flex-col justify-center"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ 
                      delay: 0.2, 
                      duration: 0.4,
                      ease: "easeOut"
                    }}
                  >
                    <div className="max-w-sm mx-auto w-full space-y-6">
                      {/* Login Header */}
                      <div className="text-center space-y-2">
                        <div className="text-4xl mb-2">👋</div>
                        <h2 className="text-2xl font-bold">Welcome Back</h2>
                        <p className="text-muted-foreground text-sm">
                          Sign in to continue your journey
                        </p>
                      </div>

                      {/* Error Message */}
                      <ErrorMessage message={errorMessage} />

                      {/* Login Form */}
                      <form onSubmit={(e) => handleSubmit(e, 'login')} className="space-y-4" noValidate>
                        {/* Email field */}
                        <div className="space-y-2">
                          <Label htmlFor="login-email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10 pointer-events-none" />
                            <Input
                              id="login-email"
                              name="email"
                              type="email"
                              placeholder="john@example.com"
                              className="pl-10 bg-input border-border/50 focus:border-primary/50 relative"
                            />
                          </div>
                        </div>

                        {/* Password field */}
                        <div className="space-y-2">
                          <Label htmlFor="login-password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10 pointer-events-none" />
                            <Input
                              id="login-password"
                              name="password"
                              type={showPassword ? 'text' : 'password'}
                              placeholder="••••••••"
                              className="pl-10 pr-10 bg-input border-border/50 focus:border-primary/50 relative"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-accent/20 z-10"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>

                        {/* Forgot Password */}
                        <div className="text-right">
                          <Button
                            type="button"
                            variant="link"
                            className="text-sm text-accent hover:text-accent/80 p-0 h-auto"
                          >
                            Forgot password? 🔐
                          </Button>
                        </div>

                        {/* Submit Button */}
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg"
                          disabled={isLoading && currentMode === 'login'}
                        >
                          {isLoading && currentMode === 'login' ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                            />
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4 mr-2" />
                              Sign In 🚀
                            </>
                          )}
                        </Button>

                        {/* Mode Switch */}
                        <div className="text-center text-sm text-muted-foreground pt-2">
                          Don't have an account?{' '}
                          <Button
                            type="button"
                            variant="link"
                            onClick={() => switchMode('signup')}
                            className="text-accent hover:text-accent/80 p-0 h-auto"
                          >
                            Sign up here 📝
                          </Button>
                        </div>
                      </form>
                    </div>
                  </motion.div>

                  {/* Signup Section (Right Side) */}
                  <motion.div 
                    className="w-1/2 p-8 flex flex-col justify-center"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ 
                      delay: 0.2, 
                      duration: 0.4,
                      ease: "easeOut"
                    }}
                  >
                    <div className="max-w-sm mx-auto w-full space-y-6">
                      {/* Signup Header */}
                      <div className="text-center space-y-2">
                        <div className="text-4xl mb-2">🚀</div>
                        <h2 className="text-2xl font-bold">Join Navig AI</h2>
                        <p className="text-muted-foreground text-sm">
                          Start your career journey with AI guidance
                        </p>
                      </div>

                      {/* Error Message */}
                      <ErrorMessage message={errorMessage} />

                      {/* Signup Form */}
                      <form onSubmit={(e) => handleSubmit(e, 'signup')} className="space-y-4" noValidate>
                        {/* Name field */}
                        <div className="space-y-2">
                          <Label htmlFor="signup-name">Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10 pointer-events-none" />
                            <Input
                              id="signup-name"
                              name="name"
                              type="text"
                              placeholder="John Doe"
                              className="pl-10 bg-input border-border/50 focus:border-primary/50 relative"
                            />
                          </div>
                        </div>

                        {/* Email field */}
                        <div className="space-y-2">
                          <Label htmlFor="signup-email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10 pointer-events-none" />
                            <Input
                              id="signup-email"
                              name="email"
                              type="email"
                              placeholder="john@example.com"
                              className="pl-10 bg-input border-border/50 focus:border-primary/50 relative"
                            />
                          </div>
                        </div>

                        {/* Password field */}
                        <div className="space-y-2">
                          <Label htmlFor="signup-password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10 pointer-events-none" />
                            <Input
                              id="signup-password"
                              name="password"
                              type={showPassword ? 'text' : 'password'}
                              placeholder="••••••••"
                              className="pl-10 pr-10 bg-input border-border/50 focus:border-primary/50 relative"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-accent/20 z-10"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>

                        {/* Confirm Password field */}
                        <div className="space-y-2">
                          <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10 pointer-events-none" />
                            <Input
                              id="signup-confirm-password"
                              name="confirmPassword"
                              type={showConfirmPassword ? 'text' : 'password'}
                              placeholder="••••••••"
                              className="pl-10 pr-10 bg-input border-border/50 focus:border-primary/50 relative"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-accent/20 z-10"
                            >
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg"
                          disabled={isLoading && currentMode === 'signup'}
                        >
                          {isLoading && currentMode === 'signup' ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                            />
                          ) : (
                            <>
                              <UserPlus className="w-4 h-4 mr-2" />
                              Create Account 🎉
                            </>
                          )}
                        </Button>

                        {/* Mode Switch */}
                        <div className="text-center text-sm text-muted-foreground pt-2">
                          Already have an account?{' '}
                          <Button
                            type="button"
                            variant="link"
                            onClick={() => switchMode('login')}
                            className="text-accent hover:text-accent/80 p-0 h-auto"
                          >
                            Sign in here 👋
                          </Button>
                        </div>
                      </form>
                    </div>
                  </motion.div>

                  {/* Sliding Blocker */}
                  <motion.div
                    initial={{ 
                      x: currentMode === 'login' ? '100%' : '0%',
                      opacity: 0,
                      scale: 0.9
                    }}
                    animate={{
                      x: currentMode === 'login' ? '100%' : '0%',
                      opacity: 1,
                      scale: 1
                    }}
                    transition={{
                      x: {
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                        mass: 1,
                      },
                      opacity: {
                        duration: 0.3,
                        delay: 0.1
                      },
                      scale: {
                        duration: 0.4,
                        delay: 0.1,
                        ease: "easeOut"
                      }
                    }}
                    className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-br from-primary to-accent shadow-2xl flex flex-col items-center justify-center text-primary-foreground z-10"
                  >
                    <motion.div 
                      className="text-center space-y-6 p-8"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ 
                        delay: 0.3, 
                        duration: 0.5,
                        ease: "easeOut"
                      }}
                    >
                      {/* Dynamic Content Based on Mode */}
                      {currentMode === 'login' ? (
                        // Show signup promotion when login is active (blocker covers signup form)
                        <>
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ 
                              delay: 0.4, 
                              type: "spring",
                              stiffness: 150,
                              damping: 20,
                              duration: 0.6
                            }}
                            className="text-6xl mb-4"
                          >
                            🎯
                          </motion.div>
                          <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ 
                              delay: 0.6,
                              duration: 0.5,
                              ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                            className="space-y-4"
                          >
                            <h3 className="text-2xl font-bold">New to Navig AI?</h3>
                            <p className="text-primary-foreground/90 leading-relaxed">
                              Join thousands of students who have accelerated their career journey with our AI-powered platform! 🌟
                            </p>
                            <motion.div 
                              initial={{ y: 10, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ 
                                delay: 0.8,
                                duration: 0.4,
                                ease: "easeOut"
                              }}
                              className="space-y-2 text-sm text-primary-foreground/80"
                            >
                              <motion.div 
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.9, duration: 0.3 }}
                                className="flex items-center justify-center space-x-2"
                              >
                                <span>🧠</span>
                                <span>AI-Powered Career Guidance</span>
                              </motion.div>
                              <motion.div 
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 1.0, duration: 0.3 }}
                                className="flex items-center justify-center space-x-2"
                              >
                                <span>💼</span>
                                <span>Smart Job Matching</span>
                              </motion.div>
                              <motion.div 
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 1.1, duration: 0.3 }}
                                className="flex items-center justify-center space-x-2"
                              >
                                <span>🎤</span>
                                <span>Mock Interview Practice</span>
                              </motion.div>
                              <motion.div 
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 1.2, duration: 0.3 }}
                                className="flex items-center justify-center space-x-2"
                              >
                                <span>💝</span>
                                <span>Mental Health Support</span>
                              </motion.div>
                            </motion.div>
                            <motion.div
                              initial={{ y: 10, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ 
                                delay: 1.3,
                                duration: 0.4,
                                ease: "easeOut"
                              }}
                            >
                              <Button
                                onClick={() => switchMode('signup')}
                                variant="secondary"
                                size="lg"
                                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg hover:scale-105 transition-transform duration-200"
                              >
                                Get Started Free 🚀
                              </Button>
                            </motion.div>
                          </motion.div>
                        </>
                      ) : (
                        // Show login promotion when signup is active (blocker covers login form)
                        <>
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ 
                              delay: 0.4, 
                              type: "spring",
                              stiffness: 150,
                              damping: 20,
                              duration: 0.6
                            }}
                            className="text-6xl mb-4"
                          >
                            👋
                          </motion.div>
                          <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ 
                              delay: 0.6,
                              duration: 0.5,
                              ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                            className="space-y-4"
                          >
                            <h3 className="text-2xl font-bold">Welcome Back!</h3>
                            <p className="text-primary-foreground/90 leading-relaxed">
                              Ready to continue your career journey? Sign in to access your personalized dashboard! ✨
                            </p>
                            <motion.div 
                              initial={{ y: 10, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ 
                                delay: 0.8,
                                duration: 0.4,
                                ease: "easeOut"
                              }}
                              className="space-y-2 text-sm text-primary-foreground/80"
                            >
                              <motion.div 
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.9, duration: 0.3 }}
                                className="flex items-center justify-center space-x-2"
                              >
                                <span>📊</span>
                                <span>View Progress Dashboard</span>
                              </motion.div>
                              <motion.div 
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 1.0, duration: 0.3 }}
                                className="flex items-center justify-center space-x-2"
                              >
                                <span>🔥</span>
                                <span>Access Saved Jobs</span>
                              </motion.div>
                              <motion.div 
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 1.1, duration: 0.3 }}
                                className="flex items-center justify-center space-x-2"
                              >
                                <span>🎯</span>
                                <span>Resume Skill Tracking</span>
                              </motion.div>
                              <motion.div 
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 1.2, duration: 0.3 }}
                                className="flex items-center justify-center space-x-2"
                              >
                                <span>💪</span>
                                <span>Continue Building Skills</span>
                              </motion.div>
                            </motion.div>
                            <motion.div
                              initial={{ y: 10, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ 
                                delay: 1.3,
                                duration: 0.4,
                                ease: "easeOut"
                              }}
                            >
                              <Button
                                onClick={() => switchMode('login')}
                                variant="secondary"
                                size="lg"
                                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg hover:scale-105 transition-transform duration-200"
                              >
                                Sign In Now 👋
                              </Button>
                            </motion.div>
                          </motion.div>
                        </>
                      )}
                    </motion.div>

                    {/* Decorative Elements */}
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.5, duration: 0.4 }}
                      className="absolute top-4 left-4 w-8 h-8 bg-primary-foreground/20 rounded-full"
                    >
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="w-full h-full bg-primary-foreground/30 rounded-full"
                      />
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.7, duration: 0.4 }}
                      className="absolute bottom-4 right-4 w-6 h-6 bg-primary-foreground/20 rounded-full"
                    >
                      <motion.div
                        animate={{ 
                          scale: [1, 1.3, 1],
                          opacity: [0.6, 1, 0.6]
                        }}
                        transition={{ 
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5
                        }}
                        className="w-full h-full bg-primary-foreground/30 rounded-full"
                      />
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.9, duration: 0.4 }}
                      className="absolute top-1/3 right-8 w-4 h-4 bg-primary-foreground/20 rounded-full"
                    >
                      <motion.div
                        animate={{ 
                          scale: [1, 1.4, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1
                        }}
                        className="w-full h-full bg-primary-foreground/30 rounded-full"
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </Card>

              {/* Mobile Auth Container */}
              <Card className="md:hidden bg-card shadow-xl shadow-primary/10 border-border/30 overflow-hidden modal-glow max-h-[95vh] mx-3 flex flex-col">
                <motion.div 
                  className="flex-1 overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ 
                    delay: 0.1, 
                    duration: 0.3 
                  }}
                >
                  {/* Mobile Content */}
                  <div className="h-full flex flex-col">
                    {/* Header with close button */}
                    <div className="flex items-center justify-between p-4 border-b border-border/50">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                          <span className="text-primary-foreground font-bold text-sm">N</span>
                        </div>
                        <span className="font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          Navig AI
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="w-8 h-8 p-0 hover:bg-accent/20"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Mobile Form Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                      <motion.div
                        key={currentMode}
                        initial={{ x: currentMode === 'login' ? -20 : 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ 
                          duration: 0.3,
                          ease: "easeOut"
                        }}
                        className="space-y-6"
                      >
                        {/* Mobile Header */}
                        <div className="text-center space-y-2">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ 
                              delay: 0.2, 
                              type: "spring",
                              stiffness: 200,
                              damping: 20
                            }}
                            className="text-4xl mb-1"
                          >
                            {currentMode === 'login' ? '👋' : '🚀'}
                          </motion.div>
                          <h2 className="text-xl font-bold">
                            {currentMode === 'login' ? 'Welcome Back' : 'Join Navig AI'}
                          </h2>
                          <p className="text-muted-foreground text-sm">
                            {currentMode === 'login' 
                              ? 'Sign in to continue your journey' 
                              : 'Start your career journey with AI guidance'
                            }
                          </p>
                        </div>

                        {/* Error Message */}
                        <ErrorMessage message={errorMessage} />

                        {/* Mobile Form */}
                        <form onSubmit={(e) => handleSubmit(e, currentMode)} className="space-y-4" noValidate>
                          {/* Name field for signup */}
                          {currentMode === 'signup' && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="space-y-1.5"
                            >
                              <Label htmlFor="mobile-name" className="text-sm">Full Name</Label>
                              <div className="relative">
                                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 z-10 pointer-events-none" />
                                <Input
                                  id="mobile-name"
                                  name="name"
                                  type="text"
                                  placeholder="John Doe"
                                  className="pl-12 h-11 text-sm bg-input border-border/50 focus:border-primary/50 rounded-xl relative"
                                />
                              </div>
                            </motion.div>
                          )}

                          {/* Email field */}
                          <div className="space-y-1.5">
                            <Label htmlFor="mobile-email" className="text-sm">Email</Label>
                            <div className="relative">
                              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 z-10 pointer-events-none" />
                              <Input
                                id="mobile-email"
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                className="pl-12 h-11 text-sm bg-input border-border/50 focus:border-primary/50 rounded-xl relative"
                              />
                            </div>
                          </div>

                          {/* Password field */}
                          <div className="space-y-1.5">
                            <Label htmlFor="mobile-password" className="text-sm">Password</Label>
                            <div className="relative">
                              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 z-10 pointer-events-none" />
                              <Input
                                id="mobile-password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                className="pl-12 pr-12 h-11 text-sm bg-input border-border/50 focus:border-primary/50 rounded-xl relative"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-accent/20 z-10"
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>

                          {/* Confirm Password field for signup */}
                          {currentMode === 'signup' && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="space-y-1.5"
                            >
                              <Label htmlFor="mobile-confirm-password" className="text-sm">Confirm Password</Label>
                              <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 z-10 pointer-events-none" />
                                <Input
                                  id="mobile-confirm-password"
                                  name="confirmPassword"
                                  type={showConfirmPassword ? 'text' : 'password'}
                                  placeholder="••••••••"
                                  className="pl-12 pr-12 h-11 text-sm bg-input border-border/50 focus:border-primary/50 rounded-xl relative"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-accent/20 z-10"
                                >
                                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                              </div>
                            </motion.div>
                          )}

                          {/* Forgot Password (login only) */}
                          {currentMode === 'login' && (
                            <div className="text-right">
                              <Button
                                type="button"
                                variant="link"
                                className="text-sm text-accent hover:text-accent/80 p-0 h-auto"
                              >
                                Forgot password? 🔐
                              </Button>
                            </div>
                          )}

                          {/* Submit Button */}
                          <Button
                            type="submit"
                            size="lg"
                            className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg text-base"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                              />
                            ) : (
                              <>
                                {currentMode === 'login' ? (
                                  <>
                                    <Sparkles className="w-5 h-5 mr-2" />
                                    Sign In 🚀
                                  </>
                                ) : (
                                  <>
                                    <UserPlus className="w-5 h-5 mr-2" />
                                    Create Account 🎉
                                  </>
                                )}
                              </>
                            )}
                          </Button>

                          {/* Mode Toggle */}
                          <div className="flex items-center justify-center space-x-4 pt-4">
                            <Button
                              type="button"
                              variant={currentMode === 'login' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => switchMode('login')}
                              className="flex-1"
                            >
                              👋 Login
                            </Button>
                            <Button
                              type="button"
                              variant={currentMode === 'signup' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => switchMode('signup')}
                              className="flex-1"
                            >
                              🚀 Sign Up
                            </Button>
                          </div>
                        </form>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
