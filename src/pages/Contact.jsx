/* =====================================================
   Contact Page — Glassmorphism form with EmailJS,
   glowing inputs, and success animation
   ===================================================== */
import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FiSend, FiUser, FiMail, FiMessageSquare, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { emailJS, social } from '../data/portfolio';

const InputField = ({ icon: Icon, label, id, type = 'text', placeholder, value, onChange, required, isTextarea }) => {
  const [focused, setFocused] = useState(false);

  const sharedProps = {
    id,
    name: id,
    value,
    onChange,
    required,
    placeholder,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    className: 'input-glow w-full pl-11 pr-4 py-3.5 rounded-xl text-sm',
    style: {
      background: focused ? 'rgba(15,23,42,0.95)' : 'rgba(15,23,42,0.7)',
      resize: isTextarea ? 'vertical' : undefined,
    },
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-slate-300 flex items-center gap-2">
        <Icon size={14} className="text-purple-400" />
        {label}
      </label>
      <div className="relative">
        <Icon
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200"
          style={{ color: focused ? '#a855f7' : '#475569', top: isTextarea ? '1rem' : '50%', transform: isTextarea ? 'none' : 'translateY(-50%)' }}
        />
        {isTextarea ? (
          <textarea rows={5} {...sharedProps} />
        ) : (
          <input type={type} {...sharedProps} />
        )}
      </div>
    </div>
  );
};

const SuccessAnimation = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.7 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.7 }}
    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    className="flex flex-col items-center justify-center py-12 text-center gap-5"
  >
    <motion.div
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="w-20 h-20 rounded-full flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(34,211,238,0.2))',
        border: '2px solid rgba(168,85,247,0.5)',
        boxShadow: '0 0 40px rgba(168,85,247,0.4)',
      }}
    >
      <FiCheckCircle size={36} style={{ color: '#a855f7' }} />
    </motion.div>
    <div>
      <h3 className="text-xl font-bold gradient-text mb-2">Message Sent!</h3>
      <p className="text-slate-400 text-sm">Thank you for reaching out. I'll get back to you soon!</p>
    </div>
    {/* Floating particles */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full"
        style={{ background: i % 2 === 0 ? '#a855f7' : '#22d3ee' }}
        initial={{ opacity: 0, x: 0, y: 0 }}
        animate={{
          opacity: [0, 1, 0],
          x: Math.cos((i / 6) * Math.PI * 2) * 60,
          y: Math.sin((i / 6) * Math.PI * 2) * 60,
        }}
        transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity, repeatDelay: 1 }}
      />
    ))}
  </motion.div>
);

const Contact = () => {
  const formRef = useRef(null);
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });

  const [formData, setFormData] = useState({ user_name: '', user_email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.sendForm(
        emailJS.serviceId,
        emailJS.templateId,
        formRef.current,
        emailJS.publicKey
      );
      setStatus('success');
      setFormData({ user_name: '', user_email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const contactMeta = [
    { icon: FiMail, label: 'Email', value: social.email, href: `mailto:${social.email}` },
    { icon: FiUser, label: 'GitHub', value: '@veekshan-rai', href: social.github },
    { icon: FiMessageSquare, label: 'LinkedIn', value: 'Veekshan Rai', href: social.linkedin },
  ];

  return (
    <div
      className="min-h-screen relative"
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)', top: '10%', left: '-5%', opacity: 0.07 }}
        />
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)', bottom: '10%', right: '-5%', opacity: 0.06 }}
        />
      </div>

      <div className="relative z-10 section-padding">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="text-xs font-mono text-purple-400 tracking-widest uppercase mb-3"
            >
              — Let's Connect —
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="section-heading gradient-text"
            >
              Contact Me
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-slate-400 max-w-xl mx-auto mt-3 text-sm leading-relaxed"
            >
              Have a project in mind or want to collaborate? Feel free to reach out — I'd love to hear from you.
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="shimmer-line h-px max-w-48 mx-auto mt-6"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            {/* ── Left — Contact Info ── */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 flex flex-col gap-6"
            >
              <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-white mb-2">Let's Talk</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  I'm currently open to freelance opportunities, internships, and full-time roles. Whether you have a question or just want to say hi, my inbox is always open!
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {contactMeta.map(({ icon: Icon, label, value, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    className="glass-card flex items-center gap-4 p-4 group"
                    style={{ border: '1px solid rgba(168,85,247,0.15)', transition: 'border-color 0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(168,85,247,0.5)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(168,85,247,0.15)'}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)' }}
                    >
                      <Icon size={16} className="text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-mono">{label}</p>
                      <p className="text-sm text-slate-200 font-medium group-hover:text-purple-300 transition-colors">{value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* ── Right — Contact Form ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-3 glass-card p-8 relative overflow-hidden"
            >
              {/* Corner glow */}
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-10 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }}
              />

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <SuccessAnimation key="success" />
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-5"
                  >
                    <InputField
                      icon={FiUser}
                      label="Your Name"
                      id="user_name"
                      placeholder="Veekshan Rai"
                      value={formData.user_name}
                      onChange={handleChange}
                      required
                    />
                    <InputField
                      icon={FiMail}
                      label="Email Address"
                      id="user_email"
                      type="email"
                      placeholder="hello@example.com"
                      value={formData.user_email}
                      onChange={handleChange}
                      required
                    />
                    <InputField
                      icon={FiMessageSquare}
                      label="Message"
                      id="message"
                      placeholder="Tell me about your project or just say hi..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      isTextarea
                    />

                    {/* Error message */}
                    <AnimatePresence>
                      {status === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center gap-2 text-red-400 text-sm px-4 py-3 rounded-lg"
                          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}
                        >
                          <FiAlertCircle size={16} />
                          Something went wrong. Please try again or email directly.
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      whileHover={{ scale: status === 'sending' ? 1 : 1.03 }}
                      whileTap={{ scale: status === 'sending' ? 1 : 0.97 }}
                      className="btn-gradient flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white mt-2 disabled:opacity-60"
                    >
                      {status === 'sending' ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <FiSend size={15} />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
