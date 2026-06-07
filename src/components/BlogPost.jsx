import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';
import { blogs } from '../data/blogsData';

// Simple markdown renderer for the blog content
const renderContent = (content) => {
  if (!content) return null;
  
  const paragraphs = content.split('\n\n');
  return paragraphs.map((para, i) => {
    // Shared animation props for blocks
    const animProps = {
      initial: { opacity: 0, y: 15 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-40px" },
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    };

    // Headings
    if (para.startsWith('## ')) {
      return (
        <motion.h2 {...animProps} key={i} className="text-2xl font-bold text-primary mt-10 mb-5">
          {para.replace('## ', '')}
        </motion.h2>
      );
    }
    // Blockquotes
    if (para.startsWith('> ')) {
      return (
        <motion.blockquote {...animProps} key={i} className="border-l-4 border-blue-500 pl-4 italic text-muted-1 my-6 py-1 bg-blue-500/5 rounded-r-lg">
          {para.replace('> ', '')}
        </motion.blockquote>
      );
    }
    // Code blocks
    if (para.startsWith('```')) {
      const code = para.replace(/```\w*\n?/, '').replace(/\n?```$/, '');
      return (
        <motion.div {...animProps} key={i} className="bg-[#0f172a] rounded-xl my-8 overflow-hidden border border-white/10 shadow-xl">
          <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
          </div>
          <div className="p-5 overflow-x-auto">
            <code className="text-[13px] text-blue-200 font-mono whitespace-pre">{code}</code>
          </div>
        </motion.div>
      );
    }
    // Lists
    if (para.startsWith('- ')) {
      const items = para.split('\n').map(item => item.replace('- ', ''));
      return (
        <motion.ul {...animProps} key={i} className="list-disc list-inside space-y-2 text-muted-1 my-4 ml-4">
          {items.map((item, j) => <li key={j}>{item}</li>)}
        </motion.ul>
      );
    }
    
    // Normal paragraph with basic inline formatting
    let formattedText = para;
    // Basic bold parsing: **bold**
    const parts = formattedText.split(/(\*\*.*?\*\*)/g);
    
    return (
      <motion.p {...animProps} key={i} className="text-muted-1 text-base leading-relaxed mb-6">
        {parts.map((part, index) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index} className="text-primary font-semibold">{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
      </motion.p>
    );
  });
};

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = React.useState(0);
  
  const post = blogs.find(b => b.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(scroll);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl text-primary font-bold mb-4">Post Not Found</h1>
        <button onClick={() => navigate('/blogs')} className="btn-outline mt-4">Return to Blogs</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 relative z-10" style={{ paddingTop: '8rem' }}>
      {/* Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-red-500 to-blue-500 z-50 origin-left"
        style={{ scaleX: scrollProgress, width: '100%' }}
      />
      
      <article className="container mx-auto px-5 max-w-4xl">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto"
        >
          <Link to="/blogs" className="inline-flex items-center gap-2 text-sm text-muted-1 hover:text-primary transition-colors mb-12 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to all posts
          </Link>
          
          <div className="text-[5rem] leading-none mb-8 filter drop-shadow-lg">{post.coverEmoji}</div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span key={tag} className="section-label" style={{ marginBottom: 0, fontSize: '0.65rem' }}>
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-primary leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-muted-1 border-b border-border pb-8 mb-12">
            <span className="flex items-center gap-2"><Calendar size={14} /> {post.date}</span>
            <span className="flex items-center gap-2"><Clock size={14} /> {post.readTime}</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="glass rounded-3xl p-6 sm:p-10 md:p-14 border border-border shadow-2xl relative overflow-hidden"
        >
          {/* Subtle noise inside the card for texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")` }} />
          
          <div className="post-content relative z-10 max-w-3xl mx-auto">
            {renderContent(post.content)}
          </div>
        </motion.div>
        
      </article>
    </div>
  );
};

export default BlogPost;
