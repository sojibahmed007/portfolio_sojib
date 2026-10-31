import React, { useState } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Globe,
  Terminal,
  BookOpen,
  ShoppingCart,
  Mic2,
  Layers,
  Layout,
  Smartphone,
  Facebook,
  ShieldCheck,
  Bug,
  CheckCircle2,
  FileSpreadsheet,
  Briefcase,
  GraduationCap,
  ArrowUpRight,
  Sparkles,
  PhoneCall,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [activeTab, setActiveTab] = useState('all');

  const stats = [
    { label: 'Defect Cards Verified', value: '116+', sub: 'Trello Staging & Live' },
    { label: 'Internship Experience', value: '3 Mos', sub: 'Appifylab (LMS SaaS)' },
    { label: 'QA Test Suites', value: '7+', sub: 'Google Sheets & Docs' },
    { label: 'Academic CGPA', value: '3.59', sub: 'Leading University (CSE)' }
  ];

  const projects = [
    {
      id: 1,
      category: 'qa',
      title: 'Intern QA Portfolio & Bug Case Reports',
      subtitle: 'Appifylab (EzyCourse & EzyCommunity)',
      description:
        'Documented and verified 116+ production/staging defect tickets across EzyCommunity (103 cards) and EzyCourse LMS (13 cards). Authored comprehensive test suites in Google Sheets for Deep Linking, 1:1 Coaching, and User Status.',
      tech: ['Manual Testing', 'Trello (116+ Tickets)', 'iOS TestFlight', 'Deep Link QA', 'Google Sheets'],
      link: 'https://github.com/sojibahmed007/Intern_work',
      liveLink: 'https://github.com/sojibahmed007/Intern_work#readme',
      liveLabel: 'View Reports',
      featured: true,
      badgeColor: '#38bdf8',
      icon: <Bug size={24} />
    },
    {
      id: 2,
      category: 'qa',
      title: 'Videos Tab UI Automation Suite',
      subtitle: 'Playwright & TypeScript End-to-End QA',
      description:
        'Automated end-to-end regression test suite testing Videos tab visibility, URL routing (/videos), empty state handling, and state persistence after browser reload.',
      tech: ['Playwright', 'TypeScript', 'Test Automation', 'Regression QA'],
      link: 'https://github.com/sojibahmed007/Automation_Library_issue_com',
      liveLink: 'https://github.com/sojibahmed007/Automation_Library_issue_com',
      liveLabel: 'View Automation',
      featured: true,
      badgeColor: '#a855f7',
      icon: <Terminal size={24} />
    },
    {
      id: 3,
      category: 'dev',
      title: 'SwiftCart — E-Commerce Web Application',
      subtitle: 'Modern Shopping Experience & UI Testing',
      description:
        'A dynamic e-commerce frontend interface with real-time product filtering, shopping cart calculations, responsive layouts, and edge-case form validation.',
      tech: ['JavaScript ES6', 'REST APIs', 'HTML5', 'CSS3', 'UI Testing'],
      link: 'https://github.com/sojibahmed007/SwiftCart-E-Commerce',
      liveLink: 'https://fascinating-melomakarona-78538e.netlify.app/',
      liveLabel: 'Live Demo',
      featured: true,
      badgeColor: '#f97316',
      icon: <ShoppingCart size={24} />
    },
    {
      id: 4,
      category: 'dev',
      title: 'Living Lab Platform',
      subtitle: 'Data Monitoring Interface',
      description:
        'An experimental laboratory web interface featuring real-time data monitoring components, responsive grid architecture, and interactive layout elements.',
      tech: ['HTML5', 'CSS3', 'Tailwind CSS', 'JavaScript'],
      link: 'https://github.com/sojibahmed007/Living_lab',
      liveLink: 'https://resplendent-kelpie-dd99b8.netlify.app',
      liveLabel: 'Live Demo',
      badgeColor: '#10b981',
      icon: <Layers size={24} />
    },
    {
      id: 5,
      category: 'dev',
      title: 'Text to Speech Converter',
      subtitle: 'Web Speech Synthesis Tool',
      description:
        'Interactive web application converting text input into natural speech using the Web Speech API with custom rate, pitch, and voice controls.',
      tech: ['JavaScript ES6', 'Web Speech API', 'CSS3'],
      link: 'https://github.com/sojibahmed007/Text_to_Speech',
      liveLink: 'https://scintillating-pithivier-0ce296.netlify.app',
      liveLabel: 'Live Demo',
      badgeColor: '#06b6d4',
      icon: <Mic2 size={24} />
    },
    {
      id: 6,
      category: 'dev',
      title: 'English Janala',
      subtitle: 'Interactive Language Learning Portal',
      description:
        'An educational web platform designed for English language learning with structured vocabulary modules, clean navigation, and accessible UI elements.',
      tech: ['HTML5', 'JavaScript ES6', 'CSS3'],
      link: 'https://github.com/sojibahmed007/English_janala',
      liveLink: 'https://statuesque-tartufo-1ae5df.netlify.app',
      liveLabel: 'Live Demo',
      badgeColor: '#3b82f6',
      icon: <BookOpen size={24} />
    }
  ];

  const skillCategories = [
    {
      title: 'Software Testing & Methodologies',
      icon: <ShieldCheck size={20} className="text-cyan-400" />,
      skills: [
        'Manual Functional Testing',
        'Regression & Retesting',
        'Smoke & Sanity Testing',
        'Boundary Value Analysis',
        'RTL (Arabic) Localization QA',
        'Root Cause & Defect Triage'
      ]
    },
    {
      title: 'Mobile QA & Platforms',
      icon: <Smartphone size={20} className="text-blue-400" />,
      skills: [
        'iOS (Apple TestFlight Builds)',
        'Android (Branded APK Testing)',
        'Deep Link URL Verification',
        'Mobile Viewport & Gesture QA',
        'Permission Validations (Camera/Mic)'
      ]
    },
    {
      title: 'API Testing & Network Analysis',
      icon: <Terminal size={20} className="text-purple-400" />,
      skills: [
        'Postman API Testing',
        'REST API Endpoint Verification',
        'HTTP Status Codes (404, 422, 500)',
        'JSON Request/Response Validation',
        'Chrome DevTools Network Inspection'
      ]
    },
    {
      title: 'Test Management & Tools',
      icon: <FileSpreadsheet size={20} className="text-emerald-400" />,
      skills: [
        'Trello (116+ Defect Cards Tracked)',
        'Test Cases & Suites (Google Sheets)',
        'Bug Life Cycle Management',
        'Agile / Scrum Methodologies',
        'Git & GitHub Version Control'
      ]
    },
    {
      title: 'Automation & Programming',
      icon: <Code2 size={20} className="text-amber-400" />,
      skills: [
        'Playwright Automation',
        'TypeScript',
        'JavaScript (ES6+)',
        'HTML5 & CSS3',
        'Tailwind CSS',
        'VS Code'
      ]
    }
  ];

  const filteredProjects = activeTab === 'all'
    ? projects
    : projects.filter(p => p.category === activeTab);

  return (
    <div className="portfolio-wrapper">
      {/* Background Gradients */}
      <div className="bg-glow bg-glow-1" />
      <div className="bg-glow bg-glow-2" />

      {/* Navigation */}
      <header className="navbar-sticky">
        <nav className="container nav-content">
          <a href="#" className="nav-brand">
            <img
              src="https://github.com/sojibahmed007.png"
              alt="Sojib Ahmed"
              className="nav-avatar"
            />
            <div className="nav-title-group">
              <span className="nav-name">SOJIB AHMED</span>
              <span className="nav-role">SQA Engineer</span>
            </div>
          </a>

          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Work &amp; QA</a>
            <a href="#skills">Skills</a>
            <a href="#contact" className="nav-cta">Connect</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-badge-wrap"
        >
          <span className="status-pill">
            <span className="pulse-indicator" />
            Available for SQA Engineer &amp; QA Roles
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="hero-heading"
        >
          Engineering Quality. <br />
          <span className="gradient-text">Ensuring Digital Precision.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hero-summary"
        >
          I'm <strong className="text-white">Sojib Ahmed</strong>, a quality-driven <strong>Software Quality Assurance (SQA) Engineer</strong> with 3 months of intensive internship experience at <strong>Appifylab</strong>. Specializing in manual SaaS (LMS) testing, branded mobile builds via <strong>Apple TestFlight</strong>, deep link routing, API response validation, and test automation with <strong>Playwright</strong>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hero-actions"
        >
          <a href="#projects" className="btn-primary">
            Explore QA Work <ArrowUpRight size={18} />
          </a>
          <a href="https://github.com/sojibahmed007/Intern_work" target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <Github size={18} /> QA Portfolio
          </a>
          <a href="mailto:sojibsylhet77@gmail.com" className="btn-outline">
            <Mail size={18} /> Email Me
          </a>
        </motion.div>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="stats-grid"
        >
          {stats.map((stat, i) => (
            <div key={i} className="stat-card glass-panel">
              <div className="stat-value gradient-text">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-sub">{stat.sub}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Experience Section (Spotlight Appifylab) */}
      <section id="experience" className="container section-spacing">
        <div className="section-header text-center">
          <span className="section-eyebrow">Professional Background</span>
          <h2 className="section-title">Hands-On SQA Experience</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="experience-card glass-panel"
        >
          <div className="exp-top-bar">
            <div>
              <div className="exp-company-badge">
                <Briefcase size={16} /> Appifylab
              </div>
              <h3 className="exp-role-title">SQA Engineer Intern</h3>
              <p className="exp-products">
                Platforms: <strong>EzyCourse</strong> (LMS SaaS) &amp; <strong>EzyCommunity</strong> (Web, iOS, Android)
              </p>
            </div>
            <div className="exp-date-pill">August 03 – October 30, 2026 (3 Months)</div>
          </div>

          <div className="exp-highlights-grid">
            <div className="exp-highlight-item">
              <div className="exp-icon-wrap" style={{ color: '#38bdf8' }}>
                <Bug size={20} />
              </div>
              <div>
                <h4>116+ Defect Tickets Tracked</h4>
                <p>Managed 103 cards on EzyCommunity (79 App Live, 24 Web Live) and 13 EzyCourse cards via Trello with exact reproduction steps and media logs.</p>
              </div>
            </div>

            <div className="exp-highlight-item">
              <div className="exp-icon-wrap" style={{ color: '#a855f7' }}>
                <Smartphone size={20} />
              </div>
              <div>
                <h4>iOS TestFlight &amp; Deep Link QA</h4>
                <p>Validated pre-release iOS builds and Android APKs, verifying deep links to private lessons, courses, and community chat channels without routing drop-offs.</p>
              </div>
            </div>

            <div className="exp-highlight-item">
              <div className="exp-icon-wrap" style={{ color: '#f59e0b' }}>
                <Terminal size={20} />
              </div>
              <div>
                <h4>API &amp; Backend Status Code Analysis</h4>
                <p>Replicated 500 errors on blog creation, 422 unprocessable entity responses on video library deletion, and 404 access expiration logic on bundle courses.</p>
              </div>
            </div>

            <div className="exp-highlight-item">
              <div className="exp-icon-wrap" style={{ color: '#10b981' }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4>Boundary &amp; Concurrency Edge Cases</h4>
                <p>Diagnosed 5,000+ character app crash boundaries, multi-tap race conditions on lesson loading, and cross-platform voice message playback bugs between Web &amp; iOS.</p>
              </div>
            </div>
          </div>

          <div className="exp-footer">
            <a
              href="https://github.com/sojibahmed007/Intern_work"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-text-link"
            >
              View Full Intern QA Portfolio &amp; Test Reports on GitHub <ArrowUpRight size={16} />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container section-spacing">
        <div className="section-header text-center">
          <span className="section-eyebrow">Work &amp; Practical Applications</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A blend of real-world SQA test documentation, test automation, and full-stack web applications.
          </p>

          {/* Filter Tabs */}
          <div className="filter-tabs">
            <button
              onClick={() => setActiveTab('all')}
              className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            >
              All Projects ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('qa')}
              className={`tab-btn ${activeTab === 'qa' ? 'active' : ''}`}
            >
              SQA &amp; Testing
            </button>
            <button
              onClick={() => setActiveTab('dev')}
              className={`tab-btn ${activeTab === 'dev' ? 'active' : ''}`}
            >
              Web Applications
            </button>
          </div>
        </div>

        <motion.div layout className="projects-grid">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className={`project-card glass-panel ${project.featured ? 'featured-card' : ''}`}
              >
                <div className="project-top">
                  <div className="project-icon-box" style={{ color: project.badgeColor }}>
                    {project.icon}
                  </div>
                  {project.featured && (
                    <span className="featured-pill">
                      <Sparkles size={12} /> Key Project
                    </span>
                  )}
                </div>

                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  {project.subtitle && <p className="project-sub">{project.subtitle}</p>}
                  <p className="project-desc">{project.description}</p>
                </div>

                <div className="tech-tag-wrap">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="project-card-footer">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-link btn-code"
                  >
                    <Github size={16} /> Repository
                  </a>
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-link btn-live"
                  >
                    <ExternalLink size={16} /> {project.liveLabel || 'Live Demo'}
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="container section-spacing">
        <div className="section-header text-center">
          <span className="section-eyebrow">Competencies &amp; Toolset</span>
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">
            Core skills spanning manual QA methodologies, mobile device testing, API inspection, and modern web technologies.
          </p>
        </div>

        <div className="skills-category-grid">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="skill-category-card glass-panel"
            >
              <div className="skill-cat-header">
                {cat.icon}
                <h3 className="skill-cat-title">{cat.title}</h3>
              </div>
              <ul className="skill-items-list">
                {cat.skills.map((s, sIdx) => (
                  <li key={sIdx} className="skill-item">
                    <CheckCircle2 size={14} className="text-cyan-400" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About & Education */}
      <section id="about" className="container section-spacing">
        <div className="about-grid">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="about-bio glass-panel"
          >
            <span className="section-eyebrow">Profile</span>
            <h2 className="section-title text-left">About Sojib Ahmed</h2>
            <p className="bio-paragraph">
              I am a Computer Science &amp; Engineering graduate from <strong>Leading University, Sylhet</strong>. My passion lies in software reliability, exploratory testing, and delivering flawless digital products.
            </p>
            <p className="bio-paragraph">
              During my internship at <strong>Appifylab</strong>, I worked closely with engineering teams to validate complex SaaS workflows, multi-tenant LMS modules, and cross-platform community features. I combine a developer's mindset with a QA engineer's meticulous attention to detail to uncover edge cases before they reach end users.
            </p>
            <div className="bio-contact-details">
              <div className="bio-detail-item">
                <MapPin size={16} className="text-cyan-400" /> Sylhet, Bangladesh
              </div>
              <div className="bio-detail-item">
                <PhoneCall size={16} className="text-cyan-400" /> +88 01777579006
              </div>
              <div className="bio-detail-item">
                <Mail size={16} className="text-cyan-400" /> sojibsylhet77@gmail.com
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="education-panel glass-panel"
          >
            <div className="edu-block">
              <div className="edu-icon-wrap">
                <GraduationCap size={22} />
              </div>
              <div>
                <span className="edu-period">2022 – 2026</span>
                <h3 className="edu-degree">B.Sc. in Computer Science &amp; Engineering</h3>
                <p className="edu-institution">Leading University, Sylhet, Bangladesh</p>
                <div className="cgpa-pill">CGPA: 3.59 / 4.00</div>
              </div>
            </div>

            <div className="edu-divider" />

            <div className="edu-block">
              <div className="edu-icon-wrap" style={{ color: '#a855f7' }}>
                <Sparkles size={22} />
              </div>
              <div>
                <span className="edu-period">Student Branch</span>
                <h3 className="edu-degree">IEEE Computer Society</h3>
                <p className="edu-institution">Leading University Student Branch</p>
                <p className="edu-desc">Active Member participating in tech workshops, seminars, and collaborative problem-solving.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container section-spacing contact-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="contact-card glass-panel text-center"
        >
          <span className="section-eyebrow">Get In Touch</span>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="contact-subtitle">
            Whether you have an SQA opening, QA consulting opportunity, or project inquiry, my inbox is always open!
          </p>

          <div className="contact-cta-wrap">
            <a href="mailto:sojibsylhet77@gmail.com" className="btn-primary btn-large">
              <Mail size={20} /> Send Direct Email
            </a>
          </div>

          <div className="social-links-row">
            <a
              href="https://www.linkedin.com/in/sojibahmed007/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              title="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
            <a
              href="https://github.com/sojibahmed007"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              title="GitHub"
            >
              <Github size={22} />
            </a>
            <a
              href="mailto:sojibsylhet77@gmail.com"
              className="social-btn"
              title="Email"
            >
              <Mail size={22} />
            </a>
            <a
              href="https://facebook.com/sojib.ahmed.734886"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              title="Facebook"
            >
              <Facebook size={22} />
            </a>
          </div>

          <div className="copyright-text">
            &copy; {new Date().getFullYear()} Sojib Ahmed. Built with React &amp; Framer Motion.
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default App;
