import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Section from './Section';

/**
 * PUBLIC_INTERFACE
 * ContactForm renders an accessible contact section with name, email, and message fields.
 *
 * - Uses shared Section wrapper (id="contact")
 * - Required validation for all fields
 * - Adds aria-invalid and aria-describedby for errors
 * - Includes role="status" live region to announce submission state
 * - Disables submit button while submitting
 * - Mock submission via setTimeout to simulate network delay
 * - Shows success banner upon completion
 *
 * Styling:
 * - Inputs use existing .input and .textarea classes from components.css
 * - Button uses .btn .btn-primary
 */
function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: 'idle', message: '' }); // idle | success | error | submitting

  // Simple validators
  const errors = useMemo(() => {
    const e = {};
    if (!values.name.trim()) e.name = 'Please enter your name.';
    if (!values.email.trim()) {
      e.email = 'Please enter your email.';
    } else {
      // rudimentary email pattern
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);
      if (!emailOk) e.email = 'Please enter a valid email address.';
    }
    if (!values.message.trim()) e.message = 'Please enter a message.';
    return e;
  }, [values]);

  const hasErrors = Object.keys(errors).length > 0;

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }, []);

  const onBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setTouched({ name: true, email: true, message: true });

      if (hasErrors) {
        setStatus({ type: 'error', message: 'Please fix the errors in the form and try again.' });
        return;
      }

      setSubmitting(true);
      setStatus({ type: 'submitting', message: 'Sending your message…' });

      // Mock async submit
      const timer = setTimeout(() => {
        setSubmitting(false);
        setStatus({ type: 'success', message: 'Thank you! Your message has been sent.' });
        // reset form
        setValues({ name: '', email: '', message: '' });
        setTouched({ name: false, email: false, message: false });
      }, 1200);

      return () => clearTimeout(timer);
    },
    [hasErrors]
  );

  // Improve a11y: announce transitions via document title small tweak (optional)
  useEffect(() => {
    if (status.type === 'success') {
      // no-op, could integrate analytics or focus management
    }
  }, [status]);

  // Helper to build describedby id list
  const describedBy = (field) => {
    const ids = [];
    ids.push(`${field}-help`);
    if (touched[field] && errors[field]) ids.push(`${field}-error`);
    return ids.join(' ');
  };

  // Render
  return (
    <Section
      id="contact"
      title="Contact Us"
      subtitle="We'd love to hear from you. Send us a message and we’ll get back soon."
      size="md"
      className=""
    >
      {status.type === 'success' && (
        <div
          className="card"
          role="status"
          aria-live="polite"
          style={{
            borderColor: 'color-mix(in srgb, var(--color-secondary) 35%, var(--border))',
            background: 'color-mix(in srgb, var(--color-secondary) 10%, var(--surface))',
            marginBottom: '16px',
          }}
        >
          <strong style={{ display: 'block', marginBottom: 6 }}>Message sent</strong>
          <span>{status.message}</span>
        </div>
      )}

      {status.type === 'error' && (
        <div
          className="card"
          role="status"
          aria-live="assertive"
          style={{
            borderColor: 'color-mix(in srgb, var(--color-error) 45%, var(--border))',
            background: 'color-mix(in srgb, var(--color-error) 10%, var(--surface))',
            marginBottom: '16px',
          }}
        >
          <strong style={{ display: 'block', marginBottom: 6 }}>Please review</strong>
          <span>{status.message}</span>
        </div>
      )}

      {/* The form */}
      <form noValidate onSubmit={onSubmit} className="card" aria-describedby="contact-status">
        {/* Live region for submit status */}
        <div id="contact-status" role="status" aria-live="polite" className="sr-only">
          {status.type === 'submitting' ? 'Sending your message' : status.message}
        </div>

        <div className="grid grid-2" style={{ marginBottom: 12 }}>
          {/* Name */}
          <div>
            <label htmlFor="name" className="h3" style={{ display: 'block', marginBottom: 6 }}>
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="input"
              placeholder="Your full name"
              required
              value={values.name}
              onChange={onChange}
              onBlur={onBlur}
              aria-invalid={touched.name && !!errors.name ? 'true' : 'false'}
              aria-describedby={describedBy('name')}
              disabled={submitting}
              autoComplete="name"
            />
            <p id="name-help" className="muted" style={{ marginTop: 6, marginBottom: 0 }}>
              Please enter your full name.
            </p>
            {touched.name && errors.name && (
              <p
                id="name-error"
                style={{ color: 'var(--color-error)', marginTop: 6, marginBottom: 0 }}
                role="alert"
              >
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="h3" style={{ display: 'block', marginBottom: 6 }}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="input"
              placeholder="you@example.com"
              required
              value={values.email}
              onChange={onChange}
              onBlur={onBlur}
              aria-invalid={touched.email && !!errors.email ? 'true' : 'false'}
              aria-describedby={describedBy('email')}
              disabled={submitting}
              autoComplete="email"
            />
            <p id="email-help" className="muted" style={{ marginTop: 6, marginBottom: 0 }}>
              We’ll only use your email to reply.
            </p>
            {touched.email && errors.email && (
              <p
                id="email-error"
                style={{ color: 'var(--color-error)', marginTop: 6, marginBottom: 0 }}
                role="alert"
              >
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Message */}
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="message" className="h3" style={{ display: 'block', marginBottom: 6 }}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="textarea"
            placeholder="How can we help?"
            required
            value={values.message}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={touched.message && !!errors.message ? 'true' : 'false'}
            aria-describedby={describedBy('message')}
            disabled={submitting}
            rows={6}
          />
          <p id="message-help" className="muted" style={{ marginTop: 6, marginBottom: 0 }}>
            Provide a brief overview of your goals or questions.
          </p>
          {touched.message && errors.message && (
            <p
              id="message-error"
              style={{ color: 'var(--color-error)', marginTop: 6, marginBottom: 0 }}
              role="alert"
            >
              {errors.message}
            </p>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'flex-start' }}>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Sending…' : 'Send Message'}
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              setValues({ name: '', email: '', message: '' });
              setTouched({ name: false, email: false, message: false });
              setStatus({ type: 'idle', message: '' });
            }}
            disabled={submitting}
          >
            Reset
          </button>
        </div>
      </form>

      {/* Local scoped styles to improve spacing on the form */}
      <style>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </Section>
  );
}

export default ContactForm;
