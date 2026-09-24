const projects = [
  {
    title: 'Machine Hysteresis Analyzer',
    image: '/images/Projects/hystersis.png',
    imageAlt: 'Machine Hysteresis Analyzer',
    delay: '200ms',
    description:
      'Ferromagnetic B-H Hysteresis & Core Loss Simulator it simulates the behavior of ferromagnetic materials under magnetic field. It is a web application uses 3D plotting (OpenGL) to visualize B-H loops for different materials',
    tags: ['Python', 'Flask', 'Typescript', 'React', 'Numpy', 'Scipy', 'Matplotlib'],
    link: 'https://github.com/Henok0728/hysteresis-loss-simulation',
  },
  {
    title: 'Face Recognition System',
    image: '/images/Projects/face-reco.png',
    imageAlt: 'Main page of face-recognition-attendance-system',
    delay: '0ms',
    description:
      'It is a web and embedded system application for face recognition and attendance management system for employers. It uses Insight face for detection of faces, and mark attendance of user in database in real time. It uses TFT screen , arduino esp32, and esp32cam and PIR sensor for face registeration process.',
    tags: [
      'Python',
      'Flask',
      'MongoDB',
      'Insightface',
      'Archface',
      'HTML',
      'CSS',
      'Bootstrap',
      'JavaScript',
      'C++',
      'ESP32',
      'ESP32 CAM',
    ],
    link: 'https://github.com/face-recognition-attendance-system1/class_attendance_system',
  },
  {
    title: 'Pharmaceutal inventory Management System',
    image: '/images/Projects/inventory-management.png',
    imageAlt: 'home page',
    delay: '100ms',
    description:
      'It is a hardware integrated desktop app project for managing inventory of pharmaceutical products. It include features such as adding, deleting, selling and buying product and It has feature to manage employees and their payrolls also it has feature to manage the products in warehouse.',
    tags: ['Java', 'Springboot', 'Maven', 'MySql', 'c++', 'Arduino'],
    link: 'https://github.com/Henok0728/Pharmaceutal-inventory-management-system',
  },
  {
    title: 'Lodge Link',
    image: '/images/Projects/Lodge-link.jpg',
    imageAlt: 'Lodge-Link',
    delay: '200ms',
    description:
      'A generally a middleware between hotels and customers who is looking for booking hotels.',
    tags: ['Typescript', 'Fastapi', 'React', 'Sqlalchemy'],
    link: 'https://github.com/Henok0728/arada',
  },
  {
    title: 'Server Calculator',
    image: '/images/Projects/server.png',
    imageAlt: 'server-calculator',
    delay: '200ms',
    description:
      'Simple TCP socket and multithreading project between Server and Client where Server job is to calculate the results the client is asking',
    tags: ['Java', 'Socket'],
    link: 'https://github.com/Henok0728/server-calculator',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="section-header hidden">
        <h2>Projects</h2>
        <div className="header-line"></div>
      </div>

      <div className="project-grid">
        {projects.map((project, index) => (
          <div
            className="project-card hidden"
            key={index}
            style={{ transitionDelay: project.delay }}
          >
            <div className="card-image-wrapper">
              <img
                src={project.image}
                alt={project.imageAlt}
                className="card-image"
              />
            </div>
            <div className="card-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tags">
                {project.tags.map((tag, tagIndex) => (
                  <span className="tag" key={tagIndex}>
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="view-project-link"
              >
                View Project <span>&rarr;</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
