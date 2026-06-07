import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Search } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import SearchModal from './SearchModal';

const hashLinks = [
  { name: 'Home',       href: '#home' },
  { name: 'About',      href: '#about' },
  { name: 'Services',   href: '#services' },
  { name: 'Projects',   href: '#projects' },
  { name: 'Skills',     href: '#skills' },
  { name: 'Contact',    href: '#contact' },
];

// The Blog link uses a full route, not a hash
// const BLOG_LINK = { name: 'Blog', href: '/blogs', isRoute: true };
const navLinks = [...hashLinks];

const Navbar = ({ theme, toggleTheme }) => {
  const githubUsername = process.env.GITHUB_USERNAME || 'saurabh7121';
  const location = useLocation();
  const [scrolled, setScrolled]     = useState(false);
  const [visible, setVisible]       = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive]         = useState('home');
  const [searchOpen, setSearchOpen] = useState(false);
  const lastY = useRef(0);

  const isBlogRoute = location.pathname.startsWith('/blogs');

  /**
   * resolveHref — ensures hash links always resolve to the home page.
   *
   * Bare `#hash` hrefs are relative to the current URL path.
   * From `/blogs`, clicking `#skills` would navigate to `/blogs#skills`.
   * Prefixing with `/` makes it `/#skills` — always the home page section.
   */
  const resolveHref = (href) => {
    if (href.startsWith('#') && location.pathname !== '/') return '/' + href;
    return href;
  };

  useEffect(() => {
    // On blog pages, mark Blog as active without scroll tracking
    if (isBlogRoute) { setActive('blogs'); return; }

    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setVisible(y < lastY.current || y < 80);
      lastY.current = y;

      // Track active section
      const sections = hashLinks.map(l => l.href.slice(1));
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
  }, [isBlogRoute]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
                href={resolveHref('#home')}
                whileHover={{ scale: 1.04 }}
                className="flex items-center gap-2 select-none"
              >
                <img
                  src={theme === 'dark' ? '/dark.png' : '/light.png'}
                  alt="Saurabh Jadhav"
                  className="h-8 w-auto object-contain"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <span className="font-black text-primary text-sm tracking-widest uppercase hidden sm:block">
                  
                </span>
              </motion.a>

              {/* Desktop links */}
              <div className="hidden lg:flex items-center gap-1 glass rounded-full px-2 py-1">
                {navLinks.map((link) => {
                  const isActive = link.isRoute
                    ? active === 'blogs'
                    : active === link.href.slice(1);
                  const cls = `nav-pill ${isActive ? 'active' : ''}`;
                  return link.isRoute ? (
                    <Link key={link.name} to={link.href} className={cls}>
                      {link.name}
                    </Link>
                  ) : (
                    <a key={link.name} href={resolveHref(link.href)} className={cls}>
                      {link.name}
                    </a>
                  );
                })}
              </div>

              {/* Right actions */}
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-3 pr-4 border-r border-border">
                  <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noopener noreferrer"
                    className="text-muted-1 hover:text-primary transition-colors duration-200">
                    <FaGithub size={17} />
                  </a>
                  <a href="https://www.linkedin.com/in/jadhavsau777/" target="_blank" rel="noopener noreferrer"
                    className="text-muted-1 hover:text-[#3b82f6] transition-colors duration-200">
                    <FaLinkedin size={17} />
                  </a>
                </div>

                {/* Search Toggle */}
                <motion.button
                  onClick={() => setSearchOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden sm:flex items-center gap-2 px-3 h-9 rounded-xl glass-sm text-muted-1 hover:text-primary border border-border cursor-pointer transition-colors duration-200"
                  aria-label="Search"
                >
                  <Search size={14} />
                  <span className="text-[10px] font-mono opacity-60">Ctrl K</span>
                </motion.button>

                {/* Theme toggle switch */}
                <motion.button
                  onClick={toggleTheme}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 flex items-center justify-center rounded-xl glass-sm text-primary border border-border cursor-pointer transition-colors duration-200"
                  aria-label="Toggle theme"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={theme}
                      initial={{ y: -10, opacity: 0, rotate: -45 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      exit={{ y: 10, opacity: 0, rotate: 45 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-center"
                    >
                      {theme === 'dark' ? (
                        <Sun size={17} className="text-amber-400" />
                      ) : (
                        <Moon size={17} className="text-slate-700" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>

                <motion.a
                  href={resolveHref('#contact')}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="hidden sm:flex btn-primary py-2 px-5 text-[11px]"
                >
                  Hire Me
                </motion.a>

                {/* Hamburger */}
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl glass-sm text-primary border border-border"
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
                  className="absolute top-full left-0 right-0 mt-2 glass-dark rounded-2xl p-5 border border-border shadow-2xl lg:hidden"
                >
                  <div className="flex flex-col gap-1">
                    {navLinks.map((link, i) => {
                      const isActive = link.isRoute
                        ? active === 'blogs'
                        : active === link.href.slice(1);
                      const cls = `px-4 py-3 rounded-xl text-sm font-medium transition-all border ${isActive ? 'text-primary bg-primary/5 border-border' : 'text-muted-1 border-transparent hover:text-primary hover:bg-primary/5'}`;
                      return link.isRoute ? (
                        <motion.div
                          key={link.name}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                        >
                          <Link to={link.href} className={cls} onClick={() => setMobileOpen(false)}>
                            {link.name}
                          </Link>
                        </motion.div>
                      ) : (
                        <motion.a
                          key={link.name}
                          href={resolveHref(link.href)}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          onClick={() => setMobileOpen(false)}
                          className={cls}
                        >
                          {link.name}
                        </motion.a>
                      );
                    })}
                    
                    {/* Mobile Search Button */}
                    <button
                      onClick={() => { setMobileOpen(false); setSearchOpen(true); }}
                      className="mt-2 w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all border border-border text-muted-1 hover:text-primary hover:bg-primary/5"
                    >
                      <span className="flex items-center gap-2"><Search size={16} /> Search</span>
                    </button>

                    <div className="pt-3 flex gap-3 border-t border-border mt-2">
                      <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noopener noreferrer"
                        className="text-muted-1 hover:text-primary transition-colors"><FaGithub size={18} /></a>
                      <a href="https://www.linkedin.com/in/jadhavsau777/" target="_blank" rel="noopener noreferrer"
                        className="text-muted-1 hover:text-[#3b82f6] transition-colors"><FaLinkedin size={18} /></a>
                      <a href={resolveHref('#contact')}
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
      
      {/* Search Modal rendered outside of Navbar animation to avoid layout issues */}
      {searchOpen && (
        <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      )}
    </AnimatePresence>
  );
};

export default Navbar;
