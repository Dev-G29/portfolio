import { useEffect, useState, useRef } from 'react';
import './App.css';
import profilePhoto from './Dev_img.png';
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram } from 'react-icons/fa';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
// Uncomment the line below and replace 'your-photo.jpg' with your actual photo filename
// import profilePhoto from './your-photo.jpg';

const heroSkills = ['Java', 'Git', 'GitHub', 'Spring Boot', 'SQL', 'Kubernetes'];

const coreSkills = [
  { 
    name: 'Java', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original-wordmark.svg'
  },
  { 
    name: 'Spring Boot', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original-wordmark.svg'
  },
  { 
    name: 'Git', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original-wordmark.svg'
  },
  { 
    name: 'GitHub', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original-wordmark.svg'
  },
  { 
    name: 'Kubernetes', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain-wordmark.svg'
  },
  { 
    name: 'SQL', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg'
  },
  { 
    name: 'Hibernate', 
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original-wordmark.svg'
  }
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

// Social Media Links - Customize these with your own links
// You can add or remove social media platforms by editing this array
// Available icons from react-icons/fa: FaLinkedin, FaGithub, FaEnvelope, FaInstagram, FaYoutube, FaBehance, etc.
const socialLinks = [
  { 
    name: 'LinkedIn', 
    href: 'https://www.linkedin.com/in/dev-gangavkar', 
    icon: FaLinkedin,
    color: '#0077b5'
  },
  { 
    name: 'GitHub', 
    href: 'https://github.com/Dev-G29', 
    icon: FaGithub,
    color: '#333'
  },
  { 
    name: 'Email', 
    href: 'mailto:devgangavkar@gmail.com',
    webmailUrl: 'https://mail.google.com/mail/?view=cm&to=devgangavkar@gmail.com',
    icon: FaEnvelope,
    color: '#ea4335'
  },
  { 
    name: 'Instagram', 
    href: 'https://www.instagram.com/dev_gangavkar/', 
    icon: FaInstagram,
    color: '#e4405f'
  }
];

function App() {
  const [skillIndex, setSkillIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    const initialIsDark = savedTheme ? savedTheme === 'dark' : true;
    document.documentElement.setAttribute('data-theme', initialIsDark ? 'dark' : 'light');
    return initialIsDark;
  });
  const [visitorCount, setVisitorCount] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [carouselScroll, setCarouselScroll] = useState(0);
  const carouselRef = useRef(null);
  
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

  // Scroll animations using Intersection Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Small delay to ensure DOM is ready
    const timeout = setTimeout(() => {
      // Observe all sections and cards
      const elementsToAnimate = document.querySelectorAll('.scroll-animate, .section-heading, .contact-form');
      elementsToAnimate.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeout);
      const elementsToAnimate = document.querySelectorAll('.scroll-animate, .section-heading, .contact-form');
      elementsToAnimate.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Visitor counter - only count once per session
  useEffect(() => {
    const sessionKey = 'portfolio_visited_session';
    const hasVisitedThisSession = sessionStorage.getItem(sessionKey);
    
    if (!hasVisitedThisSession) {
      // Mark this session as visited
      sessionStorage.setItem(sessionKey, 'true');
      
      // Increment counter using CountAPI (free service)
      const counterKey = 'portfolio-visits-devgangavkar';
      fetch(`https://api.countapi.xyz/hit/${counterKey}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.value) {
            setVisitorCount(data.value);
          }
        })
        .catch((err) => {
          console.error('Error updating visitor count:', err);
          // Fallback: use localStorage
          const localCount = parseInt(localStorage.getItem('portfolio-visits') || '0') + 1;
          localStorage.setItem('portfolio-visits', localCount.toString());
          setVisitorCount(localCount);
        });
    } else {
      // Load existing count without incrementing
      const counterKey = 'portfolio-visits-devgangavkar';
      fetch(`https://api.countapi.xyz/get/${counterKey}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.value) {
            setVisitorCount(data.value);
          }
        })
        .catch(() => {
          const localCount = parseInt(localStorage.getItem('portfolio-visits') || '0');
          setVisitorCount(localCount);
        });
    }
  }, []);

  // Initialize EmailJS (optional - only if you've set up EmailJS)
  // To set up EmailJS:
  // 1. Go to https://www.emailjs.com/ and create a free account
  // 2. Create an email service (Gmail, Outlook, etc.)
  // 3. Create an email template
  // 4. Get your Public Key, Service ID, and Template ID
  // 5. Replace the placeholders below with your actual values
  useEffect(() => {
    const emailjsKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
    if (emailjsKey && emailjsKey !== 'YOUR_PUBLIC_KEY') {
      emailjs.init(emailjsKey);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    const cardWidth = 220; // Width of each card including gap
    const scrollAmount = cardWidth * 2; // Scroll 2 cards at a time
    const newScroll = direction === 'left' 
      ? carouselScroll - scrollAmount 
      : carouselScroll + scrollAmount;
    
    const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
    const clampedScroll = Math.max(0, Math.min(newScroll, maxScroll));
    
    setCarouselScroll(clampedScroll);
    carouselRef.current.scrollTo({
      left: clampedScroll,
      behavior: 'smooth'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    try {
      // Replace these with your EmailJS credentials or use environment variables
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

      // Check if EmailJS is configured
      if (serviceId === 'YOUR_SERVICE_ID' || templateId === 'YOUR_TEMPLATE_ID' || publicKey === 'YOUR_PUBLIC_KEY') {
        setFormStatus({
          type: 'error',
          message: 'Email service not configured yet. Please email directly or contact the developer to set up the contact form.'
        });
        setIsSubmitting(false);
        return;
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        message: formData.message,
        to_name: 'Dev Gangavkar'
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setFormStatus({
        type: 'success',
        message: 'Thank you! Your message has been sent successfully.'
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('EmailJS error:', error);
      setFormStatus({
        type: 'error',
        message: 'Sorry, there was an error sending your message. Please try again or email directly at devgangavkar@gmail.com'
      });
    } finally {
      setIsSubmitting(false);
    }
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
          <div className="social-icons">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              const isEmailLink = social.href.startsWith('mailto:');
              if (isEmailLink) {
                return (
                  <a
                    key={social.name}
                    href={social.webmailUrl || social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="social-icon-link"
                    aria-label={social.name}
                    style={{ '--icon-color': social.color }}
                    title="Open Gmail to send email"
                  >
                    <IconComponent />
                  </a>
                );
              }
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon-link"
                  aria-label={social.name}
                  style={{ '--icon-color': social.color }}
                >
                  <IconComponent />
                </a>
              );
            })}
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
            <article key={project.title} className="card scroll-animate">
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
              <article key={item.role} className="timeline-card scroll-animate">
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
            <h2 className="core-skills-heading">Core Skills</h2>
          </div>
          <div className="skills-carousel-container">
            <button 
              className="carousel-nav-btn carousel-nav-left"
              onClick={() => scrollCarousel('left')}
              aria-label="Scroll left"
            >
              <FaChevronLeft />
            </button>
            <div className="skills-carousel" ref={carouselRef}>
              {coreSkills.map((skill, index) => (
                <div key={skill.name} className="skill-card scroll-animate">
                  <div className="skill-card-content">
                    <div className={`skill-logo ${skill.name.toLowerCase().replace(/\s+/g, '-')}-logo`} data-skill={skill.name.toLowerCase()}>
                      <img src={skill.logo} alt={`${skill.name} logo`} loading="lazy" />
                    </div>
                    <h3>{skill.name}</h3>
                  </div>
                </div>
              ))}
            </div>
            <button 
              className="carousel-nav-btn carousel-nav-right"
              onClick={() => scrollCarousel('right')}
              aria-label="Scroll right"
            >
              <FaChevronRight />
            </button>
          </div>
        </section>
      </main>

      <section id="contact" className="contact">
        <div className="section-heading">
          <p className="eyebrow">Let's build something</p>
          <h2>Contact</h2>
        </div>
        <div className="contact-social-icons">
          {socialLinks.map((social) => {
            const IconComponent = social.icon;
            const isEmailLink = social.href.startsWith('mailto:');
            if (isEmailLink) {
              return (
                <a
                  key={social.name}
                  href={social.webmailUrl || social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-icon-link"
                  aria-label={social.name}
                  style={{ '--icon-color': social.color }}
                  title="Open Gmail to send email"
                >
                  <IconComponent />
                </a>
              );
            }
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="contact-social-icon-link"
                aria-label={social.name}
                style={{ '--icon-color': social.color }}
              >
                <IconComponent />
              </a>
            );
          })}
        </div>
        <div className="contact-form-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number (Optional)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  placeholder="Why do you want to connect or what job opportunity are you offering?"
                />
              </div>
            </div>
            {formStatus.message && (
              <div className={`form-status ${formStatus.type}`}>
                {formStatus.message}
              </div>
            )}
            <button type="submit" className="btn primary" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      <footer>
        <p>© {new Date().getFullYear()} Dev Gangavkar · Currently open for fractional roles.</p>
        {visitorCount > 0 && (
          <p className="visitor-counter">Portfolio visits: {visitorCount.toLocaleString()}</p>
        )}
      </footer>
    </div>
  );
}

export default App;
