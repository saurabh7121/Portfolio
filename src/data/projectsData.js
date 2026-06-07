export const projects = [
  {
    title: 'LeetCode Tracker',
    desc: 'Full-stack application to track LeetCode progress, manage solved problems, monitor coding streaks, and visualize performance analytics.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    category: 'Fullstack',
    link: '#',
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
    title: 'Smart Campus Transport',
    desc: 'Mobile application for real-time bus tracking, route management, transport booking, and live ETA updates for campus students.',
    tech: ['React Native', 'Firebase', 'Google Maps API'],
    category: 'Mobile',
    link: '#',
    github: 'https://github.com/saurabh7121/Smart_Campus_Transport',
    accent: '#3b82f6',
    featured: false,
    icon: '🚌',
    codeLines: [
      { txt: 'WS  live_bus_feed connected', c: '#3b82f6' },
      { txt: '  buses: 12 active 🟢',       c: '#22c55e' },
      { txt: 'GET /routes/campus-north',    c: 'var(--text-muted-1)' },
      { txt: '  eta: 4 min · seats: 8',     c: '#f59e0b' },
      { txt: 'Firebase Realtime DB ✓',      c: 'var(--text-muted-2)' },
    ],
    pattern:
      'radial-gradient(ellipse at 30% 40%, rgba(59,130,246,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(34,197,94,0.06) 0%, transparent 60%)',
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