/* =====================================================
   Footer — Social links with glow hover
   ===================================================== */
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiCode } from 'react-icons/fi';
import { social } from '../data/portfolio';

const socials = [
  { icon: FiGithub, href: social.github, label: 'GitHub' },
  { icon: FiLinkedin, href: social.linkedin, label: 'LinkedIn' },
  { icon: FiMail, href: `mailto:${social.email}`, label: 'Email' },
];

const Footer = () => (
  <footer className="relative z-10 border-t" style={{ borderColor: 'rgba(168,85,247,0.15)' }}>
    <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-md flex items-center justify-center font-black text-sm text-white"
          style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)' }}
        >
          V
        </div>
        <div>
          <p className="font-semibold text-white text-sm">Veekshan Rai</p>
          <p className="text-xs text-slate-500">Aspiring Full Stack Developer</p>
        </div>
      </div>



      {/* Social Icons */}
      <div className="flex items-center gap-4">
        {socials.map(({ icon: Icon, href, label }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 transition-all duration-300"
            style={{ border: '1px solid rgba(168,85,247,0.2)' }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#a855f7';
              e.currentTarget.style.borderColor = 'rgba(168,85,247,0.6)';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(168,85,247,0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '';
              e.currentTarget.style.borderColor = 'rgba(168,85,247,0.2)';
              e.currentTarget.style.boxShadow = '';
            }}
          >
            <Icon size={16} />
          </motion.a>
        ))}
      </div>
    </div>

    {/* Bottom copyright */}
    <div className="text-center py-3 text-xs text-slate-600" style={{ borderTop: '1px solid rgba(30,41,59,0.5)' }}>
      © 2025 Veekshan Rai. All rights reserved.
    </div>
  </footer>
);

export default Footer;
