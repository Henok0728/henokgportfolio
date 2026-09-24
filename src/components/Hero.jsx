import { useState, useEffect } from 'react';

export default function Hero() {
  const [roleText, setRoleText] = useState('');
  const [showDot, setShowDot] = useState(false);

  useEffect(() => {
    const roles = [' Backend Developer', ' Embedded Systems Developer'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timerId = null;

    function tick() {
      const currentRole = roles[roleIndex];

      if (!isDeleting) {
        if (charIndex < currentRole.length) {
          charIndex++;
          setRoleText(currentRole.substring(0, charIndex));
          setShowDot(false);
          timerId = setTimeout(tick, 60);
        } else {
          setShowDot(true);
          timerId = setTimeout(() => {
            isDeleting = true;
            timerId = setTimeout(tick, 30);
          }, 2500);
        }
      } else {
        if (charIndex > 0) {
          charIndex--;
          setRoleText(currentRole.substring(0, charIndex));
          setShowDot(false);
          timerId = setTimeout(tick, 30);
        } else {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          timerId = setTimeout(tick, 400);
        }
      }
    }

    const startTimer = setTimeout(tick, 500);
    return () => {
      clearTimeout(startTimer);
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  return (
    <section id="home" className="hero hidden">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="headline">
            Hi, I am <span className="accent-text">{roleText}</span>
            {showDot && '.'}
          </h1>
          <p className="bio"></p>
          <div className="hero-actions">
            <a href="#projects" className="btn primary-btn">
              My Works
            </a>
            <a href="#contact" className="btn secondary-btn">
              Get In Touch
            </a>
          </div>
        </div>
        <div className="hero-image-wrapper" id="hero-profile-slot">
          <div className="profile-glow"></div>
          <img
            src="/images/portfolio/profile.jpg"
            alt="My Image"
            id="profile-pic"
            className="profile-image"
          />
        </div>
      </div>
    </section>
  );
}
