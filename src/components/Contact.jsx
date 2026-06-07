import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, MessageSquare, Loader2 } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const githubUsername = process.env.GITHUB_USERNAME || 'saurabh7121';



const Contact = ({ theme }) => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const socials = [
    { icon: <FaGithub size={18} />, href: `https://github.com/${githubUsername}`, label: 'GitHub', color: theme === 'dark' ? '#ffffff' : '#0f172a' },
    { icon: <FaLinkedin size={18} />, href: 'https://www.linkedin.com/in/jadhavsau777/', label: 'LinkedIn', color: '#3b82f6' },
    { icon: <FaTwitter size={18} />, href: 'https://twitter.com/jadhavsau777', label: 'Twitter', color: '#1d9bf0' },
  ];

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
            className="font-black text-primary leading-tight mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Let's Build{' '}
            <span className="text-gradient-red">Something</span> Together
          </h2>
          <div className="section-divider mx-auto" />
          <p className="text-muted-1 max-w-md mt-4 text-sm leading-relaxed">
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
              <h3 className="text-primary font-bold text-2xl leading-snug">
                Open to freelance,<br />
                <span className="text-muted-1">collaborations & full-time roles.</span>
              </h3>
              <p className="text-muted-1 leading-relaxed text-sm">
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
                    <div className="w-10 h-10 rounded-xl glass-sm flex items-center justify-center flex-shrink-0 border border-border">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-1 uppercase tracking-widest font-bold mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-primary text-sm hover:text-[#ef4444] transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-primary text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div>
              <p className="text-muted-1 text-xs uppercase tracking-widest mb-4 font-bold">Find me on</p>
              <div className="flex gap-3">
                {socials.map((s, i) => (
                  <motion.a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.12, y: -2 }}
                    className="w-11 h-11 rounded-xl glass-sm border border-border flex items-center justify-center text-muted-1 transition-all duration-200"
                    style={{ '--hover-color': s.color }}
                    onMouseEnter={(e) => e.currentTarget.style.color = s.color}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted-1)'}
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
                  style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
                  <Mail size={24} className="text-[#3b82f6]" />
                </div>
                <h3 className="text-primary font-bold text-xl">Email Draft Created!</h3>
                <p className="text-muted-1 text-sm">Your default email client has been opened. Just hit send from there!</p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="btn-outline mt-4">
                  Write Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-7 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {['name', 'email'].map((field) => (
                    <div key={field}>
                      <label className="text-[10px] text-muted-1 uppercase tracking-widest font-bold block mb-1.5">
                        {field === 'name' ? 'Name' : 'Email'}
                      </label>
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        required
                        placeholder={field === 'name' ? 'Your name' : 'your@email.com'}
                        className="w-full px-4 py-3 rounded-xl text-sm text-primary placeholder:text-muted-2 outline-none transition-all"
                        style={{
                          background: 'var(--input-bg)',
                          border: '1px solid var(--border-color)',
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'rgba(59,130,246,0.4)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="text-[10px] text-muted-1 uppercase tracking-widest font-bold block mb-1.5">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                    className="w-full px-4 py-3 rounded-xl text-sm text-primary placeholder:text-muted-2 outline-none transition-all"
                    style={{ background: 'var(--input-bg)', border: '1px solid var(--border-color)' }}
                    onFocus={(e) => e.target.style.borderColor = 'rgba(59,130,246,0.4)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                  />
                </div>

                <div>
                  <label className="text-[10px] text-muted-1 uppercase tracking-widest font-bold block mb-1.5">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Tell me about your project…"
                    className="w-full px-4 py-3 rounded-xl text-sm text-primary placeholder:text-muted-2 outline-none transition-all resize-none"
                    style={{ background: 'var(--input-bg)', border: '1px solid var(--border-color)' }}
                    onFocus={(e) => e.target.style.borderColor = 'rgba(59,130,246,0.4)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
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
