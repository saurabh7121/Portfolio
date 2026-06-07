import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Calendar, Tag } from 'lucide-react';
import { blogs } from '../data/blogsData';

// ─── Stagger animation variants ───────────────────────────────────────────────
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Blog Card ────────────────────────────────────────────────────────────────
const BlogCard = ({ post, index }) => {
  const cardRef = useRef(null);

  // Mouse-glow effect (same pattern used by .card in index.css)
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <motion.article variants={item}>
      <Link
        to={`/blogs/${post.slug}`}
        ref={cardRef}
        className="card group block p-7 hover:no-underline focus-visible:outline-none"
        aria-label={`Read blog post: ${post.title}`}
      >
        {/* Emoji cover accent */}
        <div
          style={{
            fontSize: '2.6rem',
            lineHeight: 1,
            marginBottom: '1.25rem',
            display: 'inline-block',
            transition: 'transform 0.35s ease',
          }}
          className="group-hover:scale-110"
        >
          {post.coverEmoji}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="section-label"
              style={{ marginBottom: 0, fontSize: '0.6rem' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2
          className="text-primary font-bold leading-snug mb-3 group-hover:text-gradient-blue"
          style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)', transition: 'all 0.3s' }}
        >
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-muted-1 text-sm leading-relaxed mb-5">{post.excerpt}</p>

        {/* Meta row */}
        <div
          className="flex items-center justify-between"
          style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}
        >
          <div className="flex items-center gap-4 text-muted-1" style={{ fontSize: '0.72rem' }}>
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              {post.readTime}
            </span>
          </div>

          <span
            className="flex items-center gap-1 font-semibold text-xs text-muted-1 group-hover:text-primary transition-colors"
          >
            Read <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
};

// ─── Blogs Page ───────────────────────────────────────────────────────────────
const Blogs = () => {
  // Sort newest first
  const sorted = [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--bg-main)', paddingTop: '6rem', paddingBottom: '5rem' }}
    >
      <div className="container mx-auto px-5 max-w-5xl">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <span className="section-label">
            <Tag size={11} /> Writing
          </span>

          <h1
            className="font-black text-primary leading-tight tracking-tighter"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', marginBottom: '1rem' }}
          >
            Blog
          </h1>

          <p className="text-muted-1 text-base leading-relaxed" style={{ maxWidth: '520px' }}>
            Thoughts on software, design, and lessons learned while building.
          </p>

          {/* Divider */}
          <div className="section-divider" />
        </motion.div>

        {/* ── Grid ── */}
        {sorted.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted-1 text-center py-24"
          >
            No posts yet — check back soon.
          </motion.p>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {sorted.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </motion.div>
        )}

        {/* ── Back link ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Link to="/" className="btn-outline text-xs py-3 px-6">
            ← Back to Portfolio
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Blogs;
