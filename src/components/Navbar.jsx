import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const navLinks = [
  { name: 'Home',       href: '#home' },
  { name: 'About',      href: '#about' },
  { name: 'Services',   href: '#services' },
  { name: 'Projects',   href: '#projects' },
  { name: 'Skills',     href: '#skills' },
  { name: 'Contact',    href: '#contact' },
];

const Navbar = () => {
  const githubUsername = process.env.GITHUB_USERNAME || 'saurabh7121';
  const [scrolled, setScrolled]     = useState(false);
  const [visible, setVisible]       = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive]         = useState('home');
  const lastY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setVisible(y < lastY.current || y < 80);
      lastY.current = y;

      // Track active section
      const sections = navLinks.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="fixed top-0 left-0 w-full z-50 flex justify-center px-4 pt-5"
        >
          <div className="w-full max-w-6xl relative">
            {/* Main bar */}
            <div
              className={`flex items-center justify-between transition-all duration-500 ${
                scrolled
                  ? 'glass-dark rounded-2xl px-5 py-3 shadow-2xl'
                  : 'px-2 py-2'
              }`}
            >
              {/* Logo */}
              <motion.a
                href="#home"
                whileHover={{ scale: 1.04 }}
                className="flex items-center gap-2 select-none"
              >
                <img
                  src="/logo.png"
                  alt="Saurabh Jadhav"
                  className="h-8 w-auto object-contain"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <span className="font-black text-white text-sm tracking-widest uppercase hidden sm:block">
                  
                </span>
              </motion.a>

              {/* Desktop links */}
              <div className="hidden lg:flex items-center gap-1 glass rounded-full px-2 py-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`nav-pill ${active === link.href.slice(1) ? 'active' : ''}`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Right actions */}
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-3 pr-4 border-r border-white/10">
                  <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noopener noreferrer"
                    className="text-[#71717a] hover:text-white transition-colors duration-200">
                    <FaGithub size={17} />
                  </a>
                  <a href="https://www.linkedin.com/in/jadhavsau777/" target="_blank" rel="noopener noreferrer"
                    className="text-[#71717a] hover:text-[#3b82f6] transition-colors duration-200">
                    <FaLinkedin size={17} />
                  </a>
                </div>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="hidden sm:flex btn-primary py-2 px-5 text-[11px]"
                >
                  Hire Me
                </motion.a>

                {/* Hamburger */}
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl glass-sm text-white border border-white/10"
                  aria-label="Toggle menu"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={mobileOpen ? 'x' : 'menu'}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                    </motion.div>
                  </AnimatePresence>
                </button>
              </div>
            </div>

            {/* Mobile Dropdown */}
            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-2 glass-dark rounded-2xl p-5 border border-white/08 shadow-2xl lg:hidden"
                >
                  <div className="flex flex-col gap-1">
                    {navLinks.map((link, i) => (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        onClick={() => setMobileOpen(false)}
                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all border ${
                          active === link.href.slice(1)
                            ? 'text-white bg-white/05 border-white/10'
                            : 'text-[#a1a1aa] border-transparent hover:text-white hover:bg-white/03'
                        }`}
                      >
                        {link.name}
                      </motion.a>
                    ))}
                    <div className="pt-3 flex gap-3 border-t border-white/05 mt-2">
                      <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noopener noreferrer"
                        className="text-[#71717a] hover:text-white transition-colors"><FaGithub size={18} /></a>
                      <a href="https://www.linkedin.com/in/jadhavsau777/" target="_blank" rel="noopener noreferrer"
                        className="text-[#71717a] hover:text-[#3b82f6] transition-colors"><FaLinkedin size={18} /></a>
                      <a href="#contact"
                        onClick={() => setMobileOpen(false)}
                        className="ml-auto btn-primary py-2 px-4 text-[11px]">
                        Hire Me
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
