import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, MessageSquare, Loader2 } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const githubUsername = process.env.GITHUB_USERNAME || 'saurabh7121';

const socials = [
  { icon: <FaGithub size={18} />, href: `https://github.com/${githubUsername}`, label: 'GitHub', color: '#ffffff' },
  { icon: <FaLinkedin size={18} />, href: 'https://www.linkedin.com/in/jadhavsau777/', label: 'LinkedIn', color: '#3b82f6' },
  { icon: <FaTwitter size={18} />, href: 'https://twitter.com/jadhavsau777', label: 'Twitter', color: '#1d9bf0' },
];

const Contact = () => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1800));
    setSending(false);
    setSent(true);
  };

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      {/* Dual glows */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#ef4444] opacity-[0.04] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#3b82f6] opacity-[0.04] blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <span className="section-label">
            <MessageSquare size={12} />
            Contact
          </span>
          <h2
            className="font-black text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Let's Build{' '}
            <span className="text-gradient-red">Something</span> Together
          </h2>
          <div className="section-divider mx-auto" />
          <p className="text-[#555] max-w-md mt-4 text-sm leading-relaxed">
            Have a project in mind? Looking for a developer to join your team? Let's talk.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* ── Left info ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-between gap-8"
          >
            <div className="space-y-6">
              <h3 className="text-white font-bold text-2xl leading-snug">
                Open to freelance,<br />
                <span className="text-[#71717a]">collaborations & full-time roles.</span>
              </h3>
              <p className="text-[#444] leading-relaxed text-sm">
                I'm always open to new opportunities, interesting problems, and exciting collaborations.
                Don't hesitate — just say hello!
              </p>

              {/* Contact details */}
              <div className="space-y-4">
                {[
                  {
                    icon: <Mail size={18} className="text-[#ef4444]" />,
                    label: 'Email',
                    value: 'work.jadhavsaurabh@gmail.com',
                    href: 'mailto:work.jadhavsaurabh@gmail.com',
                  },
                  {
                    icon: <MapPin size={18} className="text-[#3b82f6]" />,
                    label: 'Location',
                    value: 'Maharashtra, India',
                    href: null,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl glass-sm flex items-center justify-center flex-shrink-0 border border-white/06">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] text-[#333] uppercase tracking-widest font-bold mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-white text-sm hover:text-[#ef4444] transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div>
              <p className="text-[#333] text-xs uppercase tracking-widest mb-4 font-bold">Find me on</p>
              <div className="flex gap-3">
                {socials.map((s, i) => (
                  <motion.a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.12, y: -2 }}
                    className="w-11 h-11 rounded-xl glass-sm border border-white/06 flex items-center justify-center text-[#555] transition-all duration-200"
                    style={{ '--hover-color': s.color }}
                    onMouseEnter={(e) => e.currentTarget.style.color = s.color}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#555'}
                    aria-label={s.label}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card p-10 flex flex-col items-center justify-center text-center h-full gap-4"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
                  style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
                  <Send size={24} className="text-green-500" />
                </div>
                <h3 className="text-white font-bold text-xl">Message Sent!</h3>
                <p className="text-[#555] text-sm">Thanks for reaching out. I'll get back to you soon.</p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="btn-outline mt-4">
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-7 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {['name', 'email'].map((field) => (
                    <div key={field}>
                      <label className="text-[10px] text-[#444] uppercase tracking-widest font-bold block mb-1.5">
                        {field === 'name' ? 'Name' : 'Email'}
                      </label>
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        required
                        placeholder={field === 'name' ? 'Your name' : 'your@email.com'}
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-[#333] outline-none transition-all"
                        style={{
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'rgba(59,130,246,0.4)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.06)'}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="text-[10px] text-[#444] uppercase tracking-widest font-bold block mb-1.5">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-[#333] outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                    onFocus={(e) => e.target.style.borderColor = 'rgba(59,130,246,0.4)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.06)'}
                  />
                </div>

                <div>
                  <label className="text-[10px] text-[#444] uppercase tracking-widest font-bold block mb-1.5">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Tell me about your project…"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-[#333] outline-none transition-all resize-none"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                    onFocus={(e) => e.target.style.borderColor = 'rgba(59,130,246,0.4)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.06)'}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary justify-center py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <><Loader2 size={16} className="animate-spin" /> Sending…</>
                  ) : (
                    <><Send size={16} /> Send Message</>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
