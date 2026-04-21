// ============================================================
// DATA — Portfolio Content for Veekshan Rai
// ============================================================

export const personalInfo = {
  name: 'Veekshan Rai',
  role: 'Aspiring Full Stack Developer',
  about:
    'I am a passionate full stack developer focused on building modern, user-friendly web applications. I enjoy solving real-world problems using Java, Python, and web technologies. I am continuously improving my skills to become an expert developer and create impactful digital products.',
  resumeUrl: '/veekshan-rai-FullStack.pdf', // place your PDF here in /public
};

export const education = [
  {
    id: 1,
    institution: 'SDM Degree College, Ujire',
    course: 'Bachelor of Computer Applications (BCA)',
    duration: '2022 – 2025',
    grade: 'CGPA: 7.5',
    description:
      'Comprehensive undergraduate program covering data structures, algorithms, web technologies, databases, Java, Python, and software engineering principles.',
    icon: '🎓',
    color: 'purple',
  },
  {
    id: 2,
    institution: 'Vani Pre-University College, Belthangady',
    course: 'Pre-University Course (PUC)',
    duration: 'Completed: 2022',
    grade: 'Percentage: 78%',
    description:
      'Completed pre-university education with a strong foundation in Computer Science.',
    icon: '🏫',
    color: 'cyan',
  },
];

export const projects = [
  {
    id: 1,
    title: 'CashNest',
    subtitle: 'Finance Tracker',
    tech: ['Python', 'Django', 'Tailwind CSS'],
    description:
      'A personal finance management web application that helps users track income, expenses, and savings efficiently. Includes categorized transactions, real-time balance updates, and a clean dashboard UI.',
    liveUrl: '#',
    githubUrl: 'https://github.com/veekshan-rai/Finance-Tracker',
    gradient: 'from-purple-600 to-indigo-600',
    glowColor: 'rgba(168,85,247,0.5)',
    emoji: '💰',
  },
  {
    id: 2,
    title: 'QuickBite',
    subtitle: 'Food Delivery App',
    tech: ['HTML', 'CSS', 'JavaScript'],
    description:
      'A responsive food delivery web application that allows users to browse menus, view food items, and simulate ordering functionality with a user-friendly and attractive interface.',
    liveUrl: '#',
    githubUrl: 'https://github.com/veekshan-rai/Food-delivery',
    gradient: 'from-orange-500 to-pink-600',
    glowColor: 'rgba(249,115,22,0.5)',
    emoji: '🍔',
  },
  {
    id: 3,
    title: 'Shoe Store',
    subtitle: 'E-Commerce Website',
    tech: ['React', 'Tailwind CSS'],
    description:
      'A modern e-commerce platform featuring product listings, smooth UI, and an automatic image carousel for an enhanced user experience.',
    liveUrl: '#',
    githubUrl: 'https://github.com/veekshan-rai/Trend-Feet',
    gradient: 'from-cyan-500 to-blue-600',
    glowColor: 'rgba(34,211,238,0.5)',
    emoji: '👟',
  },
  {
    id: 4,
    title: 'Recipe Book',
    subtitle: 'API-Powered Recipe App',
    tech: ['React', 'DummyJSON API', 'CSS'],
    description:
      'A responsive web application that provides cooking instructions and ingredient details using API integration, designed for simplicity and usability.',
    liveUrl: '#',
    githubUrl: 'https://github.com/veekshan-rai/Recipe-Book',
    gradient: 'from-green-500 to-teal-600',
    glowColor: 'rgba(34,197,94,0.5)',
    emoji: '🍳',
  },
];

export const social = {
  github: 'https://github.com/veekshan-rai',
  linkedin: 'https://www.linkedin.com/in/veekshan-rai-7172132a3/',
  email: 'veekshanrai716@gmail.com',
};

export const emailJS = {
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
  publicKey: 'YOUR_PUBLIC_KEY',
};
