import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  MapPin,
  Send,
  MessageSquare,
  Loader2,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from './ui/ScrollReveal';

const githubUsername = process.env.GITHUB_USERNAME || 'saurabh7121';

const quickTopics = [
  {
    label: '💼 Full-Time Role',
    subject: 'Inquiry regarding Full-Time Developer Role',
    msg: 'Hi Saurabh, we are interested in discussing a potential full-time engineering position with our team.',
  },
  {
    label: '🚀 Freelance Project',
    subject: 'Freelance Web Project Inquiry',
    msg: 'Hi Saurabh, I have an upcoming project and would love to get a quote and timeline from you.',
  },
  {
    label: '⚡ AI / ML System',
    subject: 'AI System Integration Discussion',
    msg: 'Hi Saurabh, I would like to explore integrating AI/ML capabilities into our application.',
  },
  {
    label: '☕ Say Hello',
    subject: 'General Hello & Networking',
    msg: 'Hi Saurabh, loved your portfolio and wanted to connect!',
  },
];

const cardClass =
  'border-2 border-black bg-white text-black transition-colors duration-300 dark:border-zinc-800 dark:bg-[#090909] dark:text-white';

const mutedClass = 'text-gray-600 dark:text-zinc-400';

const inputClass =
  'w-full rounded-none border-2 border-black bg-white px-4 py-3 text-sm text-black placeholder:text-gray-400 outline-none transition-colors duration-200 focus:border-red-500 focus:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-red-400 dark:focus:bg-zinc-900';

const labelClass =
  'mb-1.5 block font-mono text-[9px] font-bold uppercase tracking-widest text-gray-600 dark:text-zinc-400';

const Contact = () => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const socials = [
    {
      icon: <FaGithub size={18} />,
      href: `https://github.com/${githubUsername}`,
      label: 'GitHub',
    },
    {
      icon: <FaLinkedin size={18} />,
      href: 'https://www.linkedin.com/in/jadhavsau777/',
      label: 'LinkedIn',
    },
    {
      icon: <FaTwitter size={18} />,
      href: 'https://twitter.com/jadhavsau777',
      label: 'Twitter',
    },
  ];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('work.jadhavsaurabh@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (error) {
      console.error('Unable to copy email:', error);
    }
  };

  const applyChip = (chip) => {
    setForm((prev) => ({
      ...prev,
      subject: chip.subject,
      message: chip.msg,
    }));
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    const body = `Hi Saurabh,\n\n${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`;
    const encodedSubject = encodeURIComponent(form.subject);
    const encodedBody = encodeURIComponent(body);
    const toEmail = 'work.jadhavsaurabh@gmail.com';

    const isMobile = /iPhone|iPad|iPod|Android/i.test(
      navigator.userAgent
    );

    if (isMobile) {
      window.location.href =
        `mailto:${toEmail}?subject=${encodedSubject}&body=${encodedBody}`;
    } else {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${toEmail}&su=${encodedSubject}&body=${encodedBody}`,
        '_blank',
        'noopener,noreferrer'
      );
    }

    setSending(false);
    setSent(true);
  };

  const resetForm = () => {
    setSent(false);
    setForm({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-white py-28 text-black transition-colors duration-300 dark:bg-black dark:text-white"
    >
      <div className="container mx-auto px-5 sm:px-8">
        {/* Header */}
        <ScrollReveal
          variant="blur-in"
          className="mb-16 flex flex-col items-center text-center"
        >
          <span className="section-label">
            <MessageSquare size={12} />
            Contact
          </span>

          <h2
            className="mb-4 font-black leading-tight text-black dark:text-white"
            style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}
          >
            Let's Build{' '}
            <span className="text-gradient-red">Something</span> Great
          </h2>

          <div className="section-divider mx-auto" />

          <p
            className={`mt-4 max-w-md text-sm leading-relaxed ${mutedClass}`}
          >
            Have a project in mind, a job opportunity, or just want to discuss
            tech? Pick a topic chip below or fill out the form.
          </p>
        </ScrollReveal>

        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
          {/* Left: Contact Information */}
          <ScrollReveal
            variant="slide-right"
            className="flex flex-col justify-between gap-8"
          >
            <div className="space-y-6">
              <h3 className="text-xl font-bold leading-snug text-black dark:text-white sm:text-2xl">
                Open to full-time roles,
                <br className="hidden sm:block" />
                <span className={mutedClass}>
                  freelance projects &amp; advisory.
                </span>
              </h3>

              <p className={`text-sm leading-relaxed ${mutedClass}`}>
                Feel free to reach out directly via email or connect on social
                platforms. I typically respond within 24 hours.
              </p>

              {/* Quick Topic Chips */}
              <div className="pt-2">
                <p
                  className={`mb-3 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest ${mutedClass}`}
                >
                  <Sparkles size={12} className="text-amber-500" />
                  Tap to pre-fill topic:
                </p>

                <div className="flex flex-wrap gap-2">
                  {quickTopics.map((chip) => (
                    <motion.button
                      key={chip.label}
                      type="button"
                      onClick={() => applyChip(chip)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="cursor-pointer rounded-none border-2 border-black bg-white px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-black transition-colors duration-200 hover:bg-[#FFD600] dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:border-[#FFD600] dark:hover:bg-[#FFD600] dark:hover:text-black"
                    >
                      {chip.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Contact Details */}
              <StaggerContainer
                staggerDelay={0.1}
                className="space-y-4 pt-2"
              >
                <StaggerItem variant="fade-up">
                  <div
                    className={`flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center ${cardClass}`}
                  >
                    <div className="flex min-w-0 items-center gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-black bg-gray-100 text-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-white">
                        <Mail size={18} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className={`mb-0.5 font-mono text-[9px] font-bold uppercase tracking-widest ${mutedClass}`}>
                          Direct Email
                        </p>

                        <a
                          href="mailto:work.jadhavsaurabh@gmail.com"
                          className="block truncate font-mono text-xs font-black text-black transition-colors hover:text-red-600 dark:text-white dark:hover:text-red-400 sm:text-sm"
                        >
                          work.jadhavsaurabh@gmail.com
                        </a>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="flex shrink-0 cursor-pointer items-center justify-center gap-1 border-2 border-black bg-white px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-black transition-colors hover:bg-[#FFD600] dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:border-[#FFD600] dark:hover:bg-[#FFD600] dark:hover:text-black self-start sm:self-auto"
                    >
                      {copied ? (
                        <Check size={11} className="text-green-500" />
                      ) : (
                        <Copy size={11} />
                      )}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </StaggerItem>

                <StaggerItem variant="fade-up">
                  <div
                    className={`flex items-center gap-3.5 p-5 ${cardClass}`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-black bg-gray-100 text-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-white">
                      <MapPin size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className={`mb-0.5 font-mono text-[9px] font-bold uppercase tracking-widest ${mutedClass}`}>
                        Location
                      </p>

                      <p className="truncate text-xs font-black text-black dark:text-white sm:text-sm">
                        Maharashtra, India 🇮🇳 (UTC +5:30)
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>

            {/* Social Links */}
            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-widest text-black dark:text-white">
                Connect Elsewhere
              </p>

              <StaggerContainer staggerDelay={0.08} className="flex gap-3">
                {socials.map((social) => (
                  <StaggerItem key={social.label} variant="zoom-in">
                    <motion.a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      aria-label={social.label}
                      className="block flex h-11 w-11 items-center justify-center border-2 border-black bg-white text-black shadow-[2px_2px_0px_#0a0a0a] transition-all duration-150 hover:translate-x-[-1px] hover:translate-y-[-1px] hover:bg-[#FFD600] hover:shadow-[3px_3px_0px_#0a0a0a] dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:shadow-[2px_2px_0px_#52525b] dark:hover:border-[#FFD600] dark:hover:bg-[#FFD600] dark:hover:text-black dark:hover:shadow-[3px_3px_0px_#52525b]"
                    >
                      {social.icon}
                    </motion.a>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </ScrollReveal>

          {/* Right: Contact Form */}
          <ScrollReveal variant="slide-left" delay={0.15}>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`flex h-full flex-col items-center justify-center gap-4 p-8 text-center shadow-[6px_6px_0px_#0a0a0a] dark:shadow-[6px_6px_0px_#52525b] sm:p-10 ${cardClass}`}
              >
                <div className="mb-2 flex h-16 w-16 items-center justify-center border-2 border-black bg-[#FFD600] text-black dark:border-zinc-700">
                  <Mail size={24} />
                </div>

                <h3 className="text-xl font-black uppercase tracking-tight text-black dark:text-white">
                  Email Client Opened!
                </h3>

                <p className={`text-sm leading-relaxed ${mutedClass}`}>
                  Your email draft has been prepared. Review it in your email
                  app and click Send to deliver your message.
                </p>

                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-outline mt-4 rounded-none"
                >
                  Write Another Message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className={`space-y-4 p-6 shadow-[6px_6px_0px_#0a0a0a] transition-colors duration-300 dark:shadow-[6px_6px_0px_#52525b] sm:p-8 ${cardClass}`}
              >
                {/* Name and Email */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {['name', 'email'].map((field) => (
                    <div key={field}>
                      <label className={labelClass}>
                        {field === 'name' ? 'Your Name' : 'Email Address'}
                      </label>

                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        required
                        autoComplete={
                          field === 'name' ? 'name' : 'email'
                        }
                        placeholder={
                          field === 'name'
                            ? 'e.g. Alex Smith'
                            : 'alex@company.com'
                        }
                        className={inputClass}
                      />
                    </div>
                  ))}
                </div>

                {/* Subject */}
                <div>
                  <label className={labelClass}>Subject</label>

                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="Project Inquiry / Job Offer / Networking"
                    className={inputClass}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className={labelClass}>Message</label>

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Describe your project, timeline, or inquiry..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary flex w-full items-center justify-center gap-2 py-4 text-xs tracking-widest disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Preparing Draft...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Direct Inquiry
                    </>
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