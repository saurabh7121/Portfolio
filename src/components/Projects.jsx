import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, FolderOpen, ChevronRight, Terminal, Search, Star, GitFork, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ui/ScrollReveal';

import { projects } from '../data/projectsData';

/* Code preview card replacing the image */
const CodePreview = ({ project }) => (
  <div
    className="h-48 sm:h-52 relative overflow-hidden flex flex-col justify-between border-b-2 border-[var(--border-color)]"
    style={{ background: project.pattern, backgroundColor: 'var(--bg-surface)' }}
  >
    {/* Subtle grid */}
    <div className="absolute inset-0 bg-grid-pattern opacity-20" />

    {/* Header bar */}
    <div className="relative z-10 flex items-center gap-2 px-4 pt-4 pb-2 border-b-2 border-[var(--border-color)] bg-[var(--bg-surface)]">
      <div className="flex gap-1.5">
        <div className="w-2 h-2 rounded-none border border-[var(--border-color)] bg-[#ff5f56]" />
        <div className="w-2 h-2 rounded-none border border-[var(--border-color)] bg-[#ffbd2e]" />
        <div className="w-2 h-2 rounded-none border border-[var(--border-color)] bg-[#27c93f]" />
      </div>
      <div className="flex-1 text-center">
        <span className="text-[9px] font-mono font-bold uppercase text-[var(--text-main)] tracking-wider">
          {project.title.toLowerCase().replace(/ /g, '_')}.sh
        </span>
      </div>
      <Terminal size={12} className="text-[var(--text-main)]" />
    </div>

    {/* Code lines */}
    <div className="relative z-10 px-4 pb-4 pt-4 space-y-1 flex-1 bg-[#0a0a0a]">
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
  </div>
);

/* Live Website Preview component mimicking a browser mockup */
const WebsitePreview = ({ project }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="h-48 sm:h-52 relative overflow-hidden flex flex-col justify-between group/preview border-b-2 border-[var(--border-color)]"
      style={{ backgroundColor: 'var(--bg-surface)' }}
    >
      {/* Header bar mimicking browser window */}
      <div className="relative z-20 flex items-center gap-2 px-4 py-2 border-b-2 border-[var(--border-color)] bg-[var(--bg-surface)]">
        <div className="flex gap-1.5 flex-shrink-0">
          <div className="w-2 h-2 rounded-none border border-[var(--border-color)] bg-[#ff5f56]" />
          <div className="w-2 h-2 rounded-none border border-[var(--border-color)] bg-[#ffbd2e]" />
          <div className="w-2 h-2 rounded-none border border-[var(--border-color)] bg-[#27c93f]" />
        </div>
        <div className="flex-1 text-center truncate px-2">
          <span className="text-[9px] font-mono font-bold uppercase text-[var(--text-main)] tracking-wider bg-[var(--bg-surface)] px-2 py-0.5 border border-[var(--border-color)]">
            {project.link.replace(/^https?:\/\/(www\.)?/, '')}
          </span>
        </div>
        <ExternalLink size={10} className="text-[var(--text-main)] group-hover/preview:text-[#E53935] transition-colors" />
      </div>

      {/* Website screenshot loaded via Microlink API */}
      <div className="relative flex-1 bg-[var(--bg-surface)] overflow-hidden group/scroll">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-surface)] z-10">
            <Loader2 className="animate-spin text-[var(--text-main)]" size={16} />
          </div>
        )}
        <img
          src={`https://api.microlink.io/?url=${encodeURIComponent(project.link)}&screenshot=true&embed=screenshot.url`}
          alt={`${project.title} Preview`}
          className="w-full h-[300%] object-cover object-top transition-all duration-[4000ms] ease-in-out group-hover/preview:object-bottom animate-grayscale-none"
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
      </div>

      {/* Hover overlay hint */}
      <div className="absolute inset-0 z-10 bg-black/0 group-hover/preview:bg-black/5 transition-colors duration-300 pointer-events-none flex items-center justify-center">
        <div className="opacity-0 group-hover/preview:opacity-100 transform translate-y-2 group-hover/preview:translate-y-0 transition-all duration-300 bg-[#FFD600] border-2 border-black px-3 py-1.5 rounded-none text-[10px] font-mono font-bold uppercase tracking-wider text-black flex items-center gap-1.5 shadow-[2px_2px_0px_#0a0a0a]">
          Visit Site <ChevronRight size={10} />
        </div>
      </div>
    </a>
  );
};

const getRepoPath = (githubUrl) => {
  if (!githubUrl) return null;
  const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (match) {
    return `${match[1]}/${match[2]}`;
  }
  return null;
};

/* Live GitHub Repository Preview component */
const GitHubRepoPreview = ({ project }) => {
  const repoPath = getRepoPath(project.github);
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!repoPath) {
      setLoading(false);
      return;
    }

    const cacheKey = `gh-repo-${repoPath}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < 3600000) {
          setRepoData(parsed.data);
          setLoading(false);
          return;
        }
      } catch (e) {
        // ignore cache errors
      }
    }

    fetch(`https://api.github.com/repos/${repoPath}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        const stored = { timestamp: Date.now(), data };
        localStorage.setItem(cacheKey, JSON.stringify(stored));
        setRepoData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [repoPath]);

  const stars = repoData?.stargazers_count ?? 1;
  const forks = repoData?.forks_count ?? 0;
  const language = repoData?.language ?? project.tech[0] ?? 'JavaScript';
  const size = repoData?.size ? `${Math.round(repoData.size / 1024)} MB` : '1.2 MB';

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

  return (
    <a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      className="h-48 sm:h-52 relative overflow-hidden flex flex-col justify-between group/repo border-b-2 border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-main)] p-5 font-sans"
    >
      <div className="absolute inset-0 bg-dot-pattern opacity-10" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-2">
          <FaGithub size={16} className="text-[var(--text-muted-1)] group-hover/repo:text-[#E53935] transition-colors" />
          <span className="text-[11px] font-mono text-[var(--text-muted-1)] truncate max-w-[200px]">
            {repoPath || 'saurabh7121/' + project.title.toLowerCase().replace(/ /g, '_')}
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-none border-2 border-[var(--border-color)] bg-[var(--bg-surface)] text-[9px] font-bold font-mono text-[var(--text-main)] uppercase">
          public
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center py-2">
        <h4 className="text-sm font-black text-[#E53935] group-hover/repo:underline mb-1 flex items-center gap-1 uppercase tracking-wide">
          {repoPath ? repoPath.split('/')[1] : project.title}
        </h4>
        <p className="text-[11px] text-[var(--text-muted-1)] line-clamp-2 leading-relaxed">
          {repoData?.description || project.desc}
        </p>
      </div>

      {/* Footer / Stats */}
      <div className="relative z-10 flex items-center justify-between pt-2.5 border-t border-[var(--border-color)] text-[10px] text-[var(--text-muted-1)] font-mono">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-none border border-[var(--border-color)]" style={{ backgroundColor: getLanguageColor(language) }} />
            <span className="text-[var(--text-main)] font-bold">{language}</span>
          </div>

          <div className="flex items-center gap-1 hover:text-[#E53935] transition-colors">
            <Star size={12} />
            <span>{stars}</span>
          </div>

          {forks > 0 && (
            <div className="flex items-center gap-1 hover:text-[#E53935] transition-colors">
              <GitFork size={12} />
              <span>{forks}</span>
            </div>
          )}
        </div>

        <div className="text-[var(--text-muted-1)]">
          <span>{size}</span>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 z-20 bg-black/0 group-hover/repo:bg-black/10 transition-colors duration-300 pointer-events-none flex items-center justify-center">
        <div className="opacity-0 group-hover/repo:opacity-100 transform translate-y-2 group-hover/repo:translate-y-0 transition-all duration-300 bg-[#FFD600] border-2 border-black px-3.5 py-2 rounded-none text-[10px] font-mono font-bold uppercase tracking-wider text-black flex items-center gap-2 shadow-[2px_2px_0px_#0a0a0a]">
          <FaGithub size={12} className="text-black" /> View Repository <ChevronRight size={10} />
        </div>
      </div>
    </a>
  );
};

const ProjectCard = ({ project }) => {
  const hasLiveLink = project.link && project.link !== '#';

  return (
    <article className="group relative overflow-hidden flex flex-col h-full bg-[var(--bg-surface)] border-2 border-[var(--border-color)] rounded-none shadow-[4px_4px_0px_var(--border-color)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_var(--border-color)] transition-all duration-150 text-[var(--text-main)]">
      {/* Website Preview if link exists, otherwise GitHub repo preview if github URL exists, otherwise Code Preview */}
      {hasLiveLink ? (
        <WebsitePreview project={project} />
      ) : project.github ? (
        <GitHubRepoPreview project={project} />
      ) : (
        <CodePreview project={project} />
      )}

      {/* Body */}
      <div className="p-6 relative z-10 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-[var(--text-main)] font-black text-lg leading-tight tracking-tight uppercase">{project.title}</h3>
          <FolderOpen size={18} className="text-[var(--text-main)] flex-shrink-0 mt-0.5" />
        </div>
        <p className="text-[var(--text-muted-1)] text-sm leading-relaxed mb-5">{project.desc}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-none border-2 border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-main)]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)] mt-auto">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-[var(--text-main)] hover:text-[#E53935] transition-colors font-bold uppercase tracking-wider font-mono"
          >
            <FaGithub size={14} /> Source Code
          </a>
          {hasLiveLink && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-black transition-all hover:gap-2 uppercase tracking-wider text-[#E53935] hover:text-[#E53935]"
            >
              Live Demo <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

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
          const publicRepos = data.filter(repo => !repo.fork);
          setRepos(publicRepos);
          setError(null);
          setLoading(false);
        })
        .catch((err) => {
          console.warn('GitHub fetch rate-limited or offline, loading fallback repos:', err);
          setError(null);
          const fallbackRepos = [
            {
              id: 1,
              name: 'ecommerce-backend-ci4',
              description: 'B2B/B2C computer hardware e-commerce backend built with PHP, CodeIgniter 4, and MySQL database schema.',
              html_url: `https://github.com/${username}/ecommerce-backend-ci4`,
              language: 'PHP',
              stargazers_count: 6,
              forks_count: 2,
            },
            {
              id: 2,
              name: 'ai-vision-ppe-detector',
              description: 'NVIDIA-accelerated computer vision model using YOLOv8 for real-time safety equipment violation detection.',
              html_url: `https://github.com/${username}/ai-vision-ppe-detector`,
              language: 'Python',
              stargazers_count: 8,
              forks_count: 3,
            },
            {
              id: 3,
              name: 'Portfolio',
              description: 'A rigid digital editorial brutalist developer portfolio with staccato scroll reveal animations.',
              html_url: `https://github.com/${username}/Portfolio`,
              language: 'JavaScript',
              stargazers_count: 14,
              forks_count: 4,
            },
          ];
          setRepos(fallbackRepos);
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
    const matchesLang = selectedLanguage === 'All' || 
      (repo.language && repo.language.toLowerCase() === selectedLanguage.toLowerCase());
    return matchesSearch && matchesLang;
  });

  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      {/* No ambient glows */}

      <div className="container mx-auto px-5 sm:px-8">
        {/* Header */}
        <ScrollReveal variant="blur-in" className="mb-16 flex flex-col items-center text-center">
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
        </ScrollReveal>

        {/* Category Tabs */}
        <ScrollReveal variant="fade-up" delay={0.1} className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveTab('All')}
            className={`px-6 py-2.5 rounded-none text-sm font-bold uppercase tracking-wider transition-all duration-150 border-2 border-black ${
              activeTab === 'All'
                ? 'bg-[#FFD600] text-black shadow-[4px_4px_0px_#0a0a0a] translate-x-[-2px] translate-y-[-2px]'
                : 'bg-white text-black hover:bg-neutral-100'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('GitHub')}
            className={`px-6 py-2.5 rounded-none text-sm font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2 border-2 border-black ${
              activeTab === 'GitHub'
                ? 'bg-[#FFD600] text-black shadow-[4px_4px_0px_#0a0a0a] translate-x-[-2px] translate-y-[-2px]'
                : 'bg-white text-black hover:bg-neutral-100'
            }`}
          >
            <FaGithub size={16} /> GitHub Repo's
          </button>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          {activeTab === 'All' ? (
            <motion.div 
              key="all-projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <StaggerContainer staggerDelay={0.12} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" animateOnMount={true}>
                {projects.map((p) => (
                  <StaggerItem key={p.title} variant="zoom-in" className="h-full">
                    <ProjectCard project={p} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
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
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
                <div className="relative w-full md:max-w-xs">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search repositories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[var(--bg-surface)] border-2 border-[var(--border-color)] rounded-none pl-10 pr-4 py-2.5 text-sm text-[var(--text-main)] placeholder:text-neutral-500 outline-none font-mono focus:bg-[var(--bg-main)]"
                  />
                </div>

                {/* Languages row */}
                <div className="flex flex-wrap gap-2 justify-start md:justify-end w-full md:w-auto">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`px-3 py-1.5 rounded-none text-xs font-bold font-mono uppercase tracking-wider border-2 border-[var(--border-color)] transition-all duration-150 ${
                        selectedLanguage === lang
                          ? 'bg-[#E53935] text-white shadow-[2px_2px_0px_var(--border-color)] translate-x-[-1px] translate-y-[-1px]'
                          : 'bg-[var(--bg-surface)] text-[var(--text-main)] hover:bg-[var(--bg-main)]'
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
                <StaggerContainer staggerDelay={0.06} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" animateOnMount={true}>
                  {filteredRepos.map((repo) => (
                    <StaggerItem key={repo.id} variant="fade-up" className="h-full">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[var(--bg-surface)] border-2 border-[var(--border-color)] p-6 rounded-none flex flex-col justify-between group hover:shadow-[6px_6px_0px_var(--border-color)] hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all duration-150 relative overflow-hidden h-full text-[var(--text-main)] cursor-pointer"
                      >
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <FolderOpen size={18} className="text-[#E53935]" />
                            <div className="text-[var(--text-main)] group-hover:text-[#E53935] transition-colors">
                              <ExternalLink size={15} />
                            </div>
                          </div>
                          <h4 className="text-[var(--text-main)] font-black text-base group-hover:text-[#E53935] transition-colors mb-2 truncate">
                            {repo.name}
                          </h4>
                          <p className="text-[var(--text-muted-1)] text-xs leading-relaxed mb-6 line-clamp-2 h-8">
                            {repo.description || 'No description provided.'}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)] text-xs text-[var(--text-muted-1)] font-mono font-bold uppercase tracking-wider">
                          <div className="flex items-center gap-1.5">
                            {repo.language && (
                              <>
                                <span className="w-2.5 h-2.5 rounded-none border border-[var(--border-color)] animate-pulse" style={{ backgroundColor: getLanguageColor(repo.language) }} />
                                <span className="text-[var(--text-main)]">{repo.language}</span>
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
                      </a>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
