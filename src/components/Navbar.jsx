
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Search } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import SearchModal from './SearchModal';

const hashLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

const navLinks = [...hashLinks];

const Navbar = ({ theme, toggleTheme }) => {
  const githubUsername = process.env.GITHUB_USERNAME || 'saurabh7121';
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [searchOpen, setSearchOpen] = useState(false);

  const lastY = useRef(0);
  const isDark = theme === 'dark';

  const isBlogRoute = location.pathname.startsWith('/blogs');

  const resolveHref = (href) => {
    if (href.startsWith('#') && location.pathname !== '/') {
      return `/${href}`;
    }

    return href;
  };

  useEffect(() => {
    if (isBlogRoute) {
      setActive('blogs');
      return;
    }

    const handleScroll = () => {
      const y = window.scrollY;

      setScrolled(y > 40);
      setVisible(y < lastY.current || y < 80);
      lastY.current = y;

      const sections = hashLinks.map((link) => link.href.slice(1));

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);

        if (element && window.scrollY >= element.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isBlogRoute]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(true);
        setMobileOpen(false);
      }

      if (event.key === 'Escape') {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItemClass = (isActive) =>
    `flex h-full items-center justify-center border-r-2 border-black px-4 text-xs font-black uppercase tracking-wider transition-colors duration-150 sm:px-5 xl:px-6 dark:border-white ${
      isActive
        ? 'bg-[#FFD600] text-black'
        : 'text-black hover:bg-neutral-100 dark:text-white dark:hover:bg-[#222222]'
    }`;

  const actionButtonClass =
    'flex h-full w-12 cursor-pointer items-center justify-center border-l-2 border-black text-black transition-colors duration-150 hover:bg-[#FFD600] sm:w-14 dark:border-white dark:text-white dark:hover:text-black';

  const mobileLinkClass = (isActive) =>
    `block w-full border-2 border-black px-4 py-3 text-center text-xs font-black uppercase tracking-wider transition-all duration-150 dark:border-white ${
      isActive
        ? 'bg-[#FFD600] text-black shadow-[3px_3px_0px_#0a0a0a] dark:shadow-[3px_3px_0px_#ffffff]'
        : 'bg-white text-black hover:translate-x-[-1px] hover:translate-y-[-1px] hover:bg-neutral-100 hover:shadow-[3px_3px_0px_#0a0a0a] dark:bg-[#090909] dark:text-white dark:hover:bg-[#222222] dark:hover:shadow-[3px_3px_0px_#ffffff]'
    }`;

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="fixed left-0 top-0 z-50 flex w-full justify-center px-4 pt-5"
          >
            <div className="relative w-full max-w-6xl">
              {/* Main navigation bar */}
              <div
                className={`flex h-14 w-full items-center justify-between overflow-hidden border-2 border-black transition-colors duration-300 dark:border-white ${
                  isDark
                    ? 'bg-black shadow-[6px_6px_0px_#ffffff]'
                    : 'bg-white shadow-[6px_6px_0px_#0a0a0a]'
                }`}
              >
                {/* Logo */}
                <a
                  href={resolveHref('#home')}
                  aria-label="Go to homepage"
                  className="flex h-full shrink-0 items-center justify-center border-r-2 border-black bg-transparent px-4 transition-colors hover:bg-neutral-100 sm:px-6 dark:border-white dark:hover:bg-[#222222]"
                >
                  <img
                    src={isDark ? '/dark.png' : '/light.png'}
                    alt="Saurabh Jadhav"
                    className="h-7 w-auto object-contain"
                    onError={(event) => {
                      event.currentTarget.style.display = 'none';
                    }}
                  />
                </a>

                {/* Desktop navigation links */}
                <div className="hidden h-full items-center lg:flex">
                  {navLinks.map((link) => {
                    const isActive = active === link.href.slice(1);

                    return (
                      <a
                        key={link.name}
                        href={resolveHref(link.href)}
                        className={navItemClass(isActive)}
                      >
                        {link.name}
                      </a>
                    );
                  })}
                </div>

                {/* Right-side actions */}
                <div className="flex h-full shrink-0 items-center">
                  {/* Desktop search */}
                  <button
                    type="button"
                    onClick={() => setSearchOpen(true)}
                    className={`hidden sm:flex ${actionButtonClass}`}
                    aria-label="Search"
                    title="Search (Ctrl+K)"
                  >
                    <Search size={16} />
                  </button>

                  {/* Theme toggle */}
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className={actionButtonClass}
                    aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                    title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={theme}
                        initial={{ y: -10, opacity: 0, rotate: -45 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: 10, opacity: 0, rotate: 45 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center justify-center"
                      >
                        {isDark ? <Sun size={16} /> : <Moon size={16} />}
                      </motion.div>
                    </AnimatePresence>
                  </button>

                  {/* Hire me */}
                  <a
                    href={resolveHref('#contact')}
                    className="hidden h-full items-center justify-center border-l-2 border-black bg-black px-6 text-xs font-black uppercase tracking-wider text-white transition-colors hover:bg-[#FFD600] hover:text-black sm:flex dark:border-white dark:bg-white dark:text-black dark:hover:bg-[#FFD600]"
                  >
                    Hire Me
                  </a>

                  {/* Mobile menu toggle */}
                  <button
                    type="button"
                    onClick={() => setMobileOpen((open) => !open)}
                    className={`flex h-full w-12 cursor-pointer items-center justify-center border-l-2 border-black transition-colors hover:bg-[#FFD600] hover:text-black lg:hidden sm:w-14 dark:border-white ${
                      isDark ? 'text-white' : 'text-black'
                    }`}
                    aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={mobileOpen}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={mobileOpen ? 'close' : 'menu'}
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.12 }}
                      >
                        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                      </motion.div>
                    </AnimatePresence>
                  </button>
                </div>
              </div>

              {/* Mobile dropdown */}
              <AnimatePresence>
                {mobileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute left-0 right-0 top-full z-50 mt-2 border-2 border-black p-5 lg:hidden dark:border-white ${
                      isDark
                        ? 'bg-black shadow-[6px_6px_0px_#ffffff]'
                        : 'bg-white shadow-[6px_6px_0px_#0a0a0a]'
                    }`}
                  >
                    <div className="flex flex-col gap-2">
                      {navLinks.map((link, index) => {
                        const isActive = active === link.href.slice(1);

                        return (
                          <motion.a
                            key={link.name}
                            href={resolveHref(link.href)}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.03 }}
                            onClick={() => setMobileOpen(false)}
                            className={mobileLinkClass(isActive)}
                          >
                            {link.name}
                          </motion.a>
                        );
                      })}

                      {/* Mobile search */}
                      <button
                        type="button"
                        onClick={() => {
                          setMobileOpen(false);
                          setSearchOpen(true);
                        }}
                        className={`flex w-full items-center justify-between border-2 border-black px-4 py-3 text-xs font-black uppercase tracking-wider transition-colors hover:bg-[#FFD600] hover:text-black dark:border-white ${
                          isDark
                            ? 'bg-[#090909] text-white'
                            : 'bg-white text-black'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Search size={16} />
                          Search
                        </span>
                        <span className="font-mono text-[10px] opacity-60">
                          Ctrl K
                        </span>
                      </button>

                      {/* Social links and contact */}
                      <div
                        className={`mt-2 flex items-center justify-between border-t-2 pt-4 ${
                          isDark ? 'border-white' : 'border-black'
                        }`}
                      >
                        <div className="flex gap-2">
                          <a
                            href={`https://github.com/${githubUsername}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className={`flex h-10 w-10 items-center justify-center border-2 border-black transition-colors hover:bg-[#FFD600] hover:text-black dark:border-white ${
                              isDark ? 'text-white' : 'text-black'
                            }`}
                          >
                            <FaGithub size={18} />
                          </a>

                          <a
                            href="https://www.linkedin.com/in/jadhavsau777/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className={`flex h-10 w-10 items-center justify-center border-2 border-black transition-colors hover:bg-[#FFD600] hover:text-black dark:border-white ${
                              isDark ? 'text-white' : 'text-black'
                            }`}
                          >
                            <FaLinkedin size={18} />
                          </a>
                        </div>

                        <a
                          href={resolveHref('#contact')}
                          onClick={() => setMobileOpen(false)}
                          className={`flex h-10 items-center justify-center border-2 px-5 text-xs font-black uppercase tracking-wider transition-colors hover:bg-[#FFD600] hover:text-black ${
                            isDark
                              ? 'border-white bg-white text-black shadow-[3px_3px_0px_#ffffff]'
                              : 'border-black bg-black text-white shadow-[3px_3px_0px_#0a0a0a]'
                          }`}
                        >
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

      {/* Search modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
};

export default Navbar;
