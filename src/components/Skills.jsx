import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Layout, Server, Terminal } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ui/ScrollReveal';

const allSkills = [
  // Frontend
  { name: 'React', icon: 'devicon-react-original colored', color: '#61dafb', level: 'Expert', cat: 'Frontend' },
  { name: 'Next.js', icon: 'devicon-nextjs-plain', color: '#010000ff', level: 'Expert', cat: 'Frontend' },
  { name: 'JavaScript', icon: 'devicon-javascript-plain colored', color: '#f7df1e', level: 'Expert', cat: 'Frontend' },
  { name: 'TypeScript', icon: 'devicon-typescript-plain ', color: '#3178c6', level: 'Advanced', cat: 'Frontend' },
  { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-original colored', color: '#38bdf8', level: 'Expert', cat: 'Frontend' },
  { name: 'Figma', icon: 'devicon-figma-plain colored', color: '#f24e1e', level: 'Intermediate', cat: 'Frontend' },
  { name: 'React Native', icon: 'devicon-reactnative-original colored', color: '#38bdf8', level: 'Intermediate', cat: 'Frontend' },
  
  // Backend
  { name: 'Node.js', icon: 'devicon-nodejs-plain colored', color: '#68a063', level: 'Advanced', cat: 'Backend' },
  { name: 'Express.js', icon: 'devicon-express-original colored', color: '#828282', level: 'Advanced', cat: 'Backend' },
  { name: 'MongoDB', icon: 'devicon-mongodb-plain colored', color: '#47a248', level: 'Advanced', cat: 'Backend' },
  { name: 'Python', icon: 'devicon-python-plain colored', color: '#3776ab', level: 'Intermediate', cat: 'Backend' },
  { name: 'MySQL', icon: 'devicon-mysql-plain colored', color: '#00758f', level: 'Advanced', cat: 'Backend' },

  // Tools & DevOps
  { name: 'Docker', icon: 'devicon-docker-plain colored', color: '#2496ed', level: 'Intermediate', cat: 'DevOps' },
  { name: 'Git', icon: 'devicon-git-plain colored', color: '#f05032', level: 'Expert', cat: 'DevOps' },
  { name: 'Firebase', icon: 'devicon-firebase-plain colored', color: '#ffca28', level: 'Advanced', cat: 'DevOps' },
  { name: 'Linux', icon: 'devicon-linux-plain ', color: '#f89820', level: 'Intermediate', cat: 'DevOps' },
];

const SkillMarquee = ({ skills, direction = 'left', speed = 40, activeCat }) => {
  return (
    <div className="flex overflow-hidden relative w-full group">
      <div
        className={`flex gap-4 sm:gap-6 lg:gap-8 whitespace-nowrap py-3 sm:py-4 lg:py-6 pr-4 sm:pr-6 lg:pr-8 pause-on-hover ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        }`}
        style={{ width: 'max-content' }}
      >
        {[...skills, ...skills].map((skill, index) => {
          const isDimmed = activeCat !== 'All' && skill.cat !== activeCat;
          return (
            <div
              key={index}
              className={`flex flex-col items-center justify-center gap-2 w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 border-2 border-black bg-white shrink-0 transition-all duration-150 relative group/card cursor-default overflow-hidden rounded-none skill-card ${
                isDimmed ? 'opacity-15 blur-[1px] scale-95' : 'opacity-100 scale-100'
              }`}
            >
              <i className={`${skill.icon} text-3xl sm:text-4xl lg:text-5xl transition-transform duration-300 group-hover/card:scale-105`} />
              <span className="text-black font-black uppercase text-xs sm:text-xs lg:text-sm tracking-wide mt-1">
                {skill.name}
              </span>

              {/* Hover details pill */}
              <span
                className="absolute bottom-2.5 sm:bottom-4 px-2 py-0.5 rounded-none border border-black text-[9px] font-mono font-bold tracking-wider opacity-0 group-hover/card:opacity-100 transition-all duration-300 transform translate-y-1 group-hover/card:translate-y-0 bg-white text-black"
              >
                {skill.level}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Skills = ({ theme }) => {
  const [activeCat, setActiveCat] = useState('All');

  const resolvedSkills = allSkills.map(s => {
    if (s.name === 'Next.js') {
      return { ...s, color: theme === 'dark' ? '#ffffff' : '#0f172a' };
    }
    return s;
  });

  const categories = [
    {
      id: 'Frontend',
      title: 'Frontend & Mobile',
      desc: 'UI/UX development, Single Page Applications, responsive design, and cross-platform mobile apps.',
      skillsCount: resolvedSkills.filter((s) => s.cat === 'Frontend').length,
      icon: <Layout className="w-5 h-5" />,
      color: '#3b82f6',
    },
    {
      id: 'Backend',
      title: 'Backend & Databases',
      desc: 'Secure API design, system architecture, relational & NoSQL databases, and query optimization.',
      skillsCount: resolvedSkills.filter((s) => s.cat === 'Backend').length,
      icon: <Server className="w-5 h-5" />,
      color: '#ef4444',
    },
    {
      id: 'DevOps',
      title: 'Tools & Infrastructure',
      desc: 'Deployment, containerization, cloud hosting services, shell scripting, and version control.',
      skillsCount: resolvedSkills.filter((s) => s.cat === 'DevOps').length,
      icon: <Terminal className="w-5 h-5" />,
      color: '#a1a1aa',
    },
  ];

  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      {/* No ambient glows */}

      <div className="container mx-auto px-5 sm:px-8">
        {/* Local Styles for Marquee Animations */}
        <style>{`
          @keyframes marquee-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-marquee-left {
            animation: marquee-left 35s linear infinite;
          }
          .animate-marquee-right {
            animation: marquee-right 35s linear infinite;
          }
          .pause-on-hover:hover {
            animation-play-state: paused;
          }
          .skill-card {
            border-radius: 0 !important;
            border-width: 2px !important;
            border-color: var(--border-color) !important;
            background-color: var(--bg-surface) !important;
            color: var(--text-main) !important;
          }
          .skill-card:hover {
            box-shadow: 4px 4px 0px var(--border-color) !important;
            transform: translate(-2px, -2px);
            background-color: #FFD600 !important;
            color: #000000 !important;
          }
        `}</style>

        {/* Header */}
        <ScrollReveal variant="blur-in" className="mb-16 flex flex-col items-center text-center">
          <span className="section-label">
            <Code2 size={12} />
            My Stack
          </span>
          <h2
            className="font-black text-primary leading-tight mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Technical{' '}
            <span className="text-gradient-red">Skills</span>
          </h2>
          <div className="section-divider mx-auto" />
          <p className="text-muted-1 mt-6 max-w-lg text-sm leading-relaxed">
            A comprehensive list of languages, frameworks, and tools I specialize in. Click a domain to focus related tech.
          </p>
        </ScrollReveal>

        {/* Domain Cards Filters */}
        <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-3 gap-6 mb-14">
          {categories.map((cat) => {
            const isActive = activeCat === cat.id;
            return (
              <StaggerItem key={cat.id} variant="zoom-in">
                <button
                  onClick={() => setActiveCat(isActive ? 'All' : cat.id)}
                  className={`text-left w-full h-full p-6 rounded-none border-2 border-[var(--border-color)] transition-all duration-150 relative overflow-hidden group cursor-pointer ${
                    isActive
                      ? 'bg-[#FFD600] text-black shadow-[6px_6px_0px_var(--border-color)] translate-x-[-3px] translate-y-[-3px]'
                      : 'bg-[var(--bg-surface)] text-[var(--text-main)] hover:shadow-[6px_6px_0px_var(--border-color)] hover:translate-x-[-3px] hover:translate-y-[-3px]'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-none flex items-center justify-center border-2 border-[var(--border-color)] transition-colors ${
                        isActive ? 'bg-[var(--border-color)] text-[var(--bg-main)]' : 'bg-[var(--bg-main)] text-[var(--text-main)]'
                      }`}
                    >
                      {cat.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm tracking-wide uppercase">{cat.title}</h3>
                      <span className="text-[9px] text-[var(--text-muted-1)] font-mono font-bold uppercase tracking-wider">{cat.skillsCount} Technologies</span>
                    </div>
                  </div>
                  <p className={`text-xs leading-relaxed mb-6 ${isActive ? 'text-black' : 'text-[var(--text-muted-1)]'}`}>
                    {cat.desc}
                  </p>

                  {/* Active indicator */}
                  <div
                    className={`absolute bottom-3 right-4 text-[9px] font-mono font-bold tracking-widest uppercase transition-opacity ${
                      isActive ? 'opacity-100 text-black' : 'opacity-0 group-hover:opacity-100 text-[var(--text-muted-1)]'
                    }`}
                  >
                    {isActive ? '● Active' : 'Click to Focus'}
                  </div>
                </button>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Sliding Window Animations */}
        <ScrollReveal
          variant="fade-up"
          delay={0.2}
          className="flex flex-col gap-4 relative mt-10"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}
        >
          <SkillMarquee
            skills={resolvedSkills.slice(0, Math.ceil(resolvedSkills.length / 2))}
            direction="left"
            speed={40}
            activeCat={activeCat}
          />
          <SkillMarquee
            skills={resolvedSkills.slice(Math.ceil(resolvedSkills.length / 2))}
            direction="right"
            speed={45}
            activeCat={activeCat}
          />
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Skills;
