import React, { useState, useRef, useEffect } from 'react';
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
  MapPin,
  Download,
  Target,
  Cpu,
  FileText,
  Check,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [workStatus, setWorkStatus] = useState(() => {
    try {
      const saved = localStorage.getItem('sojib_work_status');
      return saved === 'open' || saved === 'working' ? saved : 'working';
    } catch {
      return 'working';
    }
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleStatusChange = (newStatus) => {
    setWorkStatus(newStatus);
    try {
      localStorage.setItem('sojib_work_status', newStatus);
    } catch {
      // ignore storage errors
    }
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Stats: 3 High-Impact Cards (Removed QA Test Suites as requested)
  const stats = [
    { label: 'Defect Cards Verified', value: '116+', sub: 'Trello Staging & Live' },
    { label: 'Internship Experience', value: '3 Mos', sub: 'Appifylab (LMS SaaS)' },
    { label: 'Academic CGPA', value: '3.59', sub: 'Leading University (CSE)' }
  ];

  const toolsRibbon = [
    { name: 'Postman', icon: <Terminal size={15} />, color: '#ff6c37' },
    { name: 'Apple TestFlight', icon: <Smartphone size={15} />, color: '#0071e3' },
    { name: 'Playwright', icon: <Terminal size={15} />, color: '#45ba4b' },
    { name: 'Trello', icon: <Layout size={15} />, color: '#0079bf' },
    { name: 'Chrome DevTools', icon: <Globe size={15} />, color: '#4285f4' },
    { name: 'Google Sheets', icon: <FileSpreadsheet size={15} />, color: '#0f9d58' },
    { name: 'Git & GitHub', icon: <Github size={15} />, color: '#f05032' },
    { name: 'TypeScript', icon: <Code2 size={15} />, color: '#3178c6' },
    { name: 'JavaScript ES6+', icon: <Code2 size={15} />, color: '#f7df1e' },
    { name: 'REST APIs', icon: <Layers size={15} />, color: '#8b5cf6' }
  ];

  const projects = [
    {
      id: 1,
      category: 'qa',
      title: 'Intern QA Portfolio & Bug Case Reports',
      subtitle: 'Appifylab (EzyCourse & EzyCommunity)',
      description:
        'Comprehensive documentation of 116+ production/staging defect tickets across EzyCommunity (103 cards) and EzyCourse LMS (13 cards). Authored detailed test suites covering Deep Linking, 1:1 Coaching modules, Notification triggers, and Mobile User Status.',
      tech: ['Manual Testing', 'Trello (116+ Tickets)', 'iOS TestFlight', 'Deep Link QA', 'Google Sheets'],
      link: 'https://github.com/sojibahmed007/Intern_work',
      liveLink: 'https://github.com/sojibahmed007/Intern_work#readme',
      liveLabel: 'View QA Reports',
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
        'Automated end-to-end regression test suite validating Videos tab rendering, URL routing assertions (/videos), empty state handling, and state persistence after browser reloads.',
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
        'A dynamic e-commerce web platform featuring real-time product filtering, dynamic cart calculations, RESTful API data consumption, responsive layouts, and edge-case form validation.',
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
        'An experimental laboratory interface featuring real-time data monitoring components, responsive grid architecture, and interactive layout elements built with modern CSS standards.',
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
        'Interactive web application converting text input into natural speech using the Web Speech API with custom pitch, rate, and multi-voice selection controls.',
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
        'An educational web platform designed for English language learning with structured vocabulary modules, intuitive navigation, and accessible UI components.',
      tech: ['HTML5', 'JavaScript ES6', 'CSS3'],
      link: 'https://github.com/sojibahmed007/English_janala',
      liveLink: 'https://statuesque-tartufo-1ae5df.netlify.app',
      liveLabel: 'Live Demo',
      badgeColor: '#3b82f6',
      icon: <BookOpen size={24} />
    }
  ];

  // Enhanced & Beautiful Technical Skills Architecture (Normal Clean Chips)
  const skillCategories = [
    {
      id: 'qa',
      title: 'Manual & Functional QA Methodologies',
      subtitle: 'Comprehensive Test Design, Execution & Validation',
      accentColor: '#38bdf8',
      icon: <ShieldCheck size={26} className="text-cyan-400" />,
      featured: true,
      skills: [
        'Manual Functional Testing',
        'Regression & Retesting',
        'Boundary Value Analysis',
        'Smoke & Sanity Testing',
        'RTL (Arabic) Localization QA',
        'Root Cause & Defect Triage',
        'Exploratory & Ad-hoc Testing',
        'Cross-Browser UI Consistency'
      ]
    },
    {
      id: 'mobile',
      title: 'Mobile QA & Multi-Platform Testing',
      subtitle: 'Native App & Mobile Browser Verification',
      accentColor: '#a855f7',
      icon: <Smartphone size={26} className="text-purple-400" />,
      skills: [
        'Apple TestFlight iOS Builds',
        'Branded Android APKs',
        'Deep Link URL Redirection',
        'Mobile Viewport & Gestures',
        'Device Hardware Permissions (Camera/Mic)'
      ]
    },
    {
      id: 'api',
      title: 'API Testing & Network Inspection',
      subtitle: 'RESTful Payload & Status Verification',
      accentColor: '#3b82f6',
      icon: <Terminal size={26} className="text-blue-400" />,
      skills: [
        'Postman API Testing',
        'REST API Endpoint Testing',
        'HTTP Status Codes (404, 422, 500)',
        'JSON Data Structure Validation',
        'Chrome DevTools Network Panel'
      ]
    },
    {
      id: 'management',
      title: 'Defect & Test Management',
      subtitle: 'Tracking Ecosystem & Agile Workflows',
      accentColor: '#10b981',
      icon: <FileSpreadsheet size={26} className="text-emerald-400" />,
      skills: [
        'Trello Ticket Lifecycle (116+ Cards)',
        'Test Cases & Test Suites (Google Sheets)',
        'Bug Life Cycle Management',
        'Agile & Scrum Methodologies',
        'Git & GitHub Version Control'
      ]
    },
    {
      id: 'automation',
      title: 'Automation & Core Technologies',
      subtitle: 'Scripting, Tooling & Frontend Diagnostics',
      accentColor: '#f59e0b',
      icon: <Code2 size={26} className="text-amber-400" />,
      skills: [
        'Playwright E2E Automation',
        'TypeScript',
        'JavaScript (ES6+)',
        'HTML5 & CSS3 / Tailwind',
        'VS Code & Developer Tooling'
      ]
    }
  ];

  const qaPillars = [
    {
      title: 'User-Centric Exploratory Testing',
      desc: 'Going beyond standard scripts to simulate unpredictable user behaviors, edge gestures, and network drops.',
      icon: <Target size={22} className="text-cyan-400" />
    },
    {
      title: 'Meticulous Defect Triage',
      desc: 'Logging bug tickets with clear reproducible steps, expected vs actual outputs, error logs, and screen recordings.',
      icon: <Bug size={22} className="text-purple-400" />
    },
    {
      title: 'API & Data Integrity',
      desc: 'Validating payload structures, JSON data parsing, and investigating backend HTTP errors (404, 422, 500).',
      icon: <Cpu size={22} className="text-blue-400" />
    },
    {
      title: 'Agile Engineering Collaboration',
      desc: 'Working side-by-side with developers and product managers to accelerate release cadence without sacrificing stability.',
      icon: <ShieldCheck size={22} className="text-emerald-400" />
    }
  ];

  const filteredProjects = activeTab === 'all'
    ? projects
    : projects.filter(p => p.category === activeTab);

  return (
    <div className="portfolio-wrapper">
      {/* Background Ambient Glows */}
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
            <a href="#contact">Contact</a>
            <a
              href="/Sojib_Ahmed_SQA_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Sojib_Ahmed_SQA_Resume.pdf"
              className="nav-cv-btn"
            >
              <Download size={14} /> Resume (PDF)
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section container">
        <div className="hero-badge-wrap" ref={dropdownRef}>
          <div className="status-dropdown-wrapper">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`status-pill status-dropdown-btn ${workStatus === 'working' ? 'status-working' : 'status-open-job'}`}
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
              title="Click to toggle status"
            >
              <span className={`pulse-indicator ${workStatus === 'working' ? 'pulse-green' : 'pulse-cyan'}`} />
              <span className="status-pill-text">
                {workStatus === 'working' ? 'Currently Working as a SQA Engineer' : 'Open for Job'}
              </span>
              <ChevronDown size={14} className={`dropdown-chevron ${isDropdownOpen ? 'rotated' : ''}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="status-dropdown-menu glass-panel"
                  role="listbox"
                >
                  <button
                    type="button"
                    className={`dropdown-menu-item ${workStatus === 'working' ? 'selected' : ''}`}
                    onClick={() => handleStatusChange('working')}
                    role="option"
                    aria-selected={workStatus === 'working'}
                  >
                    <span className="pulse-indicator pulse-green" />
                    <span className="dropdown-item-text">Currently Working as a SQA Engineer</span>
                    {workStatus === 'working' && <Check size={14} className="dropdown-check text-emerald-400" />}
                  </button>

                  <button
                    type="button"
                    className={`dropdown-menu-item ${workStatus === 'open' ? 'selected' : ''}`}
                    onClick={() => handleStatusChange('open')}
                    role="option"
                    aria-selected={workStatus === 'open'}
                  >
                    <span className="pulse-indicator pulse-cyan" />
                    <span className="dropdown-item-text">Open for Job</span>
                    {workStatus === 'open' && <Check size={14} className="dropdown-check text-cyan-400" />}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <h1 className="hero-heading">
          Engineering Quality. <br />
          <span className="gradient-text">Ensuring Digital Precision.</span>
        </h1>

        <p className="hero-summary">
          I'm <strong className="text-white">Sojib Ahmed</strong>, a quality-driven <strong>Software Quality Assurance (SQA) Engineer</strong> with 3 months of intensive internship experience at <strong>Appifylab</strong>. Specializing in manual SaaS (LMS) testing, branded mobile builds via <strong>Apple TestFlight</strong>, deep link routing, API response validation, and test automation with <strong>Playwright</strong>.
        </p>

        {/* Hero Actions (Primary is Explore QA Work, CV button removed from hero start) */}
        <div className="hero-actions">
          <a href="#projects" className="btn-primary">
            Explore QA Work <ArrowUpRight size={18} />
          </a>
          <a
            href="https://github.com/sojibahmed007/Intern_work"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <Github size={18} /> QA Portfolio
          </a>
          <a href="mailto:sojibsylhet77@gmail.com" className="btn-outline">
            <Mail size={18} /> Email Me
          </a>
        </div>

        {/* Stats Strip: 3 Cards */}
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card glass-panel">
              <div className="stat-value gradient-text">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-sub">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About Me Section (High Impact, Positioned at Top) */}
      <section id="about" className="container section-spacing">
        <div className="section-header text-center">
          <span className="section-eyebrow">Professional Profile</span>
          <h2 className="section-title">About Me &amp; QA Philosophy</h2>
          <p className="section-subtitle">
            Bridging technical Computer Science foundations with relentless curiosity to build resilient, defect-free software.
          </p>
        </div>

        <div className="about-detailed-grid">
          {/* Left Column: Personal Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="about-bio-card glass-panel"
          >
            <h3 className="about-bio-heading">
              Hi, I'm <span className="gradient-text">Sojib Ahmed</span>.
            </h3>
            <p className="about-bio-text">
              I am a Computer Science &amp; Engineering graduate from <strong>Leading University, Sylhet</strong> (CGPA 3.59/4.00) with hands-on Software Quality Assurance experience gained during my internship at <strong>Appifylab</strong>.
            </p>
            <p className="about-bio-text">
              My philosophy toward software quality is simple: <em>"Think like an everyday user, test like a creative adversary, and document like a seasoned engineer."</em> Having a strong understanding of web development (JavaScript, HTML, CSS, React) allows me to pinpoint root causes behind UI glitches, API response failures, and state discrepancies rather than just noting symptoms.
            </p>
            <p className="about-bio-text">
              Whether conducting boundary analysis on 5,000+ character inputs, verifying deep link redirects across iOS TestFlight and Android builds, or inspecting RESTful API payloads in Postman, I take pride in catching critical issues before they ever impact live customers.
            </p>

            <div className="about-contact-badges">
              <div className="contact-badge-item">
                <MapPin size={16} className="text-cyan-400" />
                <span>Sylhet, Bangladesh</span>
              </div>
              <div className="contact-badge-item">
                <PhoneCall size={16} className="text-cyan-400" />
                <span>+88 01777579006</span>
              </div>
              <div className="contact-badge-item">
                <Mail size={16} className="text-cyan-400" />
                <span>sojibsylhet77@gmail.com</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: QA Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="about-pillars-grid"
          >
            {qaPillars.map((pillar, idx) => (
              <div key={idx} className="pillar-card glass-panel">
                <div className="pillar-icon-wrap">{pillar.icon}</div>
                <div>
                  <h4 className="pillar-title">{pillar.title}</h4>
                  <p className="pillar-desc">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience Section (Spotlight Appifylab) */}
      <section id="experience" className="container section-spacing">
        <div className="section-header text-center">
          <span className="section-eyebrow">Professional Background</span>
          <h2 className="section-title">Hands-On SQA Experience</h2>
          <p className="section-subtitle">
            Real production defect management and cross-platform verification across LMS SaaS platforms and community apps.
          </p>
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
                Platforms: <strong>EzyCourse</strong> (LMS SaaS Platform) &amp; <strong>EzyCommunity</strong> (Web, iOS, Android)
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
                <h4>116+ Defect Tickets Tracked on Trello</h4>
                <p>Triaged and verified 103 cards on EzyCommunity (79 App Live, 24 Web Live) and 13 EzyCourse cards with exact reproduction steps, logs, and video evidence.</p>
              </div>
            </div>

            <div className="exp-highlight-item">
              <div className="exp-icon-wrap" style={{ color: '#a855f7' }}>
                <Smartphone size={20} />
              </div>
              <div>
                <h4>iOS TestFlight &amp; Deep Link QA</h4>
                <p>Validated pre-release iOS builds on Apple TestFlight and Android APKs, verifying deep links to private lessons, courses, and community chat channels without drop-offs.</p>
              </div>
            </div>

            <div className="exp-highlight-item">
              <div className="exp-icon-wrap" style={{ color: '#f59e0b' }}>
                <Terminal size={20} />
              </div>
              <div>
                <h4>API &amp; Backend Status Code Analysis</h4>
                <p>Investigated 500 errors on blog creation, 422 unprocessable entity responses on video library deletion, and 404 access expiration logic on bundle courses.</p>
              </div>
            </div>

            <div className="exp-highlight-item">
              <div className="exp-icon-wrap" style={{ color: '#10b981' }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4>Boundary &amp; Concurrency Edge Cases</h4>
                <p>Discovered 5,000+ character app unresponsiveness boundaries, multi-tap race conditions on lesson loading, and cross-platform voice message playback bugs between Web &amp; iOS.</p>
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

        {/* See More on GitHub Button Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="see-more-wrap text-center"
        >
          <a
            href="https://github.com/sojibahmed007?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-github-more"
          >
            <Github size={20} />
            <span>See More Projects &amp; Repositories on GitHub</span>
            <ArrowUpRight size={18} />
          </a>
        </motion.div>
      </section>

      {/* Redesigned & Beautiful Technical Skills Section */}
      <section id="skills" className="container section-spacing">
        <div className="section-header text-center">
          <span className="section-eyebrow">Technical Competencies</span>
          <h2 className="section-title">Technical Skills &amp; Arsenal</h2>
          <p className="section-subtitle">
            Industry-standard manual testing techniques, mobile lab verifications, API inspection, and modern tooling.
          </p>

          {/* Featured Tools & Technologies Badge Ribbon */}
          <div className="tools-ribbon-wrap">
            <div className="tools-ribbon">
              {toolsRibbon.map((tool, idx) => (
                <div key={idx} className="tool-ribbon-item">
                  <span className="tool-ribbon-icon" style={{ color: tool.color }}>
                    {tool.icon}
                  </span>
                  <span>{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bento Grid Architecture for Skills */}
        <div className="skills-bento-grid">
          {skillCategories.map((cat) => (
            <div
              key={cat.id}
              className={`skill-bento-card glass-panel ${cat.featured ? 'bento-featured' : ''}`}
            >
              <div className="skill-bento-header">
                <div
                  className="skill-bento-icon-wrap"
                  style={{ backgroundColor: `${cat.accentColor}18`, borderColor: `${cat.accentColor}40` }}
                >
                  {cat.icon}
                </div>
                <div>
                  <h3 className="skill-bento-title">{cat.title}</h3>
                  <p className="skill-bento-sub">{cat.subtitle}</p>
                </div>
              </div>

              <div className="skill-chips-wrap">
                {cat.skills.map((skillName, sIdx) => (
                  <div key={sIdx} className="skill-chip">
                    <span className="skill-chip-name">{skillName}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Extracurriculars */}
      <section id="education" className="container section-spacing">
        <div className="section-header text-center">
          <span className="section-eyebrow">Academic &amp; Leadership</span>
          <h2 className="section-title">Education &amp; Community</h2>
        </div>

        <div className="education-grid">
          <div className="edu-card glass-panel">
            <div className="edu-icon-wrap">
              <GraduationCap size={24} />
            </div>
            <div>
              <span className="edu-period">2022 – 2026</span>
              <h3 className="edu-degree">B.Sc. in Computer Science &amp; Engineering</h3>
              <p className="edu-institution">Leading University, Sylhet, Bangladesh</p>
              <div className="cgpa-pill">CGPA: 3.59 / 4.00</div>
              <p className="edu-note">
                Relevant coursework: Software Engineering, Database Systems, Object-Oriented Programming, Data Structures, Algorithms, Computer Networks.
              </p>
            </div>
          </div>

          <div className="edu-card glass-panel">
            <div className="edu-icon-wrap" style={{ color: '#a855f7' }}>
              <Sparkles size={24} />
            </div>
            <div>
              <span className="edu-period">Student Branch</span>
              <h3 className="edu-degree">IEEE Computer Society</h3>
              <p className="edu-institution">Leading University Student Branch</p>
              <div className="activity-pill">Active Member</div>
              <p className="edu-note">
                Participated in technical seminars, coding hackathons, software engineering workshops, and collaborative problem-solving sessions.
              </p>
            </div>
          </div>
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
            <a
              href="/Sojib_Ahmed_SQA_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Sojib_Ahmed_SQA_Resume.pdf"
              className="btn-secondary btn-large"
            >
              <FileText size={20} /> Download Resume
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
