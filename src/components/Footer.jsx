import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowUp, Globe, Copy, Check } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { ScrollReveal } from './ui/ScrollReveal';

const ETH_ADDRESS = '0x81629432ECCFb8C6EcAe87e849Afe9c3244bE1FD';
const ETH_SHORT   = '0x8162…bE1FD';

const navLinks = ['Home', 'About', 'Services', 'Projects', 'Skills', 'Contact'];

const githubUsername = process.env.GITHUB_USERNAME || 'saurabh7121';

const socials = [
  { icon: <FaGithub size={16} />, href: `https://github.com/${githubUsername}` },
  { icon: <FaLinkedin size={16} />, href: 'https://www.linkedin.com/in/jadhavsau777/' },
  { icon: <FaTwitter size={16} />, href: 'https://twitter.com/jadhavsau777' },
  { icon: <Globe size={16} />, href: 'https://saurabhxo.site' },
];

// ─── ETH Tip Button ───────────────────────────────────────────────────────────
const EthTipButton = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ETH_ADDRESS).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <motion.button
        onClick={handleCopy}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Copy Ethereum address to send a tip"
        className={`inline-flex items-center gap-1.5 px-3 py-1 border-2 border-black font-mono text-[9px] font-bold uppercase tracking-wider text-black transition-all cursor-pointer shadow-[2px_2px_0px_#0a0a0a] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#0a0a0a] ${
          copied ? 'bg-[#22c55e]' : 'bg-[#FFD600] hover:bg-[#ffe240]'
        }`}
      >
        <span className="text-xs leading-none">⟠</span>

        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="copied"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="inline-flex items-center gap-1"
            >
              <Check size={11} /> Copied!
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="inline-flex items-center gap-1"
            >
              {ETH_SHORT} <Copy size={10} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <span className="text-[8px] text-[#666666] font-mono font-bold uppercase tracking-wider">
        tap to copy · send ETH
      </span>
    </div>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = ({ theme }) => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-border overflow-hidden">
      {/* Top heavy border */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--border-color)]" />

      <ScrollReveal variant="fade-up" className="container mx-auto px-5 sm:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-3">
              <img
                src="/light.png"
                alt="Saurabh Jadhav"
                className="h-7 w-auto object-contain"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            <p className="text-muted-1 text-xs max-w-xs text-center md:text-left leading-relaxed">
              Software Developer — Building scalable apps &amp; intelligent systems.
            </p>
            <div className="flex gap-1">
              <div className="w-8 h-[3px] bg-[var(--border-color)]" />
              <div className="w-8 h-[3px] bg-[#FFD600]" />
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((name) => (
              <a
                key={name}
                href={`#${name.toLowerCase()}`}
                className="text-xs text-muted-1 hover:text-primary transition-colors tracking-wider"
              >
                {name}
              </a>
            ))}
          </nav>

          {/* Socials + scroll-to-top */}
          <div className="flex items-center gap-3">
            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="w-9 h-9 rounded-none border-2 border-black flex items-center justify-center text-black bg-white hover:bg-[#FFD600] transition-all duration-150 block shadow-[2px_2px_0px_#0a0a0a] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#0a0a0a]"
              >
                {s.icon}
              </motion.a>
            ))}
            <div className="w-px h-5 bg-black mx-1" />
            <motion.button
              onClick={scrollTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-none border-2 border-black flex items-center justify-center text-black bg-white hover:bg-[#FFD600] transition-all shadow-[2px_2px_0px_#0a0a0a] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#0a0a0a]"
              aria-label="Scroll to top"
            >
              <ArrowUp size={14} />
            </motion.button>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-muted-1 text-center sm:text-left">
          <span className="text-center sm:text-left">
            © {new Date().getFullYear()} Saurabh Jadhav. All rights reserved.
          </span>

          <span className="flex items-center justify-center sm:justify-start gap-1.5">
            <EthTipButton />
          </span>
        </div>
      </ScrollReveal>
    </footer>
  );
};

export default Footer;
