import { useEffect, useState } from 'react';

export default function Preloader() {
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      const hideTimer = setTimeout(() => {
        setHidden(true);
      }, 600);
      return () => clearTimeout(hideTimer);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (hidden) return null;

  return (
    <div id="preloader" className={fadeOut ? 'fade-out' : ''}>
      <div className="preloader-content">
        <img
          src="/images/favicon/hardware.ico"
          alt="Loading"
          className="preloader-icon"
        />
      </div>
    </div>
  );
}
