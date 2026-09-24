const experiences = [
  {
    date: '2025 - Present',
    role: 'Crew Member',
    org: 'Ethiopia Amateur Radio Association',
    description: 'Done 5+ projects in Embedded with ham communication experience.',
    image: '/images/Experience/ET3AA.jpeg',
    imageAlt: 'Ethiopia Amateur Radio Association',
  },
  {
    date: '2025 - 2026',
    role: 'Team Programmer and Leader',
    org: 'AAU AI and Robotics',
    description: 'Participated in African Robotics Championship in 2025 and 2026 as a programmer and team leader',
    image: '/images/Experience/robotics.jpeg',
    imageAlt: 'Addis Ababa Ai and Robotics',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="timeline-section hidden">
      <div className="section-header">
        <h2>Experience</h2>
        <div className="header-line"></div>
      </div>
      <div className="timeline-container">
        {experiences.map((exp, index) => (
          <div className="timeline-item hidden" key={index}>
            <div className="timeline-dot"></div>
            <div className="timeline-date">{exp.date}</div>
            <div className="timeline-content project-card">
              <div className="card-image-wrapper">
                <img src={exp.image} alt={exp.imageAlt} className="card-image" />
              </div>
              <div className="card-content">
                <h3>{exp.role}</h3>
                <h4>{exp.org}</h4>
                <p>{exp.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
