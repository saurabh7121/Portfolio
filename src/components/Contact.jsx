import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, MessageSquare, Loader2, Copy, Check, Sparkles } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ui/ScrollReveal';

const githubUsername = process.env.GITHUB_USERNAME || 'saurabh7121';

const quickTopics = [
  { label: '💼 Full-Time Role', subject: 'Inquiry regarding Full-Time Developer Role', msg: 'Hi Saurabh, we are interested in discussing a potential full-time engineering position with our team.' },
  { label: '🚀 Freelance Project', subject: 'Freelance Web Project Inquiry', msg: 'Hi Saurabh, I have an upcoming project and would love to get a quote and timeline from you.' },
  { label: '⚡ AI / ML System', subject: 'AI System Integration Discussion', msg: 'Hi Saurabh, I would like to explore integrating AI/ML capabilities into our application.' },
  { label: '☕ Say Hello', subject: 'General Hello & Networking', msg: 'Hi Saurabh, loved your portfolio and wanted to connect!' },
];

const Contact = ({ theme }) => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const socials = [
    { icon: <FaGithub size={18} />, href: `https://github.com/${githubUsername}`, label: 'GitHub', color: theme === 'dark' ? '#ffffff' : '#0f172a' },
    { icon: <FaLinkedin size={18} />, href: 'https://www.linkedin.com/in/jadhavsau777/', label: 'LinkedIn', color: '#3b82f6' },
    { icon: <FaTwitter size={18} />, href: 'https://twitter.com/jadhavsau777', label: 'Twitter', color: '#1d9bf0' },
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('work.jadhavsaurabh@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  const applyChip = (chip) => {
    setForm((prev) => ({
      ...prev,
      subject: chip.subject,
      message: chip.msg,
    }));
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    const body = `Hi Saurabh,\n\n${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`;
    const encodedSubject = encodeURIComponent(form.subject);
    const encodedBody = encodeURIComponent(body);
    const toEmail = 'work.jadhavsaurabh@gmail.com';

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = `mailto:${toEmail}?subject=${encodedSubject}&body=${encodedBody}`;
    } else {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${toEmail}&su=${encodedSubject}&body=${encodedBody}`, '_blank');
    }

    setSending(false);
    setSent(true);
  };

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      {/* No ambient glows */}

      <div className="container mx-auto px-5 sm:px-8">
        {/* Header */}
        <ScrollReveal variant="blur-in" className="mb-16 flex flex-col items-center text-center">
          <span className="section-label">
            <MessageSquare size={12} />
            Contact
          </span>
          <h2
            className="font-black text-primary leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}
          >
            Let's Build{' '}
            <span className="text-gradient-red">Something</span> Great
          </h2>
          <div className="section-divider mx-auto" />
          <p className="text-muted-1 max-w-md mt-4 text-sm leading-relaxed">
            Have a project in mind, a job opportunity, or just want to discuss tech? Pick a topic chip below or fill out the form.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* ── Left info ── */}
          <ScrollReveal variant="slide-right" className="flex flex-col justify-between gap-8">
            <div className="space-y-6">
              <h3 className="text-primary font-bold text-xl sm:text-2xl leading-snug">
                Open to full-time roles,<br className="hidden sm:block" />
                <span className="text-muted-1">freelance projects &amp; advisory.</span>
              </h3>
              <p className="text-muted-1 leading-relaxed text-sm">
                Feel free to reach out directly via email or connect on social platforms. I typically respond within 24 hours.
              </p>

              {/* Quick pre-fill inquiry topic chips */}
              <div className="pt-2">
                <p className="text-[10px] text-muted-1 uppercase tracking-widest font-bold mb-3 flex items-center gap-1.5">
                  <Sparkles size={12} className="text-[#f59e0b]" /> Tap to pre-fill topic:
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickTopics.map((chip, idx) => (
                    <motion.button
                      key={idx}
                      type="button"
                      onClick={() => applyChip(chip)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="px-3 py-1.5 rounded-none text-xs font-bold font-mono uppercase tracking-wider border-2 border-black bg-white hover:bg-[#FFD600] text-black transition-all cursor-pointer"
                    >
                      {chip.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Contact details */}
              <StaggerContainer staggerDelay={0.1} className="space-y-4 pt-2">
                <StaggerItem variant="fade-up">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-none border-2 border-black bg-white text-[#0a0a0a]">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-none flex items-center justify-center border-2 border-black bg-[#f5f5f0] text-black shrink-0">
                        <Mail size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[9px] text-[#666666] uppercase tracking-widest font-mono font-bold mb-0.5">Direct Email</p>
                        <a href="mailto:work.jadhavsaurabh@gmail.com" className="text-[#0a0a0a] text-xs sm:text-sm font-black hover:text-[#E53935] transition-colors font-mono block truncate">
                          work.jadhavsaurabh@gmail.com
                        </a>
                      </div>
                    </div>

                    <button
                      onClick={handleCopyEmail}
                      className="px-3 py-1.5 rounded-none border-2 border-black text-[10px] font-mono font-bold uppercase tracking-wider text-black bg-white hover:bg-[#FFD600] flex items-center justify-center gap-1 transition-all cursor-pointer self-start sm:self-auto shrink-0"
                    >
                      {copied ? <Check size={11} className="text-[#22c55e]" /> : <Copy size={11} />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </StaggerItem>

                <StaggerItem variant="fade-up">
                  <div className="flex items-center gap-3.5 p-5 rounded-none border-2 border-black bg-white text-[#0a0a0a]">
                    <div className="w-10 h-10 rounded-none flex items-center justify-center border-2 border-black bg-[#f5f5f0] text-black shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] text-[#666666] uppercase tracking-widest font-mono font-bold mb-0.5">Location</p>
                      <p className="text-[#0a0a0a] text-xs sm:text-sm font-black truncate">Maharashtra, India 🇮🇳 (UTC +5:30)</p>
                    </div>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>

            {/* Socials */}
            <div>
              <p className="text-[#0a0a0a] text-xs uppercase tracking-widest mb-4 font-black">Connect Elsewhere</p>
              <StaggerContainer staggerDelay={0.08} className="flex gap-3">
                {socials.map((s, i) => (
                  <StaggerItem key={i} variant="zoom-in">
                    <motion.a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="w-11 h-11 rounded-none border-2 border-black flex items-center justify-center text-black bg-white hover:bg-[#FFD600] transition-all duration-150 block shadow-[2px_2px_0px_#0a0a0a] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#0a0a0a]"
                      aria-label={s.label}
                    >
                      {s.icon}
                    </motion.a>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </ScrollReveal>

          {/* ── Right form ── */}
          <ScrollReveal variant="slide-left" delay={0.15}>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 sm:p-10 flex flex-col items-center justify-center text-center h-full gap-4 bg-white border-2 border-black rounded-none shadow-[6px_6px_0px_#0a0a0a]"
              >
                <div className="w-16 h-16 rounded-none flex items-center justify-center mb-2 bg-[#FFD600] border-2 border-black text-black">
                  <Mail size={24} />
                </div>
                <h3 className="text-[#0a0a0a] font-black text-xl uppercase tracking-tight">Email Client Opened!</h3>
                <p className="text-[#666666] text-sm leading-relaxed">Your default email app has been opened with your pre-filled message. Click Send to deliver!</p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="btn-outline mt-4 rounded-none">
                  Write Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 bg-white border-2 border-black rounded-none shadow-[6px_6px_0px_#0a0a0a]">
                <div className="grid sm:grid-cols-2 gap-4">
                  {['name', 'email'].map((field) => (
                     <div key={field}>
                       <label className="text-[9px] text-[#666666] uppercase tracking-widest font-mono font-bold block mb-1.5">
                         {field === 'name' ? 'Your Name' : 'Email Address'}
                       </label>
                       <input
                         type={field === 'email' ? 'email' : 'text'}
                         name={field}
                         value={form[field]}
                         onChange={handleChange}
                         required
                         placeholder={field === 'name' ? 'e.g. Alex Smith' : 'alex@company.com'}
                         className="w-full px-4 py-3 rounded-none border-2 border-black text-sm text-[#0a0a0a] bg-white placeholder:text-neutral-400 outline-none transition-all focus:bg-[#f5f5f0]"
                       />
                     </div>
                  ))}
                </div>

                <div>
                  <label className="text-[9px] text-[#666666] uppercase tracking-widest font-mono font-bold block mb-1.5">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="Project Inquiry / Job Offer / Networking"
                    className="w-full px-4 py-3 rounded-none border-2 border-black text-sm text-[#0a0a0a] bg-white placeholder:text-neutral-400 outline-none transition-all focus:bg-[#f5f5f0]"
                  />
                </div>

                <div>
                  <label className="text-[9px] text-[#666666] uppercase tracking-widest font-mono font-bold block mb-1.5">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Describe your project, timeline, or inquiry..."
                    className="w-full px-4 py-3 rounded-none border-2 border-black text-sm text-[#0a0a0a] bg-white placeholder:text-neutral-400 outline-none transition-all resize-none focus:bg-[#f5f5f0]"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary justify-center py-4 text-xs tracking-widest disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <><Loader2 size={16} className="animate-spin" /> Preparing Draft...</>
                  ) : (
                    <><Send size={16} /> Send Direct Inquiry</>
                  )}
                </motion.button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
