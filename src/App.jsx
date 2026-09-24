import { useEffect } from 'react';
import Preloader from './components/Preloader';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Tools from './components/Tools';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Footer from './components/Footer';
import { Analytics } from '@vercel/analytics/react';

import { initPhysicsBackground } from './scripts/modules/physics-bg';
import { initLightBackground } from './scripts/modules/light-bg';
import { initScrollObserver } from './scripts/modules/animations';
import { init3DCardTilt } from './scripts/modules/3d-card';
import { morphProfile } from './scripts/modules/profile-morph';

export default function App() {
  useEffect(() => {
    // Initialize background engines
    initPhysicsBackground();
    initLightBackground();

    // Scroll reveal observer & 3D tilt effects
    initScrollObserver();
    init3DCardTilt();

    // Profile picture morphing between Hero and Nav on scroll
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

      morphProfile(current !== 'home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Preloader />
      <div className="background-net" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <About />
        <Tools />
        <Experience />
        <Projects />
        <Certificates />
      </main>
      <Footer />
      <Analytics />
    </>
  );
}
