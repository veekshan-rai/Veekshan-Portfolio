/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-purple': '#a855f7',
        'neon-cyan': '#22d3ee',
        'neon-blue': '#3b82f6',
        'dark-bg': '#030712',
        'dark-card': '#0f172a',
        'dark-border': '#1e293b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'neon-purple': '0 0 20px rgba(168,85,247,0.4), 0 0 60px rgba(168,85,247,0.1)',
        'neon-cyan': '0 0 20px rgba(34,211,238,0.4), 0 0 60px rgba(34,211,238,0.1)',
        'neon-blue': '0 0 20px rgba(59,130,246,0.4), 0 0 60px rgba(59,130,246,0.1)',
        'glow-sm': '0 0 10px rgba(168,85,247,0.3)',
        'glow-lg': '0 0 40px rgba(168,85,247,0.5)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #030712 0%, #0f172a 50%, #1a0a2e 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(168,85,247,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(168,85,247,0.8)' },
        },
      },
    },
  },
  plugins: [],
}
