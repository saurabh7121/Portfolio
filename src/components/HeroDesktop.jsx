// HeroDesktop.jsx — loaded only on desktop (>= 768px)
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Download } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Counter } from './Hero';
import { Meteors } from './ui/Meteors';
import { AnimatedShinyText } from './ui/AnimatedShinyText';
import { ShimmerButton } from './ui/ShimmerButton';
import { BorderBeam } from './ui/BorderBeam';
import { HeroInteractiveTerminal } from './ui/HeroInteractiveTerminal';

const githubUsername = process.env.GITHUB_USERNAME || 'saurabh7121';

const socialLinks = [
  { icon: <FaGithub size={18} />, href: `https://github.com/${githubUsername}`, label: 'GitHub' },
  { icon: <FaLinkedin size={18} />, href: 'https://www.linkedin.com/in/jadhavsau777/', label: 'LinkedIn', hoverColor: 'hover:text-[#3b82f6]' },
  { icon: <FaTwitter size={18} />, href: 'https://twitter.com/jadhavsau777', label: 'Twitter', hoverColor: 'hover:text-[#1d9bf0]' },
  { icon: <Globe size={18} />, href: 'https://saurabhxo.site', label: 'Website', hoverColor: 'hover:text-[#ef4444]' },
];

const MagneticWrapper = ({ children }) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const ref = React.useRef(null);

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

const HeroDesktop = ({ theme }) => (
  <section
    id="home"
    className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-12"
  >
    {/* Clean editorial background — no decorative overlays */}

    <div className="container mx-auto px-6 sm:px-8 relative z-10">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[82vh]">

        {/* ── LEFT CONTENT ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col items-start text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center mb-6"
          >
            <div className="px-4 py-2 rounded-none border-2 border-black bg-white flex items-center gap-2.5 shadow-[2px_2px_0px_#0a0a0a]">
              <div className="w-2.5 h-2.5 rounded-none bg-[#22c55e] border border-black animate-pulse" />
              <AnimatedShinyText className="text-[11px] font-bold tracking-[0.25em] uppercase text-black">
                Available for Full-Time & Freelance
              </AnimatedShinyText>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hero-name font-black leading-[0.88] tracking-tighter text-primary mb-5"
            style={{ fontSize: 'clamp(4rem, 7vw, 7.5rem)' }}
          >
            SAURABH<br />
            <span style={{ WebkitTextStroke: '3px var(--text-stroke)', color: 'transparent' }}>
              JADHAV.
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="section-divider" style={{ margin: 0 }} />
            <p className="text-xs sm:text-sm font-bold tracking-[0.22em] uppercase text-muted-1">
              Full-Stack & AI Software Developer
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-base sm:text-lg text-muted-1 leading-relaxed max-w-xl mb-9"
          >
            Crafting <span className="text-primary font-semibold">scalable web platforms</span>,{' '}
            <span className="text-primary font-semibold">AI integrations</span>, and{' '}
            <span className="text-primary font-semibold">high-performance systems</span> with clean architecture.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <MagneticWrapper>
              <a href="#projects" className="btn-primary flex items-center">
                Explore Projects <ArrowRight size={15} className="ml-2" />
              </a>
            </MagneticWrapper>
            <MagneticWrapper>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-outline"
              >
                Get In Touch
              </motion.a>
            </MagneticWrapper>
          </motion.div>

          {/* Social links row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-4 pt-2 border-t border-border/40 w-full max-w-lg"
          >
            {socialLinks.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                className={`text-muted-1 hover:text-primary transition-all duration-200 ${s.hoverColor || ''}`}
                aria-label={s.label}
              >
                {s.icon}
              </motion.a>
            ))}
            <div className="ml-2 w-px h-5 bg-border" />
            <a
              href="mailto:work.jadhavsaurabh@gmail.com"
              className="text-[11px] text-muted-1 hover:text-primary transition-colors tracking-wider font-mono"
            >
              work.jadhavsaurabh@gmail.com
            </a>
          </motion.div>
        </motion.div>

        {/* ── RIGHT VISUAL: INTERACTIVE CODE PLAYGROUND ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col items-center justify-center gap-8"
        >
          {/* Key Metrics Counter Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-3 gap-6 w-full max-w-xl"
          >
            <Counter target={2}  suffix="+" label="Years Exp." />
            <Counter target={4} suffix="+" label="Projects" />
            <Counter target={10} suffix="+" label="Technologies" />
          </motion.div>

          {/* Interactive Multi-Tab Code Playground */}
          <div className="relative w-full max-w-xl">
            <HeroInteractiveTerminal />
          </div>
        </motion.div>

      </div>
    </div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 z-10"
    >
      <div className="scroll-line" />
    </motion.div>
  </section>
);

export default HeroDesktop;
