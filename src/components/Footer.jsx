import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowUp, Globe, Copy, Check } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
      <motion.button
        onClick={handleCopy}
        whileHover={{ scale: 1.05, y: -1 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Copy Ethereum address to send a tip"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '7px',
          padding: '6px 14px',
          borderRadius: '999px',
          background: copied ? 'rgba(34,197,94,0.08)' : 'rgba(99,102,241,0.08)',
          border: copied
            ? '1px solid rgba(34,197,94,0.3)'
            : '1px solid rgba(99,102,241,0.28)',
          color: copied ? '#4ade80' : '#818cf8',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.04em',
          cursor: 'pointer',
          transition: 'background 0.25s, border-color 0.25s, color 0.25s',
          whiteSpace: 'nowrap',
        }}
      >
        {/* Ethereum diamond glyph */}
        <span style={{ fontSize: '13px', lineHeight: 1 }}>⟠</span>

        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="copied"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
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
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              {ETH_SHORT} <Copy size={10} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Hint label */}
      <span style={{ fontSize: '9px', color: 'var(--text-muted-2)', letterSpacing: '0.08em' }}>
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
      {/* Top gradient border */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#ef4444]/40 to-transparent" />

      {/* Ambient glows */}
      <div className="absolute bottom-0 left-0 w-64 h-32 bg-[#ef4444] opacity-[0.03] blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-32 bg-[#3b82f6] opacity-[0.03] blur-[80px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-3">
              <img
                src={theme === 'dark' ? '/dark.png' : '/light.png'}
                alt="Saurabh Jadhav"
                className="h-7 w-auto object-contain"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <span className="font-black text-primary text-sm tracking-widest">SAURABH JADHAV</span>
            </div>
            <p className="text-muted-1 text-xs max-w-xs text-center md:text-left leading-relaxed">
              Software Developer — Building scalable apps &amp; intelligent systems.
            </p>
            {/* Red-Blue divider */}
            <div className="flex gap-1">
              <div className="w-6 h-[2px] rounded-full bg-[#ef4444]" />
              <div className="w-6 h-[2px] rounded-full bg-[#3b82f6]" />
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
          <div className="flex items-center gap-4">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-1 hover:text-primary transition-colors"
              >
                {s.icon}
              </a>
            ))}
            <div className="w-px h-4 bg-border" />
            <motion.button
              onClick={scrollTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-xl glass-sm border border-border flex items-center justify-center text-muted-1 hover:text-primary transition-all"
              aria-label="Scroll to top"
            >
              <ArrowUp size={14} />
            </motion.button>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-muted-1">
          <span>
            © {new Date().getFullYear()} Saurabh Jadhav. All rights reserved.
          </span>

          {/* ETH Wallet Tip Button */}
          <EthTipButton />

          {/* Buy Me a Coffee — commented out, replaced by ETH wallet above */}
          {/* <motion.a href="https://www.buymeacoffee.com/jadhavsaurabh" ... /> */}

          <span className="flex items-center gap-1.5">
            Built with <Heart size={11} className="text-[#ef4444] fill-[#ef4444]" /> using React &amp; Three.js
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
