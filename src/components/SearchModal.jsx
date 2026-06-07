import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, FileText, Home, User, Briefcase, Code, Zap, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const hashLinks = [
  { name: 'Home', href: '/#home', icon: Home },
  { name: 'About', href: '/#about', icon: User },
  { name: 'Services', href: '/#services', icon: Briefcase },
  { name: 'Projects', href: '/#projects', icon: Code },
  { name: 'Skills', href: '/#skills', icon: Zap },
  { name: 'Contact', href: '/#contact', icon: Mail },
];

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter data
  const filteredLinks = hashLinks.filter((l) =>
    l.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path) => {
    onClose();
    if (path.startsWith('/#')) {
      const hash = path.substring(1);
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-start justify-center pt-[10vh] px-4 sm:px-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-xl bg-[var(--bg-main)] border border-[var(--border-color)] rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border-color)] bg-[var(--card-bg)]">
            <Search size={18} className="text-[var(--text-muted-1)]" />
            <input
              type="text"
              autoFocus
              placeholder="Search sections..."
              className="flex-1 bg-transparent border-none outline-none text-[var(--text-main)] text-sm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-[var(--primary-color-alpha)] text-[var(--text-muted-1)] transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto custom-scrollbar p-2">
            {query.trim() === '' ? (
              <div className="py-12 text-center text-sm text-[var(--text-muted-1)]">
                Start typing to search...
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                {filteredLinks.length > 0 && (
                  <div className="mb-2">
                    <div className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--text-muted-2)]">
                      Sections
                    </div>
                    {filteredLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <button
                          key={link.name}
                          onClick={() => handleSelect(link.href)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-[var(--input-bg)] transition-colors group"
                        >
                          <Icon size={16} className="text-[#3b82f6] group-hover:scale-110 transition-transform" />
                          <span className="text-sm font-medium text-[var(--text-main)]">{link.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {filteredLinks.length === 0 && (
                  <div className="py-10 text-center text-sm text-[var(--text-muted-1)]">
                    No results found for "{query}"
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="px-4 py-2 border-t border-[var(--border-color)] bg-[var(--input-bg)] text-[10px] text-[var(--text-muted-2)] flex justify-between">
            <span>Navigation Menu</span>
            <span>Press <kbd className="px-1.5 py-0.5 rounded border border-[var(--border-color)] bg-[var(--bg-main)]">ESC</kbd> to close</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchModal;
