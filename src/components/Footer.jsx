import { useState, useEffect } from 'react';

export default function Footer() {
  const [time, setTime] = useState(() => new Date());
  const [isSpacePressed, setIsSpacePressed] = useState(false);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const triggerBackgroundToggle = () => {
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.click();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        const target = e.target;
        const tag = target ? target.tagName : '';
        if (tag === 'INPUT' || tag === 'TEXTAREA' || target?.isContentEditable) {
          return;
        }
        e.preventDefault();
        setIsSpacePressed(true);
        triggerBackgroundToggle();
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        setIsSpacePressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const padZero = (num) => String(num).padStart(2, '0');
  const hours = padZero(time.getHours());
  const minutes = padZero(time.getMinutes());
  const seconds = padZero(time.getSeconds());

  return (
    <footer id="footer">
      <div className="footer-content">
        <p>&copy; {time.getFullYear()} Henok Gizaw</p>
        <button
          type="button"
          className={`footer-space-tip ${isSpacePressed ? 'is-active' : ''}`}
          onClick={triggerBackgroundToggle}
          title="Press Space or click to switch background"
          aria-label="Toggle background theme"
        >
          <span className="tip-badge">Tip</span>
          <span className="tip-text">
            Press <kbd className="space-kbd">Space</kbd> to change background
          </span>
        </button>
        <p className="footer-clock" aria-label="Current time">
         Still alive at {hours} - {minutes} - {seconds}
        </p>
        <div className="social-links">
            <a
            href="mailto:henokgizaw06@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          > 
           Gmail
          </a>
          <a
            href="https://github.com/Henok0728"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        
          <a
            href="https://www.linkedin.com/in/henokgizawnigatu"
            target="_blank"
            rel="noopener noreferrer"
          > 
           LinkedIn
          </a>
          <a
            href="https://t.me/henokastr"
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram
          </a>
          <a
            href="https://codeforces.com/profile/henok.ugr-0728-16"
            target="_blank"
            rel="noopener noreferrer"
          >
            Codeforces
          </a>
        </div>
      </div>
      <div className="nike-slogan-layout" aria-hidden="true">
        <div className="slogan-bg-glow"></div>
        <span className="slogan-text">LETS BUILD TOGETHER!</span>
      </div>
    </footer>
  );
}
