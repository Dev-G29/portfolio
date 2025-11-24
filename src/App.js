import { useEffect, useState } from 'react';
import './App.css';
import profilePhoto from './Dev_img.png';
// Uncomment the line below and replace 'your-photo.jpg' with your actual photo filename
// import profilePhoto from './your-photo.jpg';

const heroSkills = ['Java', 'Git', 'GitHub', 'Spring Boot', 'SQL', 'Kubernetes'];

const skills = [
  { category: 'Languages', items: ['TypeScript', 'JavaScript (ES2022)', 'Python', 'Go'] },
  { category: 'Frontend', items: ['React', 'Next.js', 'React Native', 'Vite', 'Redux Toolkit'] },
  { category: 'Backend & Cloud', items: ['Node.js', 'Express', 'GraphQL', 'AWS', 'Docker', 'tRPC'] },
  { category: 'Tooling', items: ['Vercel', 'Turborepo', 'Jest', 'Playwright', 'Storybook'] }
];

const projects = [
  {
    title: 'DevMarket Analytics',
    description:
      'Self-serve analytics suite that surfaces GTM trends for 120+ SaaS teams with realtime dashboards.',
    tags: ['React', 'Recharts', 'Node API', 'Postgres'],
    link: 'https://example.com/analytics',
    impact: '90% reduction in manual reporting time.'
  },
  {
    title: 'PulseOps Design System',
    description:
      'Token-driven system powering web + mobile clients. Shipped 48 composable components in 6 weeks.',
    tags: ['Storybook', 'Styled Components', 'Rollup'],
    link: 'https://example.com/design-system',
    impact: 'Brought UI defect rate down by 35%.'
  },
  {
    title: 'Creator Paywall Platform',
    description:
      'Subscription infrastructure for high-volume creators with Stripe billing and audience analytics.',
    tags: ['Next.js', 'Stripe', 'Prisma', 'AWS'],
    link: 'https://example.com/creator',
    impact: 'Enabled $2.3M ARR within the first quarter.'
  }
];

const experience = [
  {
    role: 'Lead Frontend Engineer · Atlas Labs',
    period: '2022 – Present',
    bullets: [
      'Own the web platform roadmap across growth, onboarding, and core dashboard experiences.',
      'Scaled component library adoption to 6 squads while maintaining <2% accessibility violations.',
      'Mentor 4 engineers, introducing RFC rituals and preview env CI that cut review cycles by 40%.'
    ]
  },
  {
    role: 'Senior Product Engineer · Brightside',
    period: '2019 – 2022',
    bullets: [
      'Launched personalization engine that lifted retention +18% MoM.',
      'Drove migration from CRA to Next.js, trimming TTI by 1.4s on average.',
      'Partnered with design to codify motion + theming guidelines for marketing surfaces.'
    ]
  },
  {
    role: 'Full-stack Engineer · Freelance',
    period: '2016 – 2019',
    bullets: [
      'Delivered 20+ MVPs for early stage startups covering health, fintech, and creator tools.',
      'Formalized discovery workshops that derisked scope and aligned stakeholders early.'
    ]
  }
];

const contactLinks = [
  { label: 'Email', value: 'hello@devportfolio.dev', href: 'mailto:hello@devportfolio.dev' },
  { label: 'LinkedIn', value: '@devportfolio', href: 'https://www.linkedin.com/in/devportfolio' },
  { label: 'GitHub', value: '@dev-studio', href: 'https://github.com/dev-studio' },
  { label: 'Resume', value: 'Download PDF', href: 'https://example.com/resume.pdf' }
];

function App() {
  const [skillIndex, setSkillIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme ? savedTheme === 'light' : true;
    document.documentElement.setAttribute('data-theme', initialTheme ? 'dark' : 'light');
    return initialTheme;
  });
  const currentSkill = heroSkills[skillIndex];
  const isSkillComplete = !isDeleting && displayText === currentSkill;

  useEffect(() => {
    const typingSpeed = isDeleting ? 55 : 130;
    const holdDelay = isSkillComplete ? 1100 : typingSpeed;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (!isSkillComplete) {
          setDisplayText(currentSkill.slice(0, displayText.length + 1));
        } else {
          setIsDeleting(true);
        }
      } else if (displayText.length > 0) {
        setDisplayText(currentSkill.slice(0, displayText.length - 1));
      } else {
        setIsDeleting(false);
        setSkillIndex((prev) => (prev + 1) % heroSkills.length);
      }
    }, holdDelay);

    return () => clearTimeout(timeout);
  }, [currentSkill, displayText, isDeleting, isSkillComplete]);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className={`app-shell ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <nav className="nav-bar">
        <p className="logo">Dev Portfolio</p>
        <div className="nav-right">
          <ul>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#experience">Experience</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <span className="theme-icon">{isDarkMode ? '☀️' : '🌙'}</span>
          </button>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Product-focused Frontend Engineer</p>
          <h1>
            Hi, I’m <span>Dev Gangavkar</span>.
          </h1>
          <p className="lede">
            I craft resilient experiences and I’m skilled in{' '}
            <span className={`skill-type ${isSkillComplete ? 'flash' : ''}`}>
              {displayText}
              <span className="skill-caret" aria-hidden="true">
                |
              </span>
            </span>
            .
          </p>
          <p className="lede">
            I partner with design, product, and growth to ship delightful, measurable outcomes. From
            component systems to analytics-heavy dashboards, I help teams move fast without breaking
            trust.
          </p>
          <div className="hero-cta">
            <a className="btn primary" href="#contact">
              Contact Me
            </a>
            <a className="btn ghost" href="https://example.com/resume.pdf" target="_blank" rel="noreferrer">
              View Resume
            </a>
          </div>
        </div>

        <div className="hero-media">
          <div className="photo-frame">
            {/* Replace this with your photo:
            Option 1: If you imported a local image, use:
            <img src={profilePhoto} alt="Dev Gangavkar" />
            
            Option 2: If using an online URL, use:
            <img src="https://your-image-url.com/photo.jpg" alt="Dev Gangavkar" />
            */}
           <img src={profilePhoto} alt="Dev Gangavkar" />
          </div>
        </div>
      </header>

      <main>
        <section id="projects" className="card-grid">
          <div className="section-heading">
            <p className="eyebrow">Recent collaborations</p>
            <h2>Selected Projects</h2>
          </div>
          {projects.map((project) => (
            <article key={project.title} className="card">
              <div className="card-header">
                <h3>{project.title}</h3>
                <a href={project.link} target="_blank" rel="noreferrer">
                  View case study →
                </a>
              </div>
              <p>{project.description}</p>
              <ul className="tag-list">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <p className="impact">{project.impact}</p>
            </article>
          ))}
        </section>

        <section id="experience" className="timeline">
          <div className="section-heading">
            <p className="eyebrow">Career journey</p>
            <h2>Experience</h2>
          </div>
          <div className="timeline-list">
            {experience.map((item) => (
              <article key={item.role} className="timeline-card">
                <div className="timeline-meta">
                  <p className="period">{item.period}</p>
                  <h3>{item.role}</h3>
                </div>
                <ul>
                  {item.bullets.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="skills">
          <div className="section-heading">
            <p className="eyebrow">Toolbox</p>
            <h2>Core Skills</h2>
          </div>
          <div className="skills-grid">
            {skills.map((group) => (
              <article key={group.category}>
                <h3>{group.category}</h3>
                <p>{group.items.join(' · ')}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <section id="contact" className="contact">
        <div className="section-heading">
          <p className="eyebrow">Let’s build something</p>
          <h2>Contact</h2>
        </div>
        <div className="contact-grid">
          {contactLinks.map((item) => (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
              <p className="label">{item.label}</p>
              <p className="value">{item.value}</p>
            </a>
          ))}
        </div>
      </section>

      <footer>
        <p>© {new Date().getFullYear()} Dev Patel · Currently open for fractional roles.</p>
      </footer>
    </div>
  );
}

export default App;
