import { useState, useEffect } from 'react';

export default function Nav() {
  const [isLight, setIsLight] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Check initial theme preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light') {
      setIsLight(true);
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      setIsLight(false);
      document.documentElement.removeAttribute('data-theme');
    }
  }, []);

  const toggleTheme = () => {
    const nextLight = !isLight;
    setIsLight(nextLight);
    if (nextLight) {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('portfolio-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('portfolio-theme', 'dark');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY || window.pageYOffset;
      let current = 'home';

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop - sectionHeight / 3) {
          const id = section.getAttribute('id');
          if (id) current = id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home', id: 'home' },
    { href: '#about', label: 'About', id: 'about' },
    { href: '#skills', label: 'Tools', id: 'skills' },
    { href: '#projects', label: 'Projects', id: 'projects' },
    { href: '#experience', label: 'Experience', id: 'experience' },
    { href: '#certificates', label: 'Certificates', id: 'certificates' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      {/* Floating Theme Toggle (Outside Nav Bar) */}
      <button
        id="theme-toggle"
        className="theme-toggle-btn"
        aria-label="Toggle light and dark theme"
        onClick={toggleTheme}
      >
        <svg
          className="sun-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
        <svg
          className="moon-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </button>

      <header className="glass-nav">
        <div className="nav-container">
          <div className="nav-left">
            <div id="nav-profile-slot" />
            <a href="#home" className="logo">
              Henok Gizaw
            </a>
          </div>

          <button
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
            id="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
          </button>

          <nav className={`nav-right ${mobileMenuOpen ? 'active' : ''}`} id="nav-menu">
            <ul className="nav-links">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={activeSection === item.id ? 'active' : ''}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
