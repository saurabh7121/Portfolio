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
              {/* Main brutalist bar */}
              <div
                className="flex items-center justify-between bg-white border-2 border-[#0a0a0a] p-0 shadow-[6px_6px_0px_#0a0a0a] h-14 w-full overflow-hidden"
              >
                {/* Logo Block */}
                <a
                  href={resolveHref('#home')}
                  className="h-full px-6 flex items-center justify-center border-r-2 border-[#0a0a0a] bg-transparent hover:bg-[#f5f5f0] transition-colors duration-150 select-none"
                >
                  <img
                    src="/light.png"
                    alt="Saurabh Jadhav"
                    className="h-7 w-auto object-contain"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </a>

                {/* Desktop links */}
                <div className="hidden lg:flex items-center h-full">
                  {navLinks.map((link) => {
                    const isActive = link.isRoute
                      ? active === 'blogs'
                      : active === link.href.slice(1);
                    return link.isRoute ? (
                      <Link
                        key={link.name}
                        to={link.href}
                        className={`h-full px-6 flex items-center justify-center border-r-2 border-[#0a0a0a] text-xs font-black uppercase tracking-wider transition-colors duration-150 ${
                          isActive ? 'bg-[#FFD600] text-[#0a0a0a]' : 'text-[#0a0a0a] hover:bg-[#f5f5f0]'
                        }`}
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        key={link.name}
                        href={resolveHref(link.href)}
                        className={`h-full px-6 flex items-center justify-center border-r-2 border-[#0a0a0a] text-xs font-black uppercase tracking-wider transition-colors duration-150 ${
                          isActive ? 'bg-[#FFD600] text-[#0a0a0a]' : 'text-[#0a0a0a] hover:bg-[#f5f5f0]'
                        }`}
                      >
                        {link.name}
                      </a>
                    );
                  })}
                </div>

                {/* Right Actions */}
                <div className="flex items-center h-full">
                  {/* Search toggle */}
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="hidden sm:flex h-full w-14 items-center justify-center border-l-2 border-[#0a0a0a] hover:bg-[#FFD600] cursor-pointer transition-colors duration-150 text-[#0a0a0a]"
                    aria-label="Search"
                  >
                    <Search size={16} />
                  </button>

                  {/* Theme toggle switch */}
                  <button
                    onClick={toggleTheme}
                    className="h-full w-14 flex items-center justify-center border-l-2 border-[#0a0a0a] hover:bg-[#FFD600] cursor-pointer transition-colors duration-150 text-[#0a0a0a]"
                    aria-label="Toggle theme"
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
                        {theme === 'dark' ? (
                          <Sun size={16} />
                        ) : (
                          <Moon size={16} />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </button>

                  {/* Hire Me Block */}
                  <a
                    href={resolveHref('#contact')}
                    className="hidden sm:flex h-full px-6 items-center justify-center bg-[#0a0a0a] text-white hover:bg-[#FFD600] hover:text-[#0a0a0a] border-l-2 border-[#0a0a0a] transition-colors duration-150 text-xs font-black uppercase tracking-wider"
                  >
                    Hire Me
                  </a>

                  {/* Hamburger Menu on Mobile */}
                  <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="lg:hidden h-full w-14 flex items-center justify-center border-l-2 border-[#0a0a0a] hover:bg-[#FFD600] cursor-pointer transition-colors duration-150 text-[#0a0a0a]"
                    aria-label="Toggle menu"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={mobileOpen ? 'x' : 'menu'}
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

              {/* Mobile Dropdown */}
              <AnimatePresence>
                {mobileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-[#0a0a0a] p-5 shadow-[6px_6px_0px_#0a0a0a] lg:hidden z-50"
                  >
                    <div className="flex flex-col gap-2">
                      {navLinks.map((link, i) => {
                        const isActive = link.isRoute
                          ? active === 'blogs'
                          : active === link.href.slice(1);
                        const cls = `px-4 py-3 text-xs font-black uppercase tracking-wider border-2 border-[#0a0a0a] transition-all block text-center ${
                          isActive
                            ? 'bg-[#FFD600] text-[#0a0a0a] shadow-[3px_3px_0px_#0a0a0a]'
                            : 'bg-white text-[#0a0a0a] hover:bg-[#f5f5f0] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#0a0a0a]'
                        }`;
                        return link.isRoute ? (
                          <motion.div
                            key={link.name}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.03 }}
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
                            transition={{ delay: i * 0.03 }}
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
                        className="w-full flex items-center justify-between px-4 py-3 border-2 border-[#0a0a0a] text-xs font-black uppercase tracking-wider text-[#0a0a0a] bg-white hover:bg-[#FFD600] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#0a0a0a] transition-all"
                      >
                        <span className="flex items-center gap-2"><Search size={16} /> Search</span>
                        <span className="text-[10px] font-mono opacity-60">Ctrl K</span>
                      </button>

                      <div className="pt-4 flex items-center justify-between border-t-2 border-[#0a0a0a] mt-2">
                        <div className="flex gap-2">
                          <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noopener noreferrer"
                            className="w-10 h-10 border-2 border-[#0a0a0a] flex items-center justify-center text-[#0a0a0a] hover:bg-[#FFD600] transition-colors">
                            <FaGithub size={18} />
                          </a>
                          <a href="https://www.linkedin.com/in/jadhavsau777/" target="_blank" rel="noopener noreferrer"
                            className="w-10 h-10 border-2 border-[#0a0a0a] flex items-center justify-center text-[#0a0a0a] hover:bg-[#FFD600] transition-colors">
                            <FaLinkedin size={18} />
                          </a>
                        </div>
                        <a href={resolveHref('#contact')}
                          onClick={() => setMobileOpen(false)}
                          className="h-10 px-5 flex items-center justify-center bg-[#0a0a0a] text-white hover:bg-[#FFD600] hover:text-[#0a0a0a] border-2 border-[#0a0a0a] transition-colors text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#0a0a0a]"
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
      
      {/* Search Modal rendered outside of Navbar animation to avoid layout issues */}
      {searchOpen && (
        <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      )}
    </AnimatePresence>
  );
};

export default Navbar;
