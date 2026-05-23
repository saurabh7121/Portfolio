import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Layout, Server, Terminal } from 'lucide-react';

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
        {/* Render the skills list twice to ensure seamless loop */}
        {[...skills, ...skills].map((skill, index) => {
          const isDimmed = activeCat !== 'All' && skill.cat !== activeCat;
          return (
            <div
              key={index}
              className={`flex flex-col items-center justify-center gap-2 w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-2xl lg:rounded-3xl bg-[#ffffff02] border border-white/05 shrink-0 transition-all duration-500 relative group/card cursor-default overflow-hidden skill-card ${
                isDimmed ? 'opacity-15 blur-[1px] scale-95' : 'opacity-100 scale-100'
              }`}
              style={{
                '--brand-color': skill.color,
              }}
            >
              {/* Hover glow background */}
              <div
                className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${skill.color}08 0%, transparent 70%)` }}
              />

              <i className={`${skill.icon} text-3xl sm:text-4xl lg:text-5xl transition-transform duration-300 group-hover/card:scale-105`} />
              <span className="text-[#a1a1aa] font-medium text-xs sm:text-sm lg:text-base tracking-wide transition-colors group-hover/card:text-white mt-1">
                {skill.name}
              </span>

              {/* Hover details pill */}
              <span
                className="absolute bottom-2.5 sm:bottom-4 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider opacity-0 group-hover/card:opacity-100 transition-all duration-300 transform translate-y-1 group-hover/card:translate-y-0"
                style={{
                  background: `${skill.color}20`,
                  border: `1px solid ${skill.color}35`,
                  color: skill.color === '#ffffff' ? '#a1a1aa' : skill.color,
                }}
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

const Skills = () => {
  const [activeCat, setActiveCat] = useState('All');

  const categories = [
    {
      id: 'Frontend',
      title: 'Frontend & Mobile',
      desc: 'UI/UX development, Single Page Applications, responsive design, and cross-platform mobile apps.',
      skillsCount: allSkills.filter((s) => s.cat === 'Frontend').length,
      icon: <Layout className="w-5 h-5" />,
      color: '#3b82f6',
    },
    {
      id: 'Backend',
      title: 'Backend & Databases',
      desc: 'Secure API design, system architecture, relational & NoSQL databases, and query optimization.',
      skillsCount: allSkills.filter((s) => s.cat === 'Backend').length,
      icon: <Server className="w-5 h-5" />,
      color: '#ef4444',
    },
    {
      id: 'DevOps',
      title: 'Tools & Infrastructure',
      desc: 'Deployment, containerization, cloud hosting services, shell scripting, and version control.',
      skillsCount: allSkills.filter((s) => s.cat === 'DevOps').length,
      icon: <Terminal className="w-5 h-5" />,
      color: '#a1a1aa',
    },
  ];

  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-[#3b82f6] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

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
          .skill-card:hover {
            border-color: var(--brand-color) !important;
            box-shadow: 0 0 20px -5px var(--brand-color) !important;
          }
        `}</style>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <span className="section-label">
            <Code2 size={12} />
            My Stack
          </span>
          <h2
            className="font-black text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Technical{' '}
            <span className="text-gradient-white">Skills</span>
          </h2>
          <div className="section-divider mx-auto" />
          <p className="text-[#555] mt-6 max-w-lg text-sm leading-relaxed">
            A comprehensive list of languages, frameworks, and tools I specialize in. Click a domain to focus related tech.
          </p>
        </motion.div>

        {/* Domain Cards Filters */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {categories.map((cat) => {
            const isActive = activeCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCat(isActive ? 'All' : cat.id)}
                className={`text-left p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                  isActive ? 'bg-[#ffffff03]' : 'bg-[#ffffff01] hover:bg-[#ffffff02]'
                }`}
                style={{
                  borderColor: isActive ? cat.color : 'rgba(255, 255, 255, 0.05)',
                  boxShadow: isActive ? `0 0 25px -8px ${cat.color}` : 'none',
                }}
              >
                {/* Brand glow corner */}
                <div
                  className="absolute -top-12 -right-12 w-24 h-24 rounded-full opacity-10 blur-xl pointer-events-none transition-all group-hover:scale-125"
                  style={{ backgroundColor: cat.color }}
                />

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border transition-colors"
                    style={{
                      borderColor: isActive ? `${cat.color}40` : 'rgba(255, 255, 255, 0.08)',
                      color: cat.color,
                      background: `${cat.color}08`,
                    }}
                  >
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm tracking-wide">{cat.title}</h3>
                    <span className="text-[10px] text-[#555] font-mono">{cat.skillsCount} Technologies</span>
                  </div>
                </div>
                <p className="text-[#555] text-xs leading-relaxed">{cat.desc}</p>

                {/* Active indicator */}
                <div
                  className={`absolute bottom-3 right-4 text-[9px] font-mono tracking-widest uppercase transition-opacity ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'
                  }`}
                  style={{ color: cat.color }}
                >
                  {isActive ? '● Active' : 'Click to Focus'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Sliding Window Animations */}
        <div className="flex flex-col gap-4 relative mt-10">
          {/* Gradient fades for seamless scrolling effect */}
          <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-16 lg:w-32 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-16 lg:w-32 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />

          <SkillMarquee
            skills={allSkills.slice(0, Math.ceil(allSkills.length / 2))}
            direction="left"
            speed={40}
            activeCat={activeCat}
          />
          <SkillMarquee
            skills={allSkills.slice(Math.ceil(allSkills.length / 2))}
            direction="right"
            speed={45}
            activeCat={activeCat}
          />
        </div>
      </div>
    </section>
  );
};

export default Skills;
