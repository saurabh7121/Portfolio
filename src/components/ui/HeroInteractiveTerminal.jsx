import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Copy, Check, Play, Sparkles, Code2, Layers } from 'lucide-react';

const fileTabs = [
  {
    id: 'config',
    name: 'saurabh.config.ts',
    icon: <Code2 size={13} className="text-[#3b82f6]" />,
    code: `const developer = {
  name: "Saurabh Jadhav",
  role: "Full-Stack & AI Software Developer",
  location: "Maharashtra, India 🇮🇳",
  status: "🟢 Available for Full-Time & Freelance",
  stack: ["React", "Next.js", "Node.js", "MongoDB", "Python"],
  passion: "Building performant, high-impact digital products",
  execute: () => console.log("Let's build something amazing together!")
};

export default developer;`,
  },
  {
    id: 'skills',
    name: 'skills.json',
    icon: <Layers size={13} className="text-[#f59e0b]" />,
    code: `{
  "core_competencies": [
    "Single Page Apps (SPAs)",
    "Server-Side Rendering (SSR)",
    "RESTful API & GraphQL Design",
    "Database Architecture (SQL/NoSQL)"
  ],
  "featured_tools": ["React 19", "TailwindCSS", "Framer Motion", "Next.js"],
  "ai_integrations": ["RAG Systems", "PyTorch YOLO", "LLM APIs"]
}`,
  },
  {
    id: 'terminal',
    name: 'terminal.sh',
    icon: <Terminal size={13} className="text-[#ef4444]" />,
    code: `$ npx create-saurabh-portfolio --mode=production
✔ Compiling modern React components...
✔ Initializing Framer Motion scroll engine...
✔ Connecting database & API gateways...
✔ Optimization complete (Lighthouse score: 100/100)

⚡ Status: Engine Online & Ready to Deploy!`,
  },
];

export const HeroInteractiveTerminal = () => {
  const [activeTabId, setActiveTabId] = useState('config');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [outputLines, setOutputLines] = useState([]);

  const activeTab = fileTabs.find((tab) => tab.id === activeTabId) || fileTabs[0];

  const handleTabChange = (tabId) => {
    setActiveTabId(tabId);
    setShowOutput(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTab.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleRun = () => {
    setIsRunning(true);
    setShowOutput(true);
    
    // Set output lines depending on selected file
    if (activeTabId === 'config') {
      setOutputLines([
        "> ts-node saurabh.config.ts",
        "⌛ Bootstrapping sandbox compiler...",
        "✔ Compiled developer profile successfully.",
        "",
        "⚡ Sandbox Output:",
        "  {",
        "    name: \"Saurabh Jadhav\",",
        "    role: \"Full-Stack & AI Software Developer\",",
        "    status: \"Available for Full-Time & Freelance\",",
        "    action: \"Let's build something amazing together!\"",
        "  }"
      ]);
    } else if (activeTabId === 'skills') {
      setOutputLines([
        "> npx check-capabilities skills.json",
        "⌛ Querying skill metadata matrix...",
        "✔ Core competencies parsed",
        "✔ AI & Deep Learning sub-system online",
        "",
        "⚡ Sandbox Output:",
        "  Ready to design scalable database & front-end systems."
      ]);
    } else {
      setOutputLines([
        "> ./terminal.sh",
        "⌛ Verifying page loading performance...",
        "✔ SEO optimization: Grade A+",
        "✔ Lighthouse performance index: 100/100",
        "",
        "⚡ Sandbox Output:",
        "  Status: Deployable, live on production server!"
      ]);
    }

    setTimeout(() => {
      setIsRunning(false);
    }, 1000);
  };

  return (
    <div className="w-full rounded-none bg-white border-2 border-black shadow-[6px_6px_0px_#0a0a0a] overflow-hidden font-mono text-xs text-[#0a0a0a] relative group">

      {/* Top Window Bar */}
      <div className="flex flex-col sm:flex-row items-stretch justify-between bg-[#f5f5f0] border-b-2 border-black select-none">
        {/* Bullets & Title */}
        <div className="flex items-center justify-between sm:justify-start gap-4 px-4 py-2 border-b-2 border-black sm:border-b-0 sm:border-r-2 shrink-0">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-none border border-black bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-none border border-black bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-none border border-black bg-[#27c93f]" />
          </div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#666666] ml-2">saurabh.sh</span>
        </div>

        {/* Tab Selectors */}
        <div 
          className="flex items-center overflow-x-auto bg-white border-b-2 border-black sm:border-b-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {fileTabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider border-r-2 border-black transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#FFD600] text-black'
                    : 'text-[#666666] hover:text-black hover:bg-[#f5f5f0]'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Window Controls */}
        <div className="flex items-center gap-2 px-4 py-2 justify-end sm:justify-start sm:border-l-2 border-black shrink-0">
          <button
            onClick={handleRun}
            className="flex items-center gap-1 px-3 py-1 border-2 border-black bg-[#E53935] text-white text-[9px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#0a0a0a] shadow-[2px_2px_0px_#0a0a0a]"
            title="Execute Code Preview"
          >
            <Play size={10} className={isRunning ? 'animate-spin' : ''} />
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>
          <button
            onClick={handleCopy}
            className="p-1 border-2 border-black bg-white hover:bg-neutral-50 text-black transition-all cursor-pointer shadow-[2px_2px_0px_#0a0a0a]"
            title="Copy Code"
          >
            {copied ? <Check size={12} className="text-[#22c55e]" /> : <Copy size={12} />}
          </button>
        </div>
      </div>

      {/* Code Editor Body / Console Output */}
      <div className="p-4 sm:p-5 min-h-[220px] max-h-[320px] bg-[#0a0a0a] leading-relaxed relative flex flex-col justify-between overflow-y-auto">
        <AnimatePresence mode="wait">
          {showOutput ? (
            <motion.div
              key="output"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col h-full font-mono text-[11px] sm:text-xs text-[#39ff14]"
            >
              <div className="flex-1 space-y-1 mb-4">
                {outputLines.map((line, idx) => (
                  <div key={idx} className={line.startsWith('>') ? 'text-white font-bold' : line.startsWith('✔') ? 'text-[#39ff14]' : line.startsWith('⚡') ? 'text-[#FFD600] font-black' : 'text-neutral-400'}>
                    {line}
                  </div>
                ))}
                {isRunning && (
                  <div className="flex items-center gap-1.5 text-white animate-pulse mt-2">
                    <span className="w-1.5 h-3 bg-white" />
                    <span>Executing sandbox environment...</span>
                  </div>
                )}
              </div>
              {!isRunning && (
                <button
                  onClick={() => setShowOutput(false)}
                  className="self-start px-2 py-0.5 border border-[#39ff14] hover:bg-[#39ff14]/20 text-[#39ff14] text-[9px] font-bold uppercase tracking-widest cursor-pointer transition-colors"
                >
                  Clear Output
                </button>
              )}
            </motion.div>
          ) : (
            <motion.pre
              key={activeTab.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="whitespace-pre text-[11px] sm:text-xs font-mono font-normal tracking-wide text-[#79c0ff] overflow-x-auto"
            >
              {activeTab.code.split('\n').map((line, idx) => (
                <div key={idx} className="table-row">
                  <span className="table-cell pr-4 text-right select-none opacity-30 text-[#8b949e] text-[10px] w-6">
                    {idx + 1}
                  </span>
                  <span className="table-cell">
                    {line.includes('const') || line.includes('export') || line.includes('return') ? (
                      <span className="text-[#ff7b72] font-semibold">{line}</span>
                    ) : line.includes('//') ? (
                      <span className="text-[#8b949e] italic">{line}</span>
                    ) : line.includes('"') || line.includes("'") ? (
                      <span className="text-[#a5d6ff]">{line}</span>
                    ) : (
                      <span className="text-[#c9d1d9]">{line}</span>
                    )}
                  </span>
                </div>
              ))}
            </motion.pre>
          )}
        </AnimatePresence>

        {/* Status Line */}
        <div className="mt-4 flex items-center gap-2 text-[9px] font-mono font-bold uppercase tracking-wider text-[#8b949e] pt-3 border-t border-[#21262d] shrink-0">
          <span className={`w-2 h-2 rounded-none border border-black animate-pulse ${showOutput ? 'bg-[#39ff14]' : 'bg-[#22c55e]'}`} />
          <span>Interactive Sandbox · React 19 + Framer Motion Engine</span>
        </div>
      </div>
    </div>
  );
};
