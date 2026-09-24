import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, message: 'Send Message', style: {} });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: 'Sending...', style: {} });

    try {
      const response = await fetch('https://formspree.io/f/xykvppky', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          loading: false,
          message: '✓ Message Sent!',
          style: { backgroundColor: '#10b981' },
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        let errorMsg = 'Submission Failed';
        if (data.errors && data.errors.length > 0) {
          errorMsg = data.errors[0].message;
        } else if (data.error) {
          errorMsg = data.error;
        }
        setStatus({
          loading: false,
          message: errorMsg,
          style: { backgroundColor: '#ef4444' },
        });
      }
    } catch (err) {
      console.error('Contact Form Error:', err);
      setStatus({
        loading: false,
        message: 'Network Error',
        style: { backgroundColor: '#ef4444' },
      });
    }

    setTimeout(() => {
      setStatus({ loading: false, message: 'Send Message', style: {} });
    }, 4000);
  };

  return (
    <section id="contact" className="contact hidden">
      <div className="section-header">
        <h2>Contact</h2>
        <div className="header-line"></div>
      </div>
      <div className="contact-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder="Hello! I'd like to discuss a project..."
              value={formData.message}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn primary-btn submit-btn"
            disabled={status.loading}
            style={status.style}
          >
            {status.message}
          </button>
        </form>
      </div>
    </section>
  );
}
