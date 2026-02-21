import React from 'react';
import { Github, Linkedin, Mail, Code2, Globe, Terminal, User, BookOpen, ShoppingCart, PlayCircle, Mic2, Home, Layout, Smartphone, Facebook, Package, Layers, Palette, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const App = () => {
  const projects = [
    {
      title: "English Janala",
      description: "An educational platform designed for language learning with an intuitive UI and interactive elements.",
      tech: ["HTML5", "JavaScript ES6", "CSS3"],
      link: "https://github.com/sojibahmed007/English_janala",
      liveLink: "https://statuesque-tartufo-1ae5df.netlify.app",
      icon: <BookOpen size={24} />,
      iconColor: "#54a0ff"
    },
    {
      title: "SwiftCart-E-Commerce",
      description: "A premium e-commerce platform featuring a modern shopping experience with product filtering and sleek navigation.",
      tech: ["HTML5", "JavaScript ES6", "Fetch API"],
      link: "https://github.com/sojibahmed007/SwiftCart-E-Commerce",
      liveLink: "https://wondrous-crostata-39b82f.netlify.app",
      icon: <ShoppingCart size={24} />,
      iconColor: "#ff9f43"
    },
    {
      title: "Text to Speech",
      description: "An interactive application that converts text into natural-sounding speech using the Web Speech API.",
      tech: ["JavaScript ES6", "Web Speech API", "CSS3"],
      link: "https://github.com/sojibahmed007/Text_to_Speech",
      liveLink: "https://scintillating-pithivier-0ce296.netlify.app",
      icon: <Mic2 size={24} />,
      iconColor: "#00d2d3"
    },
    {
      title: "Living Lab",
      description: "An advanced experimental laboratory platform featuring real-time data monitoring and interactive research tools.",
      tech: ["HTML5", "CSS3", "Tailwind CSS"],
      link: "https://github.com/sojibahmed007/Living_lab",
      liveLink: "https://resplendent-kelpie-dd99b8.netlify.app",
      icon: <Layers size={24} />,
      iconColor: "#1dd1a1"
    },
    {
      title: "Tea House Website",
      description: "A minimalist and aesthetically pleasing website for a tea house, focusing on layout design and user experience.",
      tech: ["HTML5", "CSS Grid", "JavaScript"],
      link: "https://github.com/sojibahmed007/Tea_House_css",
      liveLink: "https://fastidious-gumdrop-792362.netlify.app",
      icon: <Layout size={24} />,
      iconColor: "#5f27cd"
    },
    {
      title: "G3 Architect",
      description: "A professional landing page for architecture firms, showcasing modern design principles and structural clarity.",
      tech: ["HTML5", "Flexbox", "Layout Design"],
      link: "https://github.com/sojibahmed007/G3_architect",
      liveLink: "https://stellar-zabaione-2c41ea.netlify.app",
      icon: <Smartphone size={24} />,
      iconColor: "#ee5253"
    }
  ];

  const skills = [
    { name: "Frontend Development", icon: <Globe size={20} />, color: "#48dbfb" },
    { name: "JavaScript (ES6+)", icon: <Code2 size={20} />, color: "#feca57" },
    { name: "API Integration", icon: <Terminal size={20} />, color: "#ff9ff3" },
    { name: "Computer Science", icon: <BookOpen size={20} />, color: "#1dd1a1" },
    { name: "UI/UX Layouts", icon: <Layout size={20} />, color: "#ff6b6b" },
    { name: "Mobile App Design", icon: <Smartphone size={20} />, color: "#54a0ff" }
  ];

  return (
    <div className="portfolio">
      <nav className="nav-container container">
        <div className="nav-logo">
          <img
            src="https://github.com/sojibahmed007.png"
            alt="Sojib Ahmed"
            className="nav-avatar"
          />
          <div className="nav-name">SOJIB AHMED</div>
        </div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero container mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-content"
        >
          <h1 className="hero-title">
            Designing <span className="accent-gradient">Digital</span> Experiences.
          </h1>
          <p className="hero-description">
            Hi, I'm <span className="text-highlight-bold">Sojib Ahmed</span>. A dedicated <span className="accent-text-bold">Front End Developer</span> and B.Sc. in CSE student building modern, responsive, and data-driven web experiences.
          </p>
        </motion.div>
      </section>

      <section id="about" className="container about-section mt-6 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-white text-center font-bold text-6xl mb-6">About Me</h2>
          <div className="glass about-card">
            <h3 className="about-subtitle">Front End Developer</h3>
            <p className="about-text">
              I am a dedicated Computer Science and Engineering student at Leading University, Sylhet, with a deep-rooted passion for front-end development. My journey in tech is driven by an insatiable curiosity to understand how various digital components come together to create seamless user experiences.
            </p>
            <p className="about-text">
              With a solid foundation in core web technologies, I specialize in building responsive, efficient, and visually compelling web applications. I believe that great design is not just about aesthetics but also about solving complex problems through intuitive and functional solutions.
            </p>
            <p className="about-text">
              Beyond coding, I am constantly learning and exploring new frameworks and design patterns to stay at the forefront of the ever-evolving web ecosystem. My goal is to build digital products that leave a lasting impact through clean code and exceptional performance.
            </p>
          </div>
        </motion.div>
      </section>

      <section id="skills" className="container">
        <h2 className="section-title text-white text-center font-bold text-6xl mt-6 mb-6 ">Technical Skills</h2>
        <div className="skills-grid">
          <div className="skill-tag"><Code2 style={{ color: '#feca57' }} /> <span>JavaScript ES6+</span></div>
          <div className="skill-tag"><Globe style={{ color: '#48dbfb' }} /> <span>HTML5 / CSS3</span></div>
          <div className="skill-tag"><Terminal style={{ color: '#ff9ff3' }} /> <span>Web APIs & Fetch API</span></div>
          <div className="skill-tag"><Smartphone style={{ color: '#54a0ff' }} /> <span>Responsive UI Design</span></div>
          <div className="skill-tag"><Package style={{ color: '#1dd1a1' }} /> <span>Git & GitHub</span></div>
          <div className="skill-tag"><Layers style={{ color: '#ff6b6b' }} /> <span>CSS Grid & Flexbox</span></div>
          <div className="skill-tag"><Layout style={{ color: '#5f27cd' }} /> <span>UI/UX Architecture</span></div>
          <div className="skill-tag"><Palette style={{ color: '#ff9f43' }} /> <span>Tailwind CSS</span></div>
        </div>
      </section>

      <section id="projects" className="container ">
        <h2 className="section-title text-white text-center font-bold text-6xl mt-6 mb-6">My Work</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="glass project-card"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="project-icon" style={{ color: project.iconColor }}>
                {project.icon}
              </div>
              <div className="project-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((t, i) => {
                    const getIcon = (name) => {
                      const n = name.toLowerCase();
                      if (n.includes('html')) return <Globe size={12} style={{ color: '#E34F26' }} />;
                      if (n.includes('javascript')) return <Code2 size={12} style={{ color: '#F7DF1E' }} />;
                      if (n.includes('css')) return <Palette size={12} style={{ color: '#1572B6' }} />;
                      if (n.includes('tailwind')) return <Smartphone size={12} style={{ color: '#06B6D4' }} />;
                      if (n.includes('api') || n.includes('fetch')) return <Terminal size={12} style={{ color: '#5f27cd' }} />;
                      if (n.includes('grid') || n.includes('flex')) return <Layers size={12} style={{ color: '#48dbfb' }} />;
                      if (n.includes('layout')) return <Layout size={12} style={{ color: '#ff9f43' }} />;
                      return <Code2 size={12} style={{ color: '#3b82f6' }} />;
                    };
                    return (
                      <span key={i} className="tech-badge">
                        {getIcon(t)}
                        {t}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="project-links-container">
                <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                  <Github size={16} /> Code
                </a>
                <a href={project.liveLink} className="project-link" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} /> Live Demo
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="view-more-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a href="https://github.com/sojibahmed007" target="_blank" rel="noopener noreferrer" className="btn btn-github-more">
            <Github size={20} /> For More Projects Visit My GitHub
          </a>
        </motion.div>
      </section>

      <section id="contact" className="container contact-section">
        <h2 className="section-title text-gradient text-center font-bold text-4xl">Let's Connect</h2>
        <p className="contact-description">
          Interested in working together or just want to say hi?
        </p>
        <div className="social-links">
          <a href="mailto:sojibsylhet77@gmail.com" className="social-icon" style={{ color: '#ea4335' }} target="_blank" rel="noopener noreferrer"><Mail size={32} /></a>
          <a href="https://github.com/sojibahmed007" className="social-icon" style={{ color: '#ffffff' }} target="_blank" rel="noopener noreferrer"><Github size={32} /></a>
          <a href="https://facebook.com/sojib.ahmed.734886" className="social-icon" style={{ color: '#1877f2' }} target="_blank" rel="noopener noreferrer"><Facebook size={32} /></a>
          <a href="https://www.linkedin.com/in/sojibahmed007" className="social-icon" style={{ color: '#0077b5' }} target="_blank" rel="noopener noreferrer"><Linkedin size={32} /></a>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="thanks-message"
        >
          Thank you for visiting my portfolio!
        </motion.div>

        <div className="copyright">
          &copy; {new Date().getFullYear()} Sojib Ahmed. Built with high-end modern standards and ❤️
        </div>
      </section>

    </div>
  );
};

export default App;
