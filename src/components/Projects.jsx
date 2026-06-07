import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, FolderOpen, ChevronRight, Terminal, Search, Star, GitFork, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

import { projects } from '../data/projectsData';

/* Code preview card replacing the image */
const CodePreview = ({ project }) => (
  <div
    className="h-48 sm:h-52 relative overflow-hidden flex flex-col justify-between"
    style={{ background: project.pattern, backgroundColor: 'var(--card-bg-solid)' }}
  >
    {/* Subtle grid */}
    <div className="absolute inset-0 bg-grid-pattern opacity-20" />

    {/* Header bar */}
    <div className="relative z-10 flex items-center gap-2 px-4 pt-4 pb-2">
      <div className="flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
        <div className="w-2 h-2 rounded-full bg-[#f59e0b]" />
        <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
      </div>
      <div className="flex-1 text-center">
        <span className="text-[9px] font-mono text-muted-1 tracking-wider">
          {project.title.toLowerCase().replace(/ /g, '_')}.sh
        </span>
      </div>
      <Terminal size={12} style={{ color: project.accent }} />
    </div>

    {/* Code lines */}
    <div className="relative z-10 px-4 pb-4 space-y-1 flex-1">
      {project.codeLines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -6 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 + i * 0.08 }}
          className="text-[10px] font-mono"
          style={{ color: line.c }}
        >
          {line.txt}
        </motion.div>
      ))}
    </div>

    {/* Big emoji watermark */}
    <div
      className="absolute right-4 top-1/2 -translate-y-1/2 text-5xl opacity-10 select-none pointer-events-none"
      aria-hidden="true"
    >
      {project.icon}
    </div>

    {/* Accent glow bottom */}
    <div
      className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
      style={{ background: `linear-gradient(to top, ${project.accent}18, transparent)` }}
    />

    {/* Hover accent overlay */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{ background: `linear-gradient(135deg, ${project.accent}08, transparent 60%)` }}
    />
  </div>
);

const ProjectCard = ({ project, i }) => (
  <motion.article
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    className="card group relative overflow-hidden flex flex-col"
  >
    {/* Code preview (replaces photo) */}
    <CodePreview project={project} />

    {/* Body */}
    <div className="p-6 relative z-10 flex flex-col flex-1">
      {/* {project.featured && (
        <div
          className="w-fit flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest mb-3"
          style={{ background: `${project.accent}20`, color: project.accent, border: `1px solid ${project.accent}30` }}
        >
          ★ Featured
        </div>
      )} */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-primary font-bold text-lg leading-tight tracking-tight">{project.title}</h3>
        <FolderOpen size={18} style={{ color: project.accent }} className="flex-shrink-0 mt-0.5" />
      </div>
      <p className="text-muted-1 text-sm leading-relaxed mb-5">{project.desc}</p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-[10px] font-mono px-2.5 py-1 rounded-md border border-border text-muted-1"
            style={{ background: `${project.accent}08` }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-muted-1 hover:text-primary transition-colors font-medium"
        >
          <FaGithub size={14} /> Source Code
        </a>
        <a
          href={project.link}
          className="flex items-center gap-1.5 text-xs font-bold transition-all hover:gap-2"
          style={{ color: project.accent }}
        >
          Live Demo <ExternalLink size={12} />
        </a>
      </div>
    </div>
  </motion.article>
);

const Projects = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  useEffect(() => {
    if (activeTab === 'GitHub' && repos.length === 0) {
      setLoading(true);
      const username = process.env.GITHUB_USERNAME || 'saurabh7121';
      const token = process.env.GITHUB_TOKEN;

      const headers = {};
      if (token) {
        headers['Authorization'] = `token ${token}`;
      }

      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, { headers })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch repositories');
          }
          return res.json();
        })
        .then((data) => {
          // Filter out forks
          const publicRepos = data.filter(repo => !repo.fork);
          setRepos(publicRepos);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [activeTab, repos.length]);

  const getLanguageColor = (lang) => {
    const colors = {
      JavaScript: '#f7df1e',
      TypeScript: '#3178c6',
      HTML: '#e34c26',
      CSS: '#563d7c',
      Python: '#3572A5',
      Go: '#00ADD8',
      Rust: '#dea584',
      Java: '#b07219',
      Ruby: '#701516',
      C: '#555555',
      'C++': '#f34b7d',
      Shell: '#89e051',
    };
    return colors[lang] || '#a1a1aa';
  };

  const languages = ['All', ...new Set(repos.map((r) => r.language).filter(Boolean))];

  const filteredRepos = repos.filter((repo) => {
    const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLang = selectedLanguage === 'All' || repo.language === selectedLanguage;
    return matchesSearch && matchesLang;
  });



  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#ef4444] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <span className="section-label">
            <FolderOpen size={12} />
            My Work
          </span>
          <h2
            className="font-black text-primary leading-tight mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Featured{' '}
            <span className="text-gradient-red">Projects</span>
          </h2>
          <div className="section-divider mx-auto" />
          <p className="text-muted-1 max-w-md mt-4 text-sm leading-relaxed">
            A selection of real-world projects built with modern technologies.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveTab('All')}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'All'
                ? 'bg-[#ef4444] text-white shadow-lg shadow-red-500/25'
                : 'bg-primary/5 text-muted-1 hover:bg-primary/10 hover:text-primary'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('GitHub')}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'GitHub'
                ? 'bg-[#ef4444] text-white shadow-lg shadow-red-500/25'
                : 'bg-primary/5 text-muted-1 hover:bg-primary/10 hover:text-primary'
            }`}
          >
            <FaGithub size={16} /> GitHub Repo's
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'All' ? (
            <motion.div 
              key="all-projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {projects.map((p, i) => (
                <ProjectCard key={p.title} project={p} i={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="github-repos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mt-4"
            >
              {/* Header / Search / Filters */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                <div className="relative w-full md:max-w-xs">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-1 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search repositories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-primary/2 border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-primary placeholder:text-muted-2 outline-none transition-all focus:border-[#ef4444]/40"
                  />
                </div>

                {/* Languages row */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-end w-full md:w-auto">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 ${
                        selectedLanguage === lang
                          ? 'bg-[#ef4444]/10 border-[#ef4444]/30 text-[#ef4444]'
                          : 'bg-primary/2 border-border text-muted-1 hover:text-primary hover:border-primary/20'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Repos Grid */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <Loader2 className="animate-spin text-[#ef4444]" size={24} />
                  <p className="text-muted-1 text-sm">Fetching repositories...</p>
                </div>
              ) : error ? (
                <div className="text-center py-20 text-red-500/80 text-sm">
                  Error loading repositories: {error}. Please try again later.
                </div>
              ) : filteredRepos.length === 0 ? (
                <div className="text-center py-20 text-muted-1 text-sm">
                  No repositories found matching your search.
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredRepos.map((repo, idx) => (
                    <motion.div
                      key={repo.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="card border border-border hover:border-[#ef4444]/20 p-5 rounded-2xl flex flex-col justify-between group transition-all duration-300 relative overflow-hidden"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <FolderOpen size={16} className="text-[#ef4444]/80" />
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-1 hover:text-primary transition-colors"
                          >
                            <ExternalLink size={14} />
                          </a>
                        </div>
                        <h4 className="text-primary font-bold text-sm group-hover:text-[#ef4444] transition-colors mb-2 truncate">
                          {repo.name}
                        </h4>
                        <p className="text-muted-1 text-xs leading-relaxed mb-4 line-clamp-2 h-8">
                          {repo.description || 'No description provided.'}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-border text-xs text-muted-1">
                        <div className="flex items-center gap-1.5">
                          {repo.language && (
                            <>
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getLanguageColor(repo.language) }} />
                              <span>{repo.language}</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          {repo.stargazers_count > 0 && (
                            <span className="flex items-center gap-1">
                              <Star size={12} /> {repo.stargazers_count}
                            </span>
                          )}
                          {repo.forks_count > 0 && (
                            <span className="flex items-center gap-1">
                              <GitFork size={12} /> {repo.forks_count}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
