import { useState, useEffect } from 'react';

export default function Footer() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const padZero = (num) => String(num).padStart(2, '0');
  const hours = padZero(time.getHours());
  const minutes = padZero(time.getMinutes());
  const seconds = padZero(time.getSeconds());

  return (
    <footer>
      <div className="footer-content">
        <p>&copy; {time.getFullYear()} Henok Gizaw</p>
        <p className="footer-clock" aria-label="Current time">
          {hours} : {minutes} : {seconds}
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
