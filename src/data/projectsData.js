export const projects = [
   {
    title: 'CADMarket',
    desc: 'Full-stack marketplace for buying and selling CAD designs. Features secure authentication, admin-only CAD uploads, Cloudinary image storage, shopping cart, guest checkout, Razorpay payments, and instant ZIP file downloads.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Cloudinary', 'Razorpay'],
    category: 'Web',
    link: 'https://cadmarket.netlify.app/',
    github: 'https://github.com/saurabh7121/CADMarket',
    accent: '#f97316',
    featured: true,
    icon: '📐',
    codeLines: [
      { txt: 'JWT auth initialized ✓',           c: '#22c55e' },
      { txt: 'Admin CAD upload active 📂',       c: '#f97316' },
      { txt: 'POST /api/designs/upload',         c: 'var(--text-muted-1)' },
      { txt: 'Cloudinary image sync ✓',          c: '#3b82f6' },
      { txt: 'Razorpay payment verified 💳',     c: '#eab308' },
      { txt: 'ZIP download generated 📦',        c: 'var(--text-muted-2)' },
    ],
    pattern:
      'radial-gradient(ellipse at 30% 40%, rgba(249,115,22,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(59,130,246,0.08) 0%, transparent 60%)',
  },
  {
    title: 'LeetCode Tracker',
    desc: 'Full-stack application to track LeetCode progress, manage solved problems, monitor coding streaks, and visualize performance analytics.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    category: 'Fullstack',
    // link: '#',
    github: 'https://github.com/saurabh7121/Leetcode_Tracker',
    accent: '#f59e0b',
    featured: true,
    icon: '📊',
    codeLines: [
      { txt: 'GET  /api/problems',         c: '#3b82f6' },
      { txt: '  solved: 245 problems ✓',   c: '#22c55e' },
      { txt: 'POST /api/streak/update',    c: '#f59e0b' },
      { txt: '  currentStreak: 28 days',   c: 'var(--text-muted-1)' },
      { txt: 'MongoDB analytics ready ✓',  c: 'var(--text-muted-2)' },
    ],
    pattern:
      'radial-gradient(ellipse at 20% 50%, rgba(245,158,11,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(59,130,246,0.08) 0%, transparent 60%)',
  },

 

  {
    title: 'Medical Chatbot',
    desc: 'AI-powered healthcare assistant that provides symptom-based guidance, health information, and conversational medical support.',
    tech: ['Python', 'Machine Learning', 'NLP', 'Flask'],
    category: 'AI/ML',
    link: '#',
    github: 'https://github.com/saurabh7121/Medical_Chatbot',
    accent: '#a855f7',
    featured: false,
    icon: '🩺',
    codeLines: [
      { txt: 'user → symptom analysis',    c: '#a855f7' },
      { txt: '  confidence: 96.4% ✓',      c: '#22c55e' },
      { txt: 'NLP intent detection',       c: '#3b82f6' },
      { txt: '  disease database queried', c: 'var(--text-muted-1)' },
      { txt: 'response generated ✓',       c: 'var(--text-muted-2)' },
    ],
    pattern:
      'radial-gradient(ellipse at 50% 30%, rgba(168,85,247,0.12) 0%, transparent 60%), radial-gradient(ellipse at 50% 80%, rgba(59,130,246,0.06) 0%, transparent 60%)',
  },
];