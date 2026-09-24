import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, message: 'Send Message', style: {} });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_default';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_default';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key_default';

    setStatus({ loading: true, message: 'Sending...', style: {} });

    try {
      const templateParams = {
        name: formData.name,
        from_name: formData.name,
        email: formData.email,
        from_email: formData.email,
        reply_to: formData.email,
        message: formData.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setStatus({
        loading: false,
        message: '✓ Message Sent!',
        style: { backgroundColor: '#10b981' },
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('EmailJS Error:', err);
      const errorMsg =
        serviceId === 'service_default'
          ? 'Set EmailJS Keys in .env'
          : err?.text || 'Failed to send';

      setStatus({
        loading: false,
        message: errorMsg,
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
        <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
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
