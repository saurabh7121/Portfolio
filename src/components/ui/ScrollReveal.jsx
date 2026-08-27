import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgressBar - Renders a sleek gradient progress bar at the top of the viewport
 * indicating scroll depth across the page.
 */
export const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[4px] bg-[#0a0a0a] z-[99999] origin-left pointer-events-none"
      style={{ scaleX }}
    />
  );
};

const variantsMap = {
  'fade-up': {
    hidden: { opacity: 0, y: 45, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  'fade-down': {
    hidden: { opacity: 0, y: -45, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  'slide-right': {
    hidden: { opacity: 0, x: -50, filter: 'blur(4px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  'slide-left': {
    hidden: { opacity: 0, x: 50, filter: 'blur(4px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  'zoom-in': {
    hidden: { opacity: 0, scale: 0.86, filter: 'blur(6px)' },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  },
  'blur-in': {
    hidden: { opacity: 0, filter: 'blur(16px)', y: 20 },
    visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
  },
};

/**
 * ScrollReveal - Animates children as they enter the viewport when scrolling down.
 */
export const ScrollReveal = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.7,
  className = '',
  once = false,
  amount = 0.2,
  style = {},
}) => {
  const selectedVariant = variantsMap[variant] || variantsMap['fade-up'];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={selectedVariant}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggerContainer - Parent component that orchestrates staggered scroll reveals for its children.
 */
export const StaggerContainer = ({
  children,
  staggerDelay = 0.1,
  delayChildren = 0,
  className = '',
  once = false,
  amount = 0.15,
  style = {},
  animateOnMount = false,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren,
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate={animateOnMount ? "visible" : undefined}
      whileInView={animateOnMount ? undefined : "visible"}
      viewport={animateOnMount ? undefined : { once, amount }}
      variants={containerVariants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggerItem - Child component inside StaggerContainer that receives staggered reveal animations.
 */
export const StaggerItem = ({
  children,
  variant = 'fade-up',
  duration = 0.6,
  className = '',
  style = {},
}) => {
  const itemVariants = variantsMap[variant] || variantsMap['fade-up'];

  return (
    <motion.div
      variants={itemVariants}
      transition={{
        duration,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};
