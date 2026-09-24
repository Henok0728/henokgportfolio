export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Henok Gizaw</p>
        <p>{new Date().getHours().toString() + " : " + new Date().getMinutes().toString() + " : " + new Date().getSeconds().toString()}</p>
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
