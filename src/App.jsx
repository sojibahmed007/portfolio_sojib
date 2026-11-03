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
  ChevronDown,
  Menu,
  X,
  Users,
  Lock,
  Unlock,
  Key
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [workStatus, setWorkStatus] = useState(() => {
    try {
      const saved = localStorage.getItem('sojib_work_status');
      return saved === 'open' || saved === 'working' ? saved : 'working';
    } catch {
      return 'working';
    }
  });

  // Admin Authorization: only Sojib can toggle status
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      const pin = localStorage.getItem('sojib_admin_pin');
      return pin === '9006' || pin === '7700' || pin === '007' || pin === 'sojib77';
    } catch {
      return false;
    }
  });
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState('');
  const [adminError, setAdminError] = useState('');

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncToast, setSyncToast] = useState(null);
  const dropdownRef = useRef(null);

  // Auto-unlock via URL query param: e.g. ?admin=9006
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const adminParam = params.get('admin');
      if (adminParam && ['9006', '7700', '007', 'sojib77'].includes(adminParam.trim())) {
        localStorage.setItem('sojib_admin_pin', adminParam.trim());
        setIsAdmin(true);
        setSyncToast({
          message: 'Admin Mode Unlocked! You can now manage your live status. 👑',
          type: 'success'
        });
        const cleanUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    } catch {}
  }, []);

  const handleAdminUnlock = (e) => {
    e.preventDefault();
    const cleanPin = adminPinInput.trim();
    if (cleanPin === '9006' || cleanPin === '7700' || cleanPin === '007' || cleanPin === 'sojib77') {
      try {
        localStorage.setItem('sojib_admin_pin', cleanPin);
      } catch {}
      setIsAdmin(true);
      setShowAdminModal(false);
      setAdminPinInput('');
      setAdminError('');
      setIsDropdownOpen(true);
      setSyncToast({
        message: 'Admin access granted! Status dropdown unlocked. 👑',
        type: 'success'
      });
    } else {
      setAdminError('Incorrect PIN. Only the portfolio owner can edit this.');
    }
  };

  const handleAdminLogout = () => {
    try {
      localStorage.removeItem('sojib_admin_pin');
    } catch {}
    setIsAdmin(false);
    setIsDropdownOpen(false);
    setSyncToast({
      message: 'Admin mode locked.',
      type: 'notice'
    });
  };

  // Fetch the remote live status across all devices
  const fetchLiveStatus = async () => {
    try {
      let res = await fetch('/api/status', { cache: 'no-store' });
      if (!res.ok) {
        res = await fetch('/.netlify/functions/status', { cache: 'no-store' });
      }
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'working' || data.status === 'open') {
          setWorkStatus(data.status);
          try {
            localStorage.setItem('sojib_work_status', data.status);
          } catch {
            // ignore storage errors
          }
        }
      }
    } catch {
      // Offline or network error: gracefully keep local status
    }
  };

  useEffect(() => {
    // 1. Initial remote status fetch
    fetchLiveStatus();

    // 2. Auto-sync on window focus / tab visibility change
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        fetchLiveStatus();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('focus', fetchLiveStatus);

    // 3. Periodic polling every 20 seconds
    const interval = setInterval(fetchLiveStatus, 20000);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('focus', fetchLiveStatus);
      clearInterval(interval);
    };
  }, []);

  const handleStatusChange = async (newStatus) => {
    setIsDropdownOpen(false);
    if (newStatus === workStatus) return;

    const savedPin = localStorage.getItem('sojib_admin_pin') || '9006';

    // Optimistic UI update
    setWorkStatus(newStatus);
    try {
      localStorage.setItem('sojib_work_status', newStatus);
    } catch {
      // ignore storage errors
    }

    setIsSyncing(true);
    setSyncToast({
      message: 'Syncing status across all devices...',
      type: 'syncing'
    });

    try {
      let res = await fetch('/api/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': savedPin
        },
        body: JSON.stringify({ status: newStatus, pin: savedPin })
      });
      if (!res.ok) {
        res = await fetch('/.netlify/functions/status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-pin': savedPin
          },
          body: JSON.stringify({ status: newStatus, pin: savedPin })
        });
      }

      if (res.ok) {
        setSyncToast({
          message: 'Status updated globally across all devices! 🌐',
          type: 'success'
        });
      } else if (res.status === 401) {
        setSyncToast({
          message: 'Unauthorized: Invalid Admin PIN. Please unlock Admin mode.',
          type: 'warning'
        });
        setIsAdmin(false);
      } else {
        setSyncToast({
          message: 'Saved locally on this device.',
          type: 'notice'
        });
      }
    } catch {
      setSyncToast({
        message: 'Saved locally on this device.',
        type: 'notice'
      });
    } finally {
      setIsSyncing(false);
      setTimeout(() => {
        setSyncToast(null);
      }, 3500);
    }
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

  // Stats: 3 High-Impact Cards (Cross-Platform, Real-Time SaaS QA, Full-Lifecycle Defect Management)
  const stats = [
    {
      value: 'Cross-Platform',
      label: 'Web, Mobile & API Testing',
      sub: 'iOS TestFlight, Android APKs & RESTful Endpoints'
    },
    {
      value: 'Real-Time',
      label: 'Hands-On SaaS QA Experience',
      sub: 'Production Testing on EzyCourse & EzyCommunity'
    },
    {
      value: 'Full-Lifecycle',
      label: 'End-to-End Defect Management',
      sub: 'Detailed Reproduction, Root-Cause Tracing & Retesting'
    }
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
      subtitle: 'Playwright & TypeScript (Foundational Learning Project)',
      description:
        'An introductory automated regression test suite created while starting out with test automation. Automates essential UI rendering validation, navigation routing checks (/videos), and element state assertions using Playwright and TypeScript.',
      tech: ['Playwright (Basics)', 'TypeScript', 'Automated Regression', 'VS Code'],
      link: 'https://github.com/sojibahmed007/Automation_Library_issue_com',
      liveLink: 'https://github.com/sojibahmed007/Automation_Library_issue_com',
      liveLabel: 'View Automation',
      featured: true,
      badgeColor: '#a855f7',
      icon: <Terminal size={24} />
    },
    {
      id: 7,
      category: 'dev',
      title: 'ShebaAI — AI Mobile Healthcare Ecosystem',
      subtitle: 'Undergraduate Final Year Defense Project (CSE 4801)',
      description:
        'An intelligent cross-platform healthcare companion developed as the final-year capstone defense project at Leading University. Features OCR-based handwritten prescription analysis, automated medication carting, Google Gemini AI skin diagnostics, and smart medication push reminders.',
      tech: ['Flutter', 'Dart', 'Python / Django', 'Google Gemini AI', 'OCR Engine', 'Mobile QA'],
      link: 'https://github.com/Noctambulist007/Sheba_AI',
      liveLink: 'https://github.com/Noctambulist007/Sheba_AI/releases/tag/Final_Year_Defense_Project',
      liveLabel: 'Download APK / Release',
      featured: true,
      badgeColor: '#0ea5e9',
      icon: <Smartphone size={24} />
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
      liveLink: 'https://phenomenal-jelly-c9b319.netlify.app/',
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
      liveLink: 'https://shiny-empanada-31ebc8.netlify.app/',
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
      liveLink: 'https://boisterous-alfajores-1cafaf.netlify.app/',
      liveLabel: 'Live Demo',
      badgeColor: '#3b82f6',
      icon: <BookOpen size={24} />
    }
  ];

  // Enhanced & Beautiful Technical Skills Architecture (6 Equal Categories)
  const skillCategories = [
    {
      id: 'qa',
      title: 'Manual & Exploratory QA',
      subtitle: 'Test Design, Execution & Defect Verification',
      accentColor: '#38bdf8',
      icon: <ShieldCheck size={26} className="text-cyan-400" />,
      skills: [
        'Manual Functional Testing',
        'Regression & Retesting',
        'Boundary Value Analysis',
        'Smoke & Sanity Verification',
        'RTL Localization QA',
        'Ad-hoc & Exploratory Testing'
      ]
    },
    {
      id: 'mobile',
      title: 'Mobile QA & Multi-Platform',
      subtitle: 'Native App & Mobile Browser Verification',
      accentColor: '#a855f7',
      icon: <Smartphone size={26} className="text-purple-400" />,
      skills: [
        'Apple TestFlight iOS Builds',
        'Branded Android APKs',
        'Deep Link URL Routing',
        'Mobile Viewport & Gestures',
        'Device Hardware Permissions',
        'Multi-Device Responsiveness'
      ]
    },
    {
      id: 'api',
      title: 'API Testing & Inspection',
      subtitle: 'RESTful Payload & Status Verification',
      accentColor: '#3b82f6',
      icon: <Terminal size={26} className="text-blue-400" />,
      skills: [
        'Postman API Testing',
        'REST API Endpoint Verification',
        'HTTP Status Codes (404, 422, 500)',
        'JSON Schema & Data Validation',
        'DevTools Network Inspection',
        'Request / Response Payloads'
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
        'Test Suites (Google Sheets)',
        'Cross-Functional Agile Teamwork',
        'Daily Standups & Sprint SQA',
        'Defect Reproduction Evidence',
        'Git & GitHub Version Control'
      ]
    },
    {
      id: 'automation',
      title: 'Test Automation (Foundations)',
      subtitle: 'Automated E2E Checks with Playwright',
      accentColor: '#f59e0b',
      icon: <Code2 size={26} className="text-amber-400" />,
      skills: [
        'Playwright E2E Testing (Beginner)',
        'TypeScript & JavaScript (ES6+)',
        'Basic UI & Locator Assertions',
        'Page Object Model (POM) Basics',
        'Trace Viewer & Debugging',
        'Automated Regression Checks'
      ]
    },
    {
      id: 'engineering',
      title: 'Web Engineering & DevTools',
      subtitle: 'CS Foundations Supporting SQA Depth',
      accentColor: '#ec4899',
      icon: <Layers size={26} className="text-pink-400" />,
      skills: [
        'Chrome DevTools DOM & Console',
        'React & Web Architecture',
        'Database & SQL Query Basics',
        'Responsive Layout Auditing',
        'Network Payload Inspection',
        'Object-Oriented Programming (OOP)'
      ]
    }
  ];

  const qaPillars = [
    {
      title: 'User-Centric Exploratory & Boundary QA',
      desc: 'Simulating unpredictable user journeys, multi-tap race conditions, boundary inputs (5,000+ chars), and network drops to find elusive bugs.',
      icon: <Target size={22} className="text-cyan-400" />
    },
    {
      title: 'End-to-End Defect Lifecycle on Trello',
      desc: 'Logging bugs with exact reproduction steps, expected vs actual outputs, console error logs, and screen recordings—retesting until verified.',
      icon: <Bug size={22} className="text-purple-400" />
    },
    {
      title: 'REST API & Network Payload Validation',
      desc: 'Inspecting endpoints using Postman, validating request/response JSON structures, and diagnosing backend status codes (404, 422, 500).',
      icon: <Cpu size={22} className="text-blue-400" />
    },
    {
      title: 'Mobile App & Cross-Platform Testing',
      desc: 'Verifying iOS builds on Apple TestFlight, branded Android APKs, deep link redirects, and multi-device responsive web layouts.',
      icon: <Smartphone size={22} className="text-emerald-400" />
    },
    {
      title: 'Agile Teamwork & Cross-Functional Synergy',
      desc: 'Collaborating closely with developers, product managers, and designers in daily standups and sprint planning to clarify requirements and accelerate defect resolution.',
      icon: <Users size={22} className="text-pink-400" />
    },
    {
      title: 'Test Automation Fundamentals (In Progress)',
      desc: 'Actively learning and scripting basic automated regression tests using Playwright and TypeScript for essential navigation and UI flows.',
      icon: <Code2 size={22} className="text-amber-400" />
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

          {/* Desktop Nav Links */}
          <div className="nav-links desktop-nav">
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

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="mobile-nav-drawer"
            >
              <div className="mobile-nav-links">
                <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>
                  About
                </a>
                <a href="#experience" onClick={() => setIsMobileMenuOpen(false)}>
                  Experience
                </a>
                <a href="#projects" onClick={() => setIsMobileMenuOpen(false)}>
                  Work &amp; QA
                </a>
                <a href="#skills" onClick={() => setIsMobileMenuOpen(false)}>
                  Skills
                </a>
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                  Contact
                </a>
                <a
                  href="/Sojib_Ahmed_SQA_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Sojib_Ahmed_SQA_Resume.pdf"
                  className="mobile-cv-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Download size={16} /> Resume (PDF)
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="hero-section container">
        <div className="hero-badge-wrap" ref={dropdownRef}>
          <div className="status-dropdown-wrapper">
            {isAdmin ? (
              /* ADMIN MODE: Sojib can toggle between statuses */
              <>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`status-pill status-dropdown-btn ${workStatus === 'working' ? 'status-working' : 'status-open-job'}`}
                  aria-haspopup="listbox"
                  aria-expanded={isDropdownOpen}
                  title="Admin Mode Active: Click to update your status"
                >
                  <span className={`pulse-indicator ${isSyncing ? 'pulse-syncing' : workStatus === 'working' ? 'pulse-green' : 'pulse-red'}`} />
                  <span className="status-pill-text">
                    {workStatus === 'working' ? 'Currently Working as a SQA Engineer' : 'Open for Job'}
                  </span>
                  <span className="admin-status-pill-badge">Owner</span>
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
                        className={`dropdown-menu-item ${workStatus === 'open' ? 'selected-red' : ''}`}
                        onClick={() => handleStatusChange('open')}
                        role="option"
                        aria-selected={workStatus === 'open'}
                      >
                        <span className="pulse-indicator pulse-red" />
                        <span className="dropdown-item-text">Open for Job</span>
                        {workStatus === 'open' && <Check size={14} className="dropdown-check text-rose-400" />}
                      </button>

                      <div className="dropdown-divider" />
                      <button
                        type="button"
                        onClick={handleAdminLogout}
                        className="dropdown-menu-item admin-logout-item"
                        title="Lock Admin Mode"
                      >
                        <Lock size={13} className="text-slate-400" />
                        <span className="dropdown-item-text text-slate-400">Lock Admin Mode</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              /* VISITOR VIEW: Clean, live status badge with lock indicator (read-only for visitors) */
              <button
                type="button"
                onClick={() => setShowAdminModal(true)}
                className={`status-pill status-readonly-btn ${workStatus === 'working' ? 'status-working' : 'status-open-job'}`}
                title="Sojib Ahmed's Live Availability (Portfolio Owner? Click to edit)"
              >
                <span className={`pulse-indicator ${workStatus === 'working' ? 'pulse-green' : 'pulse-red'}`} />
                <span className="status-pill-text">
                  {workStatus === 'working' ? 'Currently Working as a SQA Engineer' : 'Open for Job'}
                </span>
                <span className="status-owner-lock" title="Owner Managed Status">
                  <Lock size={12} />
                </span>
              </button>
            )}
          </div>
        </div>

        <h1 className="hero-heading">
          Engineering Quality. <br />
          <span className="gradient-text">Ensuring Digital Precision.</span>
        </h1>

        <p className="hero-summary">
          I'm <strong className="text-white">Sojib Ahmed</strong>, a quality-driven <strong>Software Quality Assurance (SQA) Engineer</strong> with real-world, hands-on production testing experience at <strong>Appifylab</strong>. Specializing in manual SaaS (LMS) testing, Web &amp; Mobile QA via <strong>Apple TestFlight</strong>, deep link routing, REST API validation, and collaborative agile teamwork with developers and product managers to ensure digital precision.
        </p>

        {/* Core Competency Badges */}
        <div className="hero-core-tags">
          <div className="hero-tag-item">
            <ShieldCheck size={16} className="text-cyan-400" />
            <span>Manual Testing</span>
          </div>
          <div className="hero-tag-item">
            <Terminal size={16} className="text-blue-400" />
            <span>API Testing (Postman)</span>
          </div>
          <div className="hero-tag-item">
            <Smartphone size={16} className="text-purple-400" />
            <span>Mobile QA (iOS &amp; Android)</span>
          </div>
          <div className="hero-tag-item">
            <Globe size={16} className="text-emerald-400" />
            <span>Web Cross-Browser Testing</span>
          </div>
          <div className="hero-tag-item">
            <Users size={16} className="text-pink-400" />
            <span>Agile Teamwork</span>
          </div>
          <div className="hero-tag-item">
            <Code2 size={16} className="text-amber-400" />
            <span>Automation Basics (Playwright)</span>
          </div>
        </div>

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
            <div className="about-bio-badge">
              <Sparkles size={15} className="text-cyan-400" />
              <span>Software Quality Assurance Engineer</span>
            </div>

            <h3 className="about-bio-heading">
              Hi, I'm <span className="gradient-text">Sojib Ahmed</span>.
            </h3>

            <p className="about-bio-text">
              I am a Computer Science &amp; Engineering graduate from <strong>Leading University, Sylhet</strong> with genuine dedication to <strong>Software Quality Assurance</strong> and hands-on, real-world production experience gained during my intensive internship at <strong>Appifylab</strong>.
            </p>

            <p className="about-bio-text">
              My core testing philosophy is simple: <em>"Think like an everyday user, test like a creative adversary, and document with engineering precision."</em> QA is more than executing static checklists—it is about anticipating user friction, validating multi-tenant edge cases, and ensuring web and mobile apps perform reliably under real-world network and device conditions.
            </p>

            <p className="about-bio-text">
              At Appifylab, I managed end-to-end defect tracking across <strong>EzyCourse (LMS platform)</strong> and <strong>EzyCommunity (Web, iOS &amp; Android)</strong>, verifying <strong>116+ defect tickets on Trello</strong>. Leveraging my CS background, I trace issues to their source using Chrome DevTools and Postman API payload validation—partnering closely with developers in fast agile sprint cycles to ship robust code.
            </p>

            {/* Bottom Key Highlights Strip for Perfect Visual Balance */}
            <div className="about-metrics-strip">
              <div className="about-metric-pill">
                <ShieldCheck size={16} className="text-cyan-400" />
                <span>Production Defect Lifecycle &amp; Verification</span>
              </div>
              <div className="about-metric-pill">
                <Smartphone size={16} className="text-purple-400" />
                <span>Web, iOS (TestFlight) &amp; Android</span>
              </div>
              <div className="about-metric-pill">
                <Users size={16} className="text-pink-400" />
                <span>Agile Team Collaboration</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: QA Pillars (2-column symmetrical mini-cards) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="about-pillars-grid"
          >
            {qaPillars.map((pillar, idx) => (
              <div key={idx} className="pillar-card glass-panel">
                <div className="pillar-header-row">
                  <div className="pillar-icon-wrap">{pillar.icon}</div>
                  <h4 className="pillar-title">{pillar.title}</h4>
                </div>
                <p className="pillar-desc">{pillar.desc}</p>
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
            <div className="exp-date-pill">August 03 – October 30, 2026 &bull; Production Internship</div>
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

            <div className="exp-highlight-item">
              <div className="exp-icon-wrap" style={{ color: '#ec4899' }}>
                <Users size={20} />
              </div>
              <div>
                <h4>Cross-Functional Agile Teamwork</h4>
                <p>Collaborated side-by-side with frontend, backend, and mobile engineers in daily standups and sprint planning to clarify requirements, reproduce elusive bugs, and accelerate release cycles.</p>
              </div>
            </div>

            <div className="exp-highlight-item">
              <div className="exp-icon-wrap" style={{ color: '#06b6d4' }}>
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h4>Release Readiness &amp; Acceptance QA</h4>
                <p>Partnered with product managers and team leads to validate release deliverables against user stories, ensuring seamless deployments and zero critical escapes to production.</p>
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

          {/* Featured Tools & Technologies Badge Ribbon (Topological Flow Marquee) */}
          <div className="tools-ribbon-wrap">
            <div className="tools-ribbon-track">
              {[...toolsRibbon, ...toolsRibbon].map((tool, idx) => (
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

        {/* Equal 6-Card Grid Architecture for Skills */}
        <div className="skills-bento-grid">
          {skillCategories.map((cat) => (
            <div
              key={cat.id}
              className="skill-bento-card glass-panel"
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
              <div className="cgpa-pill">CGPA: 3.59 / 4.00 &bull; Graduated</div>
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
              <span className="edu-period">2022 – 2026 &bull; Completed</span>
              <h3 className="edu-degree">IEEE Computer Society</h3>
              <p className="edu-institution">Leading University Student Branch</p>
              <div className="activity-pill">Former Local Member</div>
              <p className="edu-note">
                Served as a local student branch member during undergraduate studies; actively participated in university technical seminars, coding events, software engineering workshops, and collaborative problem-solving sessions.
              </p>
            </div>
          </div>

          {/* Undergraduate Final Year Defense Capstone Card */}
          <div className="edu-card glass-panel edu-capstone-card">
            <div className="edu-icon-wrap" style={{ color: '#0ea5e9' }}>
              <Smartphone size={24} />
            </div>
            <div className="edu-card-body">
              <div className="edu-top-row">
                <span className="edu-period">Final Year Defense Project &bull; CSE 4801</span>
                <span className="capstone-badge">Undergraduate Capstone</span>
              </div>
              <h3 className="edu-degree">ShebaAI — Intelligent Mobile Healthcare Companion</h3>
              <p className="edu-institution">
                Leading University, Sylhet &bull; Supervised by <strong>Md. Jehadul Islam Mony</strong> (Assistant Professor, Dept. of CSE)
              </p>
              <p className="edu-note">
                An intelligent healthcare ecosystem engineered to bridge modern mobile architecture, server-side APIs, and neural machine learning. Successfully completed and defended before the Department of CSE Board of Examiners.
              </p>

              <div className="edu-capstone-highlights">
                <div className="capstone-point">
                  <span className="point-bullet" />
                  <div>
                    <strong>OCR Prescription Digitization:</strong> Integrated an image recognition pipeline to parse doctor handwritten prescriptions into an automated digital pharmacy cart.
                  </div>
                </div>
                <div className="capstone-point">
                  <span className="point-bullet" />
                  <div>
                    <strong>Gemini AI Health Assistant:</strong> Leveraged Google Gemini AI models to provide interactive patient wellness guidance, dosage schedules, and automated push notification reminders.
                  </div>
                </div>
                <div className="capstone-point">
                  <span className="point-bullet" />
                  <div>
                    <strong>Rigorous Mobile &amp; API QA:</strong> Executed comprehensive functional, boundary, and responsive testing across multiple Android viewports, simulating offline scenarios, push notifications, and network latency on RESTful endpoints.
                  </div>
                </div>
              </div>

              <div className="edu-tech-chips" style={{ marginBottom: 0, marginTop: '1.15rem' }}>
                <span className="edu-chip">Flutter &amp; Dart</span>
                <span className="edu-chip">Python &amp; Django REST</span>
                <span className="edu-chip">Google Gemini AI</span>
                <span className="edu-chip">OCR Engine</span>
                <span className="edu-chip">Riverpod State Management</span>
                <span className="edu-chip">Mobile QA &amp; API Testing</span>
              </div>
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

      {/* Admin Authentication Modal */}
      <AnimatePresence>
        {showAdminModal && (
          <div className="admin-modal-overlay" onClick={() => setShowAdminModal(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.2 }}
              className="admin-modal-card glass-panel"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="admin-modal-header">
                <div className="admin-modal-icon">
                  <Lock size={22} className="text-cyan-400" />
                </div>
                <div>
                  <h3 className="admin-modal-title">Portfolio Owner Access</h3>
                  <p className="admin-modal-sub">Only Sojib Ahmed can modify this employment status.</p>
                </div>
                <button
                  type="button"
                  className="admin-modal-close"
                  onClick={() => setShowAdminModal(false)}
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAdminUnlock} className="admin-modal-form">
                <label className="admin-input-label">Enter Secret Admin PIN:</label>
                <div className="admin-input-wrap">
                  <Key size={16} className="admin-input-icon text-cyan-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={adminPinInput}
                    onChange={(e) => {
                      setAdminPinInput(e.target.value);
                      setAdminError('');
                    }}
                    className="admin-pin-input"
                    autoFocus
                  />
                </div>
                {adminError && <p className="admin-error-text">{adminError}</p>}

                <div className="admin-modal-actions">
                  <button type="button" onClick={() => setShowAdminModal(false)} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    <Unlock size={16} /> Unlock Status
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Realtime Status Sync Toast */}
      <AnimatePresence>
        {syncToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className={`sync-toast ${syncToast.type}`}
            role="status"
            aria-live="polite"
          >
            <span className="sync-toast-icon">
              {syncToast.type === 'syncing' ? '⏳' : syncToast.type === 'success' ? '✅' : 'ℹ️'}
            </span>
            <span className="sync-toast-text">{syncToast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
