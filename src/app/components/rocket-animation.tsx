'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface RocketAnimationProps {
  isActive: boolean;
  targetElementId?: string;
}

export function RocketAnimation({ isActive, targetElementId = 'navig-logo-n' }: RocketAnimationProps) {
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePositions = () => {
      const targetElement = document.getElementById(targetElementId);
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        setTargetPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
      }

      // Start from bottom right corner of viewport
      setStartPosition({
        x: window.innerWidth - 100,
        y: window.innerHeight - 100
      });
    };

    if (isActive) {
      updatePositions();
      window.addEventListener('resize', updatePositions);
      window.addEventListener('scroll', updatePositions);
    }

    return () => {
      window.removeEventListener('resize', updatePositions);
      window.removeEventListener('scroll', updatePositions);
    };
  }, [isActive, targetElementId]);

  const rocketPath = {
    x: [startPosition.x, targetPosition.x],
    y: [startPosition.y, targetPosition.y]
  };

  // Calculate angle for rocket rotation
  const deltaX = targetPosition.x - startPosition.x;
  const deltaY = targetPosition.y - startPosition.y;
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed pointer-events-none z-[60]"
          style={{
            left: 0,
            top: 0,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Rocket */}
          <motion.div
            className="absolute w-8 h-8 flex items-center justify-center"
            style={{
              left: startPosition.x - 16,
              top: startPosition.y - 16,
            }}
            animate={{
              x: rocketPath.x,
              y: rocketPath.y,
              rotate: angle,
            }}
            transition={{
              duration: 2.5,
              ease: [0.25, 0.46, 0.45, 0.94],
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 1
            }}
          >
            {/* Rocket emoji with glow effect */}
            <motion.div
              className="relative text-2xl"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🚀
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 text-2xl opacity-50 blur-sm"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🚀
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Trailing particles */}
          <motion.div
            className="absolute"
            style={{
              left: startPosition.x - 16,
              top: startPosition.y - 16,
            }}
            animate={{
              x: rocketPath.x,
              y: rocketPath.y,
            }}
            transition={{
              duration: 2.5,
              ease: [0.25, 0.46, 0.45, 0.94],
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 1
            }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-primary to-accent rounded-full"
                style={{
                  left: -8 - (i * 4),
                  top: 16,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [0, 10, 20],
                }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>

          {/* Impact sparkles at target */}
          <motion.div
            className="absolute"
            style={{
              left: targetPosition.x - 16,
              top: targetPosition.y - 16,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 0.5,
              delay: 2.3,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-accent rounded-full"
                style={{
                  left: 16,
                  top: 16,
                  transformOrigin: `0 0`,
                }}
                animate={{
                  x: [0, Math.cos(i * 45 * Math.PI / 180) * 20],
                  y: [0, Math.sin(i * 45 * Math.PI / 180) * 20],
                  opacity: [1, 0],
                  scale: [1, 0],
                }}
                transition={{
                  duration: 0.8,
                  delay: 2.3,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
