const certificates = [
  {
    title: 'ALX Professional Foundations Certificate',
    issuer: 'ALX ETHIOPIA',
    year: '2025',
    image: '/images/certificates/cert3.png',
    link: 'https://drive.google.com/file/d/1D9ObI8rRreZUktqyIO9w06MQPlmKMkkY/view',
    delay: '0ms',
  },
  {
    title: 'Africa Robotics Championship',
    issuer: 'Ethiorobo Robotics and Mint',
    year: '2025',
    image: '/images/certificates/cert1.png',
    link: 'https://drive.google.com/file/d/1TwbGeh6uPNGc-FnSpMhZATied_zUvaRD/view',
    delay: '100ms',
  },
  {
    title: 'Competetive Programming Certeficate',
    issuer: 'ALX Ethiopia and Codeleague',
    year: '2025',
    image: '/images/certificates/cert2.png',
    link: 'https://drive.google.com/file/d/1_58LmE2P1Y9zqKpFTBrq8m_-XNLxudZ-/view',
    delay: '100ms',
  },
   {
    title: 'Vex robotics Challenger',
    issuer: 'Addis Ababa University and AAU AI AND ROBOTICS',
    year: '2026',
    image: '/images/certificates/cert4.jpg',
    link: 'https://drive.google.com/file/d/1HAII_i6rL3mZgTx-_hRROcZXBDAPcpe4/view?usp=sharing',
    delay: '100ms',
  },
];

export default function Certificates() {
  return (
    <section id="certificates" className="certificates hidden">
      <div className="section-header">
        <h2>Certificates</h2>
        <div className="header-line"></div>
      </div>

      <div className="project-grid">
        {certificates.map((cert, index) => (
          <div
            className="project-card hidden"
            key={index}
            style={{ transitionDelay: cert.delay }}
          >
            <div className="card-image-wrapper">
              <img
                src={cert.image}
                alt={cert.title}
                className="card-image"
              />
            </div>
            <div className="card-content">
              <h3>{cert.title}</h3>
              <p>{cert.issuer}</p>
              <div className="tags">
                <span className="tag">Issued: {cert.year}</span>
              </div>
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="view-project-link"
              >
                View Credential <span>&rarr;</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
