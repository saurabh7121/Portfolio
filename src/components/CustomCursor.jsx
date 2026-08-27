import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
      const isMobileScreen = typeof window !== 'undefined' && window.innerWidth < 768;
      setIsVisible(!isTouchDevice && !isMobileScreen);
    };

    checkVisibility();
    window.addEventListener('resize', checkVisibility);

    return () => {
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      // Check if hovering over interactive elements
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 bg-[#FFD600] border-2 border-black rounded-none pointer-events-none z-[9999] shadow-[2px_2px_0px_#0a0a0a]"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          scale: isHovering ? 1.3 : 1,
          rotate: isHovering ? 45 : 0
        }}
        transition={{
          type: 'spring',
          stiffness: 450,
          damping: 24,
          mass: 0.1,
        }}
      />
    </>
  );
};

export default CustomCursor;
