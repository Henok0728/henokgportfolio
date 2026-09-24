const track1Items = [
  { icon: 'devicon-python-plain colored', name: 'Python' },
  { icon: 'devicon-cplusplus-plain colored', name: 'C++' },
  { icon: 'devicon-java-plain colored', name: 'Java' },
  { icon: 'devicon-javascript-plain colored', name: 'JavaScript' },
  { icon: 'devicon-html5-plain colored', name: 'HTML5' },
  { icon: 'devicon-css3-plain colored', name: 'CSS3' },
  { icon: 'devicon-c-plain colored', name: 'C' },
  { icon: 'devicon-flask-original colored', name: 'Flask' },
  { icon: 'devicon-fastapi-plain colored', name: 'FastAPI' },
  { icon: 'devicon-spring-plain colored', name: 'Spring Boot' },
  { icon: 'devicon-nodejs-plain colored', name: 'Node.js' },
];

const track2Items = [
  { icon: 'devicon-arduino-plain colored', name: 'Arduino' },
  { icon: 'devicon-mysql-plain colored', name: 'MySQL' },
  { icon: 'devicon-mongodb-plain colored', name: 'MongoDB' },
  { icon: 'devicon-docker-plain colored', name: 'Docker' },
  { icon: 'devicon-git-plain colored', name: 'Git' },
  { icon: 'devicon-embeddedc-plain colored', name: 'ESP32 / IoT' },
  { icon: 'devicon-matlab-plain colored', name: 'Matlab' },
  { icon: 'devicon-archlinux-plain colored', name: 'FPGA' },
  { icon: 'devicon-nvidia-plain colored', name: 'Jetson Nano' },
];

export default function Tools() {
  // Repeat items 3 times for seamless infinite scroll animation
  const track1Full = [...track1Items, ...track1Items, ...track1Items];
  const track2Full = [...track2Items, ...track2Items, ...track2Items];

  return (
    <section id="skills" className="skills-section hidden">
      <div className="section-header">
        <h2>Tools</h2>
        <div className="header-line"></div>
      </div>

      <div className="skills-carousel-container">
        {/* Track 1: Languages & Frameworks */}
        <div className="carousel-wrapper">
          <div className="carousel-track track-left-to-right">
            {track1Full.map((tool, index) => (
              <div className="skill-card" key={`track1-${index}`}>
                <i className={tool.icon}></i>
                <span>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Track 2: Tools & Hardware */}
        <div className="carousel-wrapper">
          <div className="carousel-track track-left-to-right-slow">
            {track2Full.map((tool, index) => (
              <div className="skill-card" key={`track2-${index}`}>
                <i className={tool.icon}></i>
                <span>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
